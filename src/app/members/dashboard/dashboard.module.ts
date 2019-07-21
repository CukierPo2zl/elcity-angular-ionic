import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardPage } from './dashboard.page';
import { SwipeTabDirective } from './directives/swipe-tab.directive';

/**
 * Routes for tab bar
 */
const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    children: [
      {
        path: 'spotter',
        loadChildren:
          './pages/spotter/spotter.module#SpotterPageModule'
      },
      {
        path: '',
        redirectTo: 'spotter',
        pathMatch: 'full'
      },
      {
        path: 'my-spots',
        loadChildren:
          './pages/my-spots/my-spots.module#MySpotsPageModule'
      },
      {
        path: 'chat',
        loadChildren: './pages/chat/chat.module#ChatPageModule'
      },
      {
        path: 'news',
        loadChildren: './pages/news/news.module#NewsPageModule'
      },
      {
        path: 'profile',
        loadChildren: './pages/profile/profile.module#ProfilePageModule'
      },

    ]
  }
];
/**
 * Module for authorized users
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    
  ],
  declarations: [DashboardPage, SwipeTabDirective],
  entryComponents: []
})
export class DashboardPageModule {}
