<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\AuthenticationException;

class ApiAuthMiddleware
{
    public function handle(Request $request, Closure $next)
{
    $token = $request->header('Authorization');
    if (!$token || !str_starts_with($token, 'Bearer ')) {
        return response()->json(['message' => 'Unauthorized'], 401);
    }

    $token = str_replace('Bearer ', '', $token);
    if (!Auth::guard('sanctum')->check()) {
        return response()->json(['message' => 'Không có quyền truy cập'], 401);
    }

    return $next($request);
}
}
