<?php

namespace App\Http\Controllers\Web;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Movie;
use App\Http\Controllers\Controller;

class MovieController extends Controller
{
    public function index(Request $request)
    {
        $model = Movie::query()->orderBy('created_at', 'desc')->get();
        return view('movie.index', compact('model'));
    }

    public function create()
    {
        return view('movie.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        Movie::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
        ]);

        return redirect()->route('movie.index')->with('success', 'Thêm phim thành công.');
    }

    public function edit($id)
    {
        $model = Movie::findOrFail($id);
        return view('movie.edit', compact('model'));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $model = Movie::findOrFail($id);
        $model->name = $request->name;
        $model->slug = Str::slug($request->name);
        $model->save();

        return redirect()->route('movie.index')->with('success', 'Cập nhật phim thành công.');
    }

    public function destroy($id)
    {
        $model = Movie::findOrFail($id);
        $model->delete();

        return redirect()->route('movie.index')->with('success', 'Xóa phim thành công.');
    }
}
