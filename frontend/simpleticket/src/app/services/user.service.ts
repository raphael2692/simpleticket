import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Ticket } from 'src/app/models/ticket';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  user!: User
  tickets!: Ticket

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<User[]>('http://localhost:8000/users/')
  }

  getUser(userUrl: any) {
    return this.http.get<User>(userUrl)
  }

  getUserById(id: any) {
    return this.http.get<User>(`http://localhost:8000/users/${id}/`)
  }
  // getSUperUser(userUrl: any){
  //  return this.http.get<Ticket>(userUrl)
  // }

}





