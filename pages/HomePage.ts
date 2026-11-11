import { expect, type Page } from '@playwright/test';
export class HomePage {
 constructor(readonly page: Page){}
 async open(){await this.page.goto('/');await expect(this.page.getByText('Belong anywhere',{exact:true})).toBeVisible();}
 async destinations(){await this.page.getByText('Bạn sắp đi đâu?',{exact:true}).click();await expect(this.page.getByText('Tìm kiếm địa điểm',{exact:true})).toBeVisible();}
 async category(name:string){await this.page.getByRole('link',{name,exact:true}).click();}
 async openGuestPicker(){await this.page.getByText('Thêm khách',{exact:true}).click();}
 async filter(label:string){await this.page.getByRole('button',{name:label,exact:true}).click();}
}
