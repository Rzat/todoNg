import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AddingParchaService } from '../adding-parcha.service';
import { AddingParcha } from '../adding-parcha-type/adding-parcha-type.component';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MasterBrandEntryService } from '../service/data/master-brand-entry.service';
import { MasterBrandEntry } from '../master/master.component';

export interface Transaction {
  item: string;
  cost: number;
}

// export interface Transaction2 {
//   brandName: string;
//   packing1: number;
// }

@Component({
  selector: 'app-form-group-example',
  templateUrl: './form-group-example.component.html',
  styleUrls: ['./form-group-example.component.css']
})
export class FormGroupExampleComponent implements OnInit {
  displayedColumns2: string[] = ['brandName', 'packing1'];
  masterClass: MasterBrandEntry[];
  masterTestEntry: MasterBrandEntry;
  states = [];


  displayedColumns: string[] = ['item', 'cost'];
  transactions: Transaction[] = [
    { item: 'Beach ball', cost: 4 },
    { item: 'Towel', cost: 5 },
    { item: 'Frisbee', cost: 2 },
    { item: 'Sunscreen', cost: 4 },
    { item: 'Cooler', cost: 25 },
    { item: 'Swim suit', cost: 15 },
  ];


  constructor(private masterBrandEntryService: MasterBrandEntryService) { }

  ngOnInit(): void {

    this.retrieveAllMasterBrand();


    
  }

  retrieveAllMasterBrand() {
    this.masterBrandEntryService.retrieveAllMasterBrand('rajat').subscribe(
      response => {
        console.log(response);
        this.masterClass = response;
      }
    )
  }

  getTotalCost() {
    // console.log('In Total Cost'+value)
    return this.masterClass.map(masterClass => masterClass.packing1).reduce((acc, value) => acc + value, 0);
  }


  saveForm(masterClass) {

    console.log('inside save form' + masterClass.brandName);

  }

  saveDailyPurchase() {
    console.log('inside saving form')
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    // console.warn('abc' + this.masterClass.brandName);
  }


}
