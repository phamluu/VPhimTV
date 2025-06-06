<div class="form-group">
    <label for="name">Tập</label>
    <input type="text" name="episode_name" class="form-control" value="{{ old('episode_name', $model->episode_name) }}">
</div>

<div class="form-group">
    <label for="name">Server name</label>
    <input type="text" name="server_name" class="form-control" value="{{ old('server_name', $model->server_name) }}">
</div>
<div class="form-group">
    <label for="name">File name</label>
    <input type="text" name="file_name" class="form-control" value="{{ old('file_name', $model->file_name) }}">
</div>
<div class="input-group">
    <label class="input-group-text" for="mp4_upload">File Video Mp4</label>
    <input id="mp4_upload" name="mp4_upload" type="file" class="form-control" accept="video/mp4">
</div>