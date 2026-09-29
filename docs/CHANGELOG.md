# 2.1.0 — Khách quen và bếp than

- Thêm 12 thư của 4 khách, tiến trình tình cảm, quà mốc 3/6/10 lượt.
- Nướng hai mặt với 3 mức lửa, hiển thị độ chín và nhiệt độ, cảnh báo cháy.
- Lưu/khôi phục lượt chơi đang dở trên local, tệp JSON và cloud save.
- Tương thích ngược bản lưu 2.0.
- Sửa đồng hồ khi chuyển chế độ; cập nhật offline cache.
- 14 tests tự động đạt; chưa QA trên thiết bị thật.

# 3.0.0 — Vue 3 / Node.js / MongoDB / Cloudinary

- Tách fe/ và be/, npm workspaces, hai terminal dev.
- Viết lại giao diện bằng Vue SFC + Composition API, tách Station và AccountPanel.
- Thay JSON database bằng Mongoose collections; unique indexes, session TTL, save CAS.
- Referral và nhận quà có transaction; phần thưởng cập nhật trực tiếp saved snapshot.
- Cloudinary SDK upload CLI, metadata MongoDB, FE media manifest/fallback.
- Giữ gameplay và local saves 2.1. Thêm cấu hình env, Docker replica set local, hướng dẫn deploy độc lập.
- 16 tests local đạt; MongoDB integration cần MONGODB_TEST_URI, chưa chạy với dịch vụ thật.
