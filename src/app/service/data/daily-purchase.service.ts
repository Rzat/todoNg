import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class DailyPurchaseService {

  constructor(private httpClient: HttpClient) { }

  saveDailyPurchase(username, dailyPurchase) {
    return this.httpClient.post(`${API_URL}/users/${username}/saveDailyPurchase`,
      dailyPurchase);
  }

  saveDailyIssueStock(username, issueStock) {
    return this.httpClient.post(`${API_URL}/users/${username}/saveStock`,
    issueStock);
  }
}
