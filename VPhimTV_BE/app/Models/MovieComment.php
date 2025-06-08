<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Movie;

class MovieComment extends Model
{
    protected $table = 'movie_comments';
    protected $fillable = ['movie_id', 'user_id', 'content'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function movie()
    {
        return $this->belongsTo(Movie::class);
    }
}