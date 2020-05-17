import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/app.constants';
import { MasterShopEntry } from 'src/app/master/master.component';

@Injectable({
  providedIn: 'root'
})
export class MasterShopEntryService {

  constructor(private httpClient: HttpClient) {

  }

  saveMasterBrand(username, masterShopEntry) {

    // let basicAuthHeaderString = this.welcomeDataService.careateBasucAuthHttpHeader();
    // let headers = new HttpHeaders({
    //   Authorization: basicAuthHeaderString
    // })

    return this.httpClient.post(`${API_URL}/users/${username}/AddMasterShopEntry`,
      masterShopEntry);

  }


  getAllCities(username) {


    return this.httpClient.get<MasterShopEntry[]>(`${API_URL}/users/${username}/GetShop`);

  }



}
