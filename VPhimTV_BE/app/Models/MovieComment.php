<?php

namespace App\Models;

use App\Models\Movie;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class MovieComment extends Model
{
    protected $fillable = [
        'user_id',
        'movie_id',
        'reply_to',
        'content',
    ];

    public function movie()
    {
        return $this->belongsTo(Movie::class, 'movie_id');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function replyTo()
    {
        return $this->belongsTo(MovieComment::class, 'reply_to');
    }
}
