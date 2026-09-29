# Tài nguyên

- `fe/public/assets/street.webp`: tranh quầy phố, tạo mới bằng Imagegen; tối ưu từ 1536×1024.
- `fe/public/assets/atlas.webp`: atlas chuẩn hóa 4×4 từ ảnh Imagegen, 1024×1024. Chỉ cắt và bố trí lại các ô để dùng trong game.
- `fe/public/assets/icon-192.png`, `icon-512.png`: icon ứng dụng từ phần món ăn.
- Prompt gốc đầy đủ: `ART_PROMPTS.txt`.
- Không sử dụng ảnh/tên nhân vật của Tiệm Trà Nhỏ. Bản sắc chung ấm áp được phát triển thành bộ tranh mới.

## Âm thanh

16 WAV mono 22.05kHz, PCM 16-bit: click, cut, sprinkle, pour, mix, grill, roll, arrival, hello, thanks, coin, wrong, upgrade, cat, dice, rain.

Tạo gốc bằng tổng hợp sóng/noise trong `scripts/generate-audio.py`, seed cố định. Nhạc nền pentatonic/chord nhẹ tạo trực tiếp trong `audio.js`. Không có nhạc hoặc bản thu có bản quyền từ bên thứ ba. Tiếng chào/cảm ơn là âm tiết tổng hợp, không phải lời thoại tiếng Việt được đọc.

Có thể thay WAV cùng tên để giữ toàn bộ mapping hành động, hoặc chỉnh `audio.js`.

Bản 3.0: chạy npm run media:upload để đưa các asset này lên Cloudinary. URL lưu trong MongoDB; FE lấy qua API manifest.
