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

        if (!$response instanceof JsonResponse) {
            return $response;
        }

        $original = $response->getData(true);

        if (
            isset($original['errors']) ||
            (isset($original['success']) && array_key_exists('data', $original))
        ) {
            return $response;
        }

        $wrapped = $this->wrapResponse($original);

        return response()->json($wrapped, $response->getStatusCode());
    }

    protected function wrapResponse(array $original): array
    {
        $wrapped = [
            'success' => $original['success'] ?? true,
            'message' => $original['message'] ?? 'Gọi API thành công',
        ];

        if (array_key_exists('data', $original)) {
            $wrapped['data'] = $original['data'];
        }

        if (isset($original['current_page'])) {
            $wrapped['pagination'] = [
                'current_page' => $original['current_page'] ?? null,
                'last_page' => $original['last_page'] ?? null,
                'per_page' => $original['per_page'] ?? null,
                'total' => $original['total'] ?? null,
                'links' => $original['links'] ?? [],
            ];
        }

        return $wrapped;
    }
}
