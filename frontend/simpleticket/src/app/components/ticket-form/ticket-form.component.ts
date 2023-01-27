import { Component, Input, OnInit, Output } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';
import { UserService } from 'src/app/services/user.service';
import { Ticket } from 'src/app/models/ticket';
import { User } from 'src/app/models/user';
import { Form, NgForm } from '@angular/forms';


import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';


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
  loading: boolean = false

  constructor(private userApi: UserService,
    private ticketApi: TicketService,
    private router: Router,
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute,
  ) { }


  ngOnInit(): void {
  //  if(this.loading = true){
  //     setInterval(() => {
  //     this.loadingTime = true; 
  //     }, 3000)
  //     ;}

    this.getRelatedUsers()
    this.activatedRoute.queryParams
      .subscribe(
        params => {
          console.log(params)
          if (params["edit"] === 'true') { // TODO perchè true viene passato come stringa?!
            this.editMode = true
            this.loading = true
            this.id = params["id"]
            this.ticketApi.getTicket(this.id)
              .subscribe(data => {
                this.ticketModel = data
                setTimeout(() => {
                  this.ticketModel.createdBy = this.users.filter(user => user.url === this.ticketModel.createdBy)[0]
                  this.ticketModel.requestedBy = this.users.filter(user => user.url === this.ticketModel.requestedBy)[0]
                  this.ticketModel.requestedFor = this.users.filter(user => user.url === this.ticketModel.requestedFor)[0]
                },0)
                  this.loading = false
              })
          } else {
            this.loading = false
            this.editMode = false
            this.ticketModel = {
              url: "",
              title: "",
              description: "",
              completed: false,
            }; // TODO: cambiare con dati utente corrente, gestire il default delle date senza rompere il 'model'
          }
        }
      )
    // console.log(this.ticketModel["createdBy"])
  }
  updateStats() {
    throw new Error('Method not implemented.');
  }

  getRelatedUsers() {
    this.userApi.getUsers()
      .subscribe((data: User[]) => this.users = data);
  }

  // Funzione che richiama il modal di avviso per la creazione e la modifica ticket
  openModal() {}
  

  addTicket(form: NgForm) {
    // console.log(form.value); // data collected from form
    // TODO better handle this in form...
    form.value["createdBy"] = form.value["createdBy"]["url"];
    form.value["requestedBy"] = form.value["requestedBy"]["url"];
    form.value["requestedFor"] = form.value["requestedFor"]["url"];
    console.log(form.value)
    form.value["completed"] = false // new false default
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = this.ticketModel.title
    // ...
  
      this.ticketApi.addTicket(form.value).subscribe(
        data => {
          console.log("ticket creato correttamente:")
          console.log(data)
          this.ticketApi.onAddedTicket.next(this.ticketModel);
          const addMode =  !this.editMode
          modalRef.componentInstance.isAddedNgm = addMode
        },
        error => {
          console.log("errore:")
          console.log(error);
        }
      )
    form.reset()
    this.router.navigate(['/ticketall'])
  }

  updateTicket(form: NgForm){
    form.value["createdBy"] = form.value["createdBy"]["url"];
    form.value["requestedBy"] = form.value["requestedBy"]["url"];
    form.value["requestedFor"] = form.value["requestedFor"]["url"];

    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = this.ticketModel.title

    this.ticketApi.updateTicket(this.id, form.value).subscribe(
      data => {
        console.log(data + ' prova update')
        console.log(data);
        this.ticketApi.onAddedTicket.next(this.ticketModel)
        const upMode =  !this.editMode
        modalRef.componentInstance.isAddedNgm = upMode
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




// TODO mettere sotto e separare con commenti che spiegano che è un child component
// Child component installato per l'attivazione della Modal alla creazione con successo di un nuovo ticket
@Component({
  selector: 'ngbd-modal-content',
  standalone: true,
  template: `
  <div>
    <div class="modal-header">
			<h4 class="modal-title">{{isAddedNgm ? 'Ticket created correctly' : 'Ticket modified correctly'}}</h4>
			<button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
		</div>
		<div class="modal-body">
			<p>Your ticket <b>{{ name }}</b> has been submitted!</p>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
		</div>
  </div>
	`,
})

// aggiungere qualche commento per capire meglio
export class NgbdModalContent {
  @Input() name: any;
  @Input() isAddedNgm?: boolean
  constructor(public activeModal: NgbActiveModal) { }
  



}

