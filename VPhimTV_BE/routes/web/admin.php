<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Web\DashboardController;
use App\Http\Controllers\Web\UserController;
use App\Http\Controllers\Web\MenuController;
use App\Http\Controllers\Web\CategoryController;
use App\Http\Controllers\Web\ProfileController;

// Route::middleware(['auth', 'can:view-post'])->group(function () {
//     Route::get('/dashboard', [DashboardController::class, 'index']);
// });
Route::get('/dashboard', [DashboardController::class, 'index']);
Route::prefix('admin')->group(function () {
    Route::get('/', [DashboardController::class, 'index']);
    // Route USER
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
        });
    });
    // Route MENU
    Route::prefix('menu')->group(function () {
        Route::get('/', [MenuController::class, 'index'])->name('menu.index');
        Route::get('create', [MenuController::class, 'create'])->name('menu.create');
        Route::post('store', [MenuController::class, 'store'])->name('menu.store');
        Route::get('edit/{id}', [MenuController::class, 'edit'])->name('menu.edit');
        Route::put('update/{id}', [MenuController::class, 'update'])->name('menu.update');
        Route::delete('delete/{id}', [MenuController::class, 'destroy'])->name('menu.destroy');
    });
    // Route CATEGORY
    Route::prefix('category')->group(function () {
        Route::get('/', [CategoryController::class, 'index'])->name('category.index');
        Route::get('create', [CategoryController::class, 'create'])->name('category.create');
        Route::post('store', [CategoryController::class, 'store'])->name('category.store');
        Route::get('edit/{id}', [CategoryController::class, 'edit'])->name('category.edit');
        Route::put('update/{id}', [CategoryController::class, 'update'])->name('category.update');
        Route::delete('delete/{id}', [CategoryController::class, 'destroy'])->name('category.destroy');
    });
});
