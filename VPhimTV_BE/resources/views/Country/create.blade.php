@extends('layouts.admin')

@section('content')
<div class="panel-header panel-header-sm"></div>
<div class="content">
    <div class="row">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">
                    <h5 class="title">Thêm quốc gia</h5>
                </div>
                <div class="card-body">
                    <form action="{{ route('country.store') }}" method="POST">
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

                        <div class="form-group">
                            <label for="name">Tên quốc gia</label>
                            <input type="text" name="name" class="form-control" placeholder="Nhập tên quốc gia" value="{{ old('name') }}">
                        </div>

                        <button type="submit" class="btn btn-primary btn-round">Thêm</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection