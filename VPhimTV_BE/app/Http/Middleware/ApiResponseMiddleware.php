<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\JsonResponse;

class ApiResponseMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $request->headers->set('Accept', 'application/json');
        $response = $next($request);
        $statusCode = $response->getStatusCode();

        if (!$response instanceof JsonResponse) {
            $content = $response->getContent();
            $decoded = json_decode($content, true);

            if (json_last_error() === JSON_ERROR_NONE) {
                $data = $decoded;
            } else {
                $data = $content;
            }

            return response()->json(
                $this->normalizeResponse($data, $statusCode),
                $statusCode
            );
        }

        $original = $response->getData(true);

        return response()->json(
            $this->normalizeResponse($original, $statusCode),
            $statusCode
        );
    }

    protected function normalizeResponse($original, int $statusCode): array
    {
        $isSuccess = $statusCode >= 200 && $statusCode < 300;

        $response = [
            'status' => $original['status'] ?? $isSuccess,
            'message' => $original['message'] ?? 'Gọi API thành công',
            'data' => [],
        ];

        if (!is_array($original)) {
            $response['data'] = $original ?? [];
            return $response;
        }

        $hasOnlyMessage = isset($original['message']) && count($original) === 1;
        $hasDataKey = array_key_exists('data', $original);

        if ($hasDataKey) {
            $response['data'] = $original['data'];
        } else {
            $response['data'] = $hasOnlyMessage ? [] : $original;
        }

        $isPaginationAtRoot = isset($original['current_page'], $original['last_page']);

        $dataSection = $original['data'] ?? [];
        $isPaginationInsideData = is_array($dataSection) && isset($dataSection['current_page'], $dataSection['last_page']);

        if ($isPaginationAtRoot) {
            $response['data'] = $original['data'] ?? $original['items'] ?? [];

            $response['pagination'] = [
                'current_page' => $original['current_page'],
                'last_page' => $original['last_page'],
                'per_page' => $original['per_page'] ?? null,
                'total' => $original['total'] ?? null,
                'links' => $original['links'] ?? [],
            ];
        } elseif ($isPaginationInsideData) {
            $response['data'] = $dataSection['data'] ?? [];

            $response['pagination'] = [
                'current_page' => $dataSection['current_page'],
                'last_page' => $dataSection['last_page'],
                'per_page' => $dataSection['per_page'] ?? null,
                'total' => $dataSection['total'] ?? null,
                'links' => $dataSection['links'] ?? [],
            ];
        }

        return $response;
    }
}
