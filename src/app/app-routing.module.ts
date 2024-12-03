import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewAccountComponent } from './components/new-account/new-account.component';
import { LoginpageComponent } from './components/loginpage/loginpage.component';
import { MainComponent } from './components/main/main.component';
import { DashboardComponent } from './components/main/pages/dashboard/dashboard.component';
import { SchoolprofileComponent } from './components/main/pages/schoolprofile/schoolprofile.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

const routes: Routes = [
  { path:"", redirectTo:"loginpage", pathMatch:'full'},
  { path:"new_account", component:NewAccountComponent},
  { path:"loginpage", component:LoginpageComponent},
  { path:"verifyemail", component:VerifyEmailComponent},
  { path:"mainLayout", 
    component:MainComponent,
    children : [{path:'' , redirectTo:'dashboard' , pathMatch:'full'},
    {path:'dashboard' , component:DashboardComponent},
    {path:'school_profile' , component:SchoolprofileComponent}]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
