<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MovieFavorite;

class MovieFavoriteSeeder extends Seeder
{
    public function run()
    {
        MovieFavorite::create([
            'user_id' => 1,
            'movie_id' => 2,
            'status' => 'liked',
            'is_active' => true,
            'is_deleted' => false,
        ]);

        // Thêm nhiều dòng nếu cần
        MovieFavorite::create([
            'user_id' => 2,
            'movie_id' => 1,
            'status' => 'liked',
            'is_active' => true,
            'is_deleted' => false,
        ]);
    }
}
