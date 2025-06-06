<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Episode extends Model
{
    protected $fillable = [
        'episode_name',
        'movie_id',
        'slug',
        'file_name',
        'server_name'
    ];
}
