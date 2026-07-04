# 🚀 LongFashion E-commerce Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Status](https://img.shields.io/badge/Status-Development-green.svg)]()

Hệ thống Thương mại điện tử Fullstack được xây dựng bằng **ASP.NET Core Web API** (Backend) và **React.js** (Frontend). Dự án tập trung vào trải nghiệm người dùng hiện đại, bảo mật thông tin và quản lý sản phẩm chuyên nghiệp.

---

## 📑 Mục lục
1. [Giới thiệu](#-giới-thiệu)
2. [Tính năng chính](#-tính-năng-chính)
3. [Công nghệ sử dụng](#-công-nghệ-sử-dụng)
4. [Hướng dẫn cài đặt](#-hướng-dẫn-cài-đặt)
5. [Hướng dẫn chạy dự án](#-hướng-dẫn-chạy-dự-án)
6. [Cấu trúc thư mục](#-cấu-trúc-thư-mục)
7. [Swagger API](#-swagger-api)
8. [Đóng góp](#-đóng-góp)
9. [Liên hệ](#-liên-hệ)

---

## 📝 Giới thiệu
LongFashion là nền tảng bán hàng thời trang trực tuyến với đầy đủ tính năng: từ xem sản phẩm, giỏ hàng, đặt hàng đến trang quản trị (Admin) dành cho người bán hàng.

## ✨ Tính năng chính
- **Khách hàng:** Tìm kiếm sản phẩm, lọc theo danh mục, quản lý giỏ hàng, thanh toán an toàn.
- **Tài khoản:** Đăng nhập/Đăng ký với mã hóa mật khẩu BCrypt.
- **Quản trị (Admin):** Quản lý sản phẩm, danh mục, đơn hàng và bài viết (Blog).
- **Trải nghiệm:** Tự động điền thông tin khi đăng nhập, kiểm tra tồn kho thời gian thực.

## 🛠 Công nghệ sử dụng
- **Backend:** .NET 6/8, Entity Framework Core, SQL Server.
- **Frontend:** React.js, Tailwind CSS, Axios, React Router.
- **Công cụ:** Git, VS Code, SQL Server Management Studio.

---

## 🚀 Hướng dẫn cài đặt

### Yêu cầu hệ thống
- .NET SDK (6.0 trở lên)
- Node.js (v18 trở lên)
- SQL Server

### Các bước chuẩn bị
1. Clone dự án: `git clone <url-repo>`
2. Cấu hình Connection String trong `appsettings.json` tại thư mục Backend.
3. Chạy lệnh Migration để tạo Database: `dotnet ef database update`

---

## 🏃 Hướng dẫn chạy dự án

### 1. Chạy Backend (API Server)
1. Mở thư mục Backend bằng VS Code hoặc Visual Studio.
2. Nhấn **F5** hoặc gõ lệnh:
   ```bash
   cd Backend
   dotnet run
