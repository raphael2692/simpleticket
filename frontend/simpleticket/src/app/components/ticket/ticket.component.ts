import { Component, Input, OnInit } from '@angular/core';
import { Ticket } from 'src/app/models/ticket';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  // @Input()
  // ticket!: Ticket;

  constructor() { }

  ngOnInit(): void {
    
  }

}
