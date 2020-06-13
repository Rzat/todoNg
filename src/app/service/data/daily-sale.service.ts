import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/app.constants';
import { AddingParcha } from 'src/app/adding-parcha-type/adding-parcha-type.component';

@Injectable({
  providedIn: 'root'
})
export class DailySaleService {

  constructor(private httpClient: HttpClient) { }

  findAllByShopName(username, shopName) {

    return this.httpClient.get<[]>(`${API_URL}/users/${username}/findDailySaleByShopName/${shopName}`);
  }

  findRateByShopNameAndBrandName(username, shopName, brandName) {
    return this.httpClient.get<AddingParcha>(`${API_URL}/users/${username}/findShopName/${shopName}/findBeerName/${brandName}`);
  }
}
