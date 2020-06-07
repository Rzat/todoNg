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
  lg = {
    closingQuarts: 0,
    closingPints: 0,
    closingNips: 0
  };
  singleObject = [];

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
    //  console.log('inside on selct shop' + e.value);
    this.div1 = true;
    this.dailySaleService.findAllByShopName('rajat', e.value).subscribe(
      response => {
        //  console.log(response)

        let len = response.length;
        for (let i = 0; i < len; i++) {
          this.items.push(response[i]);
          this.items[i].closingQuarts = 0;
          this.items[i].closingPints = 0;
          this.items[i].closingNips = 0;
        }

        //check for empty array
        if (response.length === 0) {
          this.div1 = false;
        }
      }
    )
  }

  findQuartsSale(e, brandName, i) {
    let itemLength = this.items.length;

    var index = this.items.findIndex(x => x.brandName === brandName)
    //console.log('index is: ' + index);
    //console.log('array of index: ' + JSON.stringify(this.items[index]))
    let stringArr = JSON.stringify(this.items[index]);

    let newArray = [...this.items]
    newArray[index] = { ...newArray[index], saleQuarts: 66 }

    this.items = newArray;
    console.log('newArray is::' + JSON.stringify(this.items))

    // this.items = this.items.map(item => {
    //   item.saleQuarts = 0
    //   return item;
    // });

  }




  addToCart() {
    console.log('@@@' + JSON.stringify(this.items));
  }


  //get total opening 
  getTotalOpeningQuarts() {
    return this.items.map(t => t.openingQuarts).reduce((acc, value) => acc + value, 0);
  }
  getTotalOpeningPints() {
    return this.items.map(t => t.openingPints).reduce((acc, value) => acc + value, 0);
  }
  getTotalOpeningNips() {
    return this.items.map(t => t.openingNips).reduce((acc, value) => acc + value, 0);
  }

  //get total transfer
  getTotalTransferQuarts() {
    return this.items.map(t => t.transferQuarts).reduce((acc, value) => acc + value, 0);
  }
  getTotalTransferPints() {
    return this.items.map(t => t.transferPints).reduce((acc, value) => acc + value, 0);
  }
  getTotalTransferNips() {
    return this.items.map(t => t.transferNips).reduce((acc, value) => acc + value, 0);
  }

  //get total Receipt
  getReceiptQuarts() {
    return this.items.map(t => t.receiptQuarts).reduce((acc, value) => acc + value, 0);
  }
  getReceiptPints() {
    return this.items.map(t => t.receiptPints).reduce((acc, value) => acc + value, 0);
  }
  getReceiptNips() {
    return this.items.map(t => t.receiptNips).reduce((acc, value) => acc + value, 0);
  }

  //get total Sale
  getSaleQuarts() {
    return this.items.map(t => t.saleQuarts).reduce((acc, value) => acc + value, 0);
  }
  getSalePints() {
    return this.items.map(t => t.salePints).reduce((acc, value) => acc + value, 0);
  }
  getSaleNips() {
    return this.items.map(t => t.saleNips).reduce((acc, value) => acc + value, 0);
  }

  //get total Closing Balance
  getClosingQuarts(e) {
    return this.items.map(t => t.closingQuarts).reduce((acc, value) => acc + value, 0);
    // console.log(e);
  }
  getClosingPints() {
    return this.items.map(t => t.closingPints).reduce((acc, value) => acc + value, 0);
  }
  getClosingNips() {
    return this.items.map(t => t.closingNips).reduce((acc, value) => acc + value, 0);
  }

  //get total rate
  getTotalRateQuarts() {
    return this.items.map(t => t.rateQuarts).reduce((acc, value) => acc + value, 0);
  }
  getTotalRatePints() {
    return this.items.map(t => t.ratePints).reduce((acc, value) => acc + value, 0);
  }
  getTotalRateNips() {
    return this.items.map(t => t.rateNips).reduce((acc, value) => acc + value, 0);
  }



  getNetAmount(amountQuarts, amountPints, amountNips) {
    // console.log(amountQuarts + 'aaa' + amountPints + 'aaaa' + amountNips)
    var sum = amountQuarts + amountPints + amountNips;
    return sum;
  }

  getAmountGrandTotalQuarts() {
    return this.items.map(t => t.amountQuarts).reduce((acc, value) => acc + value, 0);

  }

  getAmountGrandTotalPints() {
    return this.items.map(t => t.amountPints).reduce((acc, value) => acc + value, 0);

  }

  getAmountGrandTotalNips() {
    return this.items.map(t => t.amountNips).reduce((acc, value) => acc + value, 0);
  }

  getNetAmountGrandTotaal() {

  }



}
