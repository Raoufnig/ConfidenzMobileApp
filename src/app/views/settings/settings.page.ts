import { Component, OnInit, Renderer2 } from '@angular/core';



@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  util : any;
  utilInfo : any;
  nom: any;

  constructor(private renderer : Renderer2) { 
    
  }
 

  ngOnInit() {
    this.util = localStorage.getItem('userInfo');
    this.utilInfo =JSON.parse(this.util); 
  }
  toggleTheme(event:any){
    console.log(event);
    
    if (event.detail.checked){
      this.renderer.setAttribute(document.body, 'color-theme','dark');
      this.nom="moon-outline"
    }else{
      this.renderer.setAttribute(document.body, 'color-theme','light');
      this.nom ="sunny-outline";
    }
  }


}
