<div class="form-group">
    <label for="name">Tập</label>
    <input type="text" name="episode_name" class="form-control" value="{{ old('episode_name', $model->episode_name) }}">
</div>
<div class="form-group">
    <label for="type_id">Thuộc phim</label>
    <select name="movie_id" class="form-control" value="{{ old('movie_id', $model->movie_id) }}">
        @foreach($movies as $item)
        <option value="{{$item -> id}}" {{ old('movie_id', $model->movie_id) == $item->id ? 'selected' : '' }}>{{$item->name}}</option>
        @endforeach
    </select>
</div>
<div class="form-group">
    <label for="name">Server name</label>
    <input type="text" name="server_name" class="form-control" value="{{ old('server_name', $model->server_name) }}">
</div>
<div class="form-group">
    <label for="name">File name</label>
    <input type="text" name="file_name" class="form-control" value="{{ old('file_name', $model->file_name) }}">
</div>
<div class="form-group">
    <label for="name">Link embed</label>
    <input type="text" name="link_embed" class="form-control" value="{{ old('link_embed', $model->link_embed) }}">
</div>
<div class="form-group">
    <label for="name">Link m3u8</label>
    <input type="text" name="link_m3u8" class="form-control" value="{{ old('link_m3u8', $model->link_m3u8) }}">
</div>
<div class="input-group">
    <label class="input-group-text" for="mp4_upload">File Video Mp4</label>
    <input id="mp4_upload" name="mp4_upload" type="file" class="form-control" accept="video/mp4">
</div>
<div class="form-group">
    <label for="name">status</label>
    <input type="text" name="status" class="form-control" value="{{ old('status', $model->status) }}">
</div>
