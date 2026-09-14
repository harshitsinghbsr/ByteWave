import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
import { environment } from '../../../../../environments/environment';
import { Country } from '../../../../../interfaces/country';

@Component({
  selector: 'app-schoolprofile',
  templateUrl: './schoolprofile.component.html',
  styleUrl: './schoolprofile.component.scss'
})
export class SchoolprofileComponent implements OnInit , AfterViewInit{

  schoolSrc: string | ArrayBuffer |  null = '../../assets/img/noschoollogo.png';
  signSrc: string | ArrayBuffer |  null = '../../assets/img/noprincipalsign.png';

  countryList: any[] = [];
  stateList: any[] = [];
  cityList: any[] = [];

  constructor(
    private formBuilder : FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private http : HttpClient,
  ){}

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.getCountryList();
  }

  schoolDetailsForm:FormGroup = this.formBuilder.group({
    school_name:['' , [Validators.required , Validators.minLength(3) , Validators.maxLength(30)]],
    email_id:['' , [Validators.required , Validators.email]],
    school_website:['' , [Validators.maxLength(30)]],
    phonecode: [''],
    phone_no:['' , [Validators.required , Validators.maxLength(10) , Validators.pattern(/^[0-9]\d*$/)]],
    landline_no:['' , [Validators.maxLength(10) , Validators.pattern(/^[0-9]\d*$/)]],
    school_address:['' , [Validators.required , Validators.maxLength(100)]],
    pincode:['' , [Validators.required , Validators.maxLength(10)]],
    affiliated_to:['' , [Validators.required , Validators.maxLength(10)]],
  });

  getCountryList(){
    try{
      this.http.get(environment.apiURL + 'api/SchoolController/getCountryList').subscribe((res:any) => {
        if(res.status){
          this.countryList = res.value;
        }else{
          this.toastr.error(res.message , res.title);
          this.countryList = [];
        }
      });
    }catch(error){
      console.error(error);
    }finally{

    }
  }

  getStateList(e:Country){
    console.log(typeof e);
    if(e){
      this.schoolDetailsForm.patchValue({
        phonecode: e.phonecode
      });
    }
    console.log("e" , e);
  }

  onLogoSelected(event: Event): void {
    const input = event.target as HTMLInputElement; // Cast event.target to HTMLInputElement
    if (input.files && input.files[0]) {
        const file = input.files[0]; 
        const reader = new FileReader();
        reader.onload = () => {
          this.schoolSrc = reader.result // Set the preview source
        };
        reader.readAsDataURL(file); // Read file as a data URL
    }
  }

  onSignSelected(event:Event) : void{
    const input = event.target as HTMLInputElement; // Cast event.target to HTMLInputElement
    if (input.files && input.files[0]) {
        const file = input.files[0]; 
        const reader = new FileReader();
        reader.onload = () => {
          this.signSrc = reader.result // Set the preview source
        };
        reader.readAsDataURL(file); // Read file as a data URL
    }
  }
}
