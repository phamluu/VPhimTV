<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CountryController;

Route::get('/country', [CountryController::class, 'getList'])->name('country.getList');
