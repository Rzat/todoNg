import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WelcomDataService } from './welcom-data.service';
import { MasterBrandEntry } from 'src/app/master/master.component';
import { API_URL } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class MasterBrandEntryService {

  constructor(private httpClient: HttpClient,
    private welcomeDataService: WelcomDataService) { }

  saveMasterBrand(username, masterBrandEntry) {

    // let basicAuthHeaderString = this.welcomeDataService.careateBasucAuthHttpHeader();
    // let headers = new HttpHeaders({
    //   Authorization: basicAuthHeaderString
    // })

    return this.httpClient.post(`${API_URL}/users/${username}/MasterBrandEntry`,
      masterBrandEntry);
  }

  retrieveAllMasterBrand(username) {
    return this.httpClient.get<MasterBrandEntry[]>(`${API_URL}/users/${username}/MasterBrandEntry`);

  }

  retrieveMasterEntryById(username, id) {
    return this.httpClient.get<MasterBrandEntry>(`${API_URL}/users/${username}/MasterBrandEntry/${id}`);
  }

  deleteMasterBrand(username, id) {
    return this.httpClient.delete(`${API_URL}/users/${username}/MasterBrandEntry/${id}`);
  }


  updateMasterBrand(username, id, masterBrandEntry) {
    return this.httpClient.put(`${API_URL}/users/${username}/MasterBrandEntry/${id}`, masterBrandEntry);
  }
 

}
