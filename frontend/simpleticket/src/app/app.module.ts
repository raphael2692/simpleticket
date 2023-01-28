import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TicketAllComponent } from './components/ticket-all/ticket-all.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TicketFormComponent } from './components/ticket-form/ticket-form.component';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModalComponent } from './modal/modal.component';
import { LoginComponent } from './auth/login/login.component';
import { JwtModule } from "@auth0/angular-jwt";

import { AuthInterceptor } from './auth/auth.interceptor';
import { ErrorInterceptor } from './services/error.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TicketAllComponent,
    TicketComponent,
    NavbarComponent,
    TicketFormComponent,
    ModalComponent,
    LoginComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,

    ReactiveFormsModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('access_token')
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    
  ],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]
})
export class AppModule { }
