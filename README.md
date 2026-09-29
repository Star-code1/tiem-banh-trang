# Tiệm Bánh Tráng · Góc Phố Nhỏ — 3.0

**FE: Vue 3 + Vite. BE: Node.js + Express. Database: MongoDB (Mongoose). Media: Cloudinary.**

FE và BE chạy hai tiến trình riêng. BE chỉ phục vụ REST API, không phục vụ frontend. MongoDB lưu tài khoản, phiên đăng nhập, tiến trình, thưởng bạn bè và metadata media; Cloudinary lưu ảnh/âm thanh. Không còn dùng file JSON làm database.

## 1. Cài dependencies

Cần Node.js **22.12+**, npm và một MongoDB replica set (Atlas hoặc Docker local bên dưới).

Trong thư mục gốc project:

```bash
npm ci
```

`package-lock.json` cố định phiên bản; npm workspaces cài cả `fe/` và `be/` trong một lần.

## 2. Cấu hình backend

Sao chép `be/.env.example` thành `be/.env` rồi sửa:

```dotenv
PORT=3000
MONGODB_URI=mongodb+srv://USER:PASSWORD@YOUR_CLUSTER/tiem_banh_trang?retryWrites=true&w=majority
CLIENT_ORIGINS=http://localhost:5173,http://localhost:4173
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_FOLDER=goc-pho-banh-trang
TRUST_PROXY=0
```

- `MONGODB_URI`: chuỗi kết nối của database của bạn; thay USER/PASSWORD/host, URL-encode ký tự đặc biệt trong mật khẩu.
- Atlas: tạo database user có quyền read/write cho database này và cho phép IP máy chạy BE trong Network Access.
- Cloudinary: lấy cloud name, API key, API secret từ tài khoản của bạn. Các khóa này chỉ nằm trong `be/.env`.
- Không commit `.env`, không đưa MONGODB_URI/API secret vào `VITE_*`.
- Node tự đọc `.env` qua scripts, không cần thư viện dotenv.

### Hoặc dùng MongoDB local bằng Docker

```bash
docker compose up -d --wait
```

Dùng URI trong `be/.env.example`:

```dotenv
MONGODB_URI=mongodb://127.0.0.1:27017/tiem_banh_trang?replicaSet=rs0
```

Compose tạo replica set một node, có volume bền vững, chỉ mở cổng trên loopback. Chỉ dùng cấu hình này cho phát triển local, không đưa MongoDB không xác thực ra Internet. Không xóa volume nếu muốn giữ dữ liệu.

## 3. Cấu hình frontend

Sao chép `fe/.env.example` thành `fe/.env`:

```dotenv
VITE_API_URL=http://localhost:3000/api
```

VITE_API_URL là cấu hình public, dùng lúc build FE. Thay đổi `.env` cần restart Vite / build lại. Nếu bỏ trống, game vẫn chạy offline/local; tài khoản có thể nhập địa chỉ BE trong game. Media manifest tự tải theo VITE_API_URL khi FE mở.

## 4. Chạy hai terminal

Terminal BE — từ thư mục gốc:

```bash
npm run dev:be
```

Terminal FE — từ thư mục gốc:

```bash
npm run dev:fe
```

| Thành phần | URL |
|---|---|
| FE Vue 3 | http://localhost:5173 |
| BE API | http://localhost:3000/api |
| Health MongoDB | http://localhost:3000/api/health |
| Danh sách media | http://localhost:3000/api/media/manifest |

BE báo lỗi và không khởi động nếu không kết nối được MongoDB. FE vẫn có thể chạy để chơi local với tài nguyên đi kèm.

## 5. Upload ảnh và âm thanh lên Cloudinary

Sau khi điền Cloudinary và MongoDB trong `be/.env`:

```bash
npm run media:upload
```

Script đọc ảnh/audio từ `fe/public/assets`, upload bằng Cloudinary SDK phía backend, rồi upsert metadata vào collection `mediaassets` trong MongoDB. WAV được upload theo `resource_type: video` (cách Cloudinary xử lý audio). `public_id` cố định giúp chạy lại sau lỗi không nhân đôi asset; asset cùng tên sẽ được cập nhật.

FE gọi `/api/media/manifest` để lấy URL Cloudinary. Nếu chưa cấu hình hoặc API chưa hoạt động, ảnh/audio local vẫn dùng được. Font dùng hệ thống, nhạc nền Web Audio sinh tại runtime; 16 file hiệu ứng WAV và ảnh được upload.

Không có endpoint upload công khai. Chỉ người vận hành chạy script với khóa backend, tránh khách chơi sử dụng tài khoản Cloudinary của bạn để upload tùy ý.

## 6. Tài khoản và tiến trình

1. Mở **Tài khoản & bản lưu**.
2. Đăng ký / đăng nhập (mật khẩu tối thiểu 8 ký tự).
3. Trên thiết bị mới: tải bản lưu trước. Tài khoản mới: chọn lưu.
4. Sau lần tải/lưu thành công, tự đồng bộ mỗi khoảng 2,5 giây khi có thay đổi.
5. Revision khác nhau trả 409; game dừng đồng bộ để người chơi chọn bản cần giữ.

Mật khẩu scrypt + salt. Token ngẫu nhiên lưu ở sessionStorage, backend chỉ lưu hash với TTL 7 ngày. Đăng xuất hủy phiên trên MongoDB.

