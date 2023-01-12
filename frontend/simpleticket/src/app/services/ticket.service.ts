import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ticket } from '../models/ticket';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TicketService {

  baseUrl: string = "http://localhost:8000" // todo mettere in config
  onAddedTicket = new Subject<any>();

  constructor(private http: HttpClient) { }

  getTickets() {
    return this.http.get<Ticket[]>(`${this.baseUrl}/tickets/`)
  }

  getTicket(ticketId: number): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.baseUrl}/tickets/${ticketId}/`)
  }
  
  addTicket(ticket:Ticket) {
    return this.http.post<Ticket>(`${this.baseUrl}/tickets/`, ticket)
  }

  deleteTicket(ticketId: number) {
    return this.http.delete<Ticket>(`${this.baseUrl}/tickets/${ticketId}/`)
  }

  // TODO putTicket method

}