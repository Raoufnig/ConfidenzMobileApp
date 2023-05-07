import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewDocPage } from './view-doc.page';

const routes: Routes = [
  {
    path: '',
    component: ViewDocPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewDocPageRoutingModule {}
