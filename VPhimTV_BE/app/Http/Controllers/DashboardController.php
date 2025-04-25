<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        return view('dashboard', ['user' => $user]);
        // return response()->json([
        //     'message' => 'Welcome to your dashboard!',
        //     'user'    => $user
        // ]);
    }
}
