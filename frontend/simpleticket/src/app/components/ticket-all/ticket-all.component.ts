import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';
import { Router } from '@angular/router';
import { Ticket } from './../../models/ticket';

@Component({
  selector: 'app-ticket-all',
  templateUrl: './ticket-all.component.html',
  styleUrls: ['./ticket-all.component.scss']
})

export class TicketAllComponent implements OnInit {
  tickets: Ticket[] | undefined;

  constructor(private api: TicketService, private router: Router) { }

  ngOnInit(): void {
    this.showTickets()
    this.api.onAddedTicket.subscribe(
      data => {
        this.showTickets()
      }
    )
  }

  showTickets() {
    this.api.getTickets()
      // clone the data object, using its known Ticket shape
      // .subscribe((data: Ticket[]) => this.tickets = {...data}});
      .subscribe((data: Ticket[]) => this.tickets = data);
  }
}
