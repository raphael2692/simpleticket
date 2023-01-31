import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';
import { Router } from '@angular/router';
import { Ticket } from './../../models/ticket';
import { AuthService } from 'src/app/auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-ticket-all',
  templateUrl: './ticket-all.component.html',
  styleUrls: ['./ticket-all.component.scss']
})

export class TicketAllComponent implements OnInit {

  isLoaded: BehaviorSubject<boolean> = new BehaviorSubject(false)
  tickets!: Ticket[]
  ticket!: Ticket


  constructor(
    private api: TicketService,
    private router: Router,
    private authService: AuthService) {


  }

  ngOnInit(): void {

    if (!this.authService.isTokenValid()) {
      this.router.navigate(['/login'])
    }


    this.loadTicketData()
    this.api.onAddedTicket.subscribe(data => {
      this.loadTicketData()
      console.log(data)
    }
    )

  }



  deleteTicket(id: number) {
    if (!id) return console.log(id + ' non trovato')
    if (confirm('Sei sicuro di vole eliminare il ticket ' + id + ' ?') == true)
      this.api.deleteTicket(id).subscribe(
        data => {
          this.router.navigate(["/ticketall"])
          this.loadTicketData()
        })
  }


  loadTicketData() {

    this.api.getTickets()
      .subscribe((tickets: Ticket[]) => {
        this.tickets = tickets
        this.tickets = this.tickets.filter(ticket => ticket.id === this.authService.getLoggedInUser().id)
        this.isLoaded.next(true)
      });
  }

}



