import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonTabs } from '@ionic/angular';
import { Router } from '@angular/router';
import { SwipeTabDirective } from './directives/swipe-tab.directive';

/**
 * Page contains main nav, tab bar and also controlls for swipe between tabs.
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  @ViewChild(SwipeTabDirective) swipeTabDirective: SwipeTabDirective;
  @ViewChild('myTabs') tabRef: IonTabs;

  constructor(
    private modalController: ModalController,
    public router: Router
    ) { }

  ngOnInit() {
  }
  /**
   * Navigation to settings
   */
  goToSettings() {
    this.router.navigateByUrl('@app/settings');
  }


  ionTabsDidChange($event) {
    // console.log('[DashboardPage] ionTabsDidChange, $event: ', $event.tab);
    this.swipeTabDirective.onTabInitialized($event.tab);
  }

  onTabChange($event) {
    // console.log('[DashboardPage] onTabChange, $event: ', $event);
    this.tabRef.select($event);
  }

}
