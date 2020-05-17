import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from 'src/app/app.constants';

export class HellowWorldBean {
  constructor(public message: string) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class WelcomDataService {

  constructor(
    private httpClient: HttpClient
  ) { }

  executeHlloWorldBeanService() {
    // let basicAuthHeaderString = this.careateBasucAuthHttpHeader();
    // let headers = new HttpHeaders({
    //   Autharization: basicAuthHeaderString
    // })

    return this.httpClient.get<HellowWorldBean>(`${API_URL}/helloBean`,
      // { headers }
    );
    //console.log('executing hello bean service')
  }

  executeHlloWorldBeanServiceWithPath(name) {

    // let basicAuthHeaderString = this.careateBasucAuthHttpHeader();
    // let headers = new HttpHeaders({
    //   Authorization: basicAuthHeaderString
    // })

    return this.httpClient.get<HellowWorldBean>(`${API_URL}/helloBean/${name}`,
      //{ headers }
    );
    //console.log('executing hello bean service')
  }


  // careateBasucAuthHttpHeader() {
  //   let username = 'rajat';
  //   let password = 'dummy';
  //   let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password)
  //   console.log(basicAuthHeaderString)
  //   return basicAuthHeaderString;
  // }
}
