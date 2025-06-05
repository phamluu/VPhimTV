<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'original_name',
        'content',
        'type_id',
        'status',
        'trailer_url',
        'poster_url',
        'thumb_url',
        'time',
        'episode_current',
        'episode_total',
        'quality',
        'language',
        'year',
        'country_id',
        'actor',
        'director'
    ];

    public function country()
    {
        return $this->belongsTo(Country::class, 'country_id');
    }

    public function type()
    {
        return $this->belongsTo(MovieType::class, 'type_id');
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'movie_categories', 'movie_id', 'category_id');
    }

    public function episodes()
    {
        return $this->hasMany(Episode::class, 'movie_id');
    }

    public function movie_comments()
    {
        return $this->hasMany(MovieComment::class, 'movie_id');
    }
}
