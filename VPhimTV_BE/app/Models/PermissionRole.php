<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PermissionRole extends Model
{
    protected $table = 'permission_role';

    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'permission_id',
        'role_id',
    ];

    public function permission()
    {
        return $this->belongsTo(Permission::class);
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }
}
