import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from "@angular/router"


import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authApi: AuthService, private router: Router) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("intercept!!")
    const isTokenValid = this.authApi.isTokenValid()

    if (isTokenValid) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization",
          "Bearer " + localStorage.getItem("access_token"))
      });

      return next.handle(cloned);

    }
    else {
      this.router.navigate(['/login'])
      return next.handle(req);
    }

  }
}
