<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AuthController;


Route::middleware(['auth', 'can:view-post'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index']);
});

Route::prefix('admin')->group(function () {
    Route::controller(AuthController::class)->group(function () {
        Route::get('user', 'index')->name('auth.index');
    });
});
