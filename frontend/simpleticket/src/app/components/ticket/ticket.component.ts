import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from 'src/app/models/ticket';
import { TicketService } from 'src/app/services/ticket.service';
import { User } from './../../models/user';
import { UserService } from 'src/app/services/user.service';
import { interval, Subscription, switchMap, timer } from 'rxjs';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  id!: number;
  ticket!: Ticket
  userCreator!: User
  userRequested!: User
  userRequestedFor!: User
  loading: boolean = false
  user!: User
  email!: string

  constructor(
    private api: TicketService,
    private route: ActivatedRoute,
    private router: Router,
    private userApi: UserService
  ) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.id = Number(params['id']);
      this.api.getTicket(this.id)
        .subscribe(
          (data) => {
            this.loading = true
            this.ticket = data
            this.userApi.getUser(this.ticket.createdBy).subscribe(
              (data) => this.userCreator = data
            )
            this.userApi.getUser(this.ticket["requestedBy"]).subscribe(
              (data) => this.userRequested = data
            )
            this.userApi.getUser(this.ticket["requestedFor"]).subscribe(
              (data) => this.userRequestedFor = data
            )

          })
    })
  }

  // getUsers(){
  //   this.userApi.getUsers().subscribe(
  //     (data: User[]) => {
  //       // console.log(data[0].email)

  //       //       this.ticket.createdBy = data[0].email,
  //       //       this.ticket.requestedBy = data[0].email,
  //       //       this.ticket.requestedFor = data[0].email

  //             console.log(data)  
  //       } 
  //   )

  // }

  deleteTicket(id: number | undefined) {
    if (!id) return console.log('id non trovato')
    if (confirm('Sei sicuro di vole eliminare il ticket ' + id + ' ?') == true)
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
