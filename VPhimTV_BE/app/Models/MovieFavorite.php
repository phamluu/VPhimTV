<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MovieFavorite extends Model
{
    use HasFactory;

    protected $table = 'movie_favorites'; // tên bảng

    // Cho phép gán hàng loạt các trường này
    protected $fillable = [
        'user_id',
        'movie_id',
        'status',
        'is_active',
        'is_deleted',
    ];

    // Quan hệ với Movie
    public function movie()
    {
        return $this->belongsTo(Movie::class, 'movie_id');
    }

    // Quan hệ với User (nếu có)
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}