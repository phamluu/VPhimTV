<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    public function getList(Request $request) {
        $sortField = $request->input('sort_field', 'updated_at');
        $sortType = $request->input('sort_type', 'desc');

        $categories = Category::query();
        $categories->orderBy($sortField, $sortType);
        return $categories->get();
    }
}
