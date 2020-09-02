import { Component, OnInit } from '@angular/core';
import { AddingParchaService } from '../adding-parcha.service';
import { ReportsService } from '../service/data/reports.service';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { MasterShopEntryService } from '../service/data/master-shop-entry.service';

export class StockPosition {
  constructor(
    public dateupto: Date,
    public selectShop: string,
    public cityName: string,
    public groupName: string,
    public district: string,
    public type: string,
    public bottleCase: string

  ) {

  }
}

@Component({
  selector: 'app-stock-position',
  templateUrl: './stock-position.component.html',
  styleUrls: ['./stock-position.component.css']
})
export class StockPositionComponent implements OnInit {

  shops = [];
  city = [];
  newArr = [];
  stockPosition: StockPosition;
  districtEnabled: boolean = false;
  shopEnabled: boolean = false;
  cityEnabled: boolean = false;
  groupEnabled: boolean = false;


  constructor(private addingParchaService: AddingParchaService,
    private reportService: ReportsService,
    private masterBrandService: MasterShopEntryService,
    private router: Router) { }

  ngOnInit(): void {
    this.stockPosition = new StockPosition(new Date(), '', '', '', '', '', '');
    this.retrieveShopNames();
  }

  retrieveShopNames() {
    this.masterBrandService.getAllCities('rajat').subscribe(
      response => {
        this.shops = response;
        console.log(JSON.stringify(this.shops))
        //To remove duplicates
        this.shops.forEach((item, index) => {
          if (this.newArr.findIndex(i => i.shopName == item.shopName) === -1) {
            this.newArr.push(item)
          }
        });
        this.shops = this.newArr;
        this.city = this.newArr;
      }
    )
  }


  save2() {
    console.log('inside save' + JSON.stringify(this.stockPosition))
    this.reportService.getStockPosition('rajat', this.stockPosition).subscribe(
      response => {
        console.log('response is :: ' + response)
      }
    )
  }

  save() {
    this.router.navigate(['stockReport', this.stockPosition.selectShop, this.stockPosition.type, this.stockPosition.bottleCase, this.stockPosition.dateupto]);
    // console.log("selected Group Name is::" + this.stockPosition.selectShop);
  }

  districtEnableButton() {
    console.log('selected districtEnabled');
    this.districtEnabled = true;
    this.cityEnabled = false;
    this.shopEnabled = false;
    this.groupEnabled = false;
  }

  cityEnableButton() {
    console.log('selected cityEnableButton');
    this.cityEnabled = true;
    this.districtEnabled = false;
    this.shopEnabled = false;
    this.groupEnabled = false;
  }

  shopEnableButton() {
    console.log('selected shopEnableButton');
    this.shopEnabled = true;
    this.districtEnabled = false;
    this.cityEnabled = false;
    this.groupEnabled = false;
  }

  groupEnableButton() {
    console.log('selected groupEnableButton');
    this.groupEnabled = true;
    this.districtEnabled = false;
    this.cityEnabled = false;
    this.shopEnabled = false;
  }

  getByDistrict() {
    console.log('inside district button, selected distrit is:: ' + this.stockPosition.selectShop);
  }

  getByCity() {
    console.log('inside city button, selected City is:: ' + this.stockPosition.selectShop);

    //var byCity = byCity;
    this.router.navigate(['stockReport', 'byCity', this.stockPosition.selectShop, this.stockPosition.type, this.stockPosition.bottleCase, this.stockPosition.dateupto]);
  }
  getByShop() {
    console.log('inside shop button, selected shop is:: ');
    this.router.navigate(['stockReport', 'byShop', this.stockPosition.selectShop, this.stockPosition.type, this.stockPosition.bottleCase, this.stockPosition.dateupto]);
  }

  getByGroup() {
    console.log('inside group button, selected Group is:: ' + this.stockPosition.selectShop);
    this.router.navigate(['stockReport', 'abc', 'def', 'ghi', 'jkl', 'mno']);
  }
}

