@extends('layouts.admin')
@section('content')
<div class="panel-header panel-header-sm">
</div>
<div class="content">
    <div class="row">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">
                    <h5 class="title">Thêm người dùng</h5>
                </div>
                <div class="card-body">
                    <form action="{{ route('user.store') }}" method="POST">
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
                        <div class="row">
                            <div class="col-md-12 pr-1">
                                <div class="form-group">
                                    <label>Họ tên</label>
                                    <input type="text" class="form-control" placeholder="name" {{ old('name') }}>
                                </div>
                            </div>
                            <div class="col-md-12 px-1">
                                <div class="form-group">
                                    <label>email</label>
                                    <input type="email" class="form-control" placeholder="email" {{ old('email') }}>
                                </div>
                            </div>
                            <div class="col-md-12 pl-1">
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Mật khẩu</label>
                                    <input type="password" class="form-control" placeholder="Mật khẩu">
                                </div>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary btn-round">Thêm</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection