import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';
import { UserService } from 'src/app/services/user.service';
import { Ticket } from 'src/app/models/ticket';
import { User } from 'src/app/models/user';
import { NgForm } from '@angular/forms';

import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

// TODO remove
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-ticket-create',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.scss']
})

export class TicketFormComponent implements OnInit {

  users!: User[];
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
    console.log(form.value); // data collected from form
    // TODO better handle this in form...
    form.value["createdBy"] = form.value["createdBy"]["url"];
    form.value["requestedBy"] = form.value["requestedBy"]["url"];
    form.value["requestedFor"] = form.value["requestedFor"]["url"];
    // ...
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

  // typehead stuff
  // TODO this would not be good if related users are a lot, should implement sothing else ...?
  searchUser: OperatorFunction<string, readonly User[]> = (text$: Observable<string>) =>
  
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),

    map((term) =>
      term.length < 1 ? [] : this.users.filter((user) => user.username.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10),
    ),
  );
  userResultFormatter = (user: { email: string }) => user.email;
  userInputFormatter = (user: { email: string }) => user.email;
}
