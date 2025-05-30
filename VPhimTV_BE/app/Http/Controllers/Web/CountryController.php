<?php

namespace App\Http\Controllers\Web;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Country;
use App\Http\Controllers\Controller;

class CountryController extends Controller
{
    public function index(Request $request)
    {
        $model = Country::query()->orderBy('created_at', 'desc')->get();
        return view('Country.index', compact('model'));
    }

    public function create()
    {
        return view('Country.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        Country::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
        ]);

        return redirect()->route('country.index')->with('success', 'Thêm quốc gia thành công.');
    }

    public function edit($id)
    {
        $model = Country::findOrFail($id);
        return view('Country.edit', compact('model'));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $model = Country::findOrFail($id);
        $model->name = $request->name;
        $model->slug = Str::slug($request->name);
        $model->save();

        return redirect()->route('country.index')->with('success', 'Cập nhật quốc gia thành công.');
    }

    public function destroy($id)
    {
        $model = Country::findOrFail($id);
        $model->delete();

        return redirect()->route('country.index')->with('success', 'Xóa quốc gia thành công.');
    }
}
