import { Component, OnInit } from '@angular/core';
import { Console } from 'console';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  notifications: string[] = [];

  constructor(private socket: Socket) {
    this.socket.fromEvent('notification').subscribe((data: any) => {
      this.notifications.push(data);
      console.log(data)
    });
  }

  ngOnInit() {
    
     }


}




