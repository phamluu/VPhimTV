<h2>Sửa Menu ID {{ $id }}</h2>
<form method="POST" action="{{ route('menu.update', $id) }}">
  @csrf
  @method('PUT')
  <input type="text" name="name" value="Tên hiện tại">
  <button type="submit">Cập nhật</button>
</form>
