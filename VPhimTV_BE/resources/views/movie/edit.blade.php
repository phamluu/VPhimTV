@extends('layouts.admin')

@section('content')
<div class="panel-header panel-header-sm"></div>
<div class="content">
    <div class="card">
        <div class="card-header">
            <h5 class="title">Chỉnh sửa phim</h5>
            <a href="{{ route('movie.detail', $model->id) }}" class="btn btn-primary btn-round">Tập phim</a>
        </div>
    </div>
    <form action="{{ route('movie.update', $model->id) }}" method="POST" enctype="multipart/form-data">
        @csrf
        @method('PUT')
        @include('movie._field')

    </form>
</div>
@endsection