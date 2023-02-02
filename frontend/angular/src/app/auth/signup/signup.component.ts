import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm = this.formBuilder.group({
    email: "",
    username: "",
    password: "",
    password2: ""
  });

  signupError = {
    // general: {},
    emailError: "",
    usernameError: "",
    passwordError: "",
  }
  
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }


  onSubmit() {
    const form = this.signupForm.value
    this.authService.signup(form.email, form.username, form.password, form.password2)
    .subscribe(
      (res) => {
        console.log(res)
        this.signupForm.reset()
        this.authService.login(form.username, form.password)
      },
      error => this.handleRegistrationError(error)
    )
    return
  }

  handleRegistrationError(error:any) {

    // this.signupError.general = error.error
    this.signupError.emailError = error.error.email
    this.signupError.usernameError = error.error.username
    this.signupError.passwordError = error.error.password
  }

}
