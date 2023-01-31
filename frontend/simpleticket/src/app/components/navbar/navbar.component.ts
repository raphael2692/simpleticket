import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/models/ticket';
import { TicketService } from 'src/app/services/ticket.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn : Observable<boolean>;
  isCollapsed: Boolean = false;
  constructor(public authService : AuthService ) { 
    this.isLoggedIn = authService.isLoggedIn();
  }

  ngOnInit(): void { }

}
