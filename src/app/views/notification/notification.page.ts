import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { URL } from 'src/app/classes/url';
import { TabPage } from 'src/app/tab/tab.page';
import { Router } from '@angular/router';



@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  util : any;
  utilInfo:any;
  util2 : any;
  utilInfo2 : any;
  code!: boolean;
  read: string = 'null'
  notif! : any[]
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    if(isOpen===true){
      this.isModalOpen = isOpen;
    }else{
      this.isModalOpen = isOpen;
      window.location.reload();
      window.location.reload();
      window.location.reload();
    }
   
  }

  constructor( private tabpage:TabPage, private router: Router) {}

  ngOnInit() {
    this.util = localStorage.getItem('userNotif');
    this.utilInfo =JSON.parse(this.util);
    this.util2 = localStorage.getItem('userInfo');
    this.utilInfo2 =JSON.parse(this.util2);
   console.log(this.utilInfo2)
    this.notif = this.utilInfo.notifications;
    
    this.code = true
    console.log(this.notif)


  }

  // ionViewDidEnter(){
  //   setTimeout(()=>{
  //     window.location.reload();
  //   },1000000)
    
  // }
  
 
  readNotifications(read:any, notifId: any) {
    console.log(!!(read))

    if (!!(read)== false){
     
      axios.get(URL.EMPLOYEE_URL + '/notifications/'+ notifId + '/mark-as-read',{
        headers: {
          'Authorization': 'Bearer ' + this.utilInfo2.authorization.token
        }
      }).then((response) => {
          console.log(response)
          
          console.log('message lue')
          this.code= false

          this.tabpage.updateNotificationCount();
        })
        .catch((error) => {
          console.error(error);
        });
    }else{
      console.log('Deja marqué comme lue')
    } 
  }

  handleRefresh(event : any) {
    setTimeout(() => {
      // Any calls to load data go here
      window.location.reload();
      window.location.reload();
      window.location.reload();
      this.notif = this.utilInfo.notifications;
      event.target.complete();
    }, 2000);
  }

 
  
  

  



}




