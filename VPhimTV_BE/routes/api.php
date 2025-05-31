<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MovieController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CountryController;
use App\Http\Controllers\Api\FavoriteController;
use App\Http\Controllers\Api\UserController;

Route::middleware(['web'])->group(function () {
    // API Authenticate
    Route::prefix('auth')->name('auth.')->group(function () {
        Route::controller(AuthController::class)->group(function () {
            Route::get('/check', 'check')->name('check');
            Route::post('/login', 'login')->name('login');
            Route::post('/register', 'register')->name('register');
            Route::post('/logout', 'logout')->name('logout');
        });
    });

    // API Movie
    Route::prefix('movie')->name('movies.')->group(function () {
        Route::controller(MovieController::class)->group(function () {
            Route::get('/', 'getList')->name('getList');
            Route::get('/{slug}', 'getDetail')->name('getDetail');
        });
    });

    // API Movie Favorite
    Route::prefix('favorite')->name('movie_favorites.')->middleware('apiAuth')->group(function () {
        Route::controller(FavoriteController::class)->group(function () {
            Route::get('/', 'getList')->name('getList');
            Route::post('/create', 'create')->name('create');
            Route::post('/delete', 'delete')->name('delete');
        });
    });

    // API User
    Route::prefix('user')->name('users.')->group(function () {
        Route::controller(UserController::class)->group(function () {
            Route::get('/{id}', 'getDetail')->name('getDetail');
            Route::put('/update/{id}', 'update')->name('update');
        });
    });

    // API Category
    Route::prefix('category')->name('categories.')->group(function () {
        Route::get('/', [CategoryController::class, 'getList'])->name('getList');
    });

    // API Country
    Route::prefix('country')->name('countries.')->group(function () {
        Route::get('/', [CountryController::class, 'getList'])->name('getList');
    });
});
