import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';
import { UserService } from 'src/app/services/user.service';
import { Ticket } from 'src/app/models/ticket';
import { User } from 'src/app/models/user';
import { NgForm } from '@angular/forms';


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

  constructor(
    private userService: UserService,
    private ticketApi: TicketService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    if (!this.authService.isTokenValid()) {
      this.router.navigate(['/login'])
    }
    this.userService.getUsers().subscribe(data => this.users = data)
    this.activatedRoute.queryParams
      .subscribe(
        params => {
          if (params["edit"] === 'true') {
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

  loadTicketData() {
    this.userService.getUsers()
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
    form.value["completed"] = false // set default

    this.ticketApi.addTicket(form.value).subscribe(
      () => {
        console.log("Ticket created correctly.")
        this.ticketApi.onAddedTicket.next(this.ticketModel);
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
      () => {
        this.ticketApi.onAddedTicket.next(this.ticketModel)
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
