@extends('layouts.admin')

@section('content')
<div class="panel-header panel-header-sm">
</div>
<div class="content">
    <div class="row">

        <div class="col-md-12">
            <div class="card card-plain">
                <div class="card-header">
                    <h4 class="card-title"> Danh sách Menu</h4>
                    <p class="category"> Quản lý menu của hệ thống</p>
                </div>
                <a href="{{ route('menu.create') }}" class="btn btn-round btn-primary">Thêm Menu</a>

                @if (session('success'))
                <div class="alert alert-success mt-2">
                    {{ session('success') }}
                </div>
                @endif

                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table">
                            <thead class=" text-primary">
                                <th>STT</th>
                                <th>Tên Menu</th>
                                <th class="text-right">Chức năng</th>
                            </thead>
                            <tbody>
                                @foreach ($menus as $menu)
                                <tr>
                                    <td>{{ $loop->iteration }}</td>
                                    <td>{{ $menu->name }}</td>
                                    <td class="text-right">
                                        <a href="{{ route('menu.edit', $menu->id) }}" class="btn btn-link btn-info btn-just-icon" title="Chỉnh sửa">
                                            <i class="now-ui-icons ui-2_settings-90"></i>
                                        </a>
                                        <form action="{{ route('menu.destroy', $menu->id) }}" method="POST" style="display: inline;">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="btn btn-link btn-danger btn-just-icon" title="Xoá" onclick="return confirm('Bạn có chắc muốn xoá menu này?')">
                                                <i class="now-ui-icons ui-1_simple-remove"></i>
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                                @endforeach
                                @if($menus->isEmpty())
                                <tr>
                                    <td colspan="3" class="text-center">Không có menu nào.</td>
                                </tr>
                                @endif
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>
@endsection
