<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MovieController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CountryController;
use App\Http\Controllers\Api\FavoriteController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\ViewsController;
use App\Http\Controllers\Api\HistoryController;
use App\Http\Controllers\Api\EpisodeController;

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
            Route::get('/hot', 'getListHot')->name('getListHot');
            Route::get('/{slug}', 'getDetail')->name('getDetail');
        });
    });

    // Api Episode
    Route::prefix('episode')->name('episodes.')->group(function () {
        Route::controller(EpisodeController::class)->group(function () {
            Route::post('/test', 'test')->name('test'); // Test Drive Service
        });
    });

    // API Favorite
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
            Route::put('/update/{id}', 'update')->name('update')->middleware('apiAuth');
        });
    });

    // API Comment
    Route::prefix('comment')->name('comments.')->group(function () {
        Route::controller(CommentController::class)->group(function () {
            Route::get('/', 'getList')->name('getList');
            Route::middleware('apiAuth')->group(function () {
                Route::post('/create', 'create')->name('create');
                Route::put('/update/{id}', 'update')->name('update');
                Route::post('/delete/{id}', 'delete')->name('delete');
            });
        });
    });

    // API History
    Route::prefix('history')->name('histories.')->middleware('apiAuth')->group(function () {
        Route::controller(HistoryController::class)->group(function () {
            Route::get('/', 'getList')->name('getList');
            Route::post('/create', 'create')->name('create');
            Route::post('/delete/{id}', 'delete')->name('delete');
        });
    });

    // API View
    Route::prefix('view')->name('views.')->group(function () {
        Route::post('/create', [ViewsController::class, 'create'])->name('create');
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
