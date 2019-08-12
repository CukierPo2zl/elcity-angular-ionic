import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { Spot } from '../models/spot';

@Injectable({
  providedIn: 'root'
})
export class SpotService {

  constructor(private http: HttpClient, private auth: AuthService) { }
  AUTH_SERVER_ADDRESS =  'http://192.168.1.103:8000';

  getSpots() {
    return this.http.get(this.AUTH_SERVER_ADDRESS + '/api/spotter/').pipe(
      catchError(e => {
        const status = e.status;
        if (status === 401) {
          this.auth.authenticationState.next(false);
        }
        throw new Error(e);
      })
    );
  }
  postSpot(spot: Spot): Observable<Spot> {
    return this.http
        .post<Spot>(this.AUTH_SERVER_ADDRESS + `/api/spotter/`, spot);

}


spotsByLocation(lon, lat){
  return this.http.post<any>(this.AUTH_SERVER_ADDRESS + '/api/spotter/spots', { lon, lat },
    {responseType: 'json'}).pipe(
      map((spots: Spot[]) => {
          return spots;
      }),
      catchError(error =>{
        return throwError('Something webt wrong' + JSON.stringify(error));
      })
    )
  };
}
