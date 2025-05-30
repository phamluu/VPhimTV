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
}
