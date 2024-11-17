import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrl: './new-account.component.scss'
})
export class NewAccountComponent implements OnInit{

  constructor(
    private formBuilder : FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private http : HttpClient,
    private router : Router
  ){}

  ngOnInit(){
  }

  signUpForm:FormGroup = this.formBuilder.group({
    name:['',[Validators.required , Validators.minLength(4) , Validators.maxLength(20)]],
    email:['',[Validators.required , Validators.email]],
    username:['',[Validators.required ,Validators.minLength(6) , Validators.maxLength(20)]],
    password:['',[Validators.required ,Validators.minLength(4) , Validators.maxLength(20)]],
    terms:['',[Validators.required]],
  });

  createNewAccount(){
    if(this.signUpForm.invalid){
      this.signUpForm.markAllAsTouched();
      if(this.signUpForm.controls['terms'].invalid){
        this.showTerms();
        return;
      }else{
        this.showWarning();
        return;
      }
    }
    this.spinner.show();
    const mydata = {
      name : this.signUpForm.value.name,
      email : this.signUpForm.value.email,
      username : this.signUpForm.value.username.trim().replace(/\s+/g , ""),
      password : this.signUpForm.value.password.trim().replace(/\s+/g , ""),
    }
    this.http.post(environment.apiURL + 'api/LoginController/createAccount', mydata).subscribe((res:any) => {
      if(res.status){
        this.signUpForm.reset();
        setTimeout(()=>{
          this.spinner.hide();
          this.toastr.success(res.message , res.title);
          this.router.navigate(['/loginpage']);
        },2000);
      }else{
        if(res.title === 'Oops!'){
          this.toastr.warning(res.message , res.title);
        }else{
          this.toastr.error(res.message , res.title);
        }
        this.spinner.hide();
      }
    },(error) => {
      this.spinner.hide();
      this.toastr.error("Contact To Admin" , "Error");
      console.error(error);
    });
  }

  showSuccess() {
    this.toastr.success('Account Created Successfully.', 'Congratulations' , {
      timeOut : 3000
    });
  }

  showWarning(){
    this.toastr.warning('Please Fill All Required Fields.', 'Form Invalid' , {
      timeOut : 3000
    });
  }

  showTerms(){
    this.toastr.warning('Please Accept Terms and Conditions.', 'Terms & Conditions' , {
      timeOut : 3000
    });
  }

  showError(){
    this.toastr.error('Please Contact To Admin', 'Error' , {
      timeOut : 3000
    });
  }

  test(){
    this.http.get(environment.apiURL).subscribe((res:any)=>{
      console.log("res" , res);
    });
  }

  test2(){
    let mydata = {
      message : "This is Post"
    }
    this.http.post(environment.apiURL + 'post' , mydata).subscribe((res:any)=>{
      console.log("res" , res.data.message);
    });
  }
}
