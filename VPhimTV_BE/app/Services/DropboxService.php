<?php

namespace App\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;

class DropboxService
{
    protected $apiClient;
    protected $contentClient;

    public function __construct()
    {
        $refreshToken = env('DROPBOX_REFRESH_TOKEN');
        $this->initialize(
            env('DROPBOX_CLIENT_ID'),
            env('DROPBOX_CLIENT_SECRET'),
            $refreshToken
        );
    }

    protected function initialize($clientId, $clientSecret, $refreshToken)
    {
        $client = new Client(['base_uri' => 'https://api.dropbox.com/']);
        $accessToken = null;

        try {
            $response = $client->post('oauth2/token', [
                'verify' => false,
                'form_params' => [
                    'grant_type' => 'refresh_token',
                    'refresh_token' => $refreshToken,
                    'client_id' => $clientId,
                    'client_secret' => $clientSecret,
                ],
            ]);

            $data = json_decode($response->getBody(), true);
            $accessToken = $data['access_token'];

            $this->apiClient = new Client([
                'base_uri' => 'https://api.dropboxapi.com/2/',
                'headers' => [
                    'Authorization' => "Bearer {$accessToken}",
                    'Content-Type' => 'application/json',
                ],
            ]);

            $this->contentClient = new Client([
                'base_uri' => 'https://content.dropboxapi.com/2/',
                'headers' => [
                    'Authorization' => "Bearer {$accessToken}",
                ],
            ]);
        } catch (RequestException $e) {
            throw new \Exception("Lỗi khi lấy access token từ Dropbox: " . $e->getMessage());
            // error_log("Dropbox API Token Error: " . $e->getMessage());
        }
    }

    public function upload(string $dropboxPath, string $localFilePath): array
    {
        try {
            $fileContents = file_get_contents($localFilePath);

            $response = $this->contentClient->post('files/upload', [
                'headers' => [
                    'Content-Type' => 'application/octet-stream',
                    'Dropbox-API-Arg' => json_encode([
                        'path' => $dropboxPath,
                        'mode' => 'add',
                        'autorename' => true,
                        'mute' => false,
                    ]),
                ],
                'body' => $fileContents,
            ]);

            return json_decode($response->getBody(), true);
        } catch (RequestException $e) {
            return ['error' => $e->getMessage()];
        }
    }

    public function download(string $dropboxPath, string $saveTo): bool
    {
        try {
            $response = $this->contentClient->post('files/download', [
                'headers' => [
                    'Dropbox-API-Arg' => json_encode(['path' => $dropboxPath]),
                ],
                'sink' => $saveTo,
            ]);
            return $response->getStatusCode() === 200;
        } catch (RequestException $e) {
            return false;
        }
    }

    public function delete(string $dropboxPath): array
    {
        try {
            $response = $this->apiClient->post('files/delete_v2', [
                'json' => ['path' => $dropboxPath],
            ]);
            return json_decode($response->getBody(), true);
        } catch (RequestException $e) {
            return ['error' => $e->getMessage()];
        }
    }

    public function getList(string $path = ""): array
    {
        try {
            $response = $this->apiClient->post('files/list_folder', [
                'json' => ['path' => $path],
            ]);
            return json_decode($response->getBody(), true);
        } catch (RequestException $e) {
            return ['error' => $e->getMessage()];
        }
    }

    public function getTemporaryLink(string $dropboxPath): ?string
    {
        try {
            $response = $this->apiClient->post('files/get_temporary_link', [
                'json' => ['path' => $dropboxPath],
            ]);
            $data = json_decode($response->getBody(), true);

            return $data['link'] ?? null;
        } catch (\Exception $e) {
            return null;
        }
    }

    public function createSharedLink(string $dropboxPath): ?string
    {
        try {
            $response = $this->apiClient->post('sharing/create_shared_link_with_settings', [
                'json' => [
                    'path' => $dropboxPath,
                    'settings' => [
                        'requested_visibility' => 'public',
                    ],
                ],
            ]);

            $data = json_decode($response->getBody(), true);
            return $data['url'] ?? null;
        } catch (\GuzzleHttp\Exception\ClientException $e) {
            if ($e->getCode() === 409) {
                return $this->getExistingSharedLink($dropboxPath);
            }
            return null;
        }
    }

    public function getExistingSharedLink(string $dropboxPath): ?string
    {
        try {
            $response = $this->apiClient->post('sharing/list_shared_links', [
                'json' => [
                    'path' => $dropboxPath,
                    'direct_only' => true,
                ],
            ]);

            $data = json_decode($response->getBody(), true);
            return $data['links'][0]['url'] ?? null;
        } catch (\Exception $e) {
            return null;
        }
    }
}
