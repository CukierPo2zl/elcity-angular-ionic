import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Location } from '../models';
import { delay } from 'rxjs/operators';

/**
 * The location service is responsible for acquiring locations where you can use Elcity.
 * Single object from downloaded JSON file represents Location interface (models/location.ts)
 */
@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  /**
   * server address that includes locations
   */
  API = 'https://cukierpo2zl.github.io/cities_poland.json';

  /**
   * the variable contains information whether the data has been loaded to ionic-selectable component
   */
  loaded = new BehaviorSubject(false);

  locations: Location[];

  /**
   * @returns locations
   */
  getLocations() {
    return this.http.get(this.API);
  }

  getLocationsArray(): Observable<Location[]> {
    return this.http.get<Location[]>(this.API);
  }
  getPortsAsync(timeout = 1000): Observable<Location[]> {
    return new Observable<any>(observer => {
      observer.next(this.getLocationsArray());
      observer.complete();
    }).pipe(delay(timeout));
  }


}
