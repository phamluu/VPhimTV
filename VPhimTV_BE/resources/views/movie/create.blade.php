@extends('layouts.admin')

@section('content')
<div class="panel-header panel-header-sm"></div>
<div class="content">
    <div class="card">
        <div class="card-header">
            <h5 class="title">Thêm phim mới</h5>
        </div>
    </div>
    <form action="{{ route('movie.store')}}" method="POST" enctype="multipart/form-data">
        @csrf
        @include('movie._field', ['model' => $model])

    </form>
</div>
@endsection