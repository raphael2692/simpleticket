import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Router } from "@angular/router"

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // console.log("Error inteceptorcallback")
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            // client-side error
            
            errorMessage = `Error: ${error.error.message}`;

          } else {
            // server-side error
            errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
            // if (error.status === 401) {
            //   this.router.navigate(['/login'])
            // }
          }
          console.log(errorMessage);
          return throwError(() => new Error(errorMessage));
        })
      )
  }
}