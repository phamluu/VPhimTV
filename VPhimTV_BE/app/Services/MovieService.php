<?php

namespace App\Services;

use App\Models\MovieQueryParams;
use Illuminate\Support\Facades\Http;

class MovieService
{
    public function getList(?MovieQueryParams $query = null)
    {
        // $url = env('MOVIE_API_URL') . '/danh-sach/phim-moi-cap-nhat-v2?page=1';
        // $response = Http::get($url);
        // $data = $response->json();

        $data = [
            'status' => 200,
            'message' => 'Success',
            'data' => [
                'movies' => [
                    [
                        'id' => 1,
                        'title' => 'Movie 1',
                        'description' => 'Description of Movie 1',
                        'release_date' => '2023-01-01',
                    ],
                    [
                        'id' => 2,
                        'title' => 'Movie 2',
                        'description' => 'Description of Movie 2',
                        'release_date' => '2023-02-01',
                    ],
                ],
            ],
        ];

        return $data;
    }
}
