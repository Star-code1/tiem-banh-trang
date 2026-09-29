> Tài liệu lịch sử bản 2.x. Kiến trúc hiện hành 3.0 là Vue 3 + Node/Express + MongoDB + Cloudinary; xem README và ARCHITECTURE_V3.md.

# MASTERPLAN 2.0 — GÓC PHỐ NHỎ

## 1. Trục trải nghiệm

**Một tiệm nhỏ có cảm giác đang sống.** Mỗi thao tác người chơi tạo đồng thời phản hồi hình ảnh, âm thanh và kết quả gameplay. Giao diện là quầy chơi thật: khách ở trên, bàn chế biến ở giữa, khay nguyên liệu ở dưới. Thống kê và quản lý tiệm ở cạnh trên desktop, chuyển xuống dưới trên mobile.

Giữ từ bản gốc: bản sắc bánh tráng Việt, kem/gỗ/đỏ sa tế/xanh bảng phấn, vòng nhập hàng–bán–nâng cấp, nguyên liệu có hạn, ba kiểu chế biến, tiền boa, tài khoản, bản lưu revision và trò chơi góc phố.

Thay đổi kiến trúc có chủ đích: bản web tự chứa dùng ES Modules và backend Node không dependency để giải nén chạy ngay. Vue/Pinia, MongoDB Atlas, Cloudinary vẫn là phương án chuyển đổi khi quy mô cần, không được ghi nhận là đã tích hợp.

## 2. Những điểm mở rộng đã triển khai

| Hệ thống | Cách chơi | Giá trị mang lại |
|---|---|---|
| Nhịp tay đầu bếp | Canh kim vùng xanh khi trộn, nhấc bánh hoặc cuốn | Mỗi món có thao tác thay vì chỉ bấm nhận tiền |
| Chế độ Thư giãn / Cao điểm | Tự chọn khách có rời đi và thời gian ngày hay không | Người mới và người thích thử thách đều chơi được |
| Nhân vật góc phố | Linh, Minh, Bà Sáu, An; lời thoại và thời gian chờ khác nhau | Khách có cá tính dễ nhận biết |
| Combo tử tế | Làm đúng liên tiếp tăng phần tiền boa, giới hạn thưởng combo ở 8 | Nhịp phục vụ có mục tiêu |
| Nhiệm vụ ngày | Phục vụ 3 khách nhận 15.000 xu | Mục tiêu ngắn, dễ đạt |
| Tủ mát và lô hàng | Rau nhanh hỏng; tủ mát kéo dài hạn cho lô mua mới | Nâng cấp có tác dụng thực |
| Mưa ở góc phố | Mỗi ngày thứ ba có hiệu ứng mưa và âm thanh | Thay đổi không khí, không gây khó cho người chơi |
| Mèo Cam | Chạm mèo, nghe meo và bung tim | Tương tác thư giãn nhỏ |
| Quà & bầu cua | Một quà miễn phí/ngày game, bầu cua xu game | Hoạt động phụ sau ca |
| Xuất/nhập bản lưu | JSON được xác thực trước khi thay thế | Mang tiệm qua thiết bị không cần tài khoản |

## 3. Vòng chơi và kinh tế

Mở cửa → nhận khách → chọn đúng 4 thành phần → bắt đầu chế biến (trừ kho) → thao tác → phục vụ → nhận tiền → tái đầu tư.

- Vốn đầu: 150.000 xu; mỗi nguyên liệu có 8 phần làm quen.
- Món sai: không thanh toán, combo về 0; nguyên liệu không hoàn lại.
- Món đúng: giá gốc + boa theo 1–3 sao, combo, trang trí và độ nhanh.
- Công thức sao: trung bình chất lượng các nhịp, làm tròn 1–3.
- Vùng xanh nhịp: 38–65%; vùng chấp nhận: 23–80%; còn lại 1 sao.
- Boa: `giá × (sao / 3 × 0.15 + min(combo,8) × 0.025) × (1 + trang_trí × 0.1) × hệ_số_nhanh`.
- Tốc độ: còn hơn 60% kiên nhẫn thì hệ số 1.2, còn lại 1.
- Cứu vốn: dưới 5.000 xu có thể nhận 50.000 xu một lần/ngày game.
- Bầu cua: phí 5.000; trùng n mặt hoàn cược và thưởng `n × 5.000`; không trùng mất cược. Không quy đổi giá trị thật.

## 4. Nội dung

| Cấp | Điều kiện | Món mở thêm |
|---|---|---|
| 1 | Bắt đầu | Trộn góc phố, trộn khô bò, trộn trứng cút |
| 2 | 6 khách thành công | Nướng Đà Lạt, trộn lá chanh |
| 3 | 16 khách thành công | Cuốn bơ trứng, trộn hải vị |
| 4 | 35 khách thành công | Danh hiệu góc phố nổi tiếng |

19 nguyên liệu và thông số tập trung trong `dist/data.js`. Tất cả món dùng cấu hình, dễ thêm mà không viết lại engine.

Nâng cấp: dụng cụ (ít nhịp hơn), tủ mát (rau mua mới thêm 2 ngày), góc phố xinh (boa +10%/cấp), bạn phụ bếp (khách mới thêm 30 giây).

