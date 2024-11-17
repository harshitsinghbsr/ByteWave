import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'ByteWave';

  ngOnInit(): void {
    this.currentTime();
  }

  currentTime(){
    var today = new Date()
    var curHr = today.getHours();
    this.applyDarkMode(curHr);
  }

  applyDarkMode(curHr:number){
    if (curHr > 7 && curHr < 18) {
      document.documentElement.setAttribute('data-bs-theme','light')
    }else {
      document.documentElement.setAttribute('data-bs-theme','dark')
    }
  }
}
