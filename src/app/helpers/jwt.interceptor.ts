import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, from } from 'rxjs';


import { AuthService } from '../services/auth.service';
import { Storage } from '@ionic/storage';
import { catchError, mergeMap  } from 'rxjs/operators';
import { LocationService } from '../services/location.service';


/**
 * Setting up reqired JWT headers
 */
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
        private authenticationService: AuthService,
        private storage: Storage,
        private locationService: LocationService
        ) { console.log('jwt interceptor'); }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let promise = this.storage.get('currentUser');

        return from(promise).pipe(
            mergeMap(token => {
                let clonedReq = this.addToken(request, token);
                return next.handle(clonedReq).pipe(
                    catchError(error => {
                        throw new Error(error);
                    })
                );
            })
            );
    }

    // Adds the token to your headers if it exists
    private addToken(request: HttpRequest<any>, token: any) {
        console.log(this.locationService.loaded.value)
        // sets headers if user has token and if locations data is loaded (CORS conflict)
        if (token && this.locationService.loaded.value === true) {
            let clone: HttpRequest<any>;
            clone = request.clone({
                setHeaders: {
                    Accept: `application/json`,
                    'Content-Type': `application/json`,
                    Authorization: `JWT ${token}`,
                }
            });
            return clone;
        }
        return request;
    }
    }
