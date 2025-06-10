<?php

use App\Http\Middleware\ApiResponseMiddleware;
use App\Http\Middleware\ApiAuthMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

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
        // Handle exceptions here
    })->create();
