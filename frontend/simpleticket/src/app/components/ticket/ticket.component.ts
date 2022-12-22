import { Component, Input, OnInit } from '@angular/core';
import { Ticket } from 'src/app/models/ticket';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  @Input()
  ticketUrl!: string;
  ticket!: Ticket;
  constructor(private api: TicketService) { }

  ngOnInit(): void {
    this.api.getTicket(this.ticketUrl)
      .subscribe((data: Ticket) => this.ticket = data);
  }

}
