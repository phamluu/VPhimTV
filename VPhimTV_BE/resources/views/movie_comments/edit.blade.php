@extends('layouts.admin')

@section('content')
<div class="panel-header panel-header-sm"></div>
<div class="content">
    <div class="row">
        <div class="col-md-8 offset-md-2">
            <div class="card">
                <div class="card-header">
                    <h4 class="card-title">Chỉnh sửa bình luận #{{ $comment->id }}</h4>
                </div>
                <div class="card-body">
                    @if ($errors->any())
                        <div class="alert alert-danger">
                            <strong>Lỗi!</strong> Vui lòng kiểm tra lại dữ liệu.<br>
                            <ul>
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif

                    <form action="{{ route('movie_comments.update', $comment->id) }}" method="POST">
                        @csrf
                        @method('PUT')

                        <div class="form-group">
                            <label>Phim</label>
                            <input type="text" class="form-control" value="{{ $comment->movie->name ?? 'Không rõ' }}" disabled>
                        </div>

                        <div class="form-group">
                            <label>Người dùng</label>
                            <input type="text" class="form-control" value="{{ $comment->user->name ?? 'Ẩn danh' }}" disabled>
                        </div>

                        <div class="form-group">
                            <label for="content">Nội dung bình luận</label>
                            <textarea name="content" class="form-control" rows="4">{{ old('content', $comment->content) }}</textarea>
                        </div>

                        <div class="form-group">
                            <label for="is_approved">Trạng thái duyệt</label>
                            <select name="is_approved" class="form-control">
                                <option value="0" {{ !$comment->is_approved ? 'selected' : '' }}>Chưa duyệt</option>
                                <option value="1" {{ $comment->is_approved ? 'selected' : '' }}>Đã duyệt</option>
                            </select>
                        </div>

                        <button type="submit" class="btn btn-success">Cập nhật</button>
                        <a href="{{ route('movie_comments.index') }}" class="btn btn-secondary">Quay lại</a>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
