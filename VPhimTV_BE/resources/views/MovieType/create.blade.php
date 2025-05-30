@extends('layouts.admin')

@section('content')
<div class="panel-header panel-header-sm"></div>
<div class="content">
    <div class="row">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">
                    <h5 class="title">Thêm thể loại phim</h5>
                </div>
                <div class="card-body">
                    <form action="{{ route('movietype.store') }}" method="POST">
                        @csrf
                        @if ($errors->any())
                        <div class="alert alert-danger">
                            <ul>
                                @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                        @endif

                        <div class="form-group">
                            <label for="name">Tên thể loại</label>
                            <input type="text" name="name" class="form-control" placeholder="Nhập tên thể loại" value="{{ old('name') }}">
                        </div>

                        <button type="submit" class="btn btn-primary btn-round">Thêm</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection