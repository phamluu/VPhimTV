<?php

namespace App\Http\Controllers\Web;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use App\Services\UserService;

class ProfileController extends Controller
{
    protected $service;
    public function __construct()
    {
        $this->service = new UserService();
    }
    public function show()
    {
        $user = $this->service->getUser();
        return view('profile.show', compact('user'));
    }
    public function edit()
    {
        $user = $this->service->getUser();
        return view('profile.edit', compact('user'));
    }
}
