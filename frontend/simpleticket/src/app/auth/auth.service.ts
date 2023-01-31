import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { User } from '../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';


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


  constructor(private http: HttpClient,
    private jwt: JwtHelperService,
    private router: Router,
    private userService: UserService) {

  }

  login(username: string | undefined | null, password: string | undefined | null) {
    return this.http.post<Token>('http://localhost:8000/api/token/', { username, password })
      .subscribe(
        res => {
          this.setSession(res)
          console.log(res)
        }
      );
  }

  private setSession(token: Token) {
    const payload = this.jwt.decodeToken(token.access)
    // console.log(payload)
    const expiresAt = moment().add(payload.exp, 'second');
    localStorage.setItem('access_token', token.access);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    // console.log(token)
    // console.log(token.access)
    this.userService.getUserById(payload.user_id).subscribe(
      (data) => {

        localStorage.setItem("logged_user", JSON.stringify(data))
        console.log(data)
      }
    )
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

  getLoggedInUser() {
    const user = localStorage.getItem("logged_user")
    const parsedUser = user ? JSON.parse(user) : new Object
    return parsedUser
  }

}