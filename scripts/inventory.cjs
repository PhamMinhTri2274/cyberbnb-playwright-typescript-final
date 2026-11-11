const fs=require('node:fs');
const r=JSON.parse(fs.readFileSync('submission/results.json','utf8'));
const {spawnSync}=require('node:child_process');
const listed=spawnSync(process.execPath,[require.resolve('@playwright/test/cli'),'test','--list','--reporter=json'],{encoding:'utf8'});
if(listed.status!==0)throw new Error('Không liệt kê được test inventory: '+listed.stderr);
const all=[];function walk(s){for(const t of s.specs||[])all.push({id:t.title.split(' | ')[0],title:t.title,candidate:t.title.includes('@candidate')});for(const child of s.suites||[])walk(child);}
for(const s of JSON.parse(listed.stdout).suites||[])walk(s);
const backlog=[
 ['Ngày tìm kiếm','Chọn khoảng ngày ở thanh tìm kiếm trang chủ'],
 ['Tìm kiếm','Gửi tìm kiếm với tổ hợp địa điểm/ngày/khách và đối chiếu kết quả'],
 ['Đăng ký','Số điện thoại sai định dạng'],
 ['Đăng ký','Ngày sinh ở tương lai'],
 ['Hồ sơ','Giới tính sau đăng ký và F5'],
 ['Hồ sơ','Cập nhật số điện thoại và đọc lại'],
 ['Hồ sơ','Xóa trống trường bắt buộc trong form cập nhật'],
 ['Avatar','Định dạng file không phải ảnh'],
 ['Avatar','File ảnh dung lượng lớn theo giới hạn cần xác nhận'],
 ['Đánh giá','Gửi bình luận trống'],
 ['Đánh giá','Chọn số sao và đối chiếu sau F5'],
 ['Đặt phòng','Số khách vượt sức chứa phòng hiển thị'],
 ['Đặt phòng','Chặn ngày trong quá khứ theo quy tắc cần xác nhận'],
 ['Chi tiết','Nút dịch mô tả sang tiếng Anh'],
 ['Hồ sơ','Nút Nhận huy hiệu và hành vi theo đặc tả cần xác nhận'],
];
const quote=x=>'"'+String(x).replaceAll('"','""')+'"';
const rows=[['ID','Nhóm','Kịch bản','Có script','Kết quả thực chạy','Cơ sở'],...all.map(t=>[t.id,t.id.split('-')[0],t.title,'Yes',r.tests.find(x=>x.id===t.id)?.status||'Not run',t.candidate?'UX candidate, cần AC':'UI flow / điều kiện thao tác quan sát']),...backlog.map(([m,t],i)=>[`BACKLOG-${i+1}`,m,t,'No','Not run','Chưa tự động hóa; không ghi Pass'])];
fs.writeFileSync('submission/coverage.csv','\ufeff'+rows.map(x=>x.map(quote).join(',')).join('\n'));
const core=all.filter(t=>!t.candidate).length;
fs.writeFileSync('submission/coverage.json',JSON.stringify({basis:'Danh mục scenario khảo sát, chưa có bộ story/AC chính thức của giảng viên',automated:all.length,core,total:rows.length-1,executed:r.total,implementedPercent:all.length/(rows.length-1)*100,conservativePercent:core/(rows.length-1)*100},null,2));
