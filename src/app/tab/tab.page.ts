import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.page.html',
  styleUrls: ['./tab.page.scss'],
})
export class TabPage implements OnInit {
  util : any;
  utilInfo:any;
  notif! : any[]
  notificationCount: number = 0 ;
  constructor() { }

  ngOnInit() {
    
  }
  ionViewWillEnter(){
    this.util = localStorage.getItem('userNotif');
    this.utilInfo =JSON.parse(this.util);
    this.notif = this.utilInfo.notifications;

    if(this.notif){
      this.notificationCount= this.notif.length;
    }
  }

  updateNotificationCount() {
    this.util = localStorage.getItem('userNotif');
    this.utilInfo =JSON.parse(this.util);
    this.notif = this.utilInfo.notifications;
   
      if (this.notif) {
        this.notificationCount = this.notif.length;
      } else {
        this.notificationCount = 0;
      }
    
  }

}
