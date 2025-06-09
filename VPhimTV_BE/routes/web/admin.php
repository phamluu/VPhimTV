<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Web\DashboardController;
use App\Http\Controllers\Web\UserController;
use App\Http\Controllers\Web\MenuController;
use App\Http\Controllers\Web\CategoryController;
use App\Http\Controllers\Web\ProfileController;
use App\Http\Controllers\Web\MovieTypeController;
use App\Http\Controllers\Web\MovieController;
use App\Http\Controllers\Web\CountryController;
use App\Http\Controllers\Web\EpisodeController;
use App\Http\Controllers\Web\MovieCommentController;

Route::middleware(['auth', 'role:admin'])->group(function () {

    Route::get('/', [DashboardController::class, 'index']);
    Route::prefix('user')->group(function () {
        Route::get('/', [UserController::class, 'index'])->name('user.index');
        Route::get('create', [UserController::class, 'create'])->name('user.create');
        Route::post('store', [UserController::class, 'store'])->name('user.store');
        Route::get('edit/{id}', [UserController::class, 'edit'])->name('user.edit');
        Route::put('update/{id}', [UserController::class, 'update'])->name('user.update');
        Route::delete('delete/{id}', [UserController::class, 'destroy'])->name('user.destroy');
    });
    Route::prefix('profile')->group(function () {
        Route::controller(ProfileController::class)->group(function () {
            Route::get('/show', 'show')->name('profile.show');
            Route::get('/edit', 'edit')->name('profile.edit');
            Route::post('update', [ProfileController::class, 'update'])->name('profile.update');
        });
    });
    Route::prefix('menu')->group(function () {
        Route::get('/', [MenuController::class, 'index'])->name('menu.index');
        Route::get('create', [MenuController::class, 'create'])->name('menu.create');
        Route::post('store', [MenuController::class, 'store'])->name('menu.store');
        Route::get('edit/{id}', [MenuController::class, 'edit'])->name('menu.edit');
        Route::put('update/{id}', [MenuController::class, 'update'])->name('menu.update');
        Route::delete('delete/{id}', [MenuController::class, 'destroy'])->name('menu.destroy');
    });
    Route::prefix('category')->group(function () {
        Route::get('/', [CategoryController::class, 'index'])->name('category.index');
        Route::get('create', [CategoryController::class, 'create'])->name('category.create');
        Route::post('store', [CategoryController::class, 'store'])->name('category.store');
        Route::get('edit/{id}', [CategoryController::class, 'edit'])->name('category.edit');
        Route::put('update/{id}', [CategoryController::class, 'update'])->name('category.update');
        Route::delete('delete/{id}', [CategoryController::class, 'destroy'])->name('category.destroy');
    });
    Route::prefix('movietype')->group(function () {
        Route::controller(MovieTypeController::class)->group(function () {
            Route::get('/', 'index')->name('movietype.index');
            Route::get('create', 'create')->name('movietype.create');
            Route::post('store', 'store')->name('movietype.store');
            Route::get('edit/{id}', 'edit')->name('movietype.edit');
            Route::put('update/{id}', 'update')->name('movietype.update');
            Route::delete('delete/{id}', 'destroy')->name('movietype.destroy');
        });
    });
    Route::prefix('movie')->group(function () {
        Route::controller(MovieController::class)->group(function () {
            Route::get('/', 'index')->name('movie.index');
            Route::get('create', 'create')->name('movie.create');
            Route::post('store', 'store')->name('movie.store');
            Route::get('edit/{id}', 'edit')->name('movie.edit');
            Route::put('update/{id}', 'update')->name('movie.update');
            Route::delete('delete/{id}',  'destroy')->name('movie.destroy');
            Route::get('detail/{id}',  'detail')->name('movie.detail');
        });
    });
    Route::prefix('country')->group(function () {
        Route::controller(CountryController::class)->group(function () {
            Route::get('/', 'index')->name('country.index');
            Route::get('create', 'create')->name('country.create');
            Route::post('store', 'store')->name('country.store');
            Route::get('edit/{id}', 'edit')->name('country.edit');
            Route::put('update/{id}', 'update')->name('country.update');
            Route::delete('delete/{id}', 'destroy')->name('country.destroy');
        });
    });
    Route::prefix('episode')->group(function () {
        Route::controller(EpisodeController::class)->group(function () {
            Route::get('/', 'index')->name('episode.index');
            Route::get('create', 'create')->name('episode.create');
            Route::post('store', 'store')->name('episode.store');
            Route::get('edit/{id}', 'edit')->name('episode.edit');
            Route::put('update/{id}', 'update')->name('episode.update');
            Route::delete('delete/{id}', 'destroy')->name('episode.destroy');
        });
    });
    Route::prefix('movie_comments')->group(function () {
        Route::get('/', [MovieCommentController::class, 'index'])->name('movie_comments.index');
        Route::get('edit/{id}', [MovieCommentController::class, 'edit'])->name('movie_comments.edit');
        Route::put('update/{id}', [MovieCommentController::class, 'update'])->name('movie_comments.update');
        Route::delete('delete/{id}', [MovieCommentController::class, 'destroy'])->name('movie_comments.destroy');
    });
});
