<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Country;
use Illuminate\Http\Request;
use App\Models\Movie;
use App\Models\Episode;
use App\Models\MovieCategory;
use App\Models\MovieType;

class MovieController extends Controller
{
    public function getList(Request $request)
    {
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
            ->join('countries', 'movies.country_id', '=', 'countries.id');

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

    public function getDetail($slug)
    {
        $movie = Movie::with([
            'country:id,name,slug',
            'type:id,name,slug',
            'categories:id,name,slug',
            'episodes:id,movie_id,server_name,episode_name,slug,file_name,link_embed,link_m3u8,status'
        ])
            ->select('id', 'name', 'slug', 'content', 'type_id', 'country_id', 'thumb_url', 'poster_url', 'time', 'episode_current', 'episode_total', 'quality', 'language', 'year', 'actor', 'director')
            ->where('slug', $slug)
            ->first();

        if (!$movie) {
            return response()->json(['error' => 'Movie not found'], 404);
        }

        $groupedEpisodes = $movie->episodes->groupBy('server_name')->map(function ($episodes, $serverName) {
            return [
                'server_name' => $serverName,
                'server_data' => $episodes->map(function ($ep) {
                    return [
                        'id' => $ep->id,
                        'episode_name' => $ep->episode_name,
                        'slug' => $ep->slug,
                        'file_name' => $ep->file_name,
                        'link_embed' => $ep->link_embed,
                        'link_m3u8' => $ep->link_m3u8,
                        'status' => $ep->status,
                    ];
                })->values()
            ];
        })->values();

        return response()->json([
            'id' => $movie->id,
            'name' => $movie->name,
            'slug' => $movie->slug,
            'content' => $movie->content,
            'thumb_url' => $movie->thumb_url,
            'poster_url' => $movie->poster_url,
            'time' => $movie->time,
            'episode_current' => $movie->episode_current,
            'episode_total' => $movie->episode_total,
            'quality' => $movie->quality,
            'language' => $movie->language,
            'year' => $movie->year,
            'actor' => $movie->actor,
            'director' => $movie->director,
            'type' => $movie->type,
            'country' => $movie->country,
            'category' => $movie->categories,
            'episodes' => $groupedEpisodes
        ]);
    }
}
