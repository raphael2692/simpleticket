import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from 'src/app/models/ticket';
import { TicketService } from 'src/app/services/ticket.service';
import { User } from './../../models/user';
import { UserService } from 'src/app/services/user.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  isLoaded: BehaviorSubject<boolean> = new BehaviorSubject(false);
  ticketId!: number;
  ticket!: Ticket
  userCreator!: String
  userRequestedBy!: String
  userRequestedFor!: String

  constructor(
    private api: TicketService,
    private route: ActivatedRoute,
    private router: Router,
    private userApi: UserService,
    private authService: AuthService
  ) { }


  // this.isLoaded.next(true)
  ngOnInit(): void {
    if (!this.authService.isTokenValid()) {
      this.router.navigate(['/login'])
    }

    this.route.queryParams.subscribe(
      params => {
        this.ticketId = Number(params['id']);
        this.loadData()

      }
    )
  }


  loadData() {
    this.api.getTicket(this.ticketId)
    .subscribe(
      (ticketData) => {
        this.userApi.getUser(ticketData.createdBy).subscribe(data => this.userCreator = data.email)
        this.userApi.getUser(ticketData.requestedBy).subscribe(data => this.userRequestedBy = data.email)
        this.userApi.getUser(ticketData.requestedFor).subscribe(data => this.userRequestedFor = data.email)
        this.ticket = ticketData
        this.isLoaded.next(true)
      }
    )
  }


  deleteTicket(id: number | undefined) {
    if (!id) return console.log('id non trovato')
    if (confirm('Sei sicuro di vole eliminare il ticket: \"' + this.ticket.title + '\"?') == true)
      this.api.deleteTicket(id).subscribe(
        () => {
          this.router.navigate(["/ticketall"])
        },
        error => {
          console.log(error);
        }
      )
  }
}
