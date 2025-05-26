<h2>Thêm Menu mới</h2>
<form method="POST" action="{{ route('menu.store') }}">
  @csrf
  <input type="text" name="name" placeholder="Tên menu">
  <button type="submit">Lưu</button>
</form>
