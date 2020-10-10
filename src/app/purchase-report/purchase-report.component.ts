import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddingParchaService } from '../adding-parcha.service';
import { MasterShopEntryService } from '../service/data/master-shop-entry.service';
import { ReportsService } from '../service/data/reports.service';
import { StockPosition } from '../stock-position/stock-position.component';


export class PurchaseReport {
  constructor(
    public dateTo: Date,
    public dateFrom: Date,
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
  selector: 'app-purchase-report',
  templateUrl: './purchase-report.component.html',
  styleUrls: ['./purchase-report.component.css']
})
export class PurchaseReportComponent implements OnInit {

  shops = [];
  city = [];
  newArr = [];
  stockPosition: PurchaseReport;
  districtEnabled: boolean = false;
  shopEnabled: boolean = false;
  cityEnabled: boolean = false;
  groupEnabled: boolean = false;


  constructor(private addingParchaService: AddingParchaService,
    private reportService: ReportsService,
    private masterBrandService: MasterShopEntryService, private router: Router) { }

  ngOnInit(): void {
    this.stockPosition = new PurchaseReport(new Date(), new Date(), '', '', '', '', '', '');
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

  districtEnableButton() {
    this.districtEnabled = true;
    this.cityEnabled = false;
    this.shopEnabled = false;
    this.groupEnabled = false;
  }

  cityEnableButton() {
    this.cityEnabled = true;
    this.districtEnabled = false;
    this.shopEnabled = false;
    this.groupEnabled = false;
  }

  shopEnableButton() {
    this.shopEnabled = true;
    this.districtEnabled = false;
    this.cityEnabled = false;
    this.groupEnabled = false;
  }

  groupEnableButton() {
    this.groupEnabled = true;
    this.districtEnabled = false;
    this.cityEnabled = false;
    this.shopEnabled = false;
  }

  getByDistrict() {
    this.router.navigate(['viewPurchase', 'byDistrict', this.stockPosition.selectShop, this.stockPosition.type, this.stockPosition.bottleCase, this.stockPosition.dateFrom, this.stockPosition.dateTo]);
  }

  getByCity() {
    this.router.navigate(['viewPurchase', 'byCity', this.stockPosition.selectShop, this.stockPosition.type, this.stockPosition.bottleCase, this.stockPosition.dateFrom, this.stockPosition.dateTo]);
  }
  getByShop() {

    this.router.navigate(['viewPurchase', 'byShop', this.stockPosition.selectShop, this.stockPosition.type, this.stockPosition.bottleCase, this.stockPosition.dateFrom, this.stockPosition.dateTo]);
  }

  getByGroup() {
    this.router.navigate(['stockReport', 'abc', 'def', 'ghi', 'jkl', 'mno']);
  }

}
