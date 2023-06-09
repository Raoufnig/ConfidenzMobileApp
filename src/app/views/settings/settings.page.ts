import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, CheckboxCustomEvent, IonModal, ToastController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';



@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  util : any;
  utilInfo : any;
  sms1:any;
  sms:any [] = [];
  nom: any;
  isModalOpen = false;
  presentingElement: any;
  presentingElement1: any;
  canDismiss0 = false;

  

  constructor(private renderer : Renderer2, private actionSheetCtrl: ActionSheetController, private router : Router, private toastController: ToastController) {  }
 

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

  logout(){
   
    localStorage.clear() 

    this.router.navigate(['login'])
    
  }
  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Pas Encore Disponible Pour le Moment!',
      duration: 1700,
      position: position,
    });

    await toast.present();
  }

  message = '';
  name!: string;

  cancel() {
    this.modal.dismiss(null, 'Annuler');
  }

  confirm() {
    this.modal.dismiss(this.name, 'Confirmer');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'Confirmer') {
      this.message = `${ev.detail.data}`;
      const msg = JSON.stringify(this.message)
      this.sms1 = JSON.parse(msg)
      
      console.log(this.sms)
      
      localStorage.setItem('QuestionsUser', this.sms1 )
     

    }
  }
  
}
