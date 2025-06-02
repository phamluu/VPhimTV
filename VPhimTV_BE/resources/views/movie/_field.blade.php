 <div class="row">
     <div class="col-md-8">
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

                 <div class="form-group">
                     <label for="name">Tên phim</label>
                     <input type="text" name="name" class="form-control" value="{{ old('name', $model->name) }}">
                 </div>
                 <div class="form-group">
                     <label for="original_name">Tên gốc</label>
                     <input type="text" name="original_name" class="form-control" value="{{ old('original_name', $model->original_name) }}">
                 </div>
                 <div class="form-group">
                     <label for="trailer_url">Trailer URL</label>
                     <input type="text" name="trailer_url" class="form-control" value="{{ old('trailer_url', $model->trailer_url) }}">
                 </div>

                 <div class="form-group">
                     <label for="poster_url">Poster URL</label>
                     <input type="text" name="poster_url" class="form-control" value="{{ old('poster_url', $model->poster_url) }}">
                 </div>
                 <div class="form-group">
                     <label for="actor">Diễn viên</label>
                     <input type="text" name="actor" class="form-control" value="{{ old('actor', $model->actor) }}">
                 </div>

                 <div class="form-group">
                     <label for="director">Đạo diễn</label>
                     <input type="text" name="director" class="form-control" value="{{ old('director', $model->director) }}">
                 </div>
                 <div class="form-group">
                     <label for="content">Nội dung</label>
                     <textarea id="content" name="content" class="form-control">{{ old('content', $model->content) }}</textarea>
                 </div>

                 <button type="submit" class="btn btn-success btn-round">Cập nhật</button>

             </div>
         </div>
     </div>
     <div class="col-md-4">
         <div class="card">
             <div class="card-body">
                 <div class="form-group">
                     <label for="thumb_url">Thumb URL</label>
                     <input type="file" name="thumb_url" class="form-control-file">
                     @if($model->thumb_url)
                     <div class="mt-2">
                         <img src="{{ asset( $model->thumb_url) }}" height="100">
                     </div>
                     @endif
                     <!-- <input type="text" name="thumb_url" class="form-control" value="{{ old('thumb_url', $model->thumb_url) }}"> -->
                 </div>
                 <div class="form-group">
                     <label for="type_id">Thể loại</label>
                     <select name="movie_type" class="form-control" value="{{ old('type_id', $model->type_id) }}">
                         @foreach($movie_type as $item)
                         <option value="{{$item -> id}}" {{ old('movie_type', $model->movie_type) == $item->id ? 'selected' : '' }}>{{$item->name}}</option>
                         @endforeach
                     </select>
                 </div>

                 <div class="form-group">
                     <label for="status">Trạng thái</label>
                     <select name="status" class="form-control">
                         <option value="1" {{ old('status', $model->status) == 1 ? 'selected' : '' }}>Công khai</option>
                         <option value="0" {{ old('status', $model->status) == 0 ? 'selected' : '' }}>Riêng tư</option>
                     </select>
                 </div>





                 <div class="form-group">
                     <label for="time">Thời lượng</label>
                     <input type="text" name="time" class="form-control" value="{{ old('time', $model->time) }}">
                 </div>

                 <div class="form-group">
                     <label for="episode_current">Tập hiện tại</label>
                     <input type="text" name="episode_current" class="form-control" value="{{ old('episode_current', $model->episode_current) }}">
                 </div>

                 <div class="form-group">
                     <label for="episode_total">Tổng số tập</label>
                     <input type="text" name="episode_total" class="form-control" value="{{ old('episode_total', $model->episode_total) }}">
                 </div>

                 <div class="form-group">
                     <label for="quality">Chất lượng</label>
                     <input type="text" name="quality" class="form-control" value="{{ old('quality', $model->quality) }}">
                 </div>

                 <div class="form-group">
                     <label for="language">Ngôn ngữ</label>
                     <input type="text" name="language" class="form-control" value="{{ old('language', $model->language) }}">
                 </div>

                 <div class="form-group">
                     <label for="year">Năm</label>
                     <input type="number" name="year" class="form-control" value="{{ old('year', $model->year) }}">
                 </div>

                 <div class="form-group">
                     <label for="country_id">Quốc gia</label>
                     <select name="country_id" class="form-control" value="{{ old('country_id', $model->country_id) }}">
                         @foreach($countries as $item)
                         <option value="{{$item -> id}}" {{ old('country_id', $model->country_id) == $item->id ? 'selected' : '' }}>{{$item->name}}</option>
                         @endforeach
                     </select>
                 </div>


             </div>
         </div>
     </div>
 </div>