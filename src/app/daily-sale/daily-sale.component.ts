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
  i: number;
  clSale = 0;
  bSale = 0;
  imflSale = 0;
  groupCLosing = 0;
  groupTotal = 0;
  groupArray = [];
  AddingParchaGroup = [];
  map = new Map();

  //K.V fro G.C P
  groupClosingP = 0;
  mapP = new Map();
  groupArrayP = [];

  //K.V fro G.C P
  groupClosingN = 0;
  mapN = new Map();
  groupArrayN = [];

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
        for (this.i = 0; this.i < len; this.i++) {
          this.items.push(response[this.i]);
          this.items[this.i].closingQuarts = 0;
          this.items[this.i].closingPints = 0;
          this.items[this.i].closingNips = 0;
          this.items[this.i].amountQuarts = 0;
          this.items[this.i].amountPints = 0;
          this.items[this.i].amountNips = 0;
          this.items[this.i].brandType = '';
          this.findRateByShopNameAndBrandName(e.value, this.items[this.i].brandName);

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
        this.AddingParchaGroup.push(response);
        var index = this.items.findIndex(x => x.brandName === brandName)
        let newArray = [...this.items];
        let responseArr = response;

        //making K.V pair for G.Closing Q
        let groupNumber = response.groupNumber;
        if (this.groupArray.indexOf(groupNumber) == -1) {
          this.groupArray.push(groupNumber);
          this.map.set(groupNumber, 0);
        }

        //making K.V parir for G.Closing P
        let groupNumberP = response.groupNumber;
        if (this.groupArrayP.indexOf(groupNumberP) == -1) {
          this.groupArrayP.push(groupNumberP);
          this.mapP.set(groupNumberP, 0);
        }

        //making K.V pair for G.Closing N
        let groupNumberN = response.groupNumber;
        if (this.groupArrayN.indexOf(groupNumberN) == -1) {
          this.groupArrayN.push(groupNumberN);
          this.mapN.set(groupNumberN, 0);
        }

        //adding brandType in item array for Sale
        let brandType = responseArr.brandType;
        newArray[index] = { ...newArray[index], brandType: brandType }
        this.items = newArray;

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
      newArray[index] = { ...newArray[index], amountQuarts: finalAMountQ }
      this.items = newArray;

      // adding total Q for CL field
      if (newArray[index].brandType === 'DESI') {
        this.clSale = this.clSale + finalAMountQ;
        console.log('inside desi' + this.clSale)
      }

      // adding total q for bsALE field
      if (newArray[index].brandType === 'BEER') {
        this.bSale = this.bSale + finalAMountQ;
        console.log('inside desi' + this.bSale)
      }

      // adding total q for imfl field
      if (newArray[index].brandType === 'ENGLISH') {
        console.log('inside ENGLISH')
        this.imflSale = this.imflSale + finalAMountQ;
      }

      //adding GroupClosing, means toatl of same group
      var indexAP = this.items.findIndex(x => x.brandName === brandName)
      let keys = this.AddingParchaGroup[indexAP].groupNumber;
      let valueOfExistingKey = this.map.get(keys);
      let valueToBeSet = valueOfExistingKey + saleP.closingQuarts;
      this.map.set(keys, valueToBeSet);
      this.groupCLosing = this.map.get(keys);
      console.log(this.groupCLosing + 'new Group CLosing')

      //setting previous values of PN for G.CLosing
      this.groupClosingP = this.mapP.get(keys);
      this.groupClosingN = this.mapN.get(keys);

    } else if (qpn === 'P') {
      //final sale for P
      let finalSaleP = saleP.openingPints + saleP.receiptPints - saleP.transferPints - saleP.closingPints;
      newArray[index] = { ...newArray[index], salePints: finalSaleP }
      //this.items = newArray;

      //final amount for P
      let finalAMountP = finalSaleP * saleP.ratePints;
      newArray[index] = { ...newArray[index], amountPints: finalAMountP }
      this.items = newArray;

      // adding total P for CL field
      if (newArray[index].brandType === 'DESI') {
        this.clSale = this.clSale + finalAMountP;
        console.log('inside desi' + this.clSale)
      }

      // adding total P for bsALE field
      if (newArray[index].brandType === 'BEER') {
        this.bSale = this.bSale + finalAMountP;
        console.log('inside desi' + this.bSale)
      }

      // adding total P for imfl field
      if (newArray[index].brandType === 'ENGLISH') {
        console.log('inside ENGLISH')
        this.imflSale = this.imflSale + finalAMountP;
      }

      //adding GroupClosingP, means toatl of same group
      var indexAPP = this.items.findIndex(x => x.brandName === brandName)
      let keysP = this.AddingParchaGroup[indexAPP].groupNumber;
      let valueOfExistingKeyP = this.mapP.get(keysP);
      let valueToBeSetP = valueOfExistingKeyP + saleP.closingPints;
      this.mapP.set(keysP, valueToBeSetP);
      this.groupClosingP = this.mapP.get(keysP);
      console.log(this.groupClosingP + 'new Group ClosingP')

      //setting previous values of QN for G.CLosing
      this.groupCLosing = this.map.get(keysP);
      this.groupClosingN = this.mapN.get(keysP);

    } else if (qpn === 'N') {
      //final sale for N
      let finalSaleP = saleP.openingNips + saleP.receiptNips - saleP.transferNips - saleP.closingNips;
      newArray[index] = { ...newArray[index], saleNips: finalSaleP }
      //this.items = newArray;

      //final amount for N
      let finalAMountN = finalSaleP * saleP.rateNips;
      newArray[index] = { ...newArray[index], amountNips: finalAMountN }
      this.items = newArray;

      // adding total N for CL field
      if (newArray[index].brandType === 'DESI') {
        this.clSale = this.clSale + finalAMountN;
        console.log('inside desi' + this.clSale)
      }

      // adding total N for bsALE field
      if (newArray[index].brandType === 'BEER') {
        this.bSale = this.bSale + finalAMountN;
        console.log('inside desi' + this.bSale)
      }

      // adding total N for imfl field
      if (newArray[index].brandType === 'ENGLISH') {
        console.log('inside ENGLISH')
        this.imflSale = this.imflSale + finalAMountN;
      }

      //adding Group Total, means toatl Amount of group closing
      var indexAPN = this.items.findIndex(x => x.brandName === brandName)
      let keysN = this.AddingParchaGroup[indexAPN].groupNumber;
      let valueOfExistingKeyN = this.mapN.get(keysN);
      let valueToBeSetN = valueOfExistingKeyN + saleP.closingNips;
      this.mapN.set(keysN, valueToBeSetN);
      this.groupClosingN = this.mapN.get(keysN);
      console.log(this.groupClosingP + 'new Group ClosingN')

      //setting previous values of QP for G.CLosing
      this.groupCLosing = this.map.get(keysN);
      this.groupClosingP = this.mapP.get(keysN);

    }
  }


  addToCart() {
    console.log('@@@' + JSON.stringify(this.items));
    console.log('final K.V' + this.map.get(4));
    console.log('final K.V' + this.map.get(2));
    console.log('final K.V' + this.map.get(3));
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
