import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { User } from '../models/user';
import jwt_decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';


export interface Token {
  access: string,
  refresh: string
}

export interface TokenPayload {
  token_type: string
  exp: string
  jti: string
  iat: string
  user_id: string
}
function parseJwt(token: string) {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  isLoggedInSubject = new BehaviorSubject<boolean>(this.isTokenValid());

  constructor(private http: HttpClient, private jwt: JwtHelperService,private router: Router) {

  }

  login(username: string, password: string) {
    return this.http.post<Token>('http://localhost:8000/api/token/', { username, password })
      .subscribe(
        res => this.setSession(res)
      );
  }

  private setSession(token: Token) {
    const payload = this.jwt.decodeToken(token.access)
    console.log(payload)
    const expiresAt = moment().add(payload.exp, 'second');
    localStorage.setItem('access_token', token.access);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    // console.log(token)
    // console.log(token.access)
    this.isLoggedInSubject.next(true)
    this.router.navigate(['/ticketall'])

  }


  logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("expires_at");
    this.isLoggedInSubject.next(false)
  }

  public isTokenValid() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = expiration ? JSON.parse(expiration) : "";
    return moment(expiresAt);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();

  }

}