import { expect, type Page } from '@playwright/test';
import { randomUUID } from 'node:crypto';
export interface Account { name: string; email: string; password: string }
export function newAccount(): Account {
 const id=randomUUID().replaceAll('-','').slice(0,14);
 return {name:`QA Auto ${id}`,email:`qa.auto.${id}@example.com`,password:`Qa!${id}2026`};
}
export class AuthPage {
 constructor(readonly page: Page) {}
 async menu() {
  if(!await this.page.getByRole('button',{name:'Đăng nhập',exact:true}).isVisible())
   await this.page.getByRole('button',{name:'',exact:true}).click();
 }
 async openLogin() { await this.page.goto('/'); await this.menu(); await this.page.getByRole('button',{name:'Đăng nhập',exact:true}).click(); }
 async openRegister() { await this.page.goto('/'); await this.menu(); await this.page.getByRole('button',{name:'Đăng ký',exact:true}).click(); await expect(this.page.getByRole('heading',{name:'Đăng ký tài khoản',exact:true})).toBeVisible(); }
 async birthday() {
  await this.page.locator('#birthday').click();
  await this.page.locator('.ant-picker-year-btn').click();
  for(let n=0;n<15;n++) {
   const start=Number((await this.page.locator('.ant-picker-decade-btn').innerText()).match(/\d{4}/)?.[0]);
   if(start<=2000&&start+9>=2000) break;
   await this.page.locator(start>2000?'.ant-picker-header-super-prev-btn':'.ant-picker-header-super-next-btn').click();
  }
  await this.page.getByText('2000',{exact:true}).click();
  await this.page.getByText('Jan',{exact:true}).click();
  await this.page.locator('td[title="2000-01-01"]').click();
 }
 async fillRegistration(a: Account) {
  await this.page.locator('#name').fill(a.name); await this.page.locator('#email').fill(a.email);
  await this.page.locator('#password').fill(a.password); await this.page.locator('#phone').fill('0900000000');
  await this.birthday(); await this.page.locator('#gender').click(); await this.page.getByText('Nam',{exact:true}).click();
 }
 async register(a=newAccount()) {
  await this.openRegister(); await this.fillRegistration(a);
  await this.page.getByRole('button',{name:'Đăng ký',exact:true}).click();
  await expect(this.page.getByText('Đăng ký thành công',{exact:true})).toBeVisible();
  return a;
 }
 async submitLogin(email: string,password: string) {
  await this.page.getByPlaceholder('Vui lòng nhập tài khoản').fill(email);
  await this.page.getByPlaceholder('Vui lòng nhập mật khẩu').fill(password);
  await this.page.getByRole('button',{name:'Đăng nhập',exact:true}).click();
 }
 async login(a: Account) {
  await this.openLogin(); await this.submitLogin(a.email,a.password);
  await expect(this.page.locator('#user-menu-button')).toContainText(a.name,{ignoreCase:true});
 }
 async logout() {
  await this.page.locator('#user-menu-button').click();
  await this.page.getByRole('button',{name:'Sign out',exact:true}).click();
  await expect(this.page.getByText('Đăng xuất thành công!',{exact:true})).toBeVisible();
 }
}