Lưu game dùng điều kiện `_id + revision` trong một cập nhật nguyên tử. Mã bạn bè và nhận thưởng dùng transaction nhiều tài liệu: cần Atlas hoặc replica set, không dùng MongoDB standalone cho tính năng này. Quà được cộng trực tiếp vào bản lưu máy chủ; gọi nhận lại không cộng lặp.

Tiền game vẫn do client quản lý: kiến trúc single-player, chưa chống gian lận hoặc phù hợp xếp hạng có giải thưởng thật. Rate limit auth lưu trong process; nếu chạy nhiều BE instance, nên chuyển rate-limit store sang dịch vụ chung.

## 7. Cấu trúc source

```
fe/
  src/
    App.vue                     Vue Single File Component, giao diện chính
    components/Station.vue      Trộn/nướng/cuốn và khay nguyên liệu
    components/AccountPanel.vue Đăng nhập, cloud save và referral
    components/Sprite.vue       Hình atlas
    composables/useGame.js      Reactive state, thao tác và vòng game
    services/api.js             HTTP + timeout + lỗi API
    services/media.js           Media manifest và URL local/Cloudinary
    services/audio.js           Web Audio + hiệu ứng WAV
    style.css                   Giao diện PC/mobile
  public/assets/                Bộ ảnh/audio gốc và fallback
  .env.example                  Chỉ VITE_API_URL
  vite.config.js
be/
  src/
    server.js                   Khởi động, shutdown
    app.js                      Express routes + middleware
    auth.js                     scrypt, bearer sessions
    models.js                   Mongoose User, Session, MediaAsset
    database.js                 Kết nối và unique/TTL indexes
    config.js                   Kiểm tra cấu hình
    cloudinary.js               SDK cấu hình phía backend
  scripts/upload-media.js       Upload ảnh/audio và lưu URL vào MongoDB
  tests/mongo.test.js            Integration test với DB test riêng
  .env.example
shared/                         Luật chơi, công thức, schema kiểm tra bản lưu
tests/                          Unit/API guard/Vue composable tests
dist/                           FE production đã build, không phải source chính
compose.yaml                    MongoDB replica set local
package.json                    npm workspaces và lệnh root
package-lock.json
```

`fe/` và `be/` độc lập về tiến trình và cấu hình nhưng dùng `shared/` trong cùng repository. Khi deploy BE hãy giữ thư mục `shared/`; không chỉ upload riêng `be/` mà bỏ thư mục này.

## 8. Build và deploy

```bash
npm run build
npm run preview
```

FE build ra **`dist/` tại root**. Preview ở cổng 4173. Upload `dist/` lên hosting tĩnh HTTPS. Không cần chạy Node backend để phục vụ FE.

BE chạy trên host hỗ trợ Node.js, có biến môi trường MongoDB/Cloudinary:

```bash
npm ci
npm run start:be
```

Trong production:

- Đặt `VITE_API_URL=https://api.ten-mien-cua-ban/api` trước khi build FE.
- Đặt `CLIENT_ORIGINS=https://ten-mien-fe-cua-ban` trên BE.
- Dùng HTTPS cho cả hai. Chỉ đặt `TRUST_PROXY=1` nếu BE thực sự nằm sau đúng một reverse proxy tin cậy.
- MongoDB Atlas giữ dữ liệu; BE không cần file database hoặc ổ đĩa dữ liệu riêng nữa.
- Upload media một lần; chạy lại khi đổi ảnh/audio.

Link Sites đã xuất bản là FE Vue 3 chơi local; **BE, MongoDB và Cloudinary của bạn chưa được cấu hình/deploy từ cuộc trò chuyện này**. Không coi UI đăng nhập là bằng chứng đã kết nối cloud thật.

## 9. Tương thích bản cũ

- Dùng lại khóa localStorage `gocpho-save-v2`, nên bản lưu 2.0/2.1 được giữ trên cùng origin.
- Trên domain khác: xuất JSON từ game cũ → Cài đặt → Nhập bản lưu trong game mới → đăng nhập và lưu lên MongoDB.
- Khách, món đang làm, nguyên liệu đã trừ, hai mặt nướng, thư khách quen được khôi phục.
- File `server/data/database.json` từ bản cũ không tự nhập vào MongoDB. Nếu bạn đã có tài khoản thật từ bản cũ, giữ bản sao file này và chuyển tiến trình qua xuất/nhập game; tạo tài khoản mới trên BE MongoDB. Source mới không xóa file database trên máy của bạn.

## 10. Kiểm thử

```bash
npm test
npm run test:mongo
```

- 16 tests local đã đạt: luật chơi, khôi phục món, Vue composable, hashing, validation, Mongo schema/indexes, CORS và API guards.
- `test:mongo` mặc định SKIP khi thiếu `MONGODB_TEST_URI`. Trỏ biến đó vào một database test riêng có replica set để chạy đăng ký thật, hai lưu đồng thời, referral, quà và logout.
- Chưa chạy integration MongoDB thật hoặc upload Cloudinary thật vì chưa có cấu hình tài khoản. Không có Docker/mongod sẵn trong môi trường bàn giao.
- FE production build đã đạt; chưa QA giao diện trên điện thoại thật.

Giữ toàn bộ gameplay 2.1: 7 công thức, 19 nguyên liệu, 4 cấp tiệm, nướng hai mặt, 12 thư khách quen, nâng cấp, nhiệm vụ, bầu cua xu game, 16 SFX và nhạc nền.
