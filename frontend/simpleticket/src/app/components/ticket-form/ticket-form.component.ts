import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';
import { UserService } from 'src/app/services/user.service';
import { Ticket } from 'src/app/models/ticket';
import { User } from 'src/app/models/user';
import {  NgForm } from '@angular/forms';


import { BehaviorSubject, Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-ticket-create',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.scss']
})

export class TicketFormComponent implements OnInit {

  users!: User[];
  ticketModel!: Ticket
  editMode: boolean = false
  id: number = 0
  isLoaded: BehaviorSubject<boolean> = new BehaviorSubject(false)

  constructor(private userApi: UserService,
    private ticketApi: TicketService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    if (!this.authService.isTokenValid()) {
      this.router.navigate(['/login'])
    }

    this.activatedRoute.queryParams
      .subscribe(
        params => {
          // console.log(params)
          if (params["edit"] === 'true') { // TODO: I should handle this better
            this.editMode = true
            this.id = params["id"]
            this.loadTicketData()

          } else {

            this.editMode = false
            this.ticketModel = {
              url: "",
              title: "",
              description: "",
              completed: false,
            };
            this.isLoaded.next(true)

          }
        }
      )
  }
  updateStats() {
    throw new Error('Method not implemented.');
  }

  loadTicketData() {
    this.userApi.getUsers()
      .subscribe((data: User[]) => {
        this.users = data

        this.ticketApi.getTicket(this.id).subscribe(data => {

          this.ticketModel = data
          this.ticketModel.createdBy = this.users.filter(user => user.url === this.ticketModel.createdBy)[0]
          this.ticketModel.requestedBy = this.users.filter(user => user.url === this.ticketModel.requestedBy)[0]
          this.ticketModel.requestedFor = this.users.filter(user => user.url === this.ticketModel.requestedFor)[0]
          this.isLoaded.next(true)
        }
        )
      });

  }
  addTicket(form: NgForm) {

    form.value["createdBy"] = form.value["createdBy"]["url"];
    form.value["requestedBy"] = form.value["requestedBy"]["url"];
    form.value["requestedFor"] = form.value["requestedFor"]["url"];
    // console.log(form.value)
    form.value["completed"] = false

    this.ticketApi.addTicket(form.value).subscribe(
      data => {
        console.log("Ticket created correctly.")
        this.ticketApi.onAddedTicket.next(this.ticketModel);
      },
      error => {
        console.log("Ticket creation error: ")
        console.log(error);
      }
    )
    form.reset()
    this.router.navigate(['/ticketall'])
  }

  updateTicket(form: NgForm) {
    form.value["createdBy"] = form.value["createdBy"]["url"];
    form.value["requestedBy"] = form.value["requestedBy"]["url"];
    form.value["requestedFor"] = form.value["requestedFor"]["url"];

    this.ticketApi.updateTicket(this.id, form.value).subscribe(
      data => {
        // console.log(data);
        this.ticketApi.onAddedTicket.next(this.ticketModel)

      },
      error => {
        console.log("Error:")
        console.log(error);
      }
    )
    form.reset()
    this.router.navigate(['/ticketall'])
  }


  // below, typehead stuff
  // TODO this would not be good if related users are a lot, should implement sothing else
  searchUser: OperatorFunction<string, readonly User[]> = (text$: Observable<string>) =>

    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      // take the first 10 result that match 'term' after 1 digit
      map((term) =>
        term.length < 1 ? [] : this.users.filter(
          (user) => user.username.toLowerCase().indexOf(term.toLowerCase()) > -1)
          .slice(0, 10),
      ),
    );

  userResultFormatter = (user: { email: string }) => user.email;
  userInputFormatter = (user: { email: string }) => user.email;


}
