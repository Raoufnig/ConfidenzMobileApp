import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewDocPageRoutingModule } from './view-doc-routing.module';

import { ViewDocPage } from './view-doc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewDocPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ViewDocPage]
})
export class ViewDocPageModule {}
