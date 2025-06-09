<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CommentRequest;
use App\Models\MovieComment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CommentController extends Controller
{
    public function getList(CommentRequest $request)
    {
        $pagination = $request->paginationParams();
        $sorting = $request->sortingParams();

        $movieId = $request->input('movie_id');
        $replyTo = $request->input('reply_to');

        $comments = MovieComment::query()
            ->join('user_info', 'movie_comments.user_id', '=', 'user_info.user_id')
            ->leftJoin(DB::raw('(select reply_to, count(*) as reply_count from movie_comments where is_deleted = false group by reply_to) as replies'), 'movie_comments.id', '=', 'replies.reply_to')
            ->select(
                'movie_comments.*',
                'user_info.full_name',
                'user_info.avatar',
                DB::raw('coalesce(replies.reply_count, 0) as reply_count')
            )
            ->where('movie_comments.movie_id', $movieId)
            ->where('movie_comments.is_deleted', false);
        if ($replyTo) {
            $comments->where('movie_comments.reply_to', $replyTo);
        } else {
            $comments->whereNull('movie_comments.reply_to');
        }

        $comments = $comments->orderBy($sorting['sort_field'], $sorting['sort_type'])
            ->paginate($pagination['limit'], ['*'], 'page', $pagination['page']);

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
            'reply_to' => $data['reply_to'] ?? null,
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

    public function delete(Request $request, $id)
    {
        $user = Auth::user();

        $comment = MovieComment::where('id', $id)->where('user_id', $user->id)->firstOrFail();
        $comment->delete();

        return response()->json(['message' => 'Comment deleted successfully']);
    }
}
