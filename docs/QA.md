# QA 3.0

Đã chạy: FE Vue production build; 16 tests local (engine, Vue composable, backend password/schema/guards). Đã kiểm tra cấu trúc FE/BE tách riêng và không có khóa dịch vụ trong frontend.

`npm test` không yêu cầu MongoDB. `npm run test:mongo` dùng MongoDB thật khi MONGODB_TEST_URI được cấu hình. Bài integration mặc định SKIP, không được diễn giải là đã xác nhận database thật.

Chưa kiểm chứng: MongoDB/Cloudinary live, browser layout và iPhone/Android thực. Môi trường không có credential dịch vụ hoặc Docker/mongod chạy sẵn.

Trước production:

1. Dùng DB test riêng replica set, chạy `test:mongo` (đăng ký, CAS save, referral transaction, reward retry, logout).
2. Chạy `media:upload`, kiểm tra manifest có URL res.cloudinary.com và FE tải ảnh/audio qua CDN.
3. Chrome desktop/Safari iOS: làm trộn/nướng/cuốn, reload giữa món, nhận thư, bật/tắt âm thanh.
4. Kiểm tra 320/390/1440px và zoom chữ 200%; dialog không che mất nút.
5. Hai tab cùng tài khoản: save xung đột phải 409 và không ghi đè.
6. FE HTTPS/BE HTTPS, CORS allowlist, secret không xuất hiện trong bundle.
7. Tải app online đầy đủ rồi kiểm tra offline. Media local được cache; không cam kết tất cả tài nguyên Cloudinary luôn có khi offline.
