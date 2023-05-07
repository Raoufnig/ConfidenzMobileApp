import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailDocPageRoutingModule } from './detail-doc-routing.module';

import { DetailDocPage } from './detail-doc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailDocPageRoutingModule
  ],
  declarations: [DetailDocPage]
})
export class DetailDocPageModule {}
