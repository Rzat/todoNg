import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/app.constants';
import { StockPosition } from 'src/app/stock-position/stock-position.component';


@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private httpClient: HttpClient) { }

  getStockPosition(username, StockPosition) {
    return this.httpClient.post<StockPosition>(`${API_URL}/users/${username}/getStockPosition`, StockPosition);

  }

  getStockPositionByShopName(username, shopName, type, packagingType, date) {
    return this.httpClient.get(`${API_URL}/users/${username}/getStockPositionByShopName/${shopName}/${type}/${packagingType}?localDate=${date}`);
  }

  getStockPositionByCityName(username, cityName, type, packagingType) {
    return this.httpClient.get(`${API_URL}/users/${username}/getStockPositionByCityName/${cityName}/${type}/${packagingType}`);
  }


  getStockPositionByGroupName(username, groupName, type, packagingType) {
    return this.httpClient.get(`${API_URL}/users/${username}/getStockPositionByCityName/${groupName}/${type}/${packagingType}`);
  }
}
