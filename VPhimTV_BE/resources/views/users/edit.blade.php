@extends('layouts.admin')
@section('content')
<div class="panel-header panel-header-sm">
</div>
<div class="content">

    <form action="{{ route('user.update', $user->id) }}" method="POST">
        @csrf
        @method('PUT')
        <div class="row">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        <h5 class="title">Cập nhật người dùng</h5>
                    </div>
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
                        @include('users.field')
                        <button type="submit" class="btn btn-primary btn-round">Cập nhật</button>

                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card card-user">
                    <div class="image">
                        <img src="assets/img/bg5.jpg" alt="...">
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-12 pr-1">
                                <div class="form-group">
                                    <label>Vai trò</label>
                                    <select name="roles[]" multiple class="form-control multi-select">
                                        @foreach ($roles as $role)
                                        <option value="{{ $role->id }}" {{ $user->roles->contains($role->id) ? 'selected' : '' }}>
                                            {{ $role->name }}
                                        </option>
                                        @endforeach
                                    </select>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>

</div>

<script>
    $(document).ready(function() {
        $('.multi-select').select2({
            placeholder: "Chọn vai trò",
            width: '100%'
        });
    });
</script>
@endsection
