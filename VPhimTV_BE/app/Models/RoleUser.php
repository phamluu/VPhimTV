<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RoleUser extends Model
{
    protected $table = 'role_user';
    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'role_id',
        'user_id',
    ];

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
