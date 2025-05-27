<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

Route::prefix('api')->name('api.')->group(function () {
    Route::prefix('auth')->name('auth.')->group(function () {
        Route::controller(AuthController::class)->group(function () {
            Route::get('/check', 'check')->name('check');
            Route::post('/login', 'login')->name('login');
            Route::post('/logout', 'logout')->name('logout');
        });
    });
});
