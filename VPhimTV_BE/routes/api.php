<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MovieController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;

// API Authenticate
Route::middleware(['web'])->prefix('auth')->name('auth.')->group(function () {
    Route::controller(AuthController::class)->group(function () {
        Route::get('/check', 'check')->name('check');
        Route::post('/login', 'login')->name('login');
        Route::post('/logout', 'logout')->name('logout');
    });
});

// API Movie
Route::prefix('movie')->name('movies.')->group(function () {
    Route::get('/', [MovieController::class, 'getList'])->name('getList');
    Route::get('/{slug}', [MovieController::class, 'getDetail'])->name('getDetail');
});

// API Category
Route::prefix('category')->name('categories.')->group(function () {
    Route::get('/', [CategoryController::class, 'getList'])->name('getList');
});

// API Country
Route::prefix('country')->name('countries.')->group(function () {
    Route::get('/', [CategoryController::class, 'getList'])->name('getList');
});
