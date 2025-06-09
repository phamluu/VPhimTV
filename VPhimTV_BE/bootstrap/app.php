<?php

use App\Http\Middleware\ApiResponseMiddleware;
use App\Http\Middleware\ApiAuthMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;
use Illuminate\Auth\AuthenticationException;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware
            ->use([
                \Illuminate\Http\Middleware\HandleCors::class, // 👈 THÊM DÒNG NÀY
            ])
            ->validateCsrfTokens(except: ['api/*'])
            ->appendToGroup('api', ApiResponseMiddleware::class)
            ->alias([
                'apiAuth' => ApiAuthMiddleware::class,
            ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->render(function (Throwable $e, $request) {
            if ($request->expectsJson()) {

                if ($e instanceof ValidationException) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Dữ liệu không hợp lệ',
                        'errors' => $e->errors(),
                    ], 422);
                }

                if ($e instanceof AuthenticationException) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Không có quyền truy cập',
                    ], 401);
                }

                if ($e instanceof HttpResponseException) {
                    return $e->getResponse();
                }

                $status = 500;
                if ($e instanceof HttpExceptionInterface) {
                    $status = $e->getStatusCode();
                } elseif (property_exists($e, 'status')) {
                    $status = $e->status;
                }

                return response()->json([
                    'success' => false,
                    'message' => $e->getMessage() ?: 'Lỗi không xác định',
                ], $status);
            }

            return null;
        });
    })->create();
