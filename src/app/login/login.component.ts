import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = 'rajat'
  password = ''
  errorMessage = 'Invalid Credentials'
  invalidLogin = false

  //Router is a dependency of login component
  //Dependency Injection

  constructor(private router: Router,
    private hardcodedAuthenticationService: HardcodedAuthenticationService,
    private basicAuth: BasicAuthenticationService) {

  }

  ngOnInit() {
  }

  handleJWTAuthLogin() {
    this.basicAuth.executeBasicJWTAuthenticateService(this.username, this.password)
      .subscribe(
        data => {
          console.log(data)
          //Redirect to welcome page
          this.router.navigate(['welcome', this.username])
          this.invalidLogin = false
        },
        error => {
          console.log(error);
          this.invalidLogin = true
        }
      )
  }

  handleBasicAuthLogin() {
    this.basicAuth.executeBasicAuthenticateService(this.username, this.password)
      .subscribe(
        data => {
          console.log(data)
          //Redirect to welcome page
          this.router.navigate(['welcome', this.username])
          this.invalidLogin = false
        },
        error => {
          console.log(error);
          this.invalidLogin = true
        }
      )
  }


  handleLogin() {
    if (this.hardcodedAuthenticationService.authenticate(this.username, this.password)) {
      //Redirect to welcome page
      this.router.navigate(['welcome', this.username])
      this.invalidLogin = false
    } else {
      this.invalidLogin = true
    }

    // console.log(this.username)
  }

}
