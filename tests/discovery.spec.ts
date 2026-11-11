import {test,expect} from '../fixtures/test';
test('HOME-01 | @smoke Trang chủ và danh sách điểm đến tải được',async({home,page})=>{
 await home.open();await expect(page.getByText('Hồ Chí Minh',{exact:true})).toBeVisible();
 await expect(page.getByText('Cần Thơ',{exact:true})).toBeVisible();
});
test('SEARCH-01 | Mở danh sách chọn địa điểm',async({home,page})=>{
 await home.open();await home.destinations();
 const popup=page.getByText('Tìm kiếm địa điểm',{exact:true}).locator('..');
 for(const n of ['Hồ Chí Minh','Cần Thơ','Hà Nội'])await expect(popup.getByText(n,{exact:true})).toBeVisible();
});
test('SEARCH-02 | Chọn địa điểm cập nhật ô tìm kiếm',async({home,page})=>{
 await home.open();await home.destinations();
 await page.getByText('Tìm kiếm địa điểm',{exact:true}).locator('..').getByText('Cần Thơ',{exact:true}).click();
 await expect(page.getByText('Bạn sắp đi đâu?',{exact:true})).toHaveCount(0);
 await expect(page.getByText('Tìm kiếm địa điểm',{exact:true})).toBeHidden();
});
test('SEARCH-03 | Tăng và giảm số khách tìm kiếm',async({home,page})=>{
 await home.open();await home.openGuestPicker();const plus=page.getByRole('button',{name:'+',exact:true});
 const box=plus.locator('..');await plus.click();await expect(box).toContainText('2');
 await page.getByRole('button',{name:'-',exact:true}).click();await expect(box).toContainText('1');
});
test('SEARCH-04 | Số khách tìm kiếm không giảm dưới một',async({home,page})=>{
 await home.open();await home.openGuestPicker();const minus=page.getByRole('button',{name:'-',exact:true});
 await expect(minus).toBeDisabled();
 await expect(page.getByRole('button',{name:'+',exact:true}).locator('..')).toContainText('1');
});
for(const [id,label,slug] of [
 ['LIST-01','Toàn bộ nhà','ho-chi-minh'],['LIST-02','Chỗ ở độc đáo','nha-trang'],
 ['LIST-03','Trang trại và thiên nhiên','da-lat'],['LIST-04','Cho phép mang theo thú cưng','da-nang']]){
 test(`${id} | Danh mục ${label} mở danh sách phòng`,async({home,page})=>{
  await home.open();await home.category(label);await expect(page).toHaveURL(new RegExp(`/rooms/${slug}$`));
  await expect(page.locator('a[href^="/room-detail/"]').first()).toBeVisible();
 });
}
test('LIST-05 | @smoke Từ thẻ phòng mở đúng trang chi tiết',async({page,room})=>{
 await page.goto('/rooms/ho-chi-minh');const card=page.locator('a[href^="/room-detail/"]').first();
 await expect(card).toBeVisible();const href=await card.getAttribute('href');await card.click();
 await expect(page).toHaveURL(new RegExp(`${href}$`));await expect(room.title).toHaveText(/\S+/);
});
for(const [i,label] of ['Loại nơi ở','Giá','Phòng và phòng ngủ','Bộ lọc khác'].entries()){
 test(`FILTER-0${i+1} | @candidate Nút ${label} phải có phản hồi để lọc`,async({home,page})=>{
  await home.open();await expect(page.getByText('Phan Thiết',{exact:true})).toBeVisible();
  const before=await page.locator('body').innerText();const url=page.url();await home.filter(label);
  await expect.poll(async()=>page.url()!==url||(await page.locator('body').innerText())!==before,{timeout:4000,message:'Nút lọc phải mở nội dung lựa chọn hoặc cập nhật danh sách/URL; cần xác nhận đặc tả với giảng viên.'}).toBe(true);
 });
}
test('HOME-02 | Mobile mở và đóng menu điều hướng',async({page,home})=>{
 await page.setViewportSize({width:390,height:844});await home.open();
 const menu=page.getByRole('button',{name:'Open main menu',exact:true});await menu.click();
 await expect(page.getByRole('link',{name:'Home',exact:true})).toBeVisible();await menu.click();
 await expect(page.getByRole('link',{name:'Home',exact:true})).toBeHidden();
});
