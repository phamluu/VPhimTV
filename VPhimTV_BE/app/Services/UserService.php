<?php

namespace App\Services;

use App\Models\Country;
use App\Models\User;
use App\Models\UserInfo;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Profiler\Profile;

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

    public function getProfile()
    {
        $auth = Auth::user();
        $user = UserInfo::where('user_id', $auth->id)->first();
        return $user;
    }

    public function update_profile(Request $request)
    {
        $getUser = $this->getUser();
        if (!$getUser) {
            return false;
        }
        $user = UserInfo::where('user_id', $getUser->id)->first();
        if (!$user) {
            $user = new UserInfo();
            $user->user_id = $getUser->id;
        }
        $user->phone       = $request->phone;
        $user->full_name   = $request->full_name;
        $user->address     = $request->address;
        $user->birth_date   = $request->birth_date;
        $user->country_id  = $request->country_id;

        return $user->save();
    }
}
