<?php

namespace App\Http\Controllers\Web;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Movie;
use App\Http\Controllers\Controller;
use App\Models\Country;
use App\Models\Episode;
use App\Models\MovieType;
use App\Services\MovieService;

class MovieController extends Controller
{
    protected $service;

    public function __construct()
    {
        $this->service = new MovieService();
    }

    public function index(Request $request)
    {
        $model = Movie::query()->orderBy('created_at', 'desc')->get();
        return view('movie.index', compact('model'));
    }

    public function create()
    {
        $model = new \App\Models\Movie();
        $movie_type = MovieType::all();
        $countries = Country::all();
        return view('movie.create', compact('model', 'countries', 'movie_type'));
    }

    public function store(Request $request)
    {

        $request->validate([
            'name' => 'required|string|max:255',
            'thumb_url' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $movie = $this->service->updateMovie($request, null);

        if ($movie) {
            return redirect()->route('movie.edit', ['id' => $movie->id])->with('success', 'Thêm phim thành công.');
        } else {
            return redirect()->back()->with('error', 'Thêm phim thất bại')->withInput();
        }
    }

    public function edit($id)
    {
        $model = Movie::findOrFail($id);
        $movie_type = MovieType::all();
        $countries = Country::all();
        return view('movie.edit', compact('model', 'countries', 'movie_type'));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'thumb_url' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $rs = $this->service->updateMovie($request, $id);
        if ($rs) {
            return redirect()->back()->with('success', 'Cập nhật phim thành công');
        }
    }

    public function detail($id)
    {
        $model = Movie::findOrFail($id);

        $movie_type = MovieType::find($model->type_id);
        if (!$movie_type) {
            $movie_type = new MovieType();
        }
        $country = Country::find($model->country_id);
        if (!$country) {
            $country = new Country();
        }
        $episodes = Episode::where('movie_id', $id)->get();
        return view('movie.detail', compact('model', 'country', 'movie_type', 'episodes'));
    }
    public function destroy($id)
    {
        $model = Movie::findOrFail($id);
        $model->delete();

        return redirect()->route('movie.index')->with('success', 'Xóa phim thành công.');
    }
}
