<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Web\UnauthorizedController;

Route::middleware(['web', 'auth'])->group(function () {
    Route::get('/unauthorized', [UnauthorizedController::class, 'index'])->name('unauthorized.index');
});
