<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UnauthorizedController extends Controller
{
    public function index()
    {
        return view('unauthorized.index');
    }
}
