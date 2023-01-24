import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TicketAllComponent } from './components/ticket-all/ticket-all.component';
import { TicketFormComponent } from './components/ticket-form/ticket-form.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  { path :  '', component : LoginComponent}, 
  { path : 'ticketall', component : TicketAllComponent},
  { path : 'ticketcreate', component: TicketFormComponent},
  { path : 'ticketcreate/:ticket:edit', component: TicketFormComponent},
  { path : 'ticketdetail', component: TicketComponent},
  // { path: 'tickets/ticket/edit', component : TicketFormComponent},
];  

@NgModule({
  imports: [RouterModule.forRoot(routes)],

exports: [RouterModule]
})
export class AppRoutingModule { }
