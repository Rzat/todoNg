import { Component, OnInit } from '@angular/core';
import { AddingParchaService } from '../adding-parcha.service';
import { DailySaleService } from '../service/data/daily-sale.service';

@Component({
  selector: 'app-daily-sale',
  templateUrl: './daily-sale.component.html',
  styleUrls: ['./daily-sale.component.css']
})
export class DailySaleComponent implements OnInit {
  shops = [];
  newArr = [];
  items = [];
  netAmount: string;
  constructor(private addingParchaService: AddingParchaService,
    private dailySaleService: DailySaleService) { }

  ngOnInit(): void {
    this.retrieveShopNames();
  }


  retrieveShopNames() {
    this.addingParchaService.retrieveAllParchaType('rajat').subscribe(
      response => {
        this.shops = response;

        //To remove duplicates
        this.shops.forEach((item, index) => {
          if (this.newArr.findIndex(i => i.shopName == item.shopName) === -1) {
            this.newArr.push(item)
          }
        });
        this.shops = this.newArr;
      }
    )
  }

  onSelectShop(e) {
    console.log('inside on selct shop' + e.value);
    this.dailySaleService.findAllByShopName('rajat', e.value).subscribe(
      response => {
        console.log(response)
        this.items = response;
      }
    )
  }

  addToCart() {
    console.log('@@@' + JSON.stringify(this.items));
  }

  getTotalOpeningQuarts() {
    return this.items.map(t => t.openingQuarts).reduce((acc, value) => acc + value, 0);
  }

  getTotalOpeningPints() {
    return this.items.map(t => t.openingPints).reduce((acc, value) => acc + value, 0);
  }

  getTotalOpeningNips() {
    return this.items.map(t => t.openingNips).reduce((acc, value) => acc + value, 0);
  }

  getNetAmount(amountQuarts, amountPints, amountNips) {
    console.log(amountQuarts + 'aaa' + amountPints + 'aaaa' + amountNips)
    var sum = amountQuarts + amountPints + amountNips;
    return sum;
  }

}
