<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $categories = $this->getList($request);
        return view('category.index', compact('categories'));
    }

    public function getList(Request $request)
    {
        $sortField = $request->input('sort_field', 'updated_at');
        $sortType = $request->input('sort_type', 'desc');

        return Category::orderBy($sortField, $sortType)->get();
    }

    public function create()
    {
        return view('category.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        Category::create([
            'name' => $request->name,
            'slug' => \Str::slug($request->name),
        ]);

        return redirect()->route('category.index')->with('success', 'Thêm danh mục thành công.');
    }

    public function edit($id)
    {
        $category = Category::findOrFail($id);
        return view('category.edit', compact('category'));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $category = Category::findOrFail($id);
        $category->name = $request->name;
        $category->slug = \Str::slug($request->name);
        $category->save();

        return redirect()->route('category.index')->with('success', 'Cập nhật danh mục thành công.');
    }

    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();

        return redirect()->route('category.index')->with('success', 'Xóa danh mục thành công.');
    }
}