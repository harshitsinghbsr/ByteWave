import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewAccountComponent } from './components/new-account/new-account.component';

const routes: Routes = [
  { path:"", redirectTo:"new_account", pathMatch:'full'},
  { path:"new_account", component:NewAccountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
