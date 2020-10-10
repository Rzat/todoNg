import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportsService } from '../service/data/reports.service';

@Component({
  selector: 'app-view-purchase',
  templateUrl: './view-purchase.component.html',
  styleUrls: ['./view-purchase.component.css']
})
export class ViewPurchaseComponent implements OnInit {

  stockReports = [];
  select = '';
  type = '';
  packagingType = '';
  dateFrom = '';
  dateTo = '';
  by = '';

  constructor(private route: ActivatedRoute,
    private reportService: ReportsService) { }


  ngOnInit(): void {

    this.by = this.route.snapshot.params['byCity'];
    this.select = this.route.snapshot.params['select'];
    this.type = this.route.snapshot.params['type']
    this.packagingType = this.route.snapshot.params['packagingType']
    this.dateFrom = this.route.snapshot.params['dateFrom']
    this.dateTo = this.route.snapshot.params['dateTo']

    if (this.by === 'byCity') {
      this.getStockReportByCity(this.select, this.type, this.packagingType, this.dateFrom, this.dateTo)
    } else if (this.by === 'byShop') {
      this.getStockReport(this.select, this.type, this.packagingType, this.dateFrom, this.dateTo)
    } else if (this.by === 'byDistrict') {
      this.getStockReportByDistrict(this.select, this.type, this.packagingType, this.dateFrom, this.dateTo)
    }


  }

  getStockReportByDistrict(select, type, packagingType, dateFrom, dateTo) {
    this.reportService.getPurchaseReportByDistrictName('rajat', select, type, packagingType, dateFrom, dateTo).subscribe(
      response => {
        this.stockReports = response;
      }
    )
  }


  getStockReport(select, type, packagingType, dateFrom, dateTo) {
    this.reportService.getPurchaseReportByShopName('rajat', select, type, packagingType, dateFrom, dateTo).subscribe(
      response => {
        this.stockReports = response;
      }
    )
  }

  getStockReportByCity(select, type, packagingType, dateFrom, dateTo) {
    this.reportService.getPurchaseReportByCityName('rajat', select, type, packagingType, dateFrom, dateTo).subscribe(
      response => {
        this.stockReports = response;
      }
    )
  }

  getTotalQuarts() {
    return this.stockReports.map(t => t.closingQuarts).reduce((acc, value) => acc + value, 0);
  }

  getTotalPints() {
    return this.stockReports.map(t => t.closingPints).reduce((acc, value) => acc + value, 0);
  }

  getTotalNips() {
    return this.stockReports.map(t => t.closingNips).reduce((acc, value) => acc + value, 0);
  }

}
