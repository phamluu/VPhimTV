@extends('layouts.admin')

@section('content')
<div class="panel-header panel-header-sm"></div>
<div class="content">
    <div class="row">
        <div class="col-md-12">
            <div class="card card-plain">
                <div class="card-header">
                    <h4 class="card-title">Danh sách tập phim</h4>
                    <p class="category">Quản lý các tập phim</p>
                </div>
                <a href="{{ route('episode.create') }}" class="btn btn-round btn-primary">Thêm tập phim</a>
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
                                <th>Tên tập</th>
                                <th class="text-right">Chức năng</th>
                            </thead>
                            <tbody>
                                @foreach ($model as $category)
                                <tr>
                                    <td>{{ $loop->iteration }}</td>
                                    <td>{{ $category->episode_name }}</td>
                                    <td class="text-right">
                                        <a href="{{ route('episode.edit', $category->id) }}" class="btn btn-link btn-info btn-just-icon">
                                            <i class="now-ui-icons ui-2_settings-90"></i>
                                        </a>
                                        <form action="{{ route('episode.destroy', $category->id) }}" method="POST" style="display: inline;">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="btn btn-link btn-danger btn-just-icon">
                                                <i class="now-ui-icons ui-1_simple-remove"></i>
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                                @endforeach
                            </tbody>
                        </table>
                        @if ($model->isEmpty())
                        <p class="text-center">Chưa có tập phim nào.</p>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection