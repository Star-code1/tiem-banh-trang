# Kiến trúc 3.0

| Tầng | Công nghệ | Trách nhiệm |
|---|---|---|
| Frontend | Vue 3 Composition API, Vite, SFC | Giao diện reactive, game loop, local save, API client |
| Backend | Node.js 22.12+, Express 5 | Auth, cloud save, referral, media manifest |
| Database | MongoDB + Mongoose | User với save/revision, hashed Session TTL, MediaAsset |
| Media | Cloudinary Node SDK | Ảnh và WAV, URL được lưu MongoDB |
| Shared | ES Modules thuần | Items, recipes, gameplay engine, save validation |

Luồng media: CLI BE → Cloudinary upload → upsert MediaAsset MongoDB → FE GET /api/media/manifest → tải CDN URL. Secret chỉ được đọc trong BE. Khi manifest chưa có, FE dùng bundled assets.

Luồng save: Vue reactive state → localStorage → authenticated PUT /api/account/save với revision → Mongo findOneAndUpdate có điều kiện revision → revision + 1. Hai request cùng revision chỉ một được nhận; request kia 409.

Luồng quà: transaction đánh dấu referredBy một lần, tăng pendingAmount của hai tài khoản. Nhận quà ghi thẳng vào saved cash cùng tăng revision và xóa pending. FE thay thế bằng snapshot trả về, không cộng tiền local thêm lần nữa.

UI không dùng innerHTML để dựng game. App.vue, Station.vue, AccountPanel.vue, Sprite.vue dùng template Vue, v-for/v-if/v-model và event binding. useGame điều khiển lifecycle, hủy timer/listener khi unmount.

## API

| Method | Endpoint | Auth |
|---|---|---|
| GET | /api/health | Không |
| GET | /api/media/manifest | Không |
| POST | /api/auth/register | Không, rate-limited |
| POST | /api/auth/login | Không, rate-limited |
| POST | /api/auth/logout | Bearer |
| GET | /api/auth/me | Bearer |
| GET, PUT | /api/account/save | Bearer |
| GET | /api/referral/me | Bearer |
| POST | /api/referral/claim | Bearer |
| POST | /api/referral/rewards/take | Bearer + revision |

## Tài liệu tham chiếu

- Vue SFC/Vite: https://vuejs.org/guide/quick-start
- Mongoose atomic update: https://mongoosejs.com/docs/tutorials/findoneandupdate
- Mongoose transactions: https://mongoosejs.com/docs/transactions.html
- Cloudinary Node SDK: https://cloudinary.com/documentation/node_integration
- Cloudinary audio: https://cloudinary.com/documentation/audio_transformations
