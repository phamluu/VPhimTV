<?php

namespace App\Http\Controllers\Web;

use Illuminate\Http\Request;
use App\Models\Menu;
use App\Http\Controllers\Controller;

class MenuController extends Controller
{
    public function index()
    {
        $menus = Menu::all();
        return view('menu.index', compact('menus'));
    }

    public function create()
    {
        return view('menu.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        Menu::create([
            'name' => $request->name,
        ]);

        return redirect()->route('menu.index')->with('success', 'Thêm menu thành công.');
    }

    public function edit($id)
    {
        $menu = Menu::findOrFail($id);
        return view('menu.edit', compact('menu'));
    }

    public function update(Request $request, $id)
    {
        $menu = Menu::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $menu->name = $request->name;
        $menu->save();

        return redirect()->route('menu.index')->with('success', 'Cập nhật menu thành công.');
    }

    public function destroy($id)
    {
        $menu = Menu::findOrFail($id);
        $menu->delete();

        return redirect()->route('menu.index')->with('success', 'Xoá menu thành công.');
    }
}
