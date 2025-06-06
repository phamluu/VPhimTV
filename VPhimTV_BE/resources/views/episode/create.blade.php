<div class="modal fade" id="episode_add" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalLabel">Thêm mới tập phim</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Đóng">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="content">
                    <div class="card">
                        <div class="card-body">
                            <form action="{{ route('episode.store') }}" method="POST" enctype="multipart/form-data">
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
                                @if (session('success'))
                                <div class="alert alert-success mt-2">
                                    {{ session('success') }}
                                </div>
                                @endif
                                @include('episode._field', ['model' => $model])

                                <button type="submit" class="btn btn-primary btn-round">Thêm</button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
            </div>
        </div>
    </div>
</div>

<script>
    $('form').on('submit', function(e) {
        e.preventDefault();

        var form = this;
        var formData = new FormData(form);

        $.ajax({
            url: $(form).attr('action'),
            type: $(form).attr('method'),
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                console.log(response);
            },
            error: function(xhr) {
                alert('Upload thất bại');
            }
        });
    });
</script>