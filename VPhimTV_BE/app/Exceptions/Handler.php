<?php

namespace App\Exceptions;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
    public function render($request, Throwable $exception)
    {
        if ($exception instanceof AuthorizationException) {
            return redirect('/login')->with('error', 'Bạn không có quyền truy cập.');
        }

        return parent::render($request, $exception);
    }
}
