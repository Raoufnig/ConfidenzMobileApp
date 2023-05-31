import { Component } from '@angular/core';
import axios from 'axios';
import { URL } from './classes/url';
import { Network } from '@capacitor/network';
import { Toast } from '@capacitor/toast';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
   notifications!: any[];
   util : any;
   utilInfo : any;
   isConnected=true;

  constructor() {}

  ngOnInit() {
    this.util = localStorage.getItem('userInfo');
    this.utilInfo =JSON.parse(this.util);
    this.getNotifications();

    let ref =this;
    Network.addListener("networkStatusChange", (val: any) =>{
     if(val.connected){
       ref.showToast("Connexion établie.");
       this.isConnected;
       
     }
     else{
       ref.showToast("Connexion perdue.");
       this.isConnected=false;
     }
    });
  }

  showToast(msg :string){
    Toast.show({text : msg , duration : "long", position:'top'})
}

  getNotifications() {
    axios.get(URL.EMPLOYEE_URL+'/notifications/unread',{
      headers: {
        'Authorization': 'Bearer '+this.utilInfo.authorization.token,
      }}).then((response) => {
        this.notifications = response.data;
        const employeeNotif= JSON.stringify(response.data)
        localStorage.setItem('userNotif',employeeNotif);
        console.log("userNotif : ", localStorage.getItem('userNotif'));
        console.log(response.data)
      })
      .catch((error) => {
        console.error(error);
      });
  }
    
   
  }