## 5. Ngôn ngữ chuyển động & âm thanh

| Hành động | Hình ảnh | Âm thanh |
|---|---|---|
| Khách đến | Trượt lên, đung đưa nhẹ | Chuông đến |
| Nhận đơn | Viền đơn, khung công thức | Tiếng chào tổng hợp |
| Thêm topping | Topping quanh thau, hạt sáng | Rắc khô / rót sốt |
| Cắt | Thau rung nhẹ | Hai nhát kéo |
| Trộn | Thau lắc qua lại, nhịp kim | Sột soạt và chạm kim loại |
| Nướng | Món nướng trong vùng thao tác | Xèo nhẹ |
| Cuốn | Chuyển động món và nhịp | Tiếng cuốn mềm |
| Phục vụ | Hạt sao, cập nhật két | Đồng xu + lời cảm ơn tổng hợp |
| Sai món/khách rời | Thông báo, mất combo | Âm báo trầm ngắn |
| Nâng cấp/mở quà | Hộp thoại và hạt sáng | Hợp âm đi lên |
| Vuốt mèo | Tim bay | Meo tổng hợp |

Âm thanh mở sau tương tác đầu tiên; dừng AudioContext khi ẩn tab; có âm lượng/tắt nhạc/tắt toàn bộ. Hiệu ứng tôn trọng `prefers-reduced-motion` và tùy chọn trong game. Nhịp kim là tín hiệu chức năng cần thiết nên vẫn hoạt động.

## 6. PC và mobile

- Mọi thao tác là click/tap; không bắt buộc hover, drag hoặc vuốt chính xác.
- Khay nguyên liệu tự chia 4 cột trên mobile; nút chế biến chính tối thiểu 44px.
- Bố cục 2 cột desktop, 1 cột mobile; các chức năng quản lý trong dialog.
- Phím tắt là bổ sung, không thay thế nút cảm ứng.
- Game tạm ngừng thời gian khách/ngày khi mở dialog hoặc chuyển tab.
- Dữ liệu localStorage và JSON; PWA tài nguyên tự chứa, không cần font/ảnh CDN.

## 7. Backend và dữ liệu

Node server phục vụ frontend và REST API cùng tiến trình. Mật khẩu scrypt, token opaque băm SHA-256, hết hạn 7 ngày, CORS allowlist, body limit, rate limit auth. Lưu file JSON qua rename nguyên tử. Revision tăng sau mỗi save, trả 409 nếu xung đột.

Đồng bộ tự động chỉ bật sau khi người dùng chủ động tải hoặc lưu thành công; debounce 2,5 giây; lỗi thì dừng để không ghi đè bản khác. Mã bạn bè nhận một lần/tài khoản, thưởng được nhận một lần từ pending balance.

Đây là game single-player tin cậy client, không phải kiến trúc chống gian lận. Khi có xếp hạng chung cần server-authoritative ledger cho mọi giao dịch và trạng thái món.

## 8. Các hướng đột phá và trạng thái sau 2.1

1. **Bưu thiếp khách quen — đã có 12 lá thư ở 2.1; chuỗi nhiều ngày và công thức vùng miền chưa có:** chuỗi câu chuyện nhiều ngày, mỗi khách mở một postcard và công thức vùng miền. Không chỉ tăng chỉ số.
2. **Bản đồ ẩm thực:** phố Hội → Sài Gòn → Đà Lạt; mỗi nơi có station và cảnh riêng.
3. **Sổ hương vị sáng tạo:** người chơi tự phối công thức, phản hồi theo chua/cay/béo/giòn, lưu món signature.
4. **Cử chỉ nâng cao tùy chọn:** xoay thau bằng vòng tròn, gấp cuốn bằng swipe; luôn có nút thay thế.
5. **Không gian âm thanh đa lớp:** bước chân theo bề mặt, chợ xa, tiếng mưa đổi theo mái che, pan theo vị trí vật thể.
6. **Co-op hai người:** một người sơ chế, một người phục vụ; cần backend realtime và thiết kế đồng bộ mới.
7. **Minigame nướng — đã có ở 2.1:** mô phỏng nhiệt tăng dần, ba mức lửa, hai mặt bánh, ngưỡng sống/chín/cháy. Đây là mô phỏng gameplay, không phải mô hình truyền nhiệt vật lý chính xác.
8. **Tùy biến quán:** mua đèn/cây/bàn ghế hiện vật; hiện tại nâng cấp chủ yếu có tác dụng gameplay.

Ưu tiên tiếp theo: QA trình duyệt thật → 19 icon riêng và 4 bộ cảnh cấp quán → câu chuyện khách quen → server-authoritative nếu cần tính cạnh tranh. Không mô tả roadmap như tính năng đã hoàn thành.

## 9. Bản 2.1

Thư khách quen, nướng hai mặt và khôi phục lượt chơi đã triển khai. Chi tiết sử dụng, giới hạn và bản lưu xem README cùng CHANGELOG. Các hướng còn lại ở mục 8 vẫn là roadmap.
