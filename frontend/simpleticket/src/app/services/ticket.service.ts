import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ticket } from '../models/ticket';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }

  getTickets() {
    return this.http.get<Ticket[]>('http://localhost:8000/tickets/')

  }

}