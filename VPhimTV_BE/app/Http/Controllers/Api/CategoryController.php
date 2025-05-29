<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Http\Controllers\Controller;

class CategoryController extends Controller
{
    public function getList(Request $request)
    {
        $validated = $request->validate([
            'sort_field' => 'sometimes|string|in:id,name,created_at,updated_at',
            'sort_type' => 'sometimes|string|in:asc,desc',
        ]);

        $sortField = $validated['sort_field'] ?? 'updated_at';
        $sortType = $validated['sort_type'] ?? 'desc';

        return Category::orderBy($sortField, $sortType)->get();
    }
}
