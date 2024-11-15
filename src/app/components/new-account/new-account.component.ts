import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrl: './new-account.component.scss'
})
export class NewAccountComponent{

  constructor(
    private formBuilder : FormBuilder,
    private toastr: ToastrService
  ){}

  signUpForm:FormGroup = this.formBuilder.group({
    name:['',[Validators.required , Validators.minLength(4) , Validators.maxLength(20)]],
    email:['',[Validators.required , Validators.email]],
    username:['',[Validators.required ,Validators.minLength(6) , Validators.maxLength(20)]],
    password:['',[Validators.required ,Validators.minLength(4) , Validators.maxLength(20)]],
    terms:['',[Validators.required]],
  });

  createNewAccount(){
    if(this.signUpForm.invalid){
      if(this.signUpForm.controls['terms'].invalid){
        this.showTerms();
      }else{
        this.showWarning();
      }
    }else{
      this.showSuccess();
    }
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
}
