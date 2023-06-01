import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { URL } from 'src/app/classes/url';



@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  util : any;
  utilInfo:any;
  couleur: string = '#31de9f';
  read: string = 'null'
  notif! : any[]

  constructor() {}

  ngOnInit() {
    this.util = localStorage.getItem('userNotif');
    this.utilInfo =JSON.parse(this.util);
    this.notif = this.utilInfo.notifications;
    //this.readNotifications();
    console.log(this.utilInfo)
  }
  
 
  readNotifications() {
    
    if (this.read == null){
      axios.get(URL.EMPLOYEE_URL+'/notifications/read',{
        headers: {
          'Authorization': 'Bearer '+this.utilInfo.authorization.token,
        }}).then((response) => {
          
        })
        .catch((error) => {
          console.error(error);
        });
    }else{
       this.couleur = 'white'
    }
  }
  

  



}




