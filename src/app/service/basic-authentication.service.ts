import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_URL } from '../app.constants';

export const TOKEN = 'token'
export const AUTHETICATED_USER = 'authenticateUser'

export class AuthenticationBean {
  constructor(public message: string) {

  }
}

@Injectable({
  providedIn: 'root'
})


export class BasicAuthenticationService {

  constructor(private httpClient: HttpClient) { }


  executeBasicJWTAuthenticateService(username, password) {
    return this.httpClient.post<any>(`${API_URL}/authenticate`, {
      username,
      password
    }).pipe(
      map(
        data => {
          sessionStorage.setItem(AUTHETICATED_USER, username);
          sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
          return data;
        }
      )
    );
    //console.log('executing hello bean service')
  }


  executeBasicAuthenticateService(username, password) {
    let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password)
    console.log(basicAuthHeaderString)

    let headers = new HttpHeaders({
      Authorization: basicAuthHeaderString
    })

    return this.httpClient.get<AuthenticationBean>(`${API_URL}/basicAuth`,
      { headers }).pipe(
        map(
          data => {
            sessionStorage.setItem(AUTHETICATED_USER, username);
            sessionStorage.setItem(TOKEN, basicAuthHeaderString);
            return data;
          }
        )
      );
    //console.log('executing hello bean service')
  }


  getAuthenticatedUser() {
    return sessionStorage.getItem(AUTHETICATED_USER)
  }

  getAuthenticatedToken() {
    if (this.getAuthenticatedToken)
      return sessionStorage.getItem(TOKEN)
  }


  isUserLogedIn() {
    let user = sessionStorage.getItem(AUTHETICATED_USER)
    return !(user === null)
  }

  loggedOut() {
    sessionStorage.removeItem(AUTHETICATED_USER)
    sessionStorage.removeItem(TOKEN)
  }


}



