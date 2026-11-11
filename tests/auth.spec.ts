import {test,expect} from '../fixtures/test';
import {newAccount} from '../pages/AuthPage';
test('AUTH-01 | @smoke Đăng ký hợp lệ và đăng nhập tài khoản vừa tạo',async({auth,page})=>{
 const a=await test.step('Đăng ký tài khoản duy nhất',()=>auth.register());
 await test.step('Đăng nhập bằng tài khoản vừa tạo',()=>auth.login(a));
 await expect(page.locator('#user-menu-button')).toContainText(a.name,{ignoreCase:true});
});
test('AUTH-02 | Đăng nhập bỏ trống hiển thị lỗi hai trường',async({auth,page})=>{
 await auth.openLogin();await page.getByRole('button',{name:'Đăng nhập',exact:true}).click();
 await expect(page.getByText('Vui lòng không bỏ trống',{exact:true})).toHaveCount(2);
 await expect(page.locator('#user-menu-button')).toHaveCount(0);
});
test('AUTH-03 | Sai tài khoản hoặc mật khẩu không được đăng nhập',async({auth,page})=>{
 await auth.openLogin();await auth.submitLogin(newAccount().email,'WrongPassword123!');
 await expect(page.getByText('Email hoặc mật khẩu không đúng !',{exact:true})).toBeVisible();
 await expect(page.locator('#user-menu-button')).toHaveCount(0);
});
test('AUTH-04 | Mật khẩu trên form đăng nhập được che',async({auth,page})=>{
 await auth.openLogin();await expect(page.getByPlaceholder('Vui lòng nhập mật khẩu')).toHaveAttribute('type','password');
});
test('AUTH-05 | Đăng ký bỏ trống không tạo tài khoản',async({auth,page})=>{
 await auth.openRegister();await page.getByRole('button',{name:'Đăng ký',exact:true}).click();
 await expect(page.getByText('Vui lòng không bỏ trống',{exact:true}).first()).toBeVisible();
 await expect(page.getByRole('heading',{name:'Đăng ký tài khoản',exact:true})).toBeVisible();
 await expect(page.getByText('Đăng ký thành công',{exact:true})).toHaveCount(0);
});
test('AUTH-06 | Email sai định dạng bị chặn ở đăng ký',async({auth,page})=>{
 await auth.openRegister();await auth.fillRegistration({...newAccount(),email:'not-an-email'});
 await page.getByRole('button',{name:'Đăng ký',exact:true}).click();
 await expect(page.getByText(/email.*(hợp lệ|định dạng)|định dạng.*email/i).first()).toBeVisible();
 await expect(page.getByText('Đăng ký thành công',{exact:true})).toHaveCount(0);
});
test('AUTH-07 | @smoke Đăng xuất và F5 không khôi phục phiên',async({account,auth,page})=>{
 expect(account.email).toContain('@example.com');await auth.logout();await page.reload();
 await expect(page.locator('#user-menu-button')).toHaveCount(0);await auth.menu();
 await expect(page.getByRole('button',{name:'Đăng nhập',exact:true})).toBeVisible();
});
test('AUTH-08 | Phiên đăng nhập còn sau F5',async({account,page})=>{
 await page.reload();await expect(page.locator('#user-menu-button')).toContainText(account.name,{ignoreCase:true});
});
test('AUTH-09 | Khách chưa đăng nhập không truy cập được hồ sơ cá nhân',async({page})=>{
 await page.goto('/info-user');await expect(page).toHaveURL(/\/$/);
 await expect(page.getByRole('button',{name:'Chỉnh sửa hồ sơ',exact:true})).toHaveCount(0);
});
test('AUTH-10 | Không cho đăng ký trùng email đã tồn tại',async({auth,page})=>{
 const a=await auth.register();await auth.openRegister();await auth.fillRegistration(a);
 await page.getByRole('button',{name:'Đăng ký',exact:true}).click();
 await expect(page.getByText(/email.*(tồn tại|sử dụng)|đã.*(tồn tại|đăng ký)/i).first()).toBeVisible();
});
