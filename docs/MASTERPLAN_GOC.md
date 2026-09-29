# 🍜 KẾ HOẠCH TỔNG THỂ & CHI TIẾT DỰ ÁN: TIỆM BÁNH TRÁNG TRỘN
> **Tên dự án:** Tiệm Bánh Tráng Trộn (`tiem-banh-trang-tron`)  
> **Phiên bản:** `1.0.0`  
> **Phong cách hình ảnh & Typography:** Đồng bộ chuẩn **Tiệm Trà Nhỏ** (Font `Baloo 2`, bảng màu Pastel Ấm Áp, Gỗ Nâu & Kem Sáng, Mái Bạt Sọc Rung Rinh, Bảng Phấn Gỗ Cổ Điển)  
> **Kiến trúc Fullstack:** **Vue 3 (Vite + Pinia) + Node.js (Express API) + MongoDB Atlas + Cloudinary CDN + Render Free Tier**  
> **Chi phí vận hành:** **0 VNĐ (100% Miễn Phí Vĩnh Viễn)**

---

## 📑 MỤC LỤC
1. [Hệ Thống Thiết Kế Giao Diện & Font Chữ (CSS & Design System)](#1-hệ-thống-thiết-kế-giao-diện--font-chữ-css--design-system)
2. [Cốt Truyện & Vòng Lặp Trò Chơi (Gameplay Loop)](#2-cốt-truyện--vòng-lặp-trò-chơi-gameplay-loop)
3. [Mô Hình Dữ Liệu Nguyên Liệu & Công Thức Chế Biến (`ITEMS`)](#3-mô-hình-dữ-liệu-nguyên-liệu--công-thức-chế-biến-items)
4. [Kiến Trúc Kỹ Thuật Tổng Thể (System Architecture)](#4-kiến-trúc-kỹ-thuật-tổng-thể-system-architecture)
5. [Cơ Sở Dữ Liệu MongoDB Atlas (Mongoose Schemas)](#5-cơ-sở-dữ-liệu-mongodb-atlas-mongoose-schemas)
6. [Hệ Thống API Backend (Node.js / Express)](#6-hệ-thống-api-backend-nodejs--express)
7. [Cấu Trúc Frontend Vue 3 & Pinia Store](#7-cấu-trúc-frontend-vue-3--pinia-store)
8. [Quản Lý Hình Ảnh & Âm Thanh Qua Cloudinary CDN](#8-quản-lý-hình-ảnh--âm-thanh-qua-cloudinary-cdn)
9. [Cơ Chế Đồng Bộ Đám Mây & Tiếp Thị Rủ Bạn Cứu Két (+300k)](#9-cơ-chế-đồng-bộ-đám-mây--tiếp-thị-rủ-bạn-cứu-két-300k)
10. [Hệ Thống Minigames Đường Phố (Bầu Cua Tôm Cá & Lô Tô)](#10-hệ-thống-minigames-đường-phố-bầu-cua-tôm-cá--lô-tô)
11. [Hướng Dẫn Triển Khai Deploy Miễn Phí 0đ (Render & Vercel)](#11-hướng-dẫn-triển-khai-deploy-miễn-phí-0đ-render--vercel)
12. [Lộ Trình Triển Khai Chi Tiết Từng Bước (Roadmap)](#12-lộ-trình-triển-khai-chi-tiết-từng-bước-roadmap)

---

## 1. Hệ Thống Thiết Kế Giao Diện & Font Chữ (CSS & Design System)

Để giữ trọn vẹn nét vẽ hoạt hình dễ thương, mộc mạc và ấm cúng giống hệt **Tiệm Trà Nhỏ**, hệ thống giao diện được chuẩn hóa với các thông số sau:

### 1.1. Typography (Phông chữ Google Font)
- **Phông chữ chính:** `"Baloo 2"` (Google Fonts) hỗ trợ tiếng Việt đầy đủ với các đường cong bo tròn, nét đậm dày dặn tạo cảm giác vui nhộn, thân thiện.
- **Font-family CSS:**
  ```css
  @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700;800&display=swap');

  body, button, input, dialog {
    font-family: "Baloo 2", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  }
  ```

### 1.2. Bảng Màu Hệ Thống (Color Palette Tokens)
Game luôn duy trì **nền kem sáng (Light theme)** để tôn lên các nét vẽ đồ ăn:

```css
:root {
  color-scheme: only light;
  
  /* Nền & Chữ cơ bản */
  --bg: #fdf3e4;           /* Nền kem sáng ấm áp */
  --panel: #fffaf2;        /* Nền thẻ panel / modal */
  --ink: #3a2317;          /* Màu chữ nâu đậm cà phê */
  --soft: #7a5a48;         /* Chữ phụ / mô tả */
  --line: #ead7bd;         /* Đường kẻ phân cách */

  /* Đồ gỗ & Quầy xe bánh tráng */
  --counter: #8a5a3b;      /* Gỗ quầy xe đẩy */
  --counter-top: #a8714c;  /* Mặt bàn gỗ */
  --chalk: #2f4a3a;        /* Bảng phấn xanh rêu cổ điển */
  --chalk-ink: #f4efe2;    /* Phấn trắng ghi menu */

  /* Màu sắc món ăn & Điểm nhấn */
  --red-sa-te: #e04a3f;    /* Đỏ sa tế / Khô bò (Chủ đạo) */
  --orange-bt: #f59342;    /* Cam bánh tráng tôm / Tép sấy */
  --yellow-butter: #f5c842;/* Vàng bơ trứng / Muối tôm */
  --green-mango: #4fa883;  /* Xanh xoài / Rau răm tươi */
  --warn: #e2574c;         /* Cảnh báo hỏng / Cháy bánh */
  --gold: #f0b43c;         /* Sao danh tiếng / Tiền vàng */
}
```

### 1.3. Các Thành Phần UI Đặc Trưng Của Tiệm
1. **Mái bạt sọc đung đưa (`.awning`):**
   - Mái che sọc đỏ-trắng / cam-trắng có chân cong tròn trang trí đầu trang.
2. **Bảng phấn menu gỗ (`.board`):**
   - Nền xanh rêu `--chalk`, viền gỗ dày 8px `--counter`, chữ phấn trắng viết tay `--chalk-ink`.
3. **Nút bấm 3D Retro (`.sbtn` / `.pbtn`):**
   - Bo góc 10-14px, đổ bóng viền dưới `box-shadow: 0 3px 0 rgba(0,0,0,0.15)`, bấm xuống lún `transform: translateY(2px)`.
4. **Hộp thoại / Dialog Modal (`dialog`):**
   - Hiệu ứng backdrop làm mờ nhẹ, bo góc 20px với đường viền bánh quy vintage.

---

## 2. Cốt Truyện & Vòng Lặp Trò Chơi (Gameplay Loop)

### 2.1. Tiến trình Nâng Cấp Quán (Progression Levels)
1. **Cấp 1 - Gánh Bánh Tráng Vỉa Hè:** 1 cây kéo, 1 thau nhôm, menu gồm Bánh tráng phơi sương, xoài, tép, muối tôm.
2. **Cấp 2 - Quán Cóc Ghế Nhựa:** Mua thêm bếp than nướng bánh tráng Đà Lạt, thêm khô bò, sốt me.
3. **Cấp 3 - Tiệm Trà Chanh & Bánh Tráng:** Mở rộng thực đơn bánh tráng cuốn bơ, khô mực xé, mua tủ kính bảo quản xoài không bị thâm.
4. **Cấp 4 - Chuỗi Quán Ăn Vặt Hiện Đại:** Thuê thêm phụ bếp, máy cắt bánh tự động, phục vụ hàng chục khách mỗi phút.

### 2.2. Vòng lặp gameplay mỗi ngày (Daily Game Loop)
```
[1. Đầu Ngày: Nhập Hàng] ──► [2. Trong Ngày: Đón Khách & Chế Biến] ──► [3. Cuối Ngày: Doanh Thu & Nâng Cấp]
   - Kiểm tra hạn dùng          - Nhận đơn (Trộn / Nướng / Cuốn)        - Tính lãi/lỗ & trừ đồ thiu
   - Mua sỉ nguyên liệu         - Tương tác thau nhôm & vỉ than         - Mở khóa topping mới
   - Cân đối vốn trong két      - Đóng gói & Thu tiền boa                - Chơi Bầu Cua giải trí
```

---

## 3. Mô Hình Dữ Liệu Nguyên Liệu & Công Thức Chế Biến (`ITEMS`)

Mỗi nguyên liệu có thông số:
- `id` (Mã), `name` (Tên), `shortName` (Tên viết tắt trên nút), `color` (Màu đại diện), `lifeDays` (Hạn dùng theo ngày trong game), `cost` (Giá nhập), `sell` (Giá tính vào món), `unlockCost` (Giá mở khóa), `icon` (Tên icon).

```javascript
export const ITEMS = {
  // 1. CỐT BÁNH TRÁNG (BASE)
  bt_phoisuong: { name: 'Bánh tráng phơi sương', shortName: 'Phơi sương', type: 'base', color: '#fff8e7', lifeDays: 5, cost: 3000, sell: 15000, unlockCost: 0, icon: 'bt_phoisuong.png' },
  bt_deotom:    { name: 'Bánh tráng dẻo tôm',    shortName: 'Dẻo tôm',    type: 'base', color: '#f5a07c', lifeDays: 7, cost: 3500, sell: 18000, unlockCost: 0, icon: 'bt_deotom.png' },
  bt_trang:     { name: 'Bánh tráng trắng sợi',  shortName: 'Trắng cắt',  type: 'base', color: '#ffffff', lifeDays: 10, cost: 2000, sell: 12000, unlockCost: 0, icon: 'bt_trang.png' },
  bt_nuong:     { name: 'Bánh tráng mè nướng',   shortName: 'Mè nướng',   type: 'base', color: '#e6c280', lifeDays: 15, cost: 3000, sell: 20000, unlockCost: 150000, icon: 'bt_nuong.png' },

  // 2. TOPPING MẶN & GIÒN (TOPPING)
  tb_khobo:     { name: 'Khô bò đỏ xé sợi',      shortName: 'Khô bò',     type: 'top', color: '#a83232', lifeDays: 10, cost: 4000, sell: 10000, unlockCost: 0, icon: 'tb_khobo.png' },
  tb_khoga:     { name: 'Khô gà lá chanh',       shortName: 'Khô gà',     type: 'top', color: '#d4923b', lifeDays: 10, cost: 3000, sell: 8000, unlockCost: 100000, icon: 'tb_khoga.png' },
  tb_khomuc:    { name: 'Khô mực xé cay',        shortName: 'Khô mực',    type: 'top', color: '#d6b080', lifeDays: 10, cost: 4500, sell: 12000, unlockCost: 250000, icon: 'tb_khomuc.png' },
  tb_trungcut:  { name: 'Trứng cút luộc/chiên',  shortName: 'Trứng cút',  type: 'top', color: '#fff6d1', lifeDays: 2, cost: 2000, sell: 6000, unlockCost: 0, icon: 'tb_trungcut.png' },
  tb_teprang:   { name: 'Ruốc tép sấy giòn',     shortName: 'Tép sấy',    type: 'top', color: '#e66d43', lifeDays: 15, cost: 1500, sell: 5000, unlockCost: 0, icon: 'tb_teprang.png' },
  tb_hanhphi:   { name: 'Hành phi vàng giòn',    shortName: 'Hành phi',   type: 'top', color: '#b87932', lifeDays: 15, cost: 1000, sell: 4000, unlockCost: 0, icon: 'tb_hanhphi.png' },
  tb_dauphong:  { name: 'Đậu phộng rang giòn',   shortName: 'Đậu phộng',  type: 'top', color: '#d99b66', lifeDays: 20, cost: 1000, sell: 3000, unlockCost: 0, icon: 'tb_dauphong.png' },

  // 3. RAU CỦ TƯƠI (VEG - HẠN DÙNG NGẮN)
  v_xoai:       { name: 'Xoài xanh bào sợi',     shortName: 'Xoài sợi',   type: 'veg', color: '#a3c742', lifeDays: 1, cost: 1500, sell: 4000, unlockCost: 0, icon: 'v_xoai.png' },
  v_rauram:     { name: 'Rau răm tươi',          shortName: 'Rau răm',    type: 'veg', color: '#4d8236', lifeDays: 1, cost: 500, sell: 2000, unlockCost: 0, icon: 'v_rauram.png' },
  v_tac:        { name: 'Nước tắc tươi',         shortName: 'Tắc tươi',   type: 'veg', color: '#9ec936', lifeDays: 3, cost: 500, sell: 2000, unlockCost: 0, icon: 'v_tac.png' },

  // 4. NƯỚC SỐT & GIA VỊ (SAUCE)
  s_sotme:      { name: 'Sốt me chua ngọt',      shortName: 'Sốt me',     type: 'sauce', color: '#66321f', lifeDays: 7, cost: 1500, sell: 5000, unlockCost: 0, icon: 's_sotme.png' },
  s_botrung:    { name: 'Sốt bơ trứng béo',      shortName: 'Sốt bơ',     type: 'sauce', color: '#fce374', lifeDays: 4, cost: 2500, sell: 7000, unlockCost: 150000, icon: 's_botrung.png' },
  s_nuocbo:     { name: 'Nước sốt bò đen',       shortName: 'Nước bò',    type: 'sauce', color: '#3b2219', lifeDays: 7, cost: 1500, sell: 5000, unlockCost: 0, icon: 's_nuocbo.png' },
  s_sate:       { name: 'Dầu sa tế ớt cay',      shortName: 'Sa tế cay',  type: 'sauce', color: '#c72c1e', lifeDays: 15, cost: 1000, sell: 3000, unlockCost: 0, icon: 's_sate.png' },
  s_muoitom:    { name: 'Muối tôm Tây Ninh',     shortName: 'Muối tôm',   type: 'sauce', color: '#e06538', lifeDays: 30, cost: 500, sell: 2000, unlockCost: 0, icon: 's_muoitom.png' }
};
```

---

## 4. Kiến Trúc Kỹ Thuật Tổng Thể (System Architecture)

```
                            ┌─────────────────────────────────────────┐
                            │        FRONTEND: VUE 3 + VITE (SPA)     │
                            │  Pinia Store ('bttShop') + CSS Design   │
                            └──────────────┬──────────────────────────┘
                                           │
                    ┌──────────────────────┴──────────────────────┐
                    │ Request Assets & Audio                      │ REST API + JWT Token
                    ▼                                             ▼
     ┌─────────────────────────────┐               ┌─────────────────────────────┐
     │    CLOUDINARY MEDIA CDN     │               │   NODE.JS BACKEND ON RENDER │
     │  (Auto WebP, Resize, Audio) │               │      (Express.js API)       │
     └─────────────────────────────┘               └──────────────┬──────────────┘
                                                                  │ Mongoose Connection
                                                                  ▼
                                                   ┌─────────────────────────────┐
                                                   │    MONGODB ATLAS (M0 Free)  │
                                                   │  (Users, Saves, Referrals)  │
                                                   └─────────────────────────────┘
```

---

## 5. Cơ Sở Dữ Liệu MongoDB Atlas (Mongoose Schemas)

### 5.1. `User` Model (`server/models/User.js`)
```javascript
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, lowercase: true, trim: true },
  displayName: { type: String, required: true, trim: true },
  passwordHash: { type: String, required: true },
  salt: { type: String, required: true },
  referralCode: { type: String, unique: true, index: true },
  referredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', UserSchema);
```

### 5.2. `CloudSave` Model (`server/models/CloudSave.js`) — Version Lock chống đè dữ liệu
```javascript
import mongoose from 'mongoose';

const CloudSaveSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
  saveData: { type: Object, required: true }, // Toàn bộ State Game JSON (tiền, ngày, kho, level)
  revision: { type: Number, default: 1 },     // Tăng dần mỗi lần lưu để kiểm tra xung đột
  clientUpdatedAt: { type: Number },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('CloudSave', CloudSaveSchema);
```

### 5.3. `ReferralReward` Model (`server/models/ReferralReward.js`)
```javascript
import mongoose from 'mongoose';

const ReferralRewardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  pendingAmount: { type: Number, default: 0 }, // Tiền cứu két +300.000đ chờ nhận
  totalEarned: { type: Number, default: 0 },   // Tổng tiền thưởng đã nhận
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('ReferralReward', ReferralRewardSchema);
```

---

## 6. Hệ Thống API Backend (Node.js / Express)

| Phương thức | Endpoint | Chức năng chi tiết |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Kiểm tra server hoạt động (dùng ping UptimeRobot chống ngủ). |
| `POST` | `/api/auth/register` | Đăng ký tài khoản chủ tiệm mới, băm mật khẩu, tạo mã Ref riêng. |
| `POST` | `/api/auth/login` | Đăng nhập tài khoản, trả về JWT Token & thông tin người chơi. |
| `GET` | `/api/auth/me` | Lấy thông tin user hiện tại qua `Bearer Token`. |
| `GET` | `/api/account/save` | Tải dữ liệu tiến trình tiệm bánh từ MongoDB về máy. |
| `PUT` | `/api/account/save` | Tự động lưu tiến trình. Nếu `revision` gửi lên cũ hơn DB $\rightarrow$ trả `HTTP 409 Conflict`. |
| `GET` | `/api/referral/me` | Lấy mã giới thiệu và link ref của người chơi. |
| `POST` | `/api/referral/claim` | Nhập mã giới thiệu bạn bè nhận **+300.000đ cứu két**. |
| `POST` | `/api/referral/rewards/take` | Rút tiền thưởng giới thiệu cộng thẳng vào két tiền quán bánh tráng. |

---

## 7. Cấu Trúc Frontend Vue 3 & Pinia Store

```text
tiem-banh-trang-tron/
├── client/                              # FRONTEND VUE 3
│   ├── public/
│   │   ├── favicon.ico
│   │   └── manifest.webmanifest         # PWA Manifest
│   ├── src/
│   │   ├── assets/
│   │   │   ├── style.css                # CSS Design System Baloo 2 + Palette
│   │   │   └── animations.css           # Hiệu ứng cắt, lắc, nướng, rớt tiền
│   │   ├── components/
│   │   │   ├── HeaderBar.vue            # Mái bạt sọc, tiền, level, ngày, nút Cloud
│   │   │   ├── CustomerQueue.vue        # Hàng khách đứng đợi với bong bóng order
│   │   │   ├── MixingStation.vue        # Trạm trộn (Thau nhôm, kéo cắt, thêm sốt)
│   │   │   ├── GrillStation.vue         # Trạm nướng bánh tráng Đà Lạt (Vỉ than hồng)
│   │   │   ├── StoreInventory.vue       # Bảng gỗ nhập nguyên liệu sỉ đầu ngày
│   │   │   ├── BauCuaModal.vue          # Minigame Bầu Cua Tôm Cá
│   │   │   ├── ReferralModal.vue        # Popup QR chia sẻ rủ bạn cứu két +300k
│   │   │   └── AccountModal.vue         # Modal Đăng ký / Đăng nhập / Đồng bộ Cloud
│   │   ├── stores/
│   │   │   ├── gameStore.js             # Quản lý: Tiền, ngày, kho, khách, danh tiếng
│   │   │   └── authStore.js             # Quản lý: User, token, auto-sync, revision
│   │   ├── utils/
│   │   │   ├── cloudinary.js            # Helper tải ảnh CDN tối ưu
│   │   │   └── sound.js                 # Bộ phát âm thanh Web Audio API
│   │   ├── App.vue                      # Layout khung ứng dụng
│   │   └── main.js                      # Khởi tạo Vue, Pinia
│   ├── package.json
│   └── vite.config.js
│
├── server/                              # BACKEND NODE.JS
│   ├── config/db.js                     # Kết nối MongoDB Atlas
│   ├── controllers/                     # authController, saveController, refController
│   ├── models/                          # User, CloudSave, ReferralReward
│   ├── routes/                          # authRoutes, saveRoutes, refRoutes
│   ├── middlewares/auth.js              # Xác thực JWT Token
│   ├── server.js                        # Entry point Express
│   └── package.json
│
└── package.json                         # Root Monorepo Scripts
```

---

## 8. Quản Lý Hình Ảnh & Âm Thanh Qua Cloudinary CDN

### Cấu trúc Folder Cloudinary:
```text
tiem-banh-trang-tron/
├── bg/                 # bg_street.webp, bg_night.webp, kho.webp, splash.webp
├── props/              # thau_inox.png, bep_than.png, keo_cat.png, bich_tron.png
├── toppings/           # bt_phoisuong.png, tb_khobo.png, v_xoai.png, s_sotme.png...
├── characters/         # faces.webp (Spritesheet khuôn mặt khách hàng)
├── baucua/             # bau.png, cua.png, tom.png, ca.png, ga.png, nai.png, xocdia.png
└── audio/              # sfx_cut.mp3, sfx_mix.mp3, sfx_grill.mp3, bgm_lofi.mp3
```

---

## 9. Cơ Chế Đồng Bộ Đám Mây & Tiếp Thị Rủ Bạn Cứu Két (+300k)

### 9.1. Tự động đồng bộ không lo mất mạng
- Tiến trình chơi được cập nhật tức thì vào `localStorage.setItem('bttShop', ...)`.
- Khi người chơi đã đăng nhập:
  - **Debounce 2.5s:** Tự động gửi dữ liệu lên server sau mỗi thao tác bán hàng xong 2.5s.
  - **Xử lý Xung Đột (Revision Lock):** Nếu máy khác đã lưu bản mới hơn $\rightarrow$ Server trả về `HTTP 409 Conflict`, Vue 3 sẽ hiện thông báo cho phép người chơi chọn: *"Tải bản Cloud về máy"* hoặc *"Ghi đè bản trên máy này lên Cloud"*.

### 9.2. Viral Marketing: Cứu Két Xe Bánh Tráng
- Khi số dư của người chơi dưới 5.000đ (cháy túi không đủ nhập bánh):
  - Tự động bật Modal: *"Cháy túi rồi! Rủ bạn cùng mở quán nhận ngay +300.000đ cứu két"*.
  - Tạo link ref độc nhất: `https://tiembanhtrang.vercel.app/?ref=MÃ_BẠN`.
  - Tự vẽ thẻ Card QR Code trên HTML5 Canvas để tải về gửi nhanh qua Zalo/Facebook.
  - Người được mời đăng nhập $\rightarrow$ Cả 2 cùng nhận được **+300.000đ tiền vốn** cộng thẳng vào két.

---

## 10. Hệ Thống Minigames Đường Phố (Bầu Cua Tôm Cá & Lô Tô)

1. **Bầu Cua Tôm Cá Vỉa Hè (`BauCuaModal.vue`):**
   - Đặt cược 6 tụ (Bầu, Cua, Tôm, Cá, Gà, Nai) bằng chính tiền kiếm được từ tiệm bánh.
   - Hiệu ứng mở nắp thau nhôm lắc xí ngầu hồi hộp, trả thưởng x1, x2, x3.
2. **Quay Số Lô Tô May Mắn:**
   - Mỗi ngày đăng nhập được 1 lượt quay miễn phí nhận xoài tươi, khô bò thượng hạng hoặc tiền mặt.

---

## 11. Hướng Dẫn Triển Khai Deploy Miễn Phí 0đ (Render & Vercel)

### Bước 1: Tạo MongoDB Atlas M0 (Free 512MB)
1. Đăng ký tài khoản tại [mongodb.com](https://www.mongodb.com).
2. Tạo 1 Cluster M0 Free (Khu vực Singapore / APAC).
3. Lấy chuỗi kết nối: `mongodb+srv://<user>:<password>@cluster0.mongodb.net/tiembanhtrang?retryWrites=true&w=majority`.

### Bước 2: Deploy Backend Node.js lên Render (Web Service Free)
1. Đăng nhập [render.com](https://render.com), chọn **New Web Service**.
2. Root Directory: `server`, Build Command: `npm install`, Start Command: `node server.js`.
3. Điền Environment Variables:
   - `MONGO_URI`: Chuỗi kết nối MongoDB Atlas.
   - `JWT_SECRET`: Khóa bí mật token ngẫu nhiên.
   - `CLIENT_ORIGIN`: URL Frontend (Vercel / Render).
4. Cài đặt cron job miễn phí tại [uptimerobot.com](https://uptimerobot.com) ping URL `https://your-api.onrender.com/api/health` mỗi 10 phút để server không bao giờ bị ngủ.

### Bước 3: Deploy Frontend Vue 3 lên Vercel
1. Đăng nhập [vercel.com](https://vercel.com), import repo.
2. Root Directory: `client`, Build Command: `npm run build`, Output Directory: `dist`.
3. Điền Environment Variables:
   - `VITE_API_URL`: `https://your-api.onrender.com/api`
   - `VITE_CLOUDINARY_CLOUD_NAME`: Tên Cloudinary của bạn.

---

## 12. Lộ Trình Triển Khai Chi Tiết Từng Bước (Roadmap)

```
[Giai đoạn 1: Khởi tạo Monorepo]
  ├── Tạo client/ (Vue 3 + Vite + Pinia) & server/ (Express + Mongoose)
  └── Thiết lập package.json và cài đặt dependencies

[Giai đoạn 2: Xây dựng CSS Design System chuẩn Baloo 2]
  ├── Nhúng font Baloo 2, CSS Variables (palette, awning mái bạt, board bảng gỗ)
  └── Xây dựng các UI component cơ bản (HeaderBar, Mái bạt, Nút bấm 3D)

[Giai đoạn 3: Xây dựng Backend REST API & MongoDB]
  ├── Mongoose Models (User, CloudSave, ReferralReward)
  └── Auth JWT, Save Sync Revision 409, Referral Claim APIs

[Giai đoạn 4: Phát triển Trạm Trộn & Trạm Nướng Gameplay]
  ├── MixingStation.vue: Cắt bánh, thêm sốt, xoài, tép, bóp trộn
  ├── GrillStation.vue: Đập trứng cút, quét bơ, nướng vỉ than
  └── Quản lý hạn sử dụng nguyên liệu trong kho

[Giai đoạn 5: Tích hợp Minigames & Referral Viral Marketing]
  ├── BauCuaModal.vue: Lắc xúc xắc Bầu Cua cá cược
  └── ReferralModal.vue: Vẽ Card QR Canvas mời bạn nhận +300k

[Giai đoạn 6: Test Suite, PWA Offline & Deploy Production]
  └── Test đồng bộ Cloud, Deploy BE lên Render + FE lên Vercel (0đ)
```

---
*Tài liệu được biên soạn độc quyền cho dự án Tiệm Bánh Tráng Trộn chuẩn phong cách Tiệm Trà Nhỏ.*
