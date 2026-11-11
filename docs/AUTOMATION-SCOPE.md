# Phạm vi automation và coverage

Khảo sát ngày 11/11/2026. Nguồn: UI website demo, hành vi quan sát khi thao tác và rubric người học cung cấp. Sheet được gửi là Test Management Template: tab UI-ST Automation có hàng mẫu Module 1/Module 2, chưa chứa bộ AC Cyberbnb. Không lấy các số ví dụ trong template làm kết quả bài này.

## Luồng sản phẩm

Trang chủ → chọn địa điểm/danh mục → danh sách phòng → chi tiết → chọn ngày/khách → đăng nhập → popup xác nhận → xác nhận đặt phòng → hồ sơ xem phòng đã thuê. Đăng ký tạo tài khoản để đăng nhập. Hồ sơ cho phép sửa thông tin/upload ảnh. Người đã đăng nhập có thể viết đánh giá phòng. Xác nhận booking không đồng nghĩa với thanh toán thật.

## Nhóm test

| Nhóm | Test ID | Kiểm tra |
|---|---|---|
| Tài khoản | AUTH-01…10 | đăng ký, validation, trùng email, đăng nhập đúng/sai, giữ phiên, đăng xuất, chặn khách vào hồ sơ |
| Trang chủ | HOME-01…02 | tải điểm đến, menu mobile |
| Chọn điều kiện | SEARCH-01…04 | địa điểm, chọn địa điểm, tăng/giảm và tối thiểu khách |
| Danh sách | LIST-01…05 | bốn danh mục, thẻ phòng mở chi tiết |
| Bộ lọc | FILTER-01…04 | nút có phản hồi để lọc; @candidate vì chưa có AC |
| Chi tiết | ROOM-01…08 | tên/giá, khách, ngày, phép tính tiền, bình luận khách, tiện nghi, ảnh |
| Booking | BOOK-01…04 | tạo và F5, hủy không tạo, đúng dữ liệu xác nhận, yêu cầu đăng nhập |
| Hồ sơ | PROFILE-01…04 | hiển thị, form có sẵn, sửa tên, đóng không lưu |
| Đánh giá | REVIEW-01…02 | form khi đăng nhập, gửi và F5 |
| Avatar | AVATAR-01…02 | mở/đóng, upload PNG và đọc lại |

Tổng 45 kịch bản: 40 core và 5 candidate (4 bộ lọc và nút thu gọn tiện nghi ROOM-07). Test candidate vẫn có assertion và chạy thật. Nhãn chỉ nói kỳ vọng UX chưa có AC chính thức. Fail có thể do sản phẩm, môi trường/dữ liệu hoặc script; phải đọc evidence trước khi log bug.

## Mẫu số coverage

Scope có 60 kịch bản: 45 đã có script + 15 backlog cụ thể trong `submission/coverage.csv`. Backlog không được ghi Pass. Danh mục này do khảo sát lập ra, **không khẳng định bao trùm mọi story của giảng viên**.

- Coverage script: 45/60 = **75%**.
- Thận trọng, loại 5 candidate khỏi tử số: 40/60 = **66,67%**.
- Vượt 40% trong scope này; cần map với bộ story/AC chính thức để kết luận theo mẫu số giảng viên yêu cầu.
- Pass rate là số test Pass chia số test chạy, khác automation coverage. Test chạy Fail vẫn là kịch bản đã tự động hóa.

Không đo code coverage do không có source ứng dụng. Không tính các footer link cùng dẫn cybersoft.edu.vn thành chức năng sản phẩm mới. Các menu About/Services/Dashboard/Settings/Earnings trỏ cùng route không chứng minh có module quản trị đã kiểm đủ.

## Môi trường và dữ liệu

Chromium 1440×1000, vi-VN, Asia/Ho_Chi_Minh. Ngày đặt +2 tháng theo lúc chạy, email ngẫu nhiên. Không mock backend, không chèn token vào storage. Context riêng mỗi test; fixture chỉ đăng ký khi test cần account. Retry 0, một worker, không phụ thuộc thứ tự.

Mỗi full run tạo tài khoản QA, một booking, một review và upload ảnh cho tài khoản của suite. Không sửa dữ liệu người khác. Chưa có cleanup UI đã xác minh nên dữ liệu QA có thể còn trên demo. Chưa chạy admin, xóa tài khoản, hủy booking, thanh toán thật hoặc kiểm tải.

## Cơ sở kỳ vọng của bộ lọc

FILTER-01…04 kỳ vọng nút mở lựa chọn hoặc cập nhật nội dung/URL, dựa trên nhãn nút. Nếu fail, ghi **nút chưa có phản hồi**, kèm ảnh/trace. Cần xác nhận với giảng viên trước khi khẳng định vi phạm AC. Không tự đặt khoảng giá, thuật toán sắp xếp hay điều kiện lọc chưa được giao.
