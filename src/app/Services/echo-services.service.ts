// import { Injectable } from '@angular/core';
// import Echo from 'laravel-echo';

// @Injectable({
//   providedIn: 'root'
// })
// export class EchoServicesService {

//   echo!: Echo ;
//   constructor() {

   
//    }

//    setupWithToken(token:any){
//     this.echo = new Echo({
//       broadcaster: 'socket.io',
//       host: 'http://localhost:6001', // Remplacez par l'URL de votre serveur Echo
//       key: 123456,
//       auth:
//       {
//         headers:
//         {
//           authorization: 'Bearer' + token
//         }
//       }
//     });
//      // window['echo']=this.echo;
     
//      this.echo.connector.socket.on('connect', function () {
//        console.log('CONNECTED');
//     });
//     this.listen();
//    }

//    joinChannel(channelName: string) {
//      return this.echo.join(channelName);
//    }
//   listen(){
//     this.echo.private('events')
//       .listen('Illuminate\Notifications\Events\BroadcastNotificationCreated',(response:any)=>{
//         console.log(response);
//         alert('New Notification')
//       }); 
//   }

//   // listen(channelName: string, eventName: string, callback: (data: any) => void) {
//   //   this.echo.channel(channelName).listen(eventName, callback);
//   // }
// }
