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
  div1: boolean = false;

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
    this.div1 = true;
    this.dailySaleService.findAllByShopName('rajat', e.value).subscribe(
      response => {
        console.log(response)
        this.items = response;

        //check for empty array
        if (response.length === 0) {
          this.div1 = false;
        }
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

  getTotalTransferQuarts() {
    return this.items.map(t => t.openingQuarts).reduce((acc, value) => acc + value, 0);
  }
  getTotalTransferPints() {
    return this.items.map(t => t.openingPints).reduce((acc, value) => acc + value, 0);
  }
  getTotalTransferNips() {
    return this.items.map(t => t.openingNips).reduce((acc, value) => acc + value, 0);
  }

  getReceiptQuarts() {
    return this.items.map(t => t.receiptQuarts).reduce((acc, value) => acc + value, 0);
  }
  getReceiptPints() {
    return this.items.map(t => t.receiptPints).reduce((acc, value) => acc + value, 0);
  }
  getReceiptNips() {
    return this.items.map(t => t.receiptNips).reduce((acc, value) => acc + value, 0);
  }




  getNetAmount(amountQuarts, amountPints, amountNips) {
    // console.log(amountQuarts + 'aaa' + amountPints + 'aaaa' + amountNips)
    var sum = amountQuarts + amountPints + amountNips;
    return sum;
  }

}
