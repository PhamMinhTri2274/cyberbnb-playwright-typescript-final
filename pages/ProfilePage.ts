import { expect,type Page } from '@playwright/test';
import {roomId} from './RoomPage';
export class ProfilePage {
 constructor(readonly page:Page){}
 get cards(){return this.page.locator(`a[href="/room-detail/${roomId}"]`);}
 async open(){await this.page.goto('/info-user');await expect(this.page.getByRole('heading',{name:'Phòng đã thuê',exact:true})).toBeVisible();await expect(this.page.getByText(/^Xin chào, tôi là .+/)).toBeVisible();}
 async edit(){await this.page.getByRole('button',{name:'Chỉnh sửa hồ sơ',exact:true}).click();await expect(this.page.locator('#name')).toBeVisible();}
 async save(){await this.page.getByRole('button',{name:'Cập nhật',exact:true}).click();}
}
