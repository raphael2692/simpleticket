import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoginMode: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
  }

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

}
