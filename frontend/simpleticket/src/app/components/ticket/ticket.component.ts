import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from 'src/app/models/ticket';
import { TicketService } from 'src/app/services/ticket.service';
import { User } from './../../models/user';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  ticketId!: number;
  ticket!: Ticket
  userCreator!: Observable<User>
  userRequestedBy!: Observable<User>
  userRequestedFor!: Observable<User>

  constructor(
    private api: TicketService,
    private route: ActivatedRoute,
    private router: Router,
    private userApi: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    if (!this.authService.isTokenValid()) {
      this.router.navigate(['/login'])
    }

    this.route.queryParams.subscribe(
      params => {
        this.ticketId = Number(params['id']);
        this.api.getTicket(this.ticketId)
          .subscribe(
            (ticketData) => {
              this.ticket = ticketData
              this.userCreator = this.userApi.getUser(this.ticket.createdBy)
              this.userRequestedBy = this.userApi.getUser(this.ticket.requestedBy)
              this.userRequestedFor = this.userApi.getUser(this.ticket.requestedFor)
            }
          )
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
