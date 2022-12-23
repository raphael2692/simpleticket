import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TicketAllComponent } from './components/ticket-all/ticket-all.component';
import { TicketFormComponent } from './components/ticket-form/ticket-form.component';
import { TicketComponent } from './components/ticket/ticket.component';
const routes: Routes = [
  { path :  '', component : HomeComponent}, 
  { path : 'ticketall', component : TicketAllComponent},
  { path: 'ticketcreate', component: TicketFormComponent},
  { path: 'ticketdetail', component: TicketComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
