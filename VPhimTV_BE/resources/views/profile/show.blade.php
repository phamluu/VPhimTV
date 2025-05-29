@extends('layouts.admin')
@section('content')
<div class="panel-header panel-header-sm">
</div>
<div class="content">
    <div class="row">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">
                    <div class="title d-flex">
                        <h5 style="width: 90%;">Xem hồ sơ của {{$user->name ?? $user->email ?? 'Khách' }}</h5>
                        <span><a href="/admin/profile/edit"><i class="fa fa-edit"></i>Sửa</a></span>
                    </div>
                    @if (session('success'))
                    <div class="alert alert-success">
                        {{ session('success') }}
                    </div>
                    @endif
                </div>
                <div class="card-body">
                    <div class="form-group">
                        <label>Họ tên</label>
                        <span>{{$user -> full_name}}</span>
                    </div>
                    <div class="form-group">
                        <label>Ngày sinh</label>
                        <span>{{$user->birth_date}}</span>
                    </div>
                    <div class="form-group">
                        <label>Giới tính</label>
                    </div>
                    <div class="form-group">
                        <label>Quốc tịch</label>
                        <span>{{$country->name}}</span>
                    </div>
                    <div class="form-group">
                        <label>Địa chỉ</label>
                        <span>{{$user -> address}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card">
                <div class="card-header">
                    <h5 class="title">Ảnh đại diện</h5>
                </div>
                <div class="card-body">

                </div>
            </div>
        </div>
    </div>

</div>
@endsection