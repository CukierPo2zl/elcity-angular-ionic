import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StarService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  getMyStars(){
    return this.http.get(environment.url + '/api/spotter/mystars').pipe(
      catchError(e => {
        const status = e.status;
        if (status === 401) {
          this.auth.authenticationState.next(false);
        }
        throw new Error(e);
      })
    );
  }
}
