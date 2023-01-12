import { Component, Input, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';
import { UserService } from 'src/app/services/user.service';
import { Ticket } from 'src/app/models/ticket';
import { User } from 'src/app/models/user';
import { NgForm } from '@angular/forms';


import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';


// TODO mettere sotto e separare con commenti che spiegano che è un child component
@Component({
  selector: 'ngbd-modal-content',
  standalone: true,
  template: `
		<div class="modal-header">
			<h4 class="modal-title">Creation ticket completed with success!</h4>
			<button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
		</div>
		<div class="modal-body">
			<p>Your ticket {{ name }} has been sent!</p>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
		</div>
	`,
})

// aggiungere qualche commento per capire meglio
export class NgbdModalContent {
  @Input() name: any;

  constructor(public activeModal: NgbActiveModal) { }
}


@Component({
  selector: 'app-ticket-create',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.scss']
})



export class TicketFormComponent implements OnInit {

  users!: User[];

  isAdded: boolean = false
  ticketModel!: Ticket

  // 
  editMode: boolean = false
  id: number = 0


  constructor(private userApi: UserService,
    private ticketApi: TicketService,
    private router: Router,
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getRelatedUsers()
    this.activatedRoute.queryParams
      .subscribe(
        params => {
          console.log(params)
          if (params["edit"] === 'true') { // TODO perchè true viene passato come stringa?!
            this.id = params["id"]
            this.ticketApi.getTicket(this.id)
              .subscribe(data => {
                this.ticketModel = data
                this.ticketModel.createdBy = this.users.filter(user => user.url === this.ticketModel.createdBy)[0]
                this.ticketModel.requestedBy = this.users.filter(user => user.url === this.ticketModel.requestedBy)[0]
                this.ticketModel.requestedFor = this.users.filter(user => user.url === this.ticketModel.requestedFor)[0]
              })
          } else {
            this.ticketModel = {
              url: "",
              title: "",
              description: "",
              completed: false,
            }; // TODO: cambiare con dati utente corrente, gestire il default delle date senza rompere il 'model'
          }
        }
      )

    console.log(this.ticketModel["createdBy"])
  }

  getRelatedUsers() {
    this.userApi.getUsers()
      .subscribe((data: User[]) => this.users = data);
  }

  // TODO rinominare
  open() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = this.ticketModel.title
  }

  addTicket(form: NgForm) {

    // console.log(form.value); // data collected from form
    // TODO better handle this in form...
    form.value["createdBy"] = form.value["createdBy"]["url"];
    form.value["requestedBy"] = form.value["requestedBy"]["url"];
    form.value["requestedFor"] = form.value["requestedFor"]["url"];
    // ...
    this.ticketApi.addTicket(form.value).subscribe(
      data => {
        console.log("ticket creato correttamente:")
        console.log(data);
        this.ticketApi.onAddedTicket.next(null);
        this.isAdded = true
      },
      error => {
        console.log("errore:")
        console.log(error);
      }
    )
    form.reset()
    this.router.navigate(['/ticketall'])
  }

  // below, typehead stuff
  // TODO this would not be good if related users are a lot, should implement sothing else ...?
  searchUser: OperatorFunction<string, readonly User[]> = (text$: Observable<string>) =>

    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      // take the firt 10 result that match 'term' after 1 digit
      map((term) =>
        term.length < 1 ? [] : this.users.filter(
          (user) => user.username.toLowerCase().indexOf(term.toLowerCase()) > -1)
          .slice(0, 10),
      ),
    );
  userResultFormatter = (user: { email: string }) => user.email;
  userInputFormatter = (user: { email: string }) => user.email;
}
