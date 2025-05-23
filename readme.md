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
    npm run prepare
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
    http://localhost:8000/movies
    ```
    - **Tham số hỗ trợ:**
        - `limit` Ví dụ: `?limit=10`
        - `page` Ví dụ: `?page=2`
        - `sort_field` Ví dụ: `?sort_field=updated_at`
        - `sort_type` Ví dụ: `?sort_type=desc`
        - `type_list` Ví dụ: `?type_list=series`
        - `sort_lang` Ví dụ: `?sort_lang=vi`
        - `category` Ví dụ: `?category=hanh-dong` (dùng api lấy danh sách category)
        - `country` Ví dụ: `?country=vi` (dùng api lấy danh sách country) 
        - `year` Ví dụ: `?year=2023`
        - `keyword` Ví dụ: `?keyword=nobita`

- **Lấy thông tin chi tiết phim:**
    ```
    http://localhost:8000/movies/{slug}

    Ví dụ: 

    http://localhost:8000/movies/cuoc-doi-phi-thuong-cua-ibelin
    ```
    

### Categories

- **Lấy danh sách thể loại:**  
    ```
    http://localhost:8000/category
    ```
    - **Tham số hỗ trợ:**
        - `sort_field` Ví dụ: `?sort_field=updated_at`
        - `sort_type` Ví dụ: `?sort_type=desc`

### Countries

- **Lấy danh sách quốc gia:**  
    ```
    http://localhost:8000/country
    ```
    - **Tham số hỗ trợ:**
        - `sort_field` Ví dụ: `?sort_field=updated_at`
        - `sort_type` Ví dụ: `?sort_type=desc`