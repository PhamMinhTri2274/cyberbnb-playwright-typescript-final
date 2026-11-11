import {expect,type Page} from '@playwright/test';
export class ReviewPage {
 constructor(readonly page:Page){}
 get content(){return this.page.getByPlaceholder('Write something...');}
 async submit(text:string){await this.content.fill(text);await this.page.getByRole('button',{name:'Đánh giá',exact:true}).click();}
 async expectReview(text:string){await expect(this.page.getByText(text,{exact:true})).toBeVisible();}
}
