import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';
import { Router } from '@angular/router';
import { Ticket } from './../../models/ticket';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ticket-all',
  templateUrl: './ticket-all.component.html',
  styleUrls: ['./ticket-all.component.scss']
})

export class TicketAllComponent implements OnInit {
  tickets!: Ticket[];
  ticket!: Ticket
  constructor(private api: TicketService, private router: Router, private userApi: UserService) { }

  ngOnInit(): void {
    this.showTickets()
    this.api.onAddedTicket.subscribe(
      data => {
        this.showTickets()
        console.log(data)
      }
    )
  }

  showTickets() {
      this.api.getTickets()
      // clone the data object, using its known Ticket shape
      // .subscribe((data: Ticket[]) => this.tickets = {...data}});
      .subscribe((data: Ticket[]) => this.tickets = data);
   
  }

  deleteTicket(id: number){
    if(!id) return console.log(id + ' non trovato')
    if(confirm('Sei sicuro di vole eliminare il ticket ' + id + ' ?') == true)
      this.api.deleteTicket(id).subscribe(
        data => {
          this.router.navigate(["/ticketall"])
          this.showTickets()
    })
        // alert('Sei sicuro di vole eliminare il ticket ' + id + ' ?')
        // this.router.navigate(["/ticketall"])
        // this.showTickets()
        // console.log(id + ' eliminato')
  }
}
    
  

