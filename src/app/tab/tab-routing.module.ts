import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabPage } from './tab.page';

const routes: Routes = [
  {
    path: '',
    component: TabPage,
    children: [
      {
        path:'home',
        loadChildren:()=> import('../views/home/home.module').then(m => m.HomePageModule)  
       },
       {
        path: 'settings',
        loadChildren: () => import('../views/settings/settings.module').then( m => m.SettingsPageModule)
      },
      {
        path: 'notification',
        loadChildren: () => import('../views/notification/notification.module').then( m => m.NotificationPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabPageRoutingModule {}
