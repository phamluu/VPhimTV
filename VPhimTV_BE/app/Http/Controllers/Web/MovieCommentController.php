<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\MovieComment;
use Illuminate\Http\Request;

class MovieCommentController extends Controller
{
    public function index()
    {
        $model = MovieComment::with('movie')->with('user')->get();
        return view('movie_comments.index', compact('model'));
    }

    public function edit($id)
    {
        $model = MovieComment::findOrFail($id);
        return view('movie_comments.edit', compact('model'));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'content' => 'required|string',
        ]);

        $model = MovieComment::findOrFail($id);
        $model->content = $request->input('content');
        $model->save();

        return redirect()->route('movie_comments.index')->with('success', 'Cập nhật bình luận thành công.');
    }

    public function destroy($id)
    {
        $model = MovieComment::findOrFail($id);
        $model->delete();

        return redirect()->route('movie_comments.index')->with('success', 'Xóa bình luận thành công.');
    }
}
