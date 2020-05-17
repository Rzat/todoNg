

import { Component, OnInit } from '@angular/core';
import { MasterShopEntry, MasterBrandEntry } from '../master/master.component';
import { FormControl } from '@angular/forms';
import { MasterBrandEntryService } from '../service/data/master-brand-entry.service';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MasterShopEntryService } from '../service/data/master-shop-entry.service';
import { Router } from '@angular/router';


export interface State {

    name: string;
}


@Component({
    selector: 'app-master-shop-entry',
    templateUrl: './master-shop-entry.component.html',
    styleUrls: ['./master-shop-entry.component.css']
})
export class MasterShopEntryComponent implements OnInit {
    shop: MasterShopEntry;
    myControl = new FormControl();
    options = [];
    message: string
    brandName: string;
    /* Auto Complete Start*/
    // persons: MasterBrandEntry[];
    // filteredStates2: Observable<MasterBrandEntry[]>;
    // states2 = [];
    // stateCtrl2 = new FormControl();

    persons: MasterShopEntry[];
    filteredStates2: Observable<MasterShopEntry[]>;
    states2 = [];
    stateCtrl2 = new FormControl();


    constructor(private masterBrandEntryService: MasterBrandEntryService,
        private router: Router, private masterShopEntryService: MasterShopEntryService) {

        this.filteredStates2 = this.stateCtrl2.valueChanges
            .pipe(
                startWith(''),
                map(state => state ? this._filterStates(state) : this.states2.slice())
            );

    }

    private _filterStates(value: string) {
        this.shop.city = value;
        const filterValue = value.toLowerCase();
        return this.states2.filter(state => state.city.toLowerCase().indexOf(filterValue) === 0);
    }

    /* Auto Complete End*/

    ngOnInit() {
        this.shop = new MasterShopEntry(0, '', '', '', '', '', '', 0);
        this.retrieveAllMasterBrand();
        //this.stateCtrl2.setValue(this.retrieveAllMasterBrand())
    }

    // retrieveAllMasterBrand() {
    //     this.masterBrandEntryService.retrieveAllMasterBrand('rajat').subscribe(
    //         response => {
    //             console.log(response);
    //             this.options = response;
    //             //this.shop2 = response;
    //             //  console.log(this.persons = response.find(x => x.brandName === this.brandName));
    //            // this.states2 = response;
    //         }
    //     )
    // }


    retrieveAllMasterBrand() {
        this.masterShopEntryService.getAllCities('rajat').subscribe(
            response => {
                console.log(response);
              //   this.options = response;
                this.states2 = response;
                //  console.log(this.persons = response.find(x => x.brandName === this.brandName));
                // this.states2 = response;

            }
        )
    }




    saveShopEntry() {
        console.log('saving Shop' + this.shop.group)
        console.log('saving Shop' + this.shop.city)
        this.masterShopEntryService.saveMasterBrand('rajat', this.shop).subscribe(
            response => {
                console.log(response);
                this.message = `Shop Added Successfully `;
                // this.router.navigate(['master']);
            }
        )
    }

}
