import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';
import { Ticket } from 'src/app/models/ticket';

@Component({
  selector: 'app-ticket-all',
  templateUrl: './ticket-all.component.html',
  styleUrls: ['./ticket-all.component.scss']
})
export class TicketAllComponent implements OnInit {
  tickets: Ticket[] | undefined;

  constructor(private api: TicketService) { }

  ngOnInit(): void {
    this.showTickets()
  }

  showTickets() {
    this.api.getTickets()
      // clone the data object, using its known Ticket shape
      // .subscribe((data: Ticket[]) => this.tickets = {...data}});
      .subscribe((data: Ticket[]) => this.tickets = data);
  }
}
