import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from 'src/app/models/ticket';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {
  

  id!: number;
  ticket!: Ticket;
  constructor(private api: TicketService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = Number(params['id']);
    this.api.getTicket(this.id)
      .subscribe(data => this.ticket = data);
    });

  }

  deleteTicket(id: number) {
    if(!id) return console.log('id non trovato')
    this.api.deleteTicket(id).subscribe(
      data => {
        this.router.navigate(["/ticketall"])
      },
      error => {
        console.log(error); 
      }
    )
  }

}
