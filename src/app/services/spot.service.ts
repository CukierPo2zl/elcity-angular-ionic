import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Spot } from '../models/spot';

@Injectable({
  providedIn: 'root'
})
export class SpotService {

  constructor(private http: HttpClient, private auth: AuthService) { }
  AUTH_SERVER_ADDRESS =  'http://192.168.1.105:8000';
  
  // getSpots() {
  //   return this.http.get(this.AUTH_SERVER_ADDRESS + '/api/spots/').pipe(
  //     catchError(e => {
  //       let status = e.status;
  //       if (status === 401) {
  //         this.auth.authenticationState.next(false);
  //       }
  //       throw new Error(e);
  //     })
  //   );
  // }

  getSpots(): Observable<Spot[]>{
    return this.http.get(this.AUTH_SERVER_ADDRESS + `/api/spots/`).pipe(
        map((data: any[]) => data.map((item: any) => new Spot(
            item.url,
            item.id,
            item.content,
            item.anonymous,
        )))
    );
}
}
