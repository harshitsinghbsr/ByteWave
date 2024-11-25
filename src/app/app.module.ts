import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewAccountComponent } from './components/new-account/new-account.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginpageComponent } from './components/loginpage/loginpage.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { MainComponent } from './components/main/main.component';
import { DashboardComponent } from './components/main/pages/dashboard/dashboard.component';
import { HeaderComponent } from './components/main/header/header.component';
import { SidebarComponent } from './components/main/sidebar/sidebar.component';
import { FooterComponent } from './components/main/footer/footer.component';
import { SchoolprofileComponent } from './components/main/pages/schoolprofile/schoolprofile.component';

@NgModule({
  declarations: [
    AppComponent,
    NewAccountComponent,
    LoginpageComponent,
    MainComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    SchoolprofileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    NgxSpinnerModule,
    HttpClientModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
