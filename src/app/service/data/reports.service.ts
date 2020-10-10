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
    return this.httpClient.get<[]>(`${API_URL}/users/${username}/getStockPositionByShopName/${shopName}/${type}/${packagingType}?localDate=${date}`);
  }

  getPurchaseReportByShopName(username, shopName, type, packagingType, dateFrom, dateTo) {
    return this.httpClient.get<[]>(`${API_URL}/users/${username}/getPurchaseReportByShopName/${shopName}/${type}/${packagingType}?localDateFrom=${dateFrom}&localDateTo=${dateTo}`);
  }

  getStockPositionByCityName(username, city, type, packagingType, date) {
    return this.httpClient.get<[]>(`${API_URL}/users/${username}/getStockPositionByCityName/${city}/${type}/${packagingType}?localDate=${date}`);
  }

  getPurchaseReportByCityName(username, city, type, packagingType, dateFrom, dateTo) {
    return this.httpClient.get<[]>(`${API_URL}/users/${username}/getPurchaseReportByCityName/${city}/${type}/${packagingType}?localDateFrom=${dateFrom}&localDateTo=${dateTo}`);
  }

  getStockPositionByDistrictName(username, district, type, packagingType, date) {
    return this.httpClient.get<[]>(`${API_URL}/users/${username}/getStockPositionByDistrictName/${district}/${type}/${packagingType}?localDate=${date}`);
  }

  getPurchaseReportByDistrictName(username, district, type, packagingType, dateFrom, dateTo) {
    return this.httpClient.get<[]>(`${API_URL}/users/${username}/getPurchaseReportByDistrictName/${district}/${type}/${packagingType}?localDateFrom=${dateFrom}&localDateTo=${dateTo}`);
  }

  getStockPositionByGroupName(username, groupName, type, packagingType) {
    return this.httpClient.get<[]>(`${API_URL}/users/${username}/getStockPositionByCityName/${groupName}/${type}/${packagingType}`);
  }


}
