<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Movie;
use App\Models\MovieFavorite;

class FavoriteController extends Controller
{
    public function checkExist(Request $request)
    {
        $user = Auth::user();
        $movieId = $request->input('movie_id');

        $favorite = MovieFavorite::where('user_id', $user->id)
            ->where('movie_id', $movieId)
            ->where('is_active', 1)
            ->where('is_deleted', 0)
            ->exists();

        return response()->json([
            'data' => $favorite,
            'message' => $favorite ? 'Phim đã có trong danh sách yêu thích' : 'Phim không có trong danh sách yêu thích'
        ]);
    }

    public function getList(Request $request)
    {
        $user = Auth::user();

        $limit = $request->input('limit', 50);
        $page = $request->input('page', 1);
        $sortField = $request->input('sort_field', 'updated_at');
        $sortType = $request->input('sort_type', 'desc');
        $typeList = $request->input('type_list');
        $sortLang = $request->input('sort_lang');
        $category = $request->input('category');
        $country = $request->input('country');
        $year = $request->input('year');
        $keyword = $request->input('keyword');

        $movies = Movie::query();

        $movies->join('movie_categories', 'movies.id', '=', 'movie_categories.movie_id')
            ->join('categories', 'movie_categories.category_id', '=', 'categories.id')
            ->join('movie_types', 'movies.type_id', '=', 'movie_types.id')
            ->join('countries', 'movies.country_id', '=', 'countries.id')
            ->join('movie_favorites', 'movies.id', '=', 'movie_favorites.movie_id');

        $movies->where('movie_favorites.user_id', $user->id);
        $movies->where('movie_favorites.is_active', 1);
        $movies->where('movie_favorites.is_deleted', 0);
        $movies->where('movies.is_active', 1);
        $movies->where('movies.is_deleted', 0);

        if (!empty($typeList)) {
            $movies->where('movie_types.slug',  $typeList);
        }
        if (!empty($sortLang)) {
            $movies->where('language', $sortLang);
        }
        if (!empty($category)) {
            $movies->where('categories.slug', $category);
        }
        if (!empty($country)) {
            $movies->where('countries.slug', $country);
        }
        if (!empty($year)) {
            $movies->where('year', $year);
        }
        if (!empty($keyword)) {
            $movies->where(function ($query) use ($keyword) {
                $query->where('movies.name', 'like', '%' . $keyword . '%')
                    ->orWhere('movies.original_name', 'like', '%' . $keyword . '%');
            });
        }
        $sortType = strtolower($sortType) === 'asc' ? 'asc' : 'desc';
        $movies->orderBy('movies.' . $sortField, $sortType);

        $selectFiles = [
            'movies.name',
            'movies.slug',
            'movies.original_name',
            'movies.poster_url',
            'movies.thumb_url',
            'movies.episode_current',
            'movies.language',
            'movies.created_at',
            'movies.updated_at'
        ];
        $movies->select($selectFiles);
        $movies->groupBy($selectFiles);

        return $movies->paginate($limit, ['*'], 'page', $page);
    }

    public function create(Request $request)
    {
        $user = Auth::user();

        $movieId = $request->input('movie_id');

        if (empty($movieId)) {
            return response()->json(['message' => 'Thiếu thông tin movie_id'], 400);
        }

        $movie = Movie::find($movieId);

        if (!$movie) return response()->json(['message' => 'Phim không tồn tại'], 404);

        $favorite = MovieFavorite::where('user_id', $user->id)
            ->where('movie_id', $movieId)
            ->where('is_active', 1)
            ->where('is_deleted', 0)
            ->first();

        if (!$favorite) {
            $favorite = MovieFavorite::create([
                'user_id' => $user->id,
                'movie_id' => $movieId,
            ]);
        }

        return response()->json([
            'message' => 'Thêm phim vào danh sách yêu thích thành công',
            'data' => $favorite
        ]);
    }

    public function delete(Request $request)
    {
        $user = Auth::user();
        $movieId = $request->input('movie_id');

        if (empty($movieId)) {
            return response()->json(['message' => 'Thiếu thông tin movie_id'], 400);
        }

        $favorite = MovieFavorite::where('user_id', $user->id)
            ->where('movie_id', $movieId)
            ->first();

        if (!$favorite) {
            return response()->json(['message' => 'Phim không có trong danh sách yêu thích'], 404);
        }

        $favorite->update(['is_active' => 0, 'is_deleted' => 1]);

        return response()->json(['message' => 'Xóa phim khỏi danh sách yêu thích thành công']);
    }
}
