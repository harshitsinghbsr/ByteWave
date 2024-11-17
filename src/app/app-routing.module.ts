import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewAccountComponent } from './components/new-account/new-account.component';
import { LoginpageComponent } from './components/loginpage/loginpage.component';

const routes: Routes = [
  { path:"", redirectTo:"new_account", pathMatch:'full'},
  { path:"new_account", component:NewAccountComponent},
  { path:"loginpage", component:LoginpageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
