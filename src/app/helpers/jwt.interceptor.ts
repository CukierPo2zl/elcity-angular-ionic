import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, from } from 'rxjs';


import { AuthService } from '../services/auth.service';
import { Storage } from '@ionic/storage';
import { catchError, mergeMap  } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService, private storage: Storage) {console.log("jwt")}

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
        if (token) {
            let clone: HttpRequest<any>;
            clone = request.clone({
                setHeaders: {
                    Accept: `application/json`,
                    'Content-Type': `application/json`,
                    Authorization: `JWT ${token}`
                }
            });
            return clone;
        }
 
        return request;
    }
    }
