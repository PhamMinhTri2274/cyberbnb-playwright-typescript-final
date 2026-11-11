# Hướng dẫn bảo vệ đồ án automation

## Hiểu dự án trước khi học thuộc slide

Website Cyberbnb cho khách tìm và đặt chỗ ở. Phòng là món hàng đang xem. Ngày nhận/trả và số khách là điều kiện đặt. Bấm Đặt phòng mới mở xác nhận, bấm Xác nhận mới gửi tạo booking. Đóng popup phải không tạo booking. Hồ sơ là nơi xem phòng đã thuê và sửa thông tin của chính tài khoản. Không có giao dịch thẻ ngân hàng thật được kiểm trong bài này.

Một test automation là chương trình mở trình duyệt, làm thao tác, rồi kiểm tra kết quả. Chỉ bấm hết nút mà không có assertion thì chưa chứng minh đúng. Ví dụ BOOK-01 kiểm trước đó không có phòng, đặt, xác nhận, vào hồ sơ thấy một phòng, F5 vẫn còn phòng. Nó chưa chứng minh mọi trường lưu trong database đều đúng.

## Lời trình bày khoảng 10–12 phút

1. **Giới thiệu**: “Em xây dựng UI automation cho Cyberbnb bằng TypeScript và Playwright. Framework dùng Page Object Model, có log, HTML report và screenshot khi test fail.”
2. **Luồng sản phẩm**: “Khách chọn điểm đến, xem danh sách, mở chi tiết, chọn ngày và khách. Sau đăng nhập, khách xác nhận đặt phòng và kiểm lại trong hồ sơ. Tài khoản còn có sửa thông tin, avatar và bình luận.”
3. **Phạm vi**: “Bộ test có 45 kịch bản, gồm happy path, trường bắt buộc, đăng nhập sai, phiên đăng nhập và hủy thao tác. Em có danh mục scope riêng, không tuyên bố test hết mọi tổ hợp dữ liệu.”
4. **Cấu trúc**: “tests chứa điều cần kiểm; pages chứa locator và thao tác; fixture tạo điều kiện cho test; config đặt môi trường; reporter ghi log; scripts tổng hợp kết quả.”
5. **POM**: Mở RoomPage.ts. “room.book() gom thao tác bấm nút. Khi selector đổi, em sửa một Page Object. Trong test, em vẫn kiểm dữ liệu popup đúng ngày và khách.”
6. **Dữ liệu và độc lập**: “Mỗi test có context mới. Test cần đăng nhập mới kích hoạt fixture account. Email UUID tránh trùng. Ngày đặt sinh trong tương lai. Không phụ thuộc tài khoản do test trước tạo.”
7. **Chờ và assertion**: “Em dùng locator theo role/name và expect tự chờ. Không đặt sleep vài giây trong test. Upload chờ response do chính thao tác UI phát sinh trước F5 để tránh hủy request đang chạy.”
8. **Booking E2E**: Chỉ vào BOOK-01. “Em có baseline, nhập điều kiện, xác nhận, kiểm một booking sau F5. Ảnh đính kèm giúp giảng viên đối chiếu.”
9. **Log và evidence**: Mở log và report. “Mỗi test có ID, thời gian, trạng thái. Khi fail, Playwright chụp ảnh, giữ video và trace. Em đọc assertion và ảnh trước khi kết luận bug.”
10. **Kết quả**: Đọc đúng con số trong RUN-RESULTS.md hoặc slide kết quả mới nhất. Không dùng kết quả lần khảo sát cũ. Phân biệt test core với @candidate.
11. **Failure**: “Bốn bộ lọc không có phản hồi quan sát được. Đây là vấn đề UX cần đối chiếu đặc tả. Em không dùng expected failure để biến lỗi thành Pass.” Nút tiện nghi có ghi nhận riêng nếu vẫn fail.
12. **Coverage**: “Em công bố danh mục 60 scenario, số có script và số backlog. Automation coverage khác pass rate và code coverage. Em cần map lại nếu bộ story chính thức có mẫu số khác.”
13. **Chạy trên GitHub**: “Repo public chứa source và workflow. Workflow chạy thủ công để tránh mỗi push tạo thêm tài khoản/booking. Artifact có report, log và ảnh. Không commit token hay raw trace.”
14. **Giới hạn**: “Bài đã chạy Chromium và menu mobile. Chưa kiểm quản trị, thanh toán thật, kiểm tải hay xóa tài khoản. Demo dùng dữ liệu chung và chưa có cleanup UI đã xác minh.”

## Demo 5 phút

1. Mở repo README, chỉ nhanh `pages`, `tests`, `fixtures`, `playwright.config.ts`.
2. Chạy `npm run typecheck`.
3. Chạy `npx playwright test --grep BOOK-01 --headed`. Chỉ chạy một lần, vì test tạo booking thật trên demo.
4. Chạy `npm run report`, chọn BOOK-01, mở ảnh xác nhận và ảnh phòng đã thuê.
5. Nếu mạng hỏng, mở `submission/BAO-CAO.html` của full run đã lưu. Nói rõ đây là kết quả lần chạy có timestamp, không giả làm live Pass.
6. Muốn minh họa Fail, dùng báo cáo full run trước. Không cần sửa code tạo lỗi giả và không ghi nhận lỗi giả thành bug ứng dụng.

