import { Component, OnInit } from '@angular/core';
import { AddingParchaService } from '../adding-parcha.service';
import { ReportsService } from '../service/data/reports.service';

export class StockPosition {
  constructor(
    public dateupto: Date,
    public selectShop: string,
    public cityName: string,
    public groupName: string,
    public district: string,
    public type: string,
    public bottleCase: string,

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
  newArr = [];
  stockPosition: StockPosition;

  constructor(private addingParchaService: AddingParchaService,
    private reportService: ReportsService) { }

  ngOnInit(): void {
    this.stockPosition = new StockPosition(new Date(), '', '', '', '', '', '');
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
    console.log('shop name::' + e.value)
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
    console.log('inside save' + JSON.stringify(this.stockPosition))
    this.reportService.getStockPositionByCityName('rajat', 'Hisar', 'E', 'Case').subscribe(
      response => {
        console.log('response is :: ' + response)
      }
    )
  }

}
