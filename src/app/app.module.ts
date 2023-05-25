import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {ReactiveFormsModule} from "@angular/forms";
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SocketIoModule } from 'ngx-socket-io';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,  ReactiveFormsModule,   SocketIoModule.forRoot({
    url: 'http://localhost:6001', // l'URL de votre serveur WebSocket
    options: {}
  })
],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
