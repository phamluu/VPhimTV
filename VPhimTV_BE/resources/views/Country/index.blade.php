@extends('layouts.admin')

@section('content')
<div class="panel-header panel-header-sm"></div>
<div class="content">
    <div class="row">
        <div class="col-md-12">
            <div class="card card-plain">
                <div class="card-header">
                    <h4 class="card-title">Danh sách quốc gia</h4>
                    <p class="country">Quản lý các quốc gia</p>
                </div>
                <a href="{{ route('country.create') }}" class="btn btn-round btn-primary">Thêm quốc gia</a>
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
                                <th>Tên quốc gia</th>
                                <th class="text-right">Chức năng</th>
                            </thead>
                            <tbody>
                                @foreach ($model as $country)
                                <tr>
                                    <td>{{ $loop->iteration }}</td>
                                    <td>{{ $country->name }}</td>
                                    <td class="text-right">
                                        <a href="{{ route('country.edit', $country->id) }}" class="btn btn-link btn-info btn-just-icon">
                                            <i class="now-ui-icons ui-2_settings-90"></i>
                                        </a>
                                        <form action="{{ route('country.destroy', $country->id) }}" method="POST" style="display: inline;">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="btn btn-link btn-danger btn-just-icon" onclick="return confirm('Bạn có chắc chắn muốn xoá quốc gia này?')">
                                                <i class="now-ui-icons ui-1_simple-remove"></i>
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                                @endforeach
                            </tbody>
                        </table>
                        @if ($model->isEmpty())
                        <p class="text-center">Chưa có quốc gia nào.</p>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection