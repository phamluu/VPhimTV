<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class UserInfo extends Model
{
    use HasFactory;
    protected $table = 'user_info';
    protected $fillable = [
        'phone',
        'full_name',
        'address',
        'birth_date',
        'avatar',
        'user_id',
        'country_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
