import {test,expect} from '../fixtures/test';
test('PROFILE-01 | Hồ sơ hiển thị tên đúng và danh sách đặt phòng trống',async({account,profile,page})=>{
 await profile.open();await expect(page.getByText(`Xin chào, tôi là ${account.name}`,{exact:true})).toBeVisible();
 await expect(page.getByText('Bạn chưa đặt phòng nào.',{exact:true})).toBeVisible();
});
test('PROFILE-02 | Form sửa hồ sơ có đúng thông tin đã đăng ký',async({account,profile,page})=>{
 await profile.open();await profile.edit();await expect(page.locator('#name')).toHaveValue(account.name);
 await expect(page.locator('#email')).toHaveValue(account.email);await expect(page.locator('#phone')).toHaveValue('0900000000');
 await expect(page.locator('#birthday')).toHaveValue('01/01/2000');
});
test('PROFILE-03 | Cập nhật tên tài khoản của chính test và kiểm sau F5',async({account,profile,page})=>{
 expect(account.email).toContain('@example.com');await profile.open();await profile.edit();const updated='Nguyễn Minh An';await page.locator('#name').fill(updated);await profile.save();
 await expect(page.locator('#name')).toBeHidden();await page.reload();
 await expect(page.getByText(`Xin chào, tôi là ${updated}`,{exact:true})).toBeVisible();
});
test('PROFILE-04 | Đóng form sửa không lưu tên đang nhập',async({account,profile,page})=>{
 await profile.open();await profile.edit();await page.locator('#name').fill('Unsaved QA Name');
 await page.getByRole('button',{name:'Close',exact:true}).click();await page.reload();
 await expect(page.getByText(`Xin chào, tôi là ${account.name}`,{exact:true})).toBeVisible();
});
