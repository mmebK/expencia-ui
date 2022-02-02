import {NgModule} from '@angular/core';
import {CommonModule,} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';

import {PagesLayoutComponent} from './components/pages/pages-layout/pages-layout.component';
import {AuthLayoutComponent} from './components/authentication/auth-layout/auth-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {


    path: '',
    component: PagesLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/components/pages/pages.module').then(m => m.PagesModule)
      }
    ]
  }, {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/components/authentication/authentication.module').then(m => m.AuthenticationModule)
      }
    ]
  }, {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [],
})
export class AppRoutingModule {
}
