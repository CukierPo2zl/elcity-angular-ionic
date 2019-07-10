import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublicPage } from './public.page';
import { LoginComponent, RegisterComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: PublicPage
  }
];
/**
 * Module for unauthorized users. Defines start page with login and register view.
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PublicPage, LoginComponent, RegisterComponent],
  entryComponents: [LoginComponent, RegisterComponent],
})

export class PublicPageModule {}
