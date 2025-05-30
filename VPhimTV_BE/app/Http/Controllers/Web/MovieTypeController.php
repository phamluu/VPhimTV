<?php

namespace App\Http\Controllers\Web;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\MovieType;
use App\Http\Controllers\Controller;

class MovieTypeController extends Controller
{
    public function index(Request $request)
    {
        $model = MovieType::query()->get();
        return view('MovieType.index', compact('model'));
    }

    public function create()
    {
        return view('MovieType.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        MovieType::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
        ]);

        return redirect()->route('movietype.index')->with('success', 'Thêm thể loại thành công.');
    }

    public function edit($id)
    {
        $model = MovieType::findOrFail($id);
        return view('MovieType.edit', compact('model'));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $model = MovieType::findOrFail($id);
        $model->name = $request->name;
        $model->slug = Str::slug($request->name);
        $model->save();

        return redirect()->route('movietype.index')->with('success', 'Cập nhật thể loại thành công.');
    }

    public function destroy($id)
    {
        $model = MovieType::findOrFail($id);
        $model->delete();

        return redirect()->route('movietype.index')->with('success', 'Xóa thể loại thành công.');
    }
}
