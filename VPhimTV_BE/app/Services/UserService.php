<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserService
{
    public function getFullName($user)
    {
        return $user->first_name . ' ' . $user->last_name;
    }
    public function getUser()
    {
        $user = Auth::user();
        return $user;
    }
}
