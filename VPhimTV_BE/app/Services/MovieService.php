<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Models\Movie;
use App\Models\Episode;
use Illuminate\Support\Str;
use App\Services\DropboxService;
use Illuminate\Support\Facades\Log;

class MovieService
{
    protected $dropbox;

    public function __construct(DropboxService $dropbox)
    {
        $this->dropbox = $dropbox;
    }

    public function getMovie($id) {}

    public function updateMovie(Request $request, $id)
    {
        if ($id) {
            $model = Movie::findOrFail($id);
        } else {
            $model = new Movie();
        }

        if ($request->hasFile('thumb_url')) {
            $file = $request->file('thumb_url');

            $filename = time() . '_' . $file->getClientOriginalName();
            $destinationPath = public_path('uploads/thumbs');

            if (!file_exists($destinationPath)) {
                mkdir($destinationPath, 0755, true);
            }
            $file->move($destinationPath, $filename);
            $model->thumb_url = 'uploads/thumbs/' . $filename;
        }

        $model->name = $request->name;
        $model->slug = Str::slug($request->name);
        $model->original_name = $request->original_name;
        $model->content = $request->content;
        $model->type_id = $request->type_id;
        $model->status = $request->status;
        $model->trailer_url = $request->trailer_url;
        $model->poster_url = $request->poster_url;
        $model->time = $request->time;
        $model->episode_current = $request->episode_current;
        $model->episode_total = $request->episode_total;
        $model->quality = $request->quality;
        $model->language = $request->language;
        $model->year = $request->year;
        $model->country_id = $request->country_id;
        $model->actor = $request->actor;
        $model->director = $request->director;

        if ($model->save()) {
            return $model;
        }
        return false;
    }

    public function updateEpisode(Request $request, $id)
    {
        if ($id) {
            $model = Episode::findOrFail($id);
        } else {
            $model = new Episode();
        }

        $model->movie_id = $request->movie_id;
        $model->server_name = $request->server_name;
        $model->episode_name = $request->episode_name;
        $model->file_name = $request->file_name;
        $model->link_embed = $request->link_embed;
        $model->link_m3u8 = $request->link_m3u8;
        $model->status = $request->status;

        if ($request->hasFile('mp4_upload')) {
            $file = $request->file('mp4_upload');

            if ($file) {
                $fileName = time() . '_' . $file->getClientOriginalName();
                $localPath = $file->getRealPath();

                try {
                    $res = $this->dropbox->upload("/video/" . $fileName, $localPath);

                    if (isset($res['error'])) {
                        return response()->json(['message' => 'Upload thất bại', 'error' => $res['error']], 500);
                    }

                    $sharedUrl = $this->dropbox->createSharedLink($res['path_lower']);
                    $streamUrl = $sharedUrl ? preg_replace('/(\?|&)dl=0/', '$1raw=1', $sharedUrl) : null;

                    $model->link_mp4 = $streamUrl;
                    $model->file_name = $fileName;
                } catch (\Exception $e) {
                    Log::error('Upload error: ' . $e->getMessage());
                }
            }
        }

        if ($model->save()) {
            return $model;
        }

        return false;
    }
}
