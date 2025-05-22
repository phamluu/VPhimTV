<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Movie;
use App\Models\Episode;

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
        $movie = Movie::where('slug', $slug)->first();

        if (!$movie) {
            return response()->json(['error' => 'Movie not found'], 404);
        }

        $episodes = Episode::where('movie_id', $movie->id)->get();

        $groupedEpisodes = $episodes->groupBy('server_name');

        $result = $movie->toArray();
        $result['episodes'] = [];

        foreach ($groupedEpisodes as $serverName => $serverEpisodes) {
            $serverData = $serverEpisodes->map(function ($episode) {
                return [
                    'episode_name' => $episode->episode_name,
                    'slug' => $episode->slug,
                    'file_name' => $episode->file_name,
                    'link_embed' => $episode->link_embed,
                    'link_m3u8' => $episode->link_m3u8,
                    'status' => $episode->status,
                ];
            });

            $result['episodes'][] = [
                'server_name' => $serverName,
                'server_data' => $serverData,
            ];
        }

        return response()->json($result);
    }
}
