import { Component } from '@angular/core';

@Component({
  selector: 'app-schoolprofile',
  templateUrl: './schoolprofile.component.html',
  styleUrl: './schoolprofile.component.scss'
})
export class SchoolprofileComponent {

  schoolSrc: string | ArrayBuffer |  null = '../../assets/img/noschoollogo.png';
  signSrc: string | ArrayBuffer |  null = '../../assets/img/noprincipalsign.png';

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
