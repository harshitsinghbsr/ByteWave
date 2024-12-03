import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { WebStorageService } from '../../WebStorageService/web-storage-service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit{

  constructor(
    private spinner: NgxSpinnerService,
    private http : HttpClient,
    private toastr: ToastrService,
    private router : Router,
    private local : WebStorageService 
  ){
    // this.getUserDetailAfterLogin(history.state.username , history.state.password);
  }

  ngOnInit(): void {
  }

  async getUserDetailAfterLogin(username:string , password:string|number){
    const mydata = {
      username : username,
      password : password
    }
    this.spinner.show();
    try{
      this.http.post(environment.apiURL + 'api/UserController/getUserDetailAfterLogin' , mydata).subscribe((res:any) => {
        if(res.status){
          setTimeout(()=>{
            this.spinner.hide();
            this.toastr.success(res.message , res.title);
            this.local.setCurrentUserDetails(res.value);
          }, 1000);
        }else{
          this.spinner.hide();
          this.toastr.error(res.message , res.title);
          this.local.logout();
        }
      });
    }catch(err){
      console.error(err);
    }
  }

}
