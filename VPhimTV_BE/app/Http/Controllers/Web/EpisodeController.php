<?php

namespace App\Http\Controllers\Web;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Episode;
use App\Http\Controllers\Controller;
use App\Models\Movie;
use App\Services\DropboxService;
use App\Services\MovieService;

class EpisodeController extends Controller
{
    protected $service;
    protected $dropbox;

    public function __construct()
    {
        $this->dropbox = new DropboxService();
        $this->service = new MovieService($this->dropbox);
    }

    public function index(Request $request)
    {
        $model = Episode::query()->orderBy('created_at', 'desc')->get();
        return view('episode.index', compact('model'));
    }

    public function create()
    {
        $model = new Episode();
        $movies = Movie::all();
        return view('episode.create', compact('model', 'movies'));
    }

    public function store(Request $request)
    {
        $movie = $this->service->updateEpisode($request, null);

        if ($movie) {
            return response()->json([
                'status' => true,
                'message' => 'Thêm thành công'
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Thêm thất bại'
            ]);
        }
    }

    public function edit($id)
    {
        $model = Episode::findOrFail($id);
        $movies = Movie::all();
        return view('episode.edit', compact('model', 'movies'));
    }

    public function update(Request $request, $id)
    {

        $rs = $this->service->updateEpisode($request, $id);
        if ($rs) {
            return redirect()->back()->with('success', 'Cập nhật tập phim thành công');
        }
    }

    public function destroy($id)
    {
        $category = Episode::findOrFail($id);
        $category->delete();

        return redirect()->route('episode.index')->with('success', 'Xóa danh mục thành công.');
    }
}
