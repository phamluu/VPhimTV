@extends('layouts.admin')

@section('content')
<div class="panel-header panel-header-sm"></div>
<div class="content">
    <div class="card">
        <div class="card-header">
            <h5 class="title">Thông tin phim</h5>
        </div>
    </div>
    <div class="row">
        <div class="col-md-8">
            <div class="card">
                <div class="card-body">
                    @if ($errors->any())
                    <div class="alert alert-danger">
                        <ul>
                            @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                    @endif

                    @if (session('success'))
                    <div class="alert alert-success mt-2">
                        {{ session('success') }}
                    </div>
                    @endif

                    <div class="form-group">
                        <label for="name">Tên phim</label>
                        <span>{{ old('name', $model->name) }}</span>
                    </div>
                    <div class="form-group">
                        <label for="original_name">Tên gốc</label>
                        <span>{{ old('original_name', $model->original_name) }}</span>
                    </div>
                    <div class="form-group">
                        <label for="thumb_url">Thumb URL</label>
                        @if($model->thumb_url)
                        <div class="mt-2">
                            <img src="{{ asset( $model->thumb_url) }}" height="100">
                        </div>
                        @endif
                    </div>
                    <div class="form-group">
                        <label for="trailer_url">Trailer URL</label>
                        <span>{{ old('trailer_url', $model->trailer_url) }}</span>
                    </div>

                    <div class="form-group">
                        <label for="poster_url">Poster URL</label>
                        <span>{{ old('poster_url', $model->poster_url) }}</span>
                    </div>
                    <div class="form-group">
                        <label for="actor">Diễn viên</label>
                        <span>{{ old('actor', $model->actor) }}</span>
                    </div>

                    <div class="form-group">
                        <label for="director">Đạo diễn</label>
                        <span>{{ old('director', $model->director) }}</span>
                    </div>
                    <div class="form-group">
                        <label for="content">Nội dung</label>
                        <div>{{ old('content', $model->content) }}</div>
                    </div>


                    <div class="form-group">
                        <label for="type_id">Thể loại</label>
                        <span>{{$movie_type->name}}</span>
                    </div>

                    <div class="form-group">
                        <label for="time">Thời lượng</label>
                        <span>{{ old('time', $model->time) }}</span>
                    </div>

                    <div class="form-group">
                        <label for="episode_current">Tập hiện tại</label>
                        <span>{{ old('episode_current', $model->episode_current) }}</span>
                    </div>

                    <div class="form-group">
                        <label for="episode_total">Tổng số tập</label>
                        <span>{{ old('episode_total', $model->episode_total) }}</span>
                    </div>

                    <div class="form-group">
                        <label for="quality">Chất lượng</label>
                        <span>{{ old('quality', $model->quality) }}</span>
                    </div>

                    <div class="form-group">
                        <label for="language">Ngôn ngữ</label>
                        <span>{{ old('language', $model->language) }}</span>
                    </div>

                    <div class="form-group">
                        <label for="year">Năm</label>
                        <span>{{ old('year', $model->year) }}</span>
                    </div>

                    <div class="form-group">
                        <label for="country_id">Quốc gia</label>
                        <span>{{$country->name}}</span>
                    </div>

                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card">
                <div class="card-body">
                    <h6>Danh sách tập phim</h4>
                        <a href="#" class="btn primary" data-toggle="modal" data-target="#episode_add">Thêm tập</a>
                        <div class="episode">
                            @foreach($episodes as $item)
                            <span>{{$item -> episode_name}}</span>
                            @endforeach
                        </div>
                </div>
            </div>
        </div>
    </div>
</div>
@include('episode.create')
@endsection