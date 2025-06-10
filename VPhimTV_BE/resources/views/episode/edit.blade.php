<div class="modal-dialog" role="document">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="modalLabel">Cập nhật tập phim</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Đóng">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>

        <form action="{{ route('episode.update', $model->id) }}" method="POST" enctype="multipart/form-data">
            @csrf
            @method('PUT')
            <div class="modal-body">
                <div class="content">
                    <div class="card">
                        <div class="card-body">

                            @if ($errors->any())
                            <div class="alert alert-danger">
                                <ul>
                                    @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                    @endforeach
                                </ul>
                            </div>
                            @endif
                            @if (session('success'))
                            <div class="alert alert-success mt-2">
                                {{ session('success') }}
                            </div>
                            @endif
                            @include('episode._field', ['model' => $model])
                        </div>
                    </div>

                </div>
            </div>
            <div class="modal-footer">
                <button type="submit" class="btn btn-primary btn-round">Cập nhật</button>
                <button type="button" class="btn btn-danger" onclick="confirmDelete()">Xóa</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
            </div>
        </form>

        <!-- Form ẩn dùng để xoá -->
        <form id="delete-form" action="{{ route('episode.destroy', $model->id) }}" method="POST" style="display: none;">
            @csrf
            @method('DELETE')
        </form>

    </div>

</div>

<script>
    function confirmDelete() {
        if (confirm('Bạn có chắc chắn muốn xóa tập phim này?')) {
            document.getElementById('delete-form').submit();
        }
    }
</script>