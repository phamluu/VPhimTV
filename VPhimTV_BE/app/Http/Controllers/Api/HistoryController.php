<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\BaseRequest;
use Illuminate\Http\Request;
use App\Models\Movie;
use App\Models\MovieHistory;
use Illuminate\Support\Facades\Auth;


class HistoryController extends Controller
{
    public function getList(BaseRequest $request)
    {
        $pagination = $request->paginationParams();
        $sorting = $request->sortingParams();

        $user = Auth::user();

        $movies = Movie::query()
            ->join('movie_histories', 'movies.id', '=', 'movie_histories.movie_id')
            ->join('episodes', 'movie_histories.episode_id', '=', 'episodes.id')
            ->select(
                'movie_histories.*',
                'movies.name as movie_name',
                'movies.slug',
                'movies.poster_url',
                'episodes.episode_name',
                'episodes.slug as episode_slug',
                'episodes.id as episode_id',
            )
            ->where('movie_histories.user_id', $user->id)
            ->orderBy($sorting['sort_field'], $sorting['sort_type'])
            ->paginate($pagination['limit'], ['*'], 'page', $pagination['page']);

        return response()->json($movies);
    }

    public function create(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'movie_id' => 'required|exists:movies,id',
            'episode_id' => 'required|exists:episodes,id',
            'progress_seconds' => 'nullable|integer|min:0',
            'duration_seconds' => 'required|integer|min:0',
        ]);

        $history = MovieHistory::updateOrCreate(
            [
                'user_id' => $user->id,
                'movie_id' => $request->movie_id,
                'episode_id' => $request->episode_id,
            ],
            [
                'progress_seconds' => $request->progress_seconds ?? 0,
                'duration_seconds' => $request->duration_seconds ?? 0,
            ]
        );

        return response()->json($history, 201);
    }

    public function delete(Request $request)
    {
        $user = Auth::user();

        $episodeId = $request->input('episode_id');

        if ($episodeId) {
            $history = MovieHistory::where('user_id', $user->id)
                ->where('episode_id', $episodeId)
                ->first();

            if ($history) {
                $history->delete();
                return response()->json(['message' => 'History deleted successfully.'], 200);
            } else {
                return response()->json(['message' => 'History not found.'], 404);
            }
        } else {
            MovieHistory::where('user_id', $user->id)->delete();
            return response()->json(['message' => 'All history deleted successfully.'], 200);
        }
    }
}
