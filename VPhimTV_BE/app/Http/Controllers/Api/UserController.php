<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MovieFavorite;
use App\Models\MovieHistory;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\UserInfo;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function getDetail($id)
    {
        $userId = $id;

        if (!$userId) {
            return response()->json([
                'success' => false,
                'message' => 'Thiếu tham số id',
            ], 400);
        }

        $user = User::query()
            ->leftJoin('user_info', 'users.id', '=', 'user_info.user_id')
            ->select([
                'users.id',
                'users.email',
                'users.name',
                'user_info.avatar',
                'user_info.full_name',
                'users.created_at',
            ])
            ->where('users.id', $userId)
            ->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Người dùng không tồn tại',
            ], 404);
        }

        $watchedStats = MovieHistory::query()
            ->where('user_id', $userId)
            ->where('progress_seconds', '>', 0)
            ->selectRaw('COUNT(*) as watched_count, SUM(progress_seconds) as watched_seconds')
            ->first();

        $topCategories = MovieHistory::query()
            ->join('movie_categories', 'movie_histories.movie_id', '=', 'movie_categories.movie_id')
            ->join('categories', 'movie_categories.category_id', '=', 'categories.id')
            ->select('categories.id', 'categories.name', DB::raw('COUNT(*) as total_views'))
            ->where('movie_histories.user_id', $userId)
            ->where('movie_histories.is_deleted', false)
            ->groupBy('categories.id', 'categories.name')
            ->orderByDesc('total_views')
            ->limit(5)
            ->get();

        $recentHistories = MovieHistory::query()
            ->join('movies', 'movie_histories.movie_id', '=', 'movies.id')
            ->where('movie_histories.user_id', $userId)
            ->where('movie_histories.is_deleted', false)
            ->orderByDesc('movie_histories.updated_at')
            ->limit(3)
            ->select('movie_histories.id', 'movie_histories.updated_at', 'movie_histories.duration_seconds', 'movie_histories.progress_seconds', 'movies.name', 'movies.slug')
            ->get()
            ->map(function ($item) {
                $status = ($item->duration_seconds > 0 && $item->progress_seconds / $item->duration_seconds >= 0.9)
                    ? 'completed'
                    : 'watching';

                return [
                    'id' => $item->id,
                    'name' => $item->name,
                    'slug' => $item->slug,
                    'updated_at' => $item->updated_at,
                    'status' => $status,
                ];
            });

        $recentFavorites = MovieFavorite::query()
            ->join('movies', 'movie_favorites.movie_id', '=', 'movies.id')
            ->where('movie_favorites.user_id', $userId)
            ->where('movie_favorites.is_deleted', false)
            ->orderByDesc('movie_favorites.updated_at')
            ->limit(3)
            ->select('movie_favorites.id', 'movie_favorites.updated_at', 'movies.name', 'movies.slug')
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'name' => $item->name,
                    'slug' => $item->slug,
                    'updated_at' => $item->updated_at,
                ];
            });


        $user->watched_count = $watchedStats->watched_count ?? 0;
        $user->watched_seconds = $watchedStats->watched_seconds ?? 0;
        $user->recent = [
            'histories' => $recentHistories,
            'favorites' => $recentFavorites,
        ];
        $user->top_categories = $topCategories;

        return response()->json([
            'success' => true,
            'data' => $user,
        ], 200);
    }

    public function update(Request $request, $id)
    {
        if (!User::where('id', $id)->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'Người dùng không tồn tại',
            ], 404);
        }

        $validate = $request->validate([
            'full_name' => 'required|string|max:255',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $userInfo = UserInfo::updateOrCreate(
            ['user_id' => $id],
            [
                'full_name' => $validate['full_name'],
                'avatar' => $request->file('avatar') ? $request->file('avatar')->store('avatars', 'public') : null,
            ]
        );

        return response()->json([
            'message' => 'Cập nhật thông tin người dùng thành công',
            'data' => $userInfo,
        ], 200);
    }
}
