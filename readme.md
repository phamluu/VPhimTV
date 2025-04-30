# Hướng dẫn cài đặt dự án

## Yêu cầu hệ thống
### Frontend (Node.js React)
- **Node.js**: Phiên bản >= 16.x ([Tải Node.js tại đây](https://nodejs.org/))
- **npm**: Phiên bản >= 8.x hoặc **yarn** >= 1.x

### Backend (PHP Laravel)
- **PHP**: Phiên bản >= 8.12 (có thể sử dụng [XAMPP](https://www.apachefriends.org/index.html) để cài đặt PHP và MySQL)
- **Composer**: Phiên bản >= 2.x ([Tải Composer tại đây](https://getcomposer.org/))
- **MySQL**: Phiên bản >= 5.7 hoặc **MariaDB** >= 10.3

## Các bước cài đặt

### 1. **Clone dự án**
Sử dụng lệnh sau để clone mã nguồn về máy:
```bash
git clone https://github.com/phamluu/VPhimTV.git
cd VPhimTV
```

### 2. **Cài đặt các package**

#### Chạy lệnh sau để cài đặt các package khi clone mã nguồn:
```bash
npm install
#Hoặc
npm i
```

#### Sau đó chạy lệnh sau để cài đặt các package cho cả FrontEnd và BackEnd
```bash
npm run install:all
```

### 3. **Chạy dự án**

#### Chạy câu lệnh sau để khởi chạy dự án
```bash
npm run start
```

### 5. **Truy cập ứng dụng**
- Frontend: Mở trình duyệt và truy cập địa chỉ:
    ```
    http://localhost:8765
    ```
- Backend: API sẽ chạy tại địa chỉ:
    ```
    http://localhost:8000
    ```
