import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgotpassswordPageRoutingModule } from './forgotpasssword-routing.module';

import { ForgotpassswordPage } from './forgotpasssword.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ForgotpassswordPageRoutingModule
  ],
  declarations: [ForgotpassswordPage]
})
export class ForgotpassswordPageModule {}
