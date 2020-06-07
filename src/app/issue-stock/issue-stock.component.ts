import { Component, OnInit } from '@angular/core';
import { IssueStock, DailyPurchase } from '../master/master.component';
import { AddingParchaService } from '../adding-parcha.service';
import { MasterBrandEntryService } from '../service/data/master-brand-entry.service';
import { DailyPurchaseService } from '../service/data/daily-purchase.service';

@Component({
  selector: 'app-issue-stock',
  templateUrl: './issue-stock.component.html',
  styleUrls: ['./issue-stock.component.css']
})
export class IssueStockComponent implements OnInit {


  shopEntry: IssueStock;
  shops = [];
  items = [];
  abc: string[];
  lg = {
    brandName: '',
    quarts: 0,
    pints: 0,
    nips: 0
  };
  newArr = []



  constructor(private masterBrandEntryService: MasterBrandEntryService,
    private addingParchaService: AddingParchaService,
    private dailyPurchaseService: DailyPurchaseService) { }

  ngOnInit(): void {
    this.retrieveShopNames();
    this.retrieveAllMasterBrand();
    this.shopEntry = new IssueStock(0, '', '', '', new Date(), '', '', 0, 0, 0);
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

  retrieveAllMasterBrand() {
    this.masterBrandEntryService.retrieveAllMasterBrand('rajat').subscribe(
      response => {
        console.log(response);
        //  this.masterClass = response;
        this.abc = response.map(({ brandName }) => brandName);
        for (let i = 0; i < response.length; i++) {
          this.lg = {
            brandName: this.abc[i],
            quarts: 0,
            pints: 0,
            nips: 0,
          };
          this.items.push(this.lg)
          console.log(this.items);
        }
      }
    )
  }


  addToCart(product) {
    var data = {
      "issueFrom": product.issueFrom,
      "issueTo": product.issueTo,
      "date": product.date,
      "size": product.size,
      "orders": this.items
    }
    console.log('final json' + JSON.stringify(data))

    //Todo
    this.dailyPurchaseService.saveDailyIssueStock('rajat', data).subscribe(
      response => {
        console.log(response);
      }
    )
  }


  getTotalQuarts() {
    return this.items.map(t => t.quarts).reduce((acc, value) => acc + value, 0);
  }

  getTotalPints() {
    return this.items.map(t => t.pints).reduce((acc, value) => acc + value, 0);

  }

  getTotalNips() {
    return this.items.map(t => t.nips).reduce((acc, value) => acc + value, 0);
  }


}
