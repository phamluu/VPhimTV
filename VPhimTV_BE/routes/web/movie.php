<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MovieController;

Route::get('/movies', [MovieController::class, 'getList'])->name('movie.getList');
Route::get('/movies/{slug}', [MovieController::class, 'getDetail'])->name('movie.getDetail');
