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
  // options = this.shopNames;
  shops = [];
  shops2 = [];
  selectedValue: 'hi';
  selectedValue2: 'hi';
  abc: string[];
  lg = {
    brandName: '',
    quarts: 0,
    pints: 0,
    nips: 0,
    purchaseFrom: '',
    purchaseTo: '',
    date: new Date(),
    size: ''
  }





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
          //console.log(this.masterClass.map(({ brandName }) => brandName));
          this.lg = {
            brandName: this.abc[i],
            quarts: 0,
            pints: 0,
            nips: 0,
            purchaseFrom: '',
            purchaseTo: '',
            date: new Date(),
            size: ''
          };
          this.items.push(this.lg)
          console.log(this.items);
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
      }
    )
  }

  onChange(deviceValue) {
    this.shopEntry.purchaseFrom = deviceValue.shopName;
  }

  onChangeTo(deviceValue) {
    this.shopEntry.purchaseTo = deviceValue.shopName;
  }

  onChangeToPints(value) {
    console.log('pints value' + value)
    this.shopEntry.pints = value;

  }

  // saveDailyPurchase(shopEntry: NgForm) {
  saveDailyPurchase(master) {
    console.log('saving Brand ...' + this.shopEntry.brandName);
    console.log('saving Brand ...' + master.brandName);
    // console.log('saving nips ...' + shopEntry.value.nips);
    console.log('clicked by table save button...');

    this.shopEntry.brandName = master.brandName;
    console.log('saving brandName purchaseFrom ...' + this.shopEntry.purchaseFrom);
    console.log('saving brandName purchaseTo ...' + this.shopEntry.purchaseTo);



    this.dailyPurchaseService.saveDailyPurchase('rajat', this.shopEntry).subscribe(
      response => {
        console.log(response);
      }
    )

  }

  addToCart(product) {
    console.log('......' + product.purchaseFrom);
    console.log('checking' + this.lg.purchaseFrom);
    //.purchaseFrom = product.purchaseFrom;
    this.items.forEach(function (value) {

      value.purchaseFrom = product.purchaseFrom;
      value.purchaseTo = product.purchaseTo;
      value.size = product.size;
      value.date = product.date;
      console.log('value purchase from' + value.purchaseFrom)
      console.log('value purchase from' + value.purchaseTo)
      console.log('value purchase from' + value.purchaseFrom)
      console.log('value purchase from' + value.size)
      console.log('value purchase from' + value.date)
      console.log(value);
    });

  }





}
