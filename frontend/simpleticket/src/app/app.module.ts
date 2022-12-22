import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TicketAllComponent } from './components/ticket-all/ticket-all.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TicketCreateComponent } from './components/ticket-create/ticket-create.component';
import { TicketFormComponent } from './components/ticket-form/ticket-form.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TicketAllComponent,
    TicketComponent,
    NavbarComponent,
    TicketCreateComponent,
    TicketFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
