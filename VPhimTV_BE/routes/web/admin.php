<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;



Route::middleware(['auth', 'can:view-post'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index']);
});
