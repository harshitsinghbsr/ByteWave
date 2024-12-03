import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.scss'
})
export class VerifyEmailComponent implements OnInit , AfterViewInit{
  email!:string;
  display: any;
  public timerInterval: any = "remainingSeconds";
  remaining_time : boolean = true;
  start_time : boolean = false;
  originalEmail : string = ';'

  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private http : HttpClient,
    private router : Router
  ){}

  ngOnInit(): void {
    this. hideEmailId();
    this.domLoaded();
  }

  ngAfterViewInit() : void {
    this.timer(1);
  }

  hideEmailId(){
    this.email = history.state.email;
    this.originalEmail = this.email;
    const host = this.email.split("@");
    const view = this.email.split("@")[0].slice(0 , 1).concat("******" , "@" , host[1]);
    this.email = view;
  }
  
  domLoaded(){
    document.addEventListener("DOMContentLoaded", () => {
      this.otpInput();
    });
  }

  otpInput(){
    const inputs = document.querySelectorAll<HTMLInputElement>('#otp > input');

    for (let i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener('input', function () {
          if (this.value.length > 1) {
              this.value = this.value[0]; // Limit input to a single character
          }
          if (this.value !== '' && i < inputs.length - 1) {
              inputs[i + 1].focus(); // Move to the next input
          }
      });

      inputs[i].addEventListener('keydown', function (event: KeyboardEvent) {
          if (event.key === 'Backspace') {
              this.value = ''; // Clear the current input
              if (i > 0) {
                  inputs[i - 1].focus(); // Move to the previous input
              }
          }
      });
    }
  }

  async validateOtp(){
    let otp = '';
    document.querySelectorAll<HTMLInputElement>('#otp > input').forEach(input => otp += input.value);
    // alert(`Entered OTP: ${otp}`); // Display the entered OTP
    await this.sendOtpForEmailVerification(this.originalEmail , otp);
  }

  resendOtp(){
    const mydata = {
      email : this.originalEmail,
      purpose : "EMAIL"
    }
    this.http.post(environment.apiURL + 'api/LoginController/resendVerificationCode' , mydata).subscribe((res:any) => {
      if(res.status){
        this.toastr.success(res.message , res.title);
        localStorage.removeItem("remainingSeconds"); // Clear stored time
        this.timer(1);
      }else{
        this.toastr.error(res.message , res.title);
      }
    });
  }

  timer(minute: number = 1) {
    this.remaining_time  = true;
    this.start_time  = false;
    // Retrieve remaining seconds from localStorage or set a default value
    let savedSeconds = localStorage.getItem("remainingSeconds");
    let seconds: number = savedSeconds ? parseInt(savedSeconds) : minute * 60; // Default to 1 minute if no value is stored
  
    console.log("seconds" , seconds);
    this.timerInterval = setInterval(() => {
      if (seconds > 0) {
        seconds--;
  
        const minutes = Math.floor(seconds / 60);
        const statSec = seconds % 60;
  
        // Format seconds and minutes
        const textSec = statSec < 10 ? '0' + statSec : statSec;
        const prefix = minutes < 10 ? '0' : '';
        
        // Update display
        this.display = `${prefix}${minutes}:${textSec}`;
        console.log("display" , this.display);
  
        // Save remaining seconds to localStorage
        localStorage.setItem("remainingSeconds", String(seconds));
      } else {
        // Timer ends
        console.log('finished');
        this.remaining_time = false;
        this.start_time = true;
        localStorage.clear();
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }
  

  async sendOtpForEmailVerification(email:string , otp:number | string){
    const mydata = {
      user_email : email,
      user_otp : otp
    }
    this.spinner.show();
    // const headers = { 'Content-Type': 'application/json' };
    this.http.post(environment.apiURL + 'api/LoginController/verifyEmail' , mydata).subscribe((res:any) => {
      if(res.status){
        setTimeout(()=>{
          this.toastr.success(res.message , res.title);
          clearInterval(this.timerInterval);
          localStorage.clear();
          this.spinner.hide();
          this.router.navigate(['/loginpage']);
        } , 1000);
      }else{
        this.toastr.error(res.message , res.title);
        this.spinner.hide();
      }
    });
  }

}
