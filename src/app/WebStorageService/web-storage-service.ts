import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable(
  {
    providedIn : 'root', // Ensures the service is available application-wide
  }
)

export class WebStorageService {

  constructor(
    private routes : Router
  ){}

  setCurrentUserDetails(data:any){
    localStorage.setItem("currentUserDetails" , data);
  }

  logout(){
    localStorage.clear();
    this.routes.navigate(['/loginpage']);
  }
}
