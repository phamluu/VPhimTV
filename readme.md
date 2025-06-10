# Hướng dẫn cài đặt dự án

## Yêu cầu hệ thống

### Frontend (Node.js & React)
- **Node.js**: >= 16.x ([Tải Node.js](https://nodejs.org/))
- **npm**: >= 8.x hoặc **yarn** >= 1.x

### Backend (PHP & Laravel)
- **PHP**: >= 8.1.2 (có thể dùng [XAMPP](https://www.apachefriends.org/index.html) để cài PHP & MySQL)
- **Composer**: >= 2.x ([Tải Composer](https://getcomposer.org/))
- **MySQL**: >= 5.7 hoặc **MariaDB** >= 10.3

---

## Các bước cài đặt

### 1. Clone dự án

```bash
git clone https://github.com/phamluu/VPhimTV.git
cd VPhimTV
```

### 2. Cài đặt dependencies

- **Cài đặt package Node.js:**
    ```bash
    npm install
    # hoặc
    npm i
    ```

- **Cài đặt tất cả dependencies cho cả Frontend & Backend:**
    ```bash
    npm run install:all
    ```

- **Khởi tạo database:**
    ```bash
    npm run setup
    ```

- **Lấy dữ liệu:**
    ```bash
    npm run crawl
    ```

### 3. Chạy dự án

```bash
npm run start
```

---

## Truy cập ứng dụng

- **Frontend:**  
    Mở trình duyệt và truy cập:  
    ```
    http://localhost:8765
    ```

- **Backend (API):**  
    ```
    http://localhost:8000
    ```

---

## API

### Movies

- **Lấy danh sách phim:**  
    ```
    http://localhost:8000/api/movie
    ```
    - **Tham số hỗ trợ (query params):**
        - `limit` (số lượng phim/trang, mặc định: 20)  
          Ví dụ: `?limit=10`
        - `page` (trang hiện tại, mặc định: 1)  
          Ví dụ: `?page=2`
        - `sort_field` (trường sắp xếp, mặc định: updated_at)  
          Ví dụ: `?sort_field=updated_at`
        - `sort_type` (kiểu sắp xếp: asc/desc, mặc định: desc)  
          Ví dụ: `?sort_type=desc`
        - `type_list` (slug loại phim: vd `series`, `single`)  
          Ví dụ: `?type_list=series`
        - `sort_lang` (ngôn ngữ: vd `vi`, `en`)  
          Ví dụ: `?sort_lang=vi`
        - `category` (slug thể loại, dùng api lấy danh sách category)  
          Ví dụ: `?category=hanh-dong`
        - `country` (slug quốc gia, dùng api lấy danh sách country)  
          Ví dụ: `?country=vi`
        - `year` (năm phát hành)  
          Ví dụ: `?year=2023`
        - `keyword` (tìm kiếm theo tên phim)  
          Ví dụ: `?keyword=nobita`
    - **Ví dụ:**  
      ```
      http://localhost:8000/api/movie?limit=12&page=1&sort_field=updated_at&sort_type=desc&type_list=series&category=hanh-dong
      ```

- **Lấy thông tin chi tiết phim:**  
    ```
    http://localhost:8000/api/movie/{slug}
    ```
    - **Tham số:**  
        - `{slug}`: slug của phim  
          Ví dụ: `cuoc-doi-phi-thuong-cua-ibelin`
    - **Ví dụ:**  
      ```
      http://localhost:8000/api/movie/cuoc-doi-phi-thuong-cua-ibelin
      ```

### Favorite

- **Lấy danh sách phim yêu thích của user (cần đăng nhập):**
    ```
    http://localhost:8000/api/favorite
    ```
    - **Tham số hỗ trợ (query params):**
        - `limit`, `page`, `sort_field`, `sort_type`, `type_list`, `sort_lang`, `category`, `country`, `year`, `keyword`  
          (giống như API movie)
    - **Ví dụ:**
      ```
      http://localhost:8000/api/favorite?limit=10&page=1
      ```

- **Thêm phim vào danh sách yêu thích (cần đăng nhập):**
    ```
    http://localhost:8000/api/favorite/create   --POST
    ```
    - **Body (JSON hoặc form-data):**
        - `movie_id` (ID của phim cần thêm)
    - **Ví dụ:**
      ```json
      {
        "movie_id": 123
      }
      ```

- **Xóa phim khỏi danh sách yêu thích (cần đăng nhập):**
    ```
    http://localhost:8000/api/favorite/delete   --POST
    ```
    - **Body (JSON hoặc form-data):**
        - `movie_id` (ID của phim cần xóa)
    - **Ví dụ:**
      ```json
      {
        "movie_id": 123
      }
      ```

### User

- **Lấy thông tin chi tiết user:**
    ```
    http://localhost:8000/api/user/{id}
    ```
    - **Tham số:**  
        - `{id}`: ID của user  
          Ví dụ: `1`
    - **Ví dụ:**  
      ```
      http://localhost:8000/api/user/1
      ```
    - **Kết quả trả về:**  
      ```json
      {
        "success": true,
        "data": {
          "id": 1,
          "avatar": "url_avatar",
          "full_name": "Nguyễn Văn A",
          "created_at": "2024-06-01T12:00:00.000000Z"
        }
      }
      ```

- **Cập nhật thông tin user (cần đăng nhập):**
    ```
    http://localhost:8000/api/user/update/{id}   --PUT
    ```
    - **Tham số:**  
        - `{id}`: ID của user cần cập nhật
    - **Body (form-data):**
        - `full_name` (bắt buộc)
        - `avatar` (file ảnh, không bắt buộc)
    - **Ví dụ:**  
      Gửi form-data với các trường trên.
    - **Kết quả trả về:**  
      ```json
      {
        "message": "Cập nhật thông tin người dùng thành công",
        "data": {
          "user_id": 1,
          "full_name": "Nguyễn Văn A",
          "avatar": "avatars/abcxyz.jpg"
        }
      }
      ```

### Categories

- **Lấy danh sách thể loại:**  
    ```
    http://localhost:8000/api/category
    ```
    - **Tham số hỗ trợ:**
        - `sort_field` Ví dụ: `?sort_field=updated_at`
        - `sort_type` Ví dụ: `?sort_type=desc`

### Countries

- **Lấy danh sách quốc gia:**  
    ```
    http://localhost:8000/api/country
    ```
    - **Tham số hỗ trợ:**
        - `sort_field` Ví dụ: `?sort_field=updated_at`
        - `sort_type` Ví dụ: `?sort_type=desc`

### Authenticate
- **Đăng nhập**
    ```
    http://localhost:8000/api/auth/login     --POST
    ```
    - **Data truyền lên**
        - `email` Ví dụ: `abc@gmail.com`
        - `password` Ví dụ: `123`

- **Đăng ký**
    ```
    http://localhost:8000/api/auth/register   --POST
    ```
    - **Data truyền lên**
        - `name` Ví dụ: `Nguyễn Văn A`
        - `email` Ví dụ: `abc@gmail.com`
        - `password` Ví dụ: `123`

- **Kiểm tra đăng nhập**
    ```
    http://localhost:8000/api/auth/check      --GET
    ```
    - **Trả về thông tin user nếu đã đăng nhập, trả về lỗi nếu chưa đăng nhập**

- **Đăng xuất**
    ```
    http://localhost:8000/api/auth/logout     --POST
    ```
    - **Đăng xuất user hiện tại**

### Comment

- **Lấy danh sách bình luận của phim:**
    ```
    http://localhost:8000/api/comment
    ```
    - **Tham số hỗ trợ (query params):**
        - `movie_id` (bắt buộc): ID của phim cần lấy bình luận
        - `limit` (số lượng bình luận/trang, mặc định: 20)
        - `page` (trang hiện tại, mặc định: 1)
        - `sort_field` (trường sắp xếp, mặc định: created_at)
        - `sort_type` (kiểu sắp xếp: asc/desc, mặc định: desc)
    - **Ví dụ:**
      ```
      http://localhost:8000/api/comment?movie_id=123&page=1&limit=10
      ```

- **Thêm bình luận mới (cần đăng nhập):**
    ```
    http://localhost:8000/api/comment/create   --POST
    ```
    - **Body (JSON hoặc form-data):**
        - `movie_id` (bắt buộc): ID phim
        - `content` (bắt buộc): Nội dung bình luận
        - `reply_to` (không bắt buộc): ID bình luận cha (nếu là trả lời)
    - **Ví dụ:**
      ```json
      {
        "movie_id": 123,
        "content": "Phim rất hay!",
        "reply_to": 456
      }
      ```

- **Cập nhật bình luận (cần đăng nhập, chỉ sửa bình luận của mình):**
    ```
    http://localhost:8000/api/comment/update/{id}   --PUT
    ```
    - **Tham số:**  
        - `{id}`: ID của bình luận cần sửa
    - **Body (JSON hoặc form-data):**
        - `content` (bắt buộc): Nội dung mới
        - `reply_to` (không bắt buộc): ID bình luận cha (nếu muốn thay đổi)
    - **Ví dụ:**
      ```json
      {
        "content": "Đã xem lại, phim vẫn rất hay!"
      }
      ```

- **Xóa bình luận (cần đăng nhập, chỉ xóa bình luận của mình):**
    ```
    http://localhost:8000/api/comment/delete/{id}   --POST
    ```
    - **Tham số:**  
        - `{id}`: ID của bình luận cần xóa
    - **Kết quả trả về:**
      ```json
      {
        "message": "Comment deleted successfully"
      }
      ```

### History

- **Lấy lịch sử xem phim của user (cần đăng nhập):**
    ```
    http://localhost:8000/api/history
    ```
    - **Tham số hỗ trợ (query params):**
        - `limit` (số lượng/trang, mặc định: 20)
        - `page` (trang hiện tại, mặc định: 1)
        - `sort_field` (trường sắp xếp, mặc định: updated_at)
        - `sort_type` (kiểu sắp xếp: asc/desc, mặc định: desc)
    - **Ví dụ:**
      ```
      http://localhost:8000/api/history?limit=10&page=1
      ```

- **Thêm/cập nhật lịch sử xem phim (cần đăng nhập):**
    ```
    http://localhost:8000/api/history/create   --POST
    ```
    - **Body (JSON hoặc form-data):**
        - `movie_id` (bắt buộc): ID phim
        - `episode_id` (không bắt buộc): ID tập phim
        - `progress_seconds` (không bắt buộc): Thời gian đã xem (giây)
    - **Ví dụ:**
      ```json
      {
        "movie_id": 123,
        "episode_id": 456,
        "progress_seconds": 1200
      }
      ```

- **Xóa lịch sử xem phim (cần đăng nhập):**
    ```
    http://localhost:8000/api/history/delete/{movie_id}   --POST
    ```
    - **Tham số:**  
        - `{movie_id}`: ID của phim cần xóa lịch sử
    - **Kết quả trả về:**
      ```json
      {
        "message": "History deleted successfully."
      }
      ```

### View

- **Ghi nhận lượt xem tập phim (tăng view, không cần đăng nhập):**
    ```
    http://localhost:8000/api/view/create   --POST
    ```
    - **Body (JSON hoặc form-data):**
        - `episode_id` (bắt buộc): ID của tập phim
    - **Lưu ý:**  
      - Nếu user đã xem tập này trong vòng 5 phút gần nhất (theo user_id hoặc IP), sẽ không tăng view mới.
    - **Ví dụ:**
      ```json
      {
        "episode_id": 456
      }
      ```
    - **Kết quả trả về:**
      ```json
      {
        "id": 1,
        "user_id": 2,
        "episode_id": 456,
        "ip_address": "127.0.0.1",
        "user_agent": "...",
        "created_at": "2024-06-01T12:00:00.000000Z",
        "updated_at": "2024-06-01T12:00:00.000000Z"
      }
      ```
      hoặc nếu đã xem gần đây:
      ```json
      {
        "message": "Already viewed recently"
      }
      ```