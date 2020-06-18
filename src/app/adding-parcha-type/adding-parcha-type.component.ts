import { Component, OnInit } from '@angular/core';
import { MasterBrandEntryService } from '../service/data/master-brand-entry.service';
import { MasterBrandEntry } from 'src/app/master/master.component';
import { AddingParchaService } from '../adding-parcha.service';
import { FormGroup, FormArray, FormControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';

export class AddingParcha {
  constructor(
    public shopName: string,
    public numbr: number,
    public quarts: number,
    public pints: number,
    public nips: number,
    public brandName: string,
    public brandType: string
  ) {

  }
}



@Component({
  selector: 'app-adding-parcha-type',
  templateUrl: './adding-parcha-type.component.html',
  styleUrls: ['./adding-parcha-type.component.css']
})
export class AddingParchaTypeComponent implements OnInit {
  brandName: MasterBrandEntry[];
  addParcha: AddingParcha[];
  createParcha: AddingParcha;
  shopName = '';
  message: string;
  //headers: ["Id", "Brand Name", "NIPS", "No.", "PINTS", "QUARTS", "Shop Name"];
  // index: ["id", "brandName", "nips", "numbr", "pints", "quarts", "shopName"];
  item: any = [];


  // angForm = new FormGroup({
  //   names: new FormArray([
  //     new FormControl(''),
  //     new FormControl(''),
  //   ])
  // });

  // angForm2 = new FormGroup({
  //   index: new FormArray([
  //     new FormControl(''),
  //     new FormControl('quarts')
  //   ])
  // });


  // profileForm = new FormGroup({
  //   quarts: new FormControl(''),
  //   nips: new FormControl(''),
  // });


  constructor(private masterBrandEntryService: MasterBrandEntryService,
    private addingParchaService: AddingParchaService) { }

  ngOnInit() {
    this.createParcha = new AddingParcha('', 0, 0, 0, 0, '','');
    this.retrieveBrandName();

  }

  // get index(): FormArray {
  //   return this.angForm2.get('index') as FormArray;
  //   //return this.angForm.get('names') as FormArray
  // }
  // onFormSubmit(): void {
  //   console.log(this.profileForm.value)

  // }
  // addNameField() {
  //   this.index.push(new FormControl(''));
  // }

  // deleteNameField(index: number) {
  //   if (this.index.length !== 1) {
  //     this.index.removeAt(index);
  //   }
  //   console.log(this.index.length);
  // }

  // retrieveBrandName2() {
  //   this.addingParchaService.retrieveAllParchaType2('rajat').subscribe(
  //     response => {
  //       console.log(response);

  //       //      this.form.get('nips').setValue(response);
  //       this.profileForm = response;
  //     }
  //   )
  // }


  retrieveBrandName() {
    this.addingParchaService.retrieveAllParchaType('rajat').subscribe(
      response => {
        console.log(response);
        this.addParcha = response;
        //      this.form.get('nips').setValue(response);
        //this.profileForm=response;
      }
    )
  }

  saveParchaType(id, parcha) {
    parcha.shopName = this.shopName;
    //console.log('creating parcha with ' + this.createParcha.pints)
    this.addingParchaService.addParch('rajat', parcha).subscribe(
      response => {
        console.log(response);

        this.message = `Saved ${parcha.brandName} Successful`;
      }
    )
  }

}
