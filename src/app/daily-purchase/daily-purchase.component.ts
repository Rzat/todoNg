import { Component, OnInit } from '@angular/core';
import { MasterBrandEntryService } from '../service/data/master-brand-entry.service';
import { MasterBrandEntry, MasterShopEntry, DailyPurchase } from '../master/master.component';
import { AddingParchaService } from '../adding-parcha.service';
import { AddingParcha } from '../adding-parcha-type/adding-parcha-type.component';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { DailyPurchaseService } from '../service/data/daily-purchase.service';



@Component({
  selector: 'app-daily-purchase',
  templateUrl: './daily-purchase.component.html',
  styleUrls: ['./daily-purchase.component.css']
})
export class DailyPurchaseComponent implements OnInit {
  masterClass: MasterBrandEntry[];
  shopEntry: DailyPurchase;
  shopNames: AddingParcha[];
  myControl = new FormControl();
  items = [];
  test = [];
  shops = [];
  shops2 = [];
  selectedValue: 'hi';
  selectedValue2: 'hi';
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
    private dailyPurchaseService: DailyPurchaseService) {


  }

  ngOnInit() {
    this.retrieveAllMasterBrand();
    this.retrieveShopNames();
    this.shopEntry = new DailyPurchase(0, '', '', '', new Date(), '', '', 0, 0, 0);

  }



  retrieveAllMasterBrand() {
    this.masterBrandEntryService.retrieveAllMasterBrand('rajat').subscribe(
      response => {
        console.log(response);
        this.masterClass = response;
        this.abc = this.masterClass.map(({ brandName }) => brandName);
        for (let i = 0; i < response.length; i++) {
          this.lg = {
            brandName: this.abc[i],
            quarts: 0,
            pints: 0,
            nips: 0,
          };
          this.items.push(this.lg)
          console.log('Ites console' + this.items);
        }
      }
    )
  }


  retrieveShopNames() {
    this.addingParchaService.retrieveAllParchaType('rajat').subscribe(
      response => {
        console.log(response);
        this.shopNames = response;
        this.shops = response;
        this.shops2 = response;

        //To remove duplicates
        this.shops.forEach((item, index) => {
          if (this.newArr.findIndex(i => i.shopName == item.shopName) === -1) {
            this.newArr.push(item)
          }
        });
        this.shops = this.newArr;
        this.shops2 = this.newArr;

      }
    )
  }


  //Not using this method anymore
  saveDailyPurchase(master) {
    this.shopEntry.brandName = master.brandName;
    this.dailyPurchaseService.saveDailyPurchase('rajat', this.shopEntry).subscribe(
      response => {
        console.log(response);
      }
    )

  }

  addToCart(product) {
    var data = {
      "purchaseFrom": product.purchaseFrom,
      "purchaseTo": product.purchaseTo,
      "date": product.date,
      "size": product.size,
      "orders": this.items
    }
    console.log('final json' + JSON.stringify(data))
    this.dailyPurchaseService.saveDailyPurchase('rajat', data).subscribe(
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
