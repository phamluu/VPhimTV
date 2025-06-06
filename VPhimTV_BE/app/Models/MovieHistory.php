<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MovieHistory extends Model
{
    protected $fillable = [
        'user_id',
        'movie_id',
        'episode_id',
        'progress_seconds',
        'duration_seconds',
        'status',
        'is_deleted',
    ];
}
