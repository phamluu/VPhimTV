<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CommentRequest;
use App\Models\MovieComment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function getList(Request $request)
    {
        try {
            $movieId = $request->query('movie_id');
            $comments = MovieComment::with('user:id,name')
                ->where('movie_id', $movieId)
                ->where('is_active', true)
                ->where('is_deleted', false)
                ->paginate(10);

            return response()->json([
                'status' => true,
                'data' => $comments,
                'message' => 'Danh sách bình luận',
            ]);
        } catch (\Exception $e) {
            \Log::error('Lỗi getList: ' . $e->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Không thể tải bình luận',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
public function create(Request $request)
{
    try {
        $data = $request->validate([
            'movie_id' => 'required|exists:movies,id',
            'content' => 'required|string',
        ]);

        $comment = MovieComment::create([
            'user_id' => auth()->id(), // Lấy user_id từ token
            'movie_id' => $data['movie_id'],
            'content' => $data['content'],
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Tạo bình luận thành công',
            'data' => $comment,
        ]);
    } catch (\Exception $e) {
        \Log::error('Lỗi create comment: ' . $e->getMessage());
        return response()->json([
            'status' => false,
            'message' => 'Không thể tạo bình luận',
            'error' => $e->getMessage(),
        ], 500);
    }
}

public function like(Request $request, $commentId)
{
    try {
        $comment = MovieComment::findOrFail($commentId);
        $comment->likes = ($comment->likes ?? 0) + 1;
        $comment->save();

        return response()->json([
            'status' => true,
            'message' => 'Thích bình luận thành công',
            'data' => $comment,
        ]);
    } catch (\Exception $e) {
        \Log::error('Lỗi like comment: ' . $e->getMessage());
        return response()->json([
            'status' => false,
            'message' => 'Không thể thích bình luận',
            'error' => $e->getMessage(),
        ], 500);
    }
}


    public function update(Request $request, $id)
    {
        $user = Auth::user();

        $data = $request->validate([
            'content' => 'required|string|max:1000',
            'reply_to' => 'nullable|exists:movie_comments,id',
        ]);

        $comment = MovieComment::where('id', $id)->where('user_id', $user->id)->firstOrFail();
        $comment->content = $data['content'];
        if (isset($data['reply_to'])) {
            $comment->reply_to = $data['reply_to'];
        }
        $comment->save();

        return response()->json($comment);
    }

    public function delete(Request $request, $id) {
        $user = Auth::user();

        $comment = MovieComment::where('id', $id)->where('user_id', $user->id)->firstOrFail();
        $comment->delete();

        return response()->json(['message' => 'Comment deleted successfully']);
    }
}