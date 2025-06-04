<?php

namespace App\Services;

use Google\Client;
use Google\Service\Drive;
use Google\Service\Drive\DriveFile;
use Google\Http\MediaFileUpload;
use Psr\Http\Message\RequestInterface;
use Google\Service\Drive\Permission;

class DriveService
{
    protected $drive;

    public function __construct()
    {
        $client = new Client();
        $client->setAuthConfig(storage_path('app/credentials/vphimtv-service-account.json'));
        $client->addScope(Drive::DRIVE);
        $this->drive = new Drive($client);
    }

    public function getList(array $params = []): array
    {
        $defaultParams = [
            'q' => null,
            'fields' => 'files(id, name, mimeType, size, createdTime)',
            'pageSize' => 10,
            'orderBy' => 'createdTime desc',
        ];
        $params = array_merge($defaultParams, $params);
        $response = $this->drive->files->listFiles($params);
        return $response->files ?? [];
    }

    public function getFile(string $fileId): ?DriveFile
    {
        try {
            return $this->drive->files->get($fileId, ['fields' => 'id, name, mimeType, size, createdTime']);
        } catch (\Exception $e) {
            return null;
        }
    }

    public function uploadFile(string $filePath, string $fileName, string $mimeType)
    {
        $fileSize = filesize($filePath);
        $file = new DriveFile();
        $file->setName($fileName);
        $file->setMimeType($mimeType);
        $file->setParents([env('GOOGLE_DRIVE_FOLDER_ID')]);

        try {
            $chunkSizeBytes = 1 * 1024 * 1024; // 1MB chunk size

            $client = $this->drive->getClient();
            $client->setDefer(true);

            /** @var RequestInterface $request */
            $request = $this->drive->files->create($file, ['uploadType' => 'resumable']);

            $media = new MediaFileUpload(
                $client,
                $request,
                $mimeType,
                null,
                true,
                $chunkSizeBytes
            );

            $media->setFileSize($fileSize);

            $handle = fopen($filePath, "rb");
            $status = false;

            while (!$status && !feof($handle)) {
                $chunk = fread($handle, $chunkSizeBytes);
                $status = $media->nextChunk($chunk);
            }

            fclose($handle);
            $client->setDefer(false);

            $permission = new Permission();
            $permission->setType('anyone');
            $permission->setRole('reader');
            $this->drive->permissions->create($status['id'], $permission);

            return [
                'link_view' => 'https://drive.google.com/file/d/' . $status['id'] . '/view',
                'link_download' => 'https://drive.google.com/uc?id=' . $status['id'] . '&export=download',
            ];
        } catch (\Exception $e) {
            return false;
        }
    }

    // public function uploadFile(string $filePath, string $fileName, string $mimeType): ?DriveFile
    // {
    //     $file = new DriveFile();
    //     $file->setName($fileName);
    //     $file->setMimeType($mimeType);
    //     $file->setParents([env('GOOGLE_DRIVE_FOLDER_ID')]);

    //     try {
    //         $result = $this->drive->files->create($file, [
    //             'data' => file_get_contents($filePath),
    //             'uploadType' => 'multipart',
    //             'fields' => 'id, name, mimeType, size, createdTime',
    //         ]);
    //         return $result;
    //     } catch (\Exception $e) {
    //         return null;
    //     }
    // }

    public function deleteFile(string $fileId): bool
    {
        try {
            $this->drive->files->delete($fileId);
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }
}
