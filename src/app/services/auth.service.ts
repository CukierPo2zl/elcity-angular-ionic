import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

import { Storage } from '@ionic/storage';
import { User, AuthResponse } from '../models';
import { Platform, AlertController } from '@ionic/angular';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

const TOKEN_KEY = 'currentUser';
const helper = new JwtHelperService();
/**
 * Authentication service defines user registration, login, logout and also JWT  token validation.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: AuthResponse;
  /**
   * backend server address
   */
  // AUTH_SERVER_ADDRESS =  'http://192.168.1.103:8000';

  /**
   * State represents user auth state
   */
  authenticationState = new BehaviorSubject(false);

  /**
   * Performs token validation
   *
   * @param httpClient http client
   * @param storage ionic storage that stores JWT token
   * @param plt platform
   */
  constructor(
    private httpClient: HttpClient,
    private storage: Storage,
    private plt: Platform,
    private alertController: AlertController
     ) {
       this.plt.ready().then(() => {
         this.checkToken();
       });
     }

  /**
   * Performs api request for new user
   * @param user user model
   */
  register(user: User): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${environment.url}/api/users/`, user).pipe(
      catchError(e => {
        this.showErrorAlert(e.error.msg);
        throw new Error(e);
      })
    );
  }

  /**
   * Method performs api request for existed user.
   * Setting currnet user data in ionic storage.
   *
   * @param email email
   * @param password password
   * @returns user data with JWT token
   */
  login(email: string, password: string) {
    return this.httpClient.post<any>(environment.url + `/api/users/auth/login/`, { email, password })
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                this.storage.set(TOKEN_KEY, user.token);
                this.user = helper.decodeToken(user.token);
                this.authenticationState.next(true);
            }
            return user;
        }),
        catchError(e => {
          this.showErrorAlert(e.error.msg);
          throw new Error(e);
        })
        );
}

  /**
   * The method removes the current user data from storage,
   * which is equivalent to logging out the user.
   */
  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
   // await this.storage.remove('EXPIRES_IN');
  }

  /**
   * Get user auth state.
   */
  isAuthenticated() {
    return this.authenticationState.value;
  }

  /**
   * Token validation.
   * @example
   * if (token is valid)
   *    set user state at true
   */
  checkToken() {
    return this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        const decoded = helper.decodeToken(res);
        const isExpired = helper.isTokenExpired(res);

        if (!isExpired) {
          this.user = decoded;
          this.authenticationState.next(true);
        } else {
          this.storage.remove(TOKEN_KEY);
        }
      }
    });
  }
/**
 * basic error alert
 */
  showErrorAlert(msg) {
    const alert = this.alertController.create({
      message: msg,
      header: 'Error',
      buttons: ['OK']
    });
  }
}


