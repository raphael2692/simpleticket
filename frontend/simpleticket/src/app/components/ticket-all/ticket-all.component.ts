import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';
import { Router } from '@angular/router';
import { Ticket } from './../../models/ticket';
import { AuthService } from 'src/app/auth/auth.service';
import { BehaviorSubject, tap } from 'rxjs';

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
    this.api.onAddedTicket
      .pipe(
        tap(
          () => {
            this.loadTicketData()
            // console.log(data)
          }
        )
      )
  }


  deleteTicket(id: number) {
    if (!id) return console.log('Ticket ' + id + ' not found')
    if (confirm('Are you sure to delete ticket ' + id + ' ?') == true)
      this.api.deleteTicket(id)
        .subscribe(
            () => {
              this.router.navigate(["/ticketall"])
              this.loadTicketData()
            }
 
        )
  }

  loadTicketData() {
    this.api.getTickets()
      .pipe(
        tap(
          (tickets: Ticket[]) => {
            this.tickets = tickets
            this.tickets = this.tickets.filter(
              ticket => 
              (ticket.createdBy || ticket.requestedBy || ticket.requestedFor ) === this.authService.getLoggedInUser().url)
            this.isLoaded.next(true)
          }
        )
      )
      .subscribe(() => this.isLoaded.next(true))
  }
}



