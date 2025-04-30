<?php

namespace App\Services;

use App\Models\MovieQueryParams;
use Illuminate\Support\Facades\Http;

class MovieService
{
    public function getList(?MovieQueryParams $query = null)
    {
        $url = env('MOVIE_API_URL') . '/danh-sach/phim-moi-cap-nhat-v2?page=1';
        $response = Http::get($url);
        $data = $response->json();

        return $data;
    }
}
