import { Component, OnInit } from '@angular/core';
import { MasterBrandEntryService } from '../service/data/master-brand-entry.service';
import { MasterBrandEntry } from 'src/app/master/master.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-master-brand-list',
  templateUrl: './master-brand-list.component.html',
  styleUrls: ['./master-brand-list.component.css']
})
export class MasterBrandListComponent implements OnInit {
  masterClass: MasterBrandEntry[];

  message: string

  constructor(private masterBrandEntryService: MasterBrandEntryService,
    private router: Router) { }

  ngOnInit() {
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

  updateTodo(id) {
    console.log('update id' + id)

    this.router.navigate(['masterBrand', id]);
  }

  deleteTodo(id) {
    console.log('Delete id' + id)
    this.masterBrandEntryService.deleteMasterBrand('Rajat', id).subscribe(
      response => {
        console.log();
        this.message = `Deleted ${id} Successful`; this.retrieveAllMasterBrand();
      }
    )
  }

  addMasterBrand() {
    this.router.navigate(['masterBrand', 0])
  }




}
