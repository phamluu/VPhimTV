<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CommentRequest;
use App\Models\MovieComment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function getList(CommentRequest $request)
    {
        $pagination = $request->paginationParams();
        $sorting = $request->sortingParams();
        $filters = $request->filtersParams();

        $comments = MovieComment::query()
            ->where('movie_id', $filters['movie_id'])
            ->with(['user' => function ($query) {
                $query->select('id', 'name', 'avatar');
            }]);


        $comments = $comments->paginate($pagination['limit'], ['*'], 'page', $pagination['page'])
            ->sortBy($sorting['sort_field'], $sorting['sort_type']);

        return response()->json($comments);
    }

    public function create(Request $request)
    {
        $user = Auth::user();

        $data = $request->validate([
            'movie_id' => 'required|exists:movies,id',
            'reply_to' => 'nullable|exists:movie_comments,id',
            'content' => 'required|string|max:1000',
        ]);

        $comment = MovieComment::create([
            'user_id' => $user->id,
            'movie_id' => $data['movie_id'],
            'reply_to' => $data['reply_to'],
            'content' => $data['content'],
        ]);

        return response()->json($comment, 201);
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