Sau demo riêng một test, raw Playwright report sẽ phản ánh lần chạy một test, không còn toàn suite. Bản `submission` đã chốt vẫn là full run; khi muốn cập nhật nó, chạy full `npm run submit`.

## Những câu thường bị hỏi

**Page Object Model là gì?** Mỗi trang/chức năng có class chứa locator và thao tác lặp lại. Test gọi phương thức theo ngôn ngữ nghiệp vụ. “Modal” là hộp thoại; tên pattern đúng là “Model”.

**TypeScript khác JavaScript?** TypeScript bổ sung kiểm tra kiểu tĩnh. `Page`, `Account`, `string` giúp phát hiện truyền nhầm dữ liệu trước khi chạy. TypeScript không tự phát hiện bug nghiệp vụ.

**await là gì?** Chờ thao tác bất đồng bộ hoàn thành. Thiếu await có thể khiến bấm Xác nhận trước khi form nhập xong. `async` cho phép dùng await trong hàm.

**Fixture là gì?** Điều kiện và tài nguyên được cấp cho test: page, Page Object, account. `await use(account)` đưa account cho test; phần sau use dùng cho teardown nếu có cleanup được xác minh.

**Assertion là gì?** Câu kiểm kết quả. `toBeVisible()` kiểm nhìn thấy, `toHaveCount(1)` kiểm số phần tử, `toContainText()` kiểm nội dung. Assertion sai làm test Fail, không phải tự động chứng minh bug sản phẩm.

**Vì sao không sleep?** Sleep luôn đợi một khoảng cố định, nhanh thì tốn thời gian, chậm thì vẫn lỗi. Locator và expect chờ đúng điều kiện với timeout giới hạn. Poll trong test no-op kiểm đến khi UI thực sự đổi.

**Vì sao dùng một worker, không retry?** Demo dùng chung, nhiều account/booking là dữ liệu thật. Một worker giảm tác động. Retry booking có thể tạo đơn trùng; cần thiết kế idempotency/cleanup trước khi bật retry.

**Có hardcode không?** Base URL và room mặc định là config có thể đổi qua environment. Label nút cần khớp UI nên được ghi trong Page Object. Email/ngày sinh dữ liệu test khác với tài khoản thật; email và mật khẩu sinh lúc chạy, không ghi cố định vào repo.

**Test độc lập có nghĩa dữ liệu bị xóa cuối test?** Không. Context mới cô lập cookie/storage, tài khoản khác tránh xung đột. Dữ liệu server chỉ hết khi có cleanup hợp lệ. Bài này chưa có UI xóa đã xác minh, nên không tuyên bố đã dọn sạch.

**Coverage 40% tính thế nào?** Phải nêu mẫu số. Bài có danh mục 60 scenario và script cho 45. Xem coverage.json; loại candidate vẫn vượt 40% trong scope khảo sát. Chưa có source để đo code coverage, chưa có toàn bộ story để khẳng định coverage chính thức của khóa.

**Có 5 test Fail thì đồ án fail không?** Chạy đúng và phát hiện được sai lệch là mục tiêu automation. Cần phân loại failure, evidence và nêu giới hạn. Không sửa expected result để giấu lỗi; không khẳng định mọi failure là bug sản phẩm.

**Smoke khác regression?** Smoke là bộ nhỏ kiểm đường chính còn hoạt động. Regression rộng hơn để phát hiện chức năng cũ bị ảnh hưởng khi thay đổi. Tag @smoke chọn nhanh bằng grep.

**UI upload chờ response có phải API test không?** File được chọn và submit qua giao diện. Chờ response là đồng bộ thao tác UI, không gọi API trực tiếp để tạo dữ liệu hay bỏ qua UI. Assertion kiểm cả kết quả sau F5.

**Vì sao không xóa tài khoản?** User cho phép không có nghĩa UI có chức năng đó. Chưa quan sát được thao tác xóa cho tài khoản thường nên ghi giới hạn thay vì đoán endpoint và đụng dữ liệu người khác.

**AI làm bài thì em hiểu gì?** “Em dùng AI hỗ trợ dựng framework và đọc lỗi. Em có thể chỉ ra input, thao tác, assertion, đường dẫn evidence và lý do thiết kế của từng test. Phần chưa kiểm được em ghi giới hạn, không tự nhận Pass.” Chỉ nói vậy sau khi bạn thực sự tập chạy và đọc code.

## Bài tập bắt buộc tự làm trước giờ bảo vệ

- Mở BOOK-02 và giải thích vì sao đóng popup rồi profile phải có 0 card.
- Mở AUTH-03, chỉ ra input sai và assertion từ chối đăng nhập.
- Đổi một test name, chạy đúng một test bằng grep.
- Mở failure screenshot, nói được expected, actual và vì sao chưa chắc là bug nghiệp vụ.
- Tự giải thích được khác nhau giữa coverage, pass rate, screenshot và trace.
