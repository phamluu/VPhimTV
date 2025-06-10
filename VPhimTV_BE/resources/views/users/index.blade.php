@extends('layouts.admin')
@section('content')
<div class="panel-header panel-header-sm">
</div>
<div class="content">
    <div class="row">

        <div class="col-md-12">
            <div class="card card-plain">
                <div class="card-header">
                    <h4 class="card-title"> Danh sách người dùng</h4>
                    <p class="category"> Quản lý tài khoản</p>
                </div>
                <a href="{{ route('user.create') }}" class="btn btn-round btn-primary">Thêm</a>
                @if (session('success'))
                <div class="alert alert-success">
                    {{ session('success') }}
                </div>
                @endif
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table">
                            <thead class=" text-primary">
                                <th>
                                    STT
                                </th>
                                <th>
                                    Họ tên
                                </th>
                                <th>
                                    Tên đăng nhập
                                </th>
                                <th>
                                    Vai trò
                                </th>
                                <th class="text-right">
                                    Chức năng
                                </th>
                            </thead>
                            <tbody>
                                @foreach ($users as $user)
                                <tr>
                                    <td>
                                        {{ $loop->iteration }}
                                    </td>
                                    <td>
                                        {{ $user->name }}
                                    </td>
                                    <td>
                                        {{ $user->email }}
                                    </td>
                                    <td>
                                        @foreach ($user->roles as $role)
                                        <span class="badge bg-primary">{{ $role->name }}</span>
                                        @endforeach
                                    </td>
                                    <td class="text-right">
                                        <a href="{{ route('user.edit', $user->id) }}" class="btn btn-link btn-info btn-just-icon">
                                            <i class="now-ui-icons ui-2_settings-90"></i>
                                        </a>
                                        <form action="{{ route('user.destroy', $user->id) }}" method="POST" style="display: inline;">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="btn btn-link btn-danger btn-just-icon" onclick="return confirm('Bạn có chắc chắn muốn xoá tài khoản này?')">
                                                <i class="now-ui-icons ui-1_simple-remove"></i>
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection