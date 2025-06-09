<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MovieComment extends Model
{
    protected $fillable = [
        'user_id',
        'movie_id',
        'reply_to',
        'content',
    ];
}
