import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActionSheetController, CheckboxCustomEvent } from '@ionic/angular';



@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  util : any;
  utilInfo : any;
  nom: any;
  isModalOpen = false;
  presentingElement: any;
  presentingElement1: any;
  canDismiss0 = false;
  

  constructor(private renderer : Renderer2, private actionSheetCtrl: ActionSheetController) { 
    
  }
 

  ngOnInit() {
    this.util = localStorage.getItem('userInfo');
    this.utilInfo =JSON.parse(this.util); 
    this.presentingElement = document.querySelector('.ion-page');
    
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

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
    
  }

  canDismiss = async () => {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Etes-vous sûr?',
      buttons: [
        {
          text: 'Oui',
          role: 'confirm',
        },
        {
          text: 'Non',
          role: 'cancel',
        },
      ],
    });

    actionSheet.present();

    const { role } = await actionSheet.onWillDismiss();

    return role === 'confirm';
  };
  onTermsChanged(event: Event) {
    const ev = event as CheckboxCustomEvent;
    this.canDismiss0 = ev.detail.checked;
  }
}
