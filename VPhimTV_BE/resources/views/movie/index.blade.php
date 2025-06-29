@extends('layouts.admin')

@section('content')
<style>
    td img {
        width: 100px;
    }
</style>
<div class="panel-header panel-header-sm"></div>
<div class="content">
    <div class="row">
        <div class="col-md-12">
            <div class="card card-plain">
                <div class="card-header">
                    <h4 class="card-title">Danh sách phim</h4>
                    <p class="movie">Quản lý các phim</p>
                </div>
                <a href="{{ route('movie.create') }}" class="btn btn-round btn-primary">Thêm phim</a>
                @if (session('success'))
                <div class="alert alert-success mt-2">
                    {{ session('success') }}
                </div>
                @endif
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table" id="grid">
                            <thead class=" text-primary">
                                <th>STT</th>
                                <th>Hình</th>
                                <th>Tên phim</th>
                                <th>Lượt thích</th>
                                <th>Lượt bình luận</th>
                                <th class="text-right" style="width:130px;">Chức năng</th>
                            </thead>
                            <tbody>
                                @foreach ($model as $movie)
                                <tr>
                                    <td>{{ $loop->iteration }}</td>
                                    <td><img src="{{ asset( $movie->thumb_url) }}" /></td>
                                    <td>{{ $movie->name }}</td>
                                    <td><a href="">{{ $movie->favorites->count() }}</a></td>
                                    <td><a href="#" class="" data-toggle="modal" data-target="#myModal-{{ $movie->id }}">
                                            {{ $movie->movie_comments->count() }}
                                        </a></td>
                                    <td class="text-right">
                                        <a href="{{ route('movie.detail', $movie->id) }}" class="btn btn-link btn-info btn-just-icon">
                                            <i class="fa fa-eye"></i>
                                        </a>
                                        <a href="{{ route('movie.edit', $movie->id) }}" class="btn btn-link btn-info btn-just-icon">
                                            <i class="now-ui-icons ui-2_settings-90"></i>
                                        </a>
                                        <form action="{{ route('movie.destroy', $movie->id) }}" method="POST" style="display: inline;">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="btn btn-link btn-danger btn-just-icon" onclick="return confirm('Bạn có chắc chắn muốn xoá phim này?')">
                                                <i class="now-ui-icons ui-1_simple-remove"></i>
                                            </button>
                                        </form>
                                    </td>
                                </tr>

                                @endforeach
                            </tbody>
                        </table>
                        @if ($model->isEmpty())
                        <p class="text-center">Chưa có phim nào.</p>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@include('movie._modal')
@endsection