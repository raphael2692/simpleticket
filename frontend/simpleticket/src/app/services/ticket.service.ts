import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ticket } from '../models/ticket';
import { map } from 'rxjs';



@Injectable({
  providedIn: 'root'
})


export class TicketService {

  baseUrl: string = "http://localhost:8000" // todo mettere in config

  constructor(private http: HttpClient) { }

  getTickets() {
    return this.http.get<Ticket[]>(`${this.baseUrl}/tickets/`)

  }

  getTicket(ticketUrl: string) {
    return this.http.get<Ticket>(ticketUrl)
  }
  
  addTicket(ticket:Ticket) {
    return this.http.post<Ticket>(`${this.baseUrl}/tickets/`, ticket)
  }

}