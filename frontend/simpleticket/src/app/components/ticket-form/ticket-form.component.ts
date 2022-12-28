import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';
import { UserService } from 'src/app/services/user.service';
import { Ticket } from 'src/app/models/ticket';
import { User } from 'src/app/models/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-ticket-create',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.scss']
})

export class TicketFormComponent implements OnInit {

  users: User[] | undefined;
  ticket!: Ticket;

  constructor(private userApi: UserService, private ticketApi: TicketService) { }

  ngOnInit(): void {
    this.showUsers()
  }

  showUsers() {
    this.userApi.getUsers()
      .subscribe((data: User[]) => this.users = data);
  }

  addTicket(form: NgForm) {
    this.ticketApi.addTicket(form.value).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
    form.reset()
  }
}