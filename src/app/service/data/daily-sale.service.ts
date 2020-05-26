import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class DailySaleService {

  constructor(private httpClient: HttpClient) { }

  findAllByShopName(username, shopName) {

    return this.httpClient.get<[]>(`${API_URL}/users/${username}/findDailySaleByShopName/${shopName}`);
  }
}
