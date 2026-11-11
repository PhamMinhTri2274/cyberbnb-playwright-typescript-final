import {test as base,expect} from '@playwright/test';
import {AuthPage,type Account} from '../pages/AuthPage';
import {HomePage} from '../pages/HomePage';
import {RoomPage} from '../pages/RoomPage';
import {ProfilePage} from '../pages/ProfilePage';
type Fixtures={auth:AuthPage;home:HomePage;room:RoomPage;profile:ProfilePage;account:Account};
export const test=base.extend<Fixtures>({
 auth:async({page},use)=>{await use(new AuthPage(page));},
 home:async({page},use)=>{await use(new HomePage(page));},
 room:async({page},use)=>{await use(new RoomPage(page));},
 profile:async({page},use)=>{await use(new ProfilePage(page));},
 account:async({auth},use)=>{const a=await auth.register();await auth.login(a);await use(a);},
});
export {expect};
