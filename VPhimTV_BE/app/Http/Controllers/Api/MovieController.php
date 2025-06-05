<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\BaseRequest;
use App\Models\Movie;
use App\Http\Requests\MovieRequest;

class MovieController extends Controller
{
    public function getList(MovieRequest $request)
    {
        $pagination = $request->paginationParams();
        $sorting = $request->sortingParams();
        $filters = $request->filtersParams();

        $limit = $pagination['limit'];
        $page = $pagination['page'];
        $sortField = $sorting['sort_field'];
        $sortType = $sorting['sort_type'];
        $typeList = $filters['type_list'];
        $sortLang = $filters['sort_lang'];
        $category = $filters['category'];
        $country = $filters['country'];
        $year = $filters['year'];
        $keyword = $filters['keyword'];

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
        return response()->json($movies->paginate($limit, ['*'], 'page', $page));
    }

    public function getDetail($slug)
    {
        $movie = Movie::with([
            'country:id,name,slug',
            'type:id,name,slug',
            'categories:id,name,slug',
            'episodes:id,movie_id,server_name,episode_name,slug,file_name,link_embed,link_m3u8,link_mp4,status'
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
                        'link_mp4' => $ep->link_mp4,
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

    public function getListHot(BaseRequest $request)
    {
        $pagination = $request->paginationParams();

        $movies = Movie::query()
            ->select(
                'movies.name',
                'movies.slug',
                'movies.original_name',
                'movies.poster_url',
                'movies.thumb_url',
                'movies.episode_current',
                'movies.language',
                'movies.created_at',
                'movies.updated_at'
            )
            ->inRandomOrder()
            ->paginate($pagination['limit'], ['*'], 'page', $pagination['page']);

        return response()->json($movies);
    }
}
