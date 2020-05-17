import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddingParcha } from './adding-parcha-type/adding-parcha-type.component';
import { API_URL } from './app.constants';

@Injectable({
  providedIn: 'root'
})
export class AddingParchaService {

  constructor(private httpClient: HttpClient) { }

  retrieveAllParchaType(username) {
    return this.httpClient.get<AddingParcha[]>(`${API_URL}/users/${username}/GetAllParcha`);

  }

  retrieveAllParchaType2(username) {
    return this.httpClient.get<any>(`${API_URL}/users/${username}/GetAllParcha`);

  }

  addParch(username, parcha) {
    return this.httpClient.post(`${API_URL}/users/${username}/AddingParcha`, parcha);
  }
}
