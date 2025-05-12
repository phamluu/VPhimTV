<div class="row">
    <div class="col-md-12 pr-1">
        <div class="form-group">
            <label>Họ tên</label>
            <input type="text" class="form-control" placeholder="name" name="name" value="{{ $user->name ?? old('name') }}">
        </div>
    </div>
</div>
<div class="row">
    <div class="col-md-12 pr-1">
        <div class="form-group">
            <label>email</label>
            <input type="email" class="form-control" placeholder="email" name="email" value="{{ $user->email ?? old('email') }}">
        </div>
    </div>
</div>
<div class="row">
    <div class="col-md-12 pr-1">
        <div class="form-group">
            <label for="exampleInputEmail1">Mật khẩu</label>
            <input type="password" class="form-control" placeholder="Mật khẩu" name="password" {{ old('password') }}>
        </div>
    </div>
</div>