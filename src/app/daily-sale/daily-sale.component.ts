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
        // console.log(response)

        let len = response.length;
        for (let i = 0; i < len; i++) {
          this.items.push(response[i]);
          this.items[i].closingQuarts = 0;
          this.items[i].closingPints = 0;
          this.items[i].closingNips = 0;
          this.items[i].amountQuarts = 0;
          this.items[i].amountPints = 0;
          this.items[i].amountNips = 0;
          this.findRateByShopNameAndBrandName(e.value, this.items[i].brandName);
        }
        // console.log(JSON.stringify(this.items));
        //check for empty array
        if (response.length === 0) {
          this.div1 = false;
        }

      }
    )
  }

  findRateByShopNameAndBrandName(e, brandName) {
    this.dailySaleService.findRateByShopNameAndBrandName('rajat', e, brandName).subscribe(
      response => {
        //console.log('findBy' + JSON.stringify(response));
        var index = this.items.findIndex(x => x.brandName === brandName)
        let newArray = [...this.items];
        let responseArr = response;

        //setting Q rate
        let rateQ = responseArr.quarts;
        newArray[index] = { ...newArray[index], rateQuarts: rateQ }
        this.items = newArray;

        //setting P rate
        let rateP = responseArr.pints;
        newArray[index] = { ...newArray[index], ratePints: rateP }
        this.items = newArray;

        //setting N rate
        let rateN = responseArr.nips;
        newArray[index] = { ...newArray[index], rateNips: rateN }
        this.items = newArray;
      }
    )

  }

  findQuartsSale(brandName) {
    let Q = 'Q';
    this.finalSale(brandName, Q)
  }

  findPintsSale(brandName) {
    let P = 'P';
    this.finalSale(brandName, P)
  }

  findNipsSale(brandName) {
    let N = 'N';
    this.finalSale(brandName, N)
  }

  finalSale(brandName, qpn) {
    var index = this.items.findIndex(x => x.brandName === brandName)
    let newArray = [...this.items]
    let saleP = newArray[index];
    if (qpn === 'Q') {
      //final sale for Q
      let finalSaleP = saleP.openingQuarts + saleP.receiptQuarts - saleP.transferQuarts - saleP.closingQuarts;
      newArray[index] = { ...newArray[index], saleQuarts: finalSaleP }
      //this.items = newArray;

      //final amount for Q
      let finalAMountQ = finalSaleP * saleP.rateQuarts;
      console.log(finalAMountQ + 'Amount final ')
      newArray[index] = { ...newArray[index], amountQuarts: finalAMountQ }
      this.items = newArray;

    } else if (qpn === 'P') {
      //final sale for P
      let finalSaleP = saleP.openingPints + saleP.receiptPints - saleP.transferPints - saleP.closingPints;
      newArray[index] = { ...newArray[index], salePints: finalSaleP }
      //this.items = newArray;

      //final amount for P
      let finalAMountP = finalSaleP * saleP.ratePints;
      console.log(finalAMountP + 'Amount final ')
      newArray[index] = { ...newArray[index], amountPints: finalAMountP }
      this.items = newArray;

    } else if (qpn === 'N') {
      //final sale for N
      let finalSaleP = saleP.openingNips + saleP.receiptNips - saleP.transferNips - saleP.closingNips;
      newArray[index] = { ...newArray[index], saleNips: finalSaleP }
      //this.items = newArray;

      //final amount for N
      let finalAMountN = finalSaleP * saleP.rateNips;
      console.log(finalAMountN + 'Amount final ')
      newArray[index] = { ...newArray[index], amountNips: finalAMountN }
      this.items = newArray;
    }
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
