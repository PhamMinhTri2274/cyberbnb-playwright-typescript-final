import {test,expect} from '../fixtures/test';
import {ReviewPage} from '../pages/ReviewPage';
test('REVIEW-01 | Đăng nhập thấy form viết bình luận',async({account,room,page})=>{
 expect(account.email).toContain('@example.com');await room.open();
 await expect(new ReviewPage(page).content).toBeVisible();await expect(page.getByRole('button',{name:'Đánh giá',exact:true})).toBeVisible();
});
test('REVIEW-02 | Gửi bình luận duy nhất và kiểm sau F5',async({account,room,page})=>{
 await room.open();const review=new ReviewPage(page);const text=`QA automation demo ${account.email.split('@')[0]}`;
 await review.submit(text);await review.expectReview(text);await page.reload();await review.expectReview(text);
});
test('AVATAR-01 | Mở và đóng form cập nhật ảnh',async({account,profile,page})=>{
 expect(account.email).toContain('@example.com');await profile.open();await page.getByRole('button',{name:'Cập nhật ảnh',exact:true}).click();
 await expect(page.getByRole('heading',{name:/thay đổi ảnh đại diện/i})).toBeVisible();await expect(page.locator('input[type=file]')).toHaveCount(1);
 await page.getByRole('button',{name:'Close',exact:true}).click();await expect(page.getByRole('heading',{name:/thay đổi ảnh đại diện/i})).toBeHidden();
});
test('AVATAR-02 | Upload PNG cho chính tài khoản QA và kiểm sau F5',async({account,profile,page})=>{
 await profile.open();await expect(page.getByText(`Xin chào, tôi là ${account.name}`,{exact:true})).toBeVisible();
 const sources=()=>page.locator('img').evaluateAll(es=>es.map(e=>e.getAttribute('src')));const before=await sources();
 await page.getByRole('button',{name:'Cập nhật ảnh',exact:true}).click();
 await page.locator('input[type=file]').setInputFiles({name:'qa-avatar.png',mimeType:'image/png',buffer:Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aN1sAAAAASUVORK5CYII=','base64')});
 const upload=page.waitForResponse(r=>r.url().includes('/api/users/upload-avatar')&&r.request().method()==='POST');
 await page.getByRole('button',{name:'Upload Avatar',exact:true}).click();
 expect((await upload).ok(),'Upload từ giao diện phải trả kết quả thành công').toBe(true);
 await expect(page.getByRole('heading',{name:/thay đổi ảnh đại diện/i})).toBeHidden();await page.reload();
 await expect(page.getByText(`Xin chào, tôi là ${account.name}`,{exact:true})).toBeVisible();
 await expect.poll(sources).not.toEqual(before);
});
