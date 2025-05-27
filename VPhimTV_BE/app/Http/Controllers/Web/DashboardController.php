<?php

namespace App\Http\Controllers\Web;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        return view('dashboard', ['user' => $user]);
    }
}
