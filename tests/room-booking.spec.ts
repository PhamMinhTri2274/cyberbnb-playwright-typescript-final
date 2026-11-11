import {test,expect} from '../fixtures/test';
import {roomId} from '../pages/RoomPage';
test('ROOM-01 | @smoke Chi tiết phòng có tên giá và nút đặt phòng',async({room,page})=>{
 await room.open();await expect(room.title).toBeVisible();
 await expect(page.getByRole('button',{name:'Đặt phòng',exact:true})).toBeVisible();
 await expect(page.getByText(/\$\d+\/ night/)).toBeVisible();
});
test('ROOM-02 | Tăng rồi giảm số khách đặt phòng',async({room})=>{
 await room.open();const n=await room.guestCount();await room.plus.click();expect(await room.guestCount()).toBe(n+1);
 await room.minus.click();expect(await room.guestCount()).toBe(n);
});
test('ROOM-03 | Số khách đặt phòng không thấp hơn một',async({room})=>{
 await room.open();if(await room.minus.isEnabled())await room.minus.click();else await expect(room.minus).toBeDisabled();expect(await room.guestCount()).toBe(1);
});
test('ROOM-04 | Chọn ngày nhận và trả phòng tương lai',async({room,page})=>{
 await room.open();const stay=await room.selectStay();
 await expect(page.getByText(stay.from,{exact:true})).toBeVisible();await expect(page.getByText(stay.to,{exact:true})).toBeVisible();
});
test('ROOM-05 | Tiền phòng hai đêm cộng phí bằng tổng hiển thị',async({room,page})=>{
 await room.open();await room.selectStay();
 const text=await page.locator('body').innerText();
 const rate=Number(text.match(/\$(\d+)\/ night/)?.[1]);
 const fee=Number(text.match(/Cleaning fee\s*\$\s*(\d+)/)?.[1]);
 const total=Number(text.match(/Total before taxes\s*(\d+)/)?.[1]);
 expect(Number.isFinite(rate)&&Number.isFinite(fee)&&Number.isFinite(total)).toBe(true);expect(total).toBe(rate*2+fee);
});
test('ROOM-06 | Khách chưa đăng nhập không có form gửi bình luận',async({room,page})=>{
 await room.open();await expect(page.getByText('Cần đăng nhập để bình luận',{exact:true})).toBeVisible();
 await expect(page.locator('textarea')).toHaveCount(0);
});
test('ROOM-07 | @candidate Thu gọn tiện nghi đổi trạng thái hiển thị',async({room,page})=>{
 await room.open();await page.getByRole('button',{name:'Ẩn bớt tiện nghi',exact:true}).click();
 await expect(page.getByRole('button',{name:'Ẩn bớt tiện nghi',exact:true})).toHaveCount(0);
});
test('ROOM-08 | Mở ảnh xem trước và đóng ảnh',async({room,page})=>{
 await room.open();await page.getByText('Xem trước',{exact:true}).first().click();
 await expect(page.locator('.ant-image-preview-wrap')).toBeVisible();
 await page.locator('.ant-image-preview-close').click();await expect(page.locator('.ant-image-preview-wrap')).toBeHidden();
});
test('BOOK-01 | @smoke Đặt phòng và thấy phòng đã thuê sau F5',async({account,room,profile,page},info)=>{
 expect(account.email).toContain('@example.com');await profile.open();await expect(profile.cards).toHaveCount(0);
 await room.open();await room.selectStay();await room.book();await expect(room.confirmation).toContainText(`#${roomId}`);
 await info.attach('xac-nhan-dat-phong',{body:await page.screenshot(),contentType:'image/png'});await room.confirm();
 await profile.open();await expect(profile.cards).toHaveCount(1);await page.reload();await expect(profile.cards).toHaveCount(1);
 await info.attach('phong-da-thue',{body:await page.screenshot(),contentType:'image/png'});
});
test('BOOK-02 | Hủy popup xác nhận không tạo đặt phòng',async({account,room,profile})=>{
 expect(account.email).toContain('@example.com');await room.open();await room.selectStay();await room.book();
 await expect(room.confirmation).toBeVisible();await room.cancel();await profile.open();await expect(profile.cards).toHaveCount(0);
});
test('BOOK-03 | Xác nhận hiển thị đúng ngày và số khách đã chọn',async({account,room,page})=>{
 expect(account.email).toContain('@example.com');await room.open();const stay=await room.selectStay();await room.plus.click();const n=await room.guestCount();
 await room.book();await expect(room.confirmation).toBeVisible();
 await expect(page.getByText(`Ngày sử dụng: ${stay.from} - ${stay.to}`,{exact:true})).toBeVisible();
 const summary=page.getByText(/^Lượng khách:/);await expect(summary).toBeVisible();
 expect(Number((await summary.innerText()).match(/Lượng khách:\s*(\d+)/)?.[1])).toBe(n);await room.cancel();
});
test('BOOK-04 | Chưa đăng nhập bấm đặt phòng được yêu cầu đăng nhập',async({room,page})=>{
 await room.open();await room.book();await expect(page.getByText(/Vui lòng đăng nhập|Bạn.*đăng nhập|Cần đăng nhập/i).filter({hasNotText:'bình luận'}).first()).toBeVisible();
 await expect(room.confirmation).toHaveCount(0);
});
