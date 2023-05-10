import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./views/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./views/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'tab',
    loadChildren: () => import('./tab/tab.module').then( m => m.TabPageModule)
  },
  {
    path: 'tab/home/detail-doc',
    loadChildren: () => import('./views/detail-doc/detail-doc.module').then( m => m.DetailDocPageModule)
  },
  {
    path: 'view-doc',
    loadChildren: () => import('./views/view-doc/view-doc.module').then( m => m.ViewDocPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./views/notification/notification.module').then( m => m.NotificationPageModule)
  },  {
    path: 'settings',
    loadChildren: () => import('./views/settings/settings.module').then( m => m.SettingsPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
