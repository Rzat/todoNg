import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HardcodedAuthenticationService {

  constructor() { }
  authenticate(username, password) {
    //  console.log('before ' + this.isUserLogedIn());

    if (username === 'rajat' && password === 'dummy') {
      sessionStorage.setItem('authenticateUser', username);
      //   console.log('after ' + this.isUserLogedIn());
      return true;
    } else {
      return false;
    }
  }

  isUserLogedIn() {
    let user = sessionStorage.getItem('authenticateUser')
    return !(user === null)
  }

  loggedOut() {
    sessionStorage.removeItem('authenticateUser')
  }
}
