import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MasterBrandEntryService } from '../service/data/master-brand-entry.service';
import { MasterBrandEntry } from '../master/master.component';
import { DOCUMENT } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-master-brand-name-entry',
  templateUrl: './master-brand-name-entry.component.html',
  styleUrls: ['./master-brand-name-entry.component.css']
})
export class MasterBrandNameEntryComponent implements OnInit {

  // @ViewChild("ipt", { static: true }) p1: ElementRef;
  // @ViewChild("ipt2", { static: true }) p2: ElementRef;
  // @ViewChild("ipt3", { static: true }) p3: ElementRef;

  private packing1: number;

  //brandList: any = ['ENGLISH', 'DESI']

  entry: MasterBrandEntry
  id: number



  constructor(private entryService: MasterBrandEntryService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id']

    this.entry = new MasterBrandEntry(0, '', '', '', '', '', 0, 0, 0);

    if (this.id != 0) {
      console.log('inside inti')
      this.entryService.retrieveMasterEntryById('Rajat', this.id).subscribe(
        data => this.entry = data
      )
    }
  }



  saveMasterBrand() {
    //console.log('saving master' + this.entry.packing1)
    if (this.id == 0) {
      console.log('in Save'+  this.entry.brandName)
      this.entryService.saveMasterBrand('Rajat', this.entry).subscribe(
        data => {
          console.log(data),
            this.router.navigate([`masterBrandList`]);
        }
      )
    } else {
      console.log('in update')
      this.entryService.updateMasterBrand('Rajat', this.id, this.entry).subscribe(
        data => {
          console.log(data),
            this.router.navigate([`masterBrandList`]);
        }
      )
    }
  }

  onChangeBrand(e) {
    if (e.srcElement.value == 'ENGLISH') {
      //this.p1.nativeElement.value = 12;
      this.entry.packing1 = 12;
      this.entry.packing2 = 24;
      this.entry.packing3 = 48;


    } else if (e.srcElement.value == 'DESI') {
      this.entry.packing1 = 13;
      this.entry.packing2 = 40;
      this.entry.packing3 = 48;

    }
  }


}
