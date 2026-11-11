# Kết quả automation thực tế

Lần chạy: 2026-11-11T02:51:20.361Z. Chromium. Thời gian 250.7 giây.

45 test: **40 passed, 5 failed, 0 skipped, 0 timedOut**.

40 test core; 5 test UX @candidate. Xem docs/AUTOMATION-SCOPE.md trước khi diễn giải coverage. Không tính code coverage.

|ID|Nội dung|Kết quả|Thời gian|Evidence|
|---|---|---|---|---|
|AUTH-01|AUTH-01 — @smoke Đăng ký hợp lệ và đăng nhập tài khoản vừa tạo|passed|7.9s||
|AUTH-02|AUTH-02 — Đăng nhập bỏ trống hiển thị lỗi hai trường|passed|2.8s||
|AUTH-03|AUTH-03 — Sai tài khoản hoặc mật khẩu không được đăng nhập|passed|3.4s||
|AUTH-04|AUTH-04 — Mật khẩu trên form đăng nhập được che|passed|2.8s||
|AUTH-05|AUTH-05 — Đăng ký bỏ trống không tạo tài khoản|passed|3.4s||
|AUTH-06|AUTH-06 — Email sai định dạng bị chặn ở đăng ký|passed|4.8s||
|AUTH-07|AUTH-07 — @smoke Đăng xuất và F5 không khôi phục phiên|passed|9.8s||
|AUTH-08|AUTH-08 — Phiên đăng nhập còn sau F5|passed|7.5s||
|AUTH-09|AUTH-09 — Khách chưa đăng nhập không truy cập được hồ sơ cá nhân|passed|1.6s||
|AUTH-10|AUTH-10 — Không cho đăng ký trùng email đã tồn tại|passed|8.5s||
|HOME-01|HOME-01 — @smoke Trang chủ và danh sách điểm đến tải được|passed|1.1s||
|SEARCH-01|SEARCH-01 — Mở danh sách chọn địa điểm|passed|2.2s||
|SEARCH-02|SEARCH-02 — Chọn địa điểm cập nhật ô tìm kiếm|passed|1.2s||
|SEARCH-03|SEARCH-03 — Tăng và giảm số khách tìm kiếm|passed|1.5s||
|SEARCH-04|SEARCH-04 — Số khách tìm kiếm không giảm dưới một|passed|2.0s||
|LIST-01|LIST-01 — Danh mục Toàn bộ nhà mở danh sách phòng|passed|3.1s||
|LIST-02|LIST-02 — Danh mục Chỗ ở độc đáo mở danh sách phòng|passed|2.2s||
|LIST-03|LIST-03 — Danh mục Trang trại và thiên nhiên mở danh sách phòng|passed|2.1s||
|LIST-04|LIST-04 — Danh mục Cho phép mang theo thú cưng mở danh sách phòng|passed|2.1s||
|LIST-05|LIST-05 — @smoke Từ thẻ phòng mở đúng trang chi tiết|passed|2.9s||
|FILTER-01|FILTER-01 — @candidate Nút Loại nơi ở phải có phản hồi để lọc|failed|6.1s|[Ảnh](submission/evidence/FILTER-01-1.png)|
|FILTER-02|FILTER-02 — @candidate Nút Giá phải có phản hồi để lọc|failed|6.0s|[Ảnh](submission/evidence/FILTER-02-1.png)|
|FILTER-03|FILTER-03 — @candidate Nút Phòng và phòng ngủ phải có phản hồi để lọc|failed|5.9s|[Ảnh](submission/evidence/FILTER-03-1.png)|
|FILTER-04|FILTER-04 — @candidate Nút Bộ lọc khác phải có phản hồi để lọc|failed|6.2s|[Ảnh](submission/evidence/FILTER-04-1.png)|
|HOME-02|HOME-02 — Mobile mở và đóng menu điều hướng|passed|2.2s||
|PROFILE-01|PROFILE-01 — Hồ sơ hiển thị tên đúng và danh sách đặt phòng trống|passed|7.7s||
|PROFILE-02|PROFILE-02 — Form sửa hồ sơ có đúng thông tin đã đăng ký|passed|8.6s||
|PROFILE-03|PROFILE-03 — Cập nhật tên tài khoản của chính test và kiểm sau F5|passed|12.2s||
|PROFILE-04|PROFILE-04 — Đóng form sửa không lưu tên đang nhập|passed|9.4s||
|REVIEW-01|REVIEW-01 — Đăng nhập thấy form viết bình luận|passed|7.8s||
|REVIEW-02|REVIEW-02 — Gửi bình luận duy nhất và kiểm sau F5|passed|8.8s||
|AVATAR-01|AVATAR-01 — Mở và đóng form cập nhật ảnh|passed|8.5s||
|AVATAR-02|AVATAR-02 — Upload PNG cho chính tài khoản QA và kiểm sau F5|passed|9.3s||
|ROOM-01|ROOM-01 — @smoke Chi tiết phòng có tên giá và nút đặt phòng|passed|1.2s||
|ROOM-02|ROOM-02 — Tăng rồi giảm số khách đặt phòng|passed|2.0s||
|ROOM-03|ROOM-03 — Số khách đặt phòng không thấp hơn một|passed|1.4s||
|ROOM-04|ROOM-04 — Chọn ngày nhận và trả phòng tương lai|passed|3.5s||
|ROOM-05|ROOM-05 — Tiền phòng hai đêm cộng phí bằng tổng hiển thị|passed|3.1s||
|ROOM-06|ROOM-06 — Khách chưa đăng nhập không có form gửi bình luận|passed|1.3s||
|ROOM-07|ROOM-07 — @candidate Thu gọn tiện nghi đổi trạng thái hiển thị|failed|17.5s|[Ảnh](submission/evidence/ROOM-07-1.png)|
|ROOM-08|ROOM-08 — Mở ảnh xem trước và đóng ảnh|passed|2.4s||
|BOOK-01|BOOK-01 — @smoke Đặt phòng và thấy phòng đã thuê sau F5|passed|12.6s|[Ảnh](submission/evidence/BOOK-01-1.png) [Ảnh](submission/evidence/BOOK-01-2.png)|
|BOOK-02|BOOK-02 — Hủy popup xác nhận không tạo đặt phòng|passed|10.8s||
|BOOK-03|BOOK-03 — Xác nhận hiển thị đúng ngày và số khách đã chọn|passed|12.2s||
|BOOK-04|BOOK-04 — Chưa đăng nhập bấm đặt phòng được yêu cầu đăng nhập|passed|1.2s||

Ảnh, video và trace nguyên bản nằm trong test-results (không public vì trace có thể chứa phiên đăng nhập). Bản submission chỉ có summary và ảnh.
