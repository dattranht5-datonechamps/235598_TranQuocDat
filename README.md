# Hệ Thống Quản Lý Thiết Bị Phòng Học trên Đám Mây

- **Họ tên:** Trần Quốc Đạt
- **MSSV:** 235598
- **Môn học:** Điện toán đám mây - TIN06

## Mô tả đề tài
Ứng dụng web quản lý thiết bị phòng học: xem danh sách, xem chi tiết, tìm kiếm, thêm, cập nhật, xóa thiết bị và theo dõi tình trạng sử dụng (Đang sử dụng, Hư hỏng, Đang sửa chữa, Ngừng sử dụng).

## Công nghệ sử dụng
- Frontend: React (Vite)
- Backend: Node.js, Express.js
- Database: MongoDB Atlas
- Container & Cloud: Docker, Docker Hub, Render
- Quản lý mã nguồn: Git, GitHub

## Cấu trúc dự án
- `backend/`  : API Node.js + Express
- `frontend/` : giao diện React
- `README.md` : tài liệu dự án

## Hướng dẫn cài đặt và chạy cục bộ
1. Backend: `cd backend && npm install && npm run dev` (tạo file `.env` từ `.env.example`)
2. Frontend: `cd frontend && npm install && npm run dev`

## Hướng dẫn chạy Backend bằng Docker (Câu 5)

### 1. Kéo image từ Docker Hub
```bash
docker pull dattranht5/backend-235598:latest

## CÂU 7: TRIỂN KHAI ỨNG DỤNG LÊN RENDER (DEPLOYMENT)

- **Sinh viên thực hiện:** Trần Quốc Đạt
- **MSSV:** 235598
- **URL Frontend (React):** https://two35598-tranquocdat.onrender.com
- **URL Backend (Node.js / Express API):** https://backend-235598.onrender.com
- **Trạng thái:** Đã triển khai thành công 2 dịch vụ riêng biệt trên Render Web Service và kết nối với MongoDB Atlas.

## CÂU 8: TRIỂN KHAI BACKEND API TRÊN RENDER

- **Sinh viên thực hiện:** Trần Quốc Đạt - MSSV: 235598
- **URL Backend API:** https://backend-235598.onrender.com
- **URL Frontend Web:** https://two35598-tranquocdat.onrender.com
- **Health Endpoint:** https://backend-235598.onrender.com/health
- **Devices Endpoint:** https://backend-235598.onrender.com/api/devices

## BẢNG THÔNG TIN NỘP BÀI TỔNG THỂ

| Hạng mục thông tin | Chi tiết thông tin nộp bài |
| :--- | :--- |
| **Họ và tên Sinh viên** | Trần Quốc Đạt |
| **Mã số Sinh viên (MSSV)** | 235598 |
| **Mã học phần / Tên bài tập** | TIN06 - Hệ Thống Quản Lý Thiết Bị Phòng Học |
| **GitHub Repository** | https://github.com/dattranht5-datonechamps/235598_TranQuocDat |
| **URL Frontend (Render)** | https://two35598-tranquocdat.onrender.com |
| **URL Backend API (Render)** | https://backend-235598.onrender.com |
| **Endpoint Health Check** | https://backend-235598.onrender.com/health |
| **Docker Hub Frontend** | https://hub.docker.com/r/dattranht5/frontend-device-management |
| **Docker Hub Backend** | https://hub.docker.com/r/dattranht5/backend-device-management |
| **Trạng thái hệ thống** | Hoàn thành 100% các yêu cầu CRUD, Docker, MongoDB Atlas và Render Deployment. |