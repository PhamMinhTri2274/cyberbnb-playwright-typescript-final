# Cyberbnb — Automation đồ án Tester Cybersoft

Playwright + TypeScript, **Page Object Model**, chạy trên website thật https://demo5.cybersoft.edu.vn/. Chỉ gồm automation theo đề; không làm phần manual.

## Chạy trên máy mới

Cài Node.js 24 LTS và Git, mở Terminal trong thư mục repo:

```bash
npm ci
npx playwright install chromium
npm run typecheck
npm run submit
```

`npm run submit` chạy test, tạo summary kể cả khi fail, và giữ exit code thất bại. Kết quả thực tế: **[RUN-RESULTS.md](RUN-RESULTS.md)**. Năm test `@candidate` kiểm các nút lọc/thu gọn chưa có phản hồi; cần giảng viên xác nhận kỳ vọng UX.

```bash
npm run test:headed
npm run test:smoke
npm run test:core
npm run report
npm run test:ui
npx playwright test --grep BOOK-01 --headed
```

Không cần tạo tài khoản trước. Fixture tạo email duy nhất `@example.com`. Một full run tạo tài khoản QA, một booking, một bình luận, upload avatar cho tài khoản của chính test. **Chưa có cleanup UI được xác minh**, nên dữ liệu QA sẽ còn trên demo. Không dùng tài khoản thật. Workflow CI chỉ chạy khi bấm Run workflow để tránh tạo dữ liệu sau mọi push.

## Cấu trúc

```text
pages/           thao tác từng màn hình: Auth, Home, Room, Profile, Review
fixtures/test.ts cấp Page Object và tài khoản độc lập cho test cần đăng nhập
tests/           kịch bản và assertion kiểm tra kết quả
reporters/       log có thời gian, ID, trạng thái và lỗi
scripts/         chạy suite và xuất báo cáo
docs/            phạm vi, coverage, hướng dẫn bảo vệ
submission/      kết quả đã chạy và ảnh bằng chứng
presentation/    PowerPoint, PDF và bản xem slide
.github/         workflow GitHub Actions chạy theo yêu cầu
```

`tests` nói **kiểm tra gì**; `pages` nói **thao tác thế nào**. `room.book()` bấm Đặt phòng, test kiểm popup có đúng ngày/khách. Khi locator đổi, sửa trong Page Object. Test độc lập, không cần chạy đăng ký ở test trước.

## Log và evidence

| Kết quả | Đường dẫn |
|---|---|
| HTML report tương tác | `playwright-report/index.html`, mở bằng `npm run report` |
| Log file | `logs/test-run.log` |
| JSON / JUnit | `test-results/results.json`, `test-results/junit.xml` |
| Screenshot tự động khi fail | thư mục từng test trong `test-results/` |
| Video / trace khi fail | cùng thư mục; mở trace bằng `npx playwright show-trace <trace.zip>` |
| Báo cáo dễ đọc | `submission/BAO-CAO.html` |

Config dùng `screenshot: 'only-on-failure'`, `trace/video: 'retain-on-failure'`. BOOK-01 đính kèm ảnh xác nhận và phòng đã thuê cả khi Pass. Không dùng `test.fail()` để giấu lỗi, retry = 0 để tránh booking trùng. Một worker hạn chế tải lên demo.

Raw trace/report có thể chứa token nên không đưa lên repo public. `submission` chỉ có summary và PNG. Source không hardcode tài khoản cá nhân, password hay token. `.env.example` chỉ minh họa; cấu hình đọc environment, không tự load `.env`.

## Coverage và giới hạn

Đọc **[docs/AUTOMATION-SCOPE.md](docs/AUTOMATION-SCOPE.md)** và `submission/coverage.csv`. Đây là scenario coverage theo danh mục khảo sát, không phải code coverage. Chưa có toàn bộ story/AC chính thức để khẳng định coverage cho mọi chức năng website.

Đã chạy Chromium desktop và một kịch bản menu mobile; chưa chạy Firefox/Safari, load test, thanh toán thật hay quản trị. Chưa thấy UI xóa tài khoản/hủy booking cho người dùng thường nên không đoán API để xóa. Room mặc định 1; đổi `ROOM_ID` nếu dữ liệu phòng bị người khác thay đổi. Booking card sau F5 không chứng minh ngày/khách/giá đã lưu đúng toàn bộ backend.

## Bảo vệ đồ án

**[docs/BAO-VE-DO-AN.md](docs/BAO-VE-DO-AN.md)** có lời thuyết trình, demo và câu hỏi. Hãy chạy một test và tự sửa một assertion trước buổi bảo vệ. Framework có AI hỗ trợ; bạn cần giải thích được source và kết quả.

Tài liệu: [POM](https://playwright.dev/docs/pom), [fixtures](https://playwright.dev/docs/test-fixtures), [reporters](https://playwright.dev/docs/test-reporters).
