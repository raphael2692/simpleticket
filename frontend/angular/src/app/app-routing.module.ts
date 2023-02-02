import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TicketAllComponent } from './components/ticket-all/ticket-all.component';
import { TicketFormComponent } from './components/ticket-form/ticket-form.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';


const routes: Routes = [
  { path :  '', component : HomeComponent}, 
  { path : 'ticketall', component : TicketAllComponent},
  { path : 'ticketcreate', component: TicketFormComponent},
  { path : 'ticketcreate/:ticket:edit', component: TicketFormComponent},
  { path : 'ticketdetail', component: TicketComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent}
  // { path: 'tickets/ticket/edit', component : TicketFormComponent},
];  

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forRoot(
    routes,
    { enableTracing: false }
  )],

exports: [RouterModule]
})
export class AppRoutingModule { }
