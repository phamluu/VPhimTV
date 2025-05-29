<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Country;

class CountryController extends Controller
{
    public function getList(Request $request)
    {
        $validated = $request->validate([
            'sort_field' => 'sometimes|string|in:id,name,created_at,updated_at',
            'sort_type' => 'sometimes|string|in:asc,desc',
        ]);

        $sortField = $validated['sort_field'] ?? 'updated_at';
        $sortType = $validated['sort_type'] ?? 'desc';

        return Country::orderBy($sortField, $sortType)->get();
    }
}
