<?php

namespace App\Http\Controllers;

class HomeController extends Controller
{
    public function index()
    {
        $data = [
            'message' => 'Welcome to the movie site!',
            'status' => 'success',
            'movies' => [
                ['id' => 1, 'title' => 'Inception'],
                ['id' => 2, 'title' => 'Interstellar'],
            ],
        ];

        return $data;
    }
}
