import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddingParchaService } from '../adding-parcha.service';
import { MasterShopEntryService } from '../service/data/master-shop-entry.service';
import { ReportsService } from '../service/data/reports.service';
import { StockPosition } from '../stock-position/stock-position.component';




@Component({
  selector: 'app-purchase-report',
  templateUrl: './purchase-report.component.html',
  styleUrls: ['./purchase-report.component.css']
})
export class PurchaseReportComponent implements OnInit {

  shops = [];
  city = [];
  newArr = [];
  stockPosition: StockPosition;
  dateTo: Date;
  districtEnabled: boolean = false;
  shopEnabled: boolean = false;
  cityEnabled: boolean = false;
  groupEnabled: boolean = false;


  constructor(private addingParchaService: AddingParchaService,
    private reportService: ReportsService,
    private masterBrandService: MasterShopEntryService, private router: Router) { }

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
    this.router.navigate(['stockReport', 'byDistrict', this.stockPosition.selectShop, this.stockPosition.type, this.stockPosition.bottleCase, this.stockPosition.dateupto]);
  }

  getByCity() {
    this.router.navigate(['stockReport', 'byCity', this.stockPosition.selectShop, this.stockPosition.type, this.stockPosition.bottleCase, this.stockPosition.dateupto]);
  }
  getByShop() {
    console.log('date from::' + this.stockPosition.dateupto + 'date to::' + this.dateTo);
    //this.router.navigate(['stockReport', 'byShop', this.stockPosition.selectShop, this.stockPosition.type, this.stockPosition.bottleCase, this.stockPosition.dateupto]);
  }

  getByGroup() {
    this.router.navigate(['stockReport', 'abc', 'def', 'ghi', 'jkl', 'mno']);
  }

}
