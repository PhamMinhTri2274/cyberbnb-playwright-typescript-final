import { expect, type Page } from '@playwright/test';
export const roomId=Number(process.env.ROOM_ID||'1');
export class RoomPage {
 constructor(readonly page: Page) {}
 readonlyPath=`/room-detail/${roomId}`;
 get title(){return this.page.getByRole('heading',{level:2}).first();}
 get plus(){return this.page.getByRole('button',{name:'+',exact:true});}
 get minus(){return this.page.getByRole('button',{name:'–',exact:true});}
 get guestBox(){return this.plus.locator('xpath=../..');}
 get confirmation(){return this.page.getByRole('heading',{name:/Bạn có chắc muốn đặt phòng/});}
 async open(){await this.page.goto(this.readonlyPath);await expect(this.title).toHaveText(/\S+/);await expect(this.page.getByText(/Total before taxes/)).not.toContainText('NaN');}
 async selectStay(){
  const d=new Date();const next=new Date(d.getFullYear(),d.getMonth()+2,10);const year=next.getFullYear(),month=next.getMonth();
  await this.page.getByText('Nhận phòng',{exact:true}).click();
  await this.page.getByRole('combobox').nth(1).selectOption(String(year));
  await this.page.getByRole('combobox').nth(0).selectOption(String(month));
  await this.page.getByRole('button',{name:'10',exact:true}).click();await this.page.getByRole('button',{name:'12',exact:true}).click();
  await this.page.getByRole('button',{name:'Close',exact:true}).click();
  const mm=String(month+1).padStart(2,'0');return {from:`10-${mm}-${year}`,to:`12-${mm}-${year}`};
 }
 async book(){await this.page.getByRole('button',{name:'Đặt phòng',exact:true}).click();}
 async cancel(){await this.page.getByRole('button',{name:'Close',exact:true}).click();await expect(this.confirmation).toBeHidden();}
 async confirm(){await this.page.getByRole('button',{name:'Xác nhận',exact:true}).click();await expect(this.confirmation).toBeHidden({timeout:30000});}
 async guestCount(){return Number((await this.guestBox.innerText()).match(/(\d+)\s*khách/)?.[1]);}
}
