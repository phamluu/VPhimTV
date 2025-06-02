<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Models\Movie;
use Illuminate\Support\Str;

class MovieService
{
    public function getMoive($id) {}
    public function updateMovie(Request $request, $id)
    {
        if ($id) {
            $model = Movie::findOrFail($id);
        } else {
            $model = new Movie();
        }
        $model->name = $request->name;
        $model->slug = Str::slug($request->name);
        $model->original_name = $request->original_name;
        $model->content = $request->content;
        $model->type_id = $request->type_id;
        $model->status = $request->status;
        $model->trailer_url = $request->trailer_url;
        $model->poster_url = $request->poster_url;
        $model->thumb_url = $request->thumb_url;
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
}
