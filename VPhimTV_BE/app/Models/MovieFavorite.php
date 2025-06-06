<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MovieFavorite extends Model
{
    protected $fillable = [
        'user_id',
        'movie_id',
        'is_active',
        'is_deleted',
    ];
}
