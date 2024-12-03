import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.scss'
})
export class LoginpageComponent implements OnInit{

  constructor(
    private formBuilder : FormBuilder,
    private spinner: NgxSpinnerService,
    private http : HttpClient,
    private toastr: ToastrService,
    private router : Router 
  ){}

  ngOnInit(): void {
  }

  loginForm:FormGroup = this.formBuilder.group({
    username:['',[Validators.required]],
    password:['',[Validators.required]],
    remember:['']
  });

  login(){
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
    }else{
      this.spinner.show();
      const mydata = {
        username : this.loginForm.value.username,
        password : this.loginForm.value.password,
      }
      this.http.post(environment.apiURL + 'api/LoginController/loginUser' , mydata).subscribe((res:any)=>{
        if(res.status){
          this.loginForm.reset();
        setTimeout(()=>{
          localStorage.setItem(res.token , 'authToken');
          this.spinner.hide();
          this.toastr.success(res.message , res.title);
          // this.router.navigate(['/mainLayout'] , { state: { username: mydata.username , password:mydata.password } });
          this.router.navigate(['/mainLayout']);
        },2000);
        }else{
          if(res.title === 'Oops!'){
            this.toastr.warning(res.message , res.title);
          }else{
            this.toastr.error(res.message , res.title);
          }
          this.spinner.hide();
        }
      });
    }
  }

}
