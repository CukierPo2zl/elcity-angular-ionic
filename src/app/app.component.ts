import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
/**
 * Init app
 */
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})

export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router,
  
  ) {
    this.initializeApp();
  
  }

 /**
  *  Splash screen controll, check if user is authenticated
  */
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

     // checks state of user auth
      this.authService.authenticationState.subscribe(state => {
        console.log('auth: ' + state);
        if (state) {
          this.router.navigate(['@app', 'dashboard']);
        } else {
          this.router.navigate(['']);
        }
      });
    });
  }
}
