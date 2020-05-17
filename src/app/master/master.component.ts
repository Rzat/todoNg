import { Component, OnInit } from '@angular/core';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';

export class MasterBrandEntry {
  constructor(
    public id: number,
    public brandName: string,
    public changedName: string,
    public brandCompanyName: string,
    public brandCategoryName: string,
    public brandType: string,
    public packing1: number,
    public packing2: number,
    public packing3: number
  ) {

  }
}

export class MasterShopEntry {
  constructor(
    public id: number,
    public shopName: string,
    public address: string,
    public parchaType: string,
    public city: string,
    public district: string,
    public group: string,
    public shopNumber: number
    // public fromDate: Date,
    // public toDate: Date,
  ) {

  }
}


export class DailyPurchase {
  constructor(
    public id: number,
    public purchaseCode: string,
    public purchaseFrom: string,
    public purchaseTo: string,
    public date: Date,
    public size: string,
    public brandName: String,
    public quarts: number,
    public pints: number,
    public nips: number
  ) {
  }
}

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
