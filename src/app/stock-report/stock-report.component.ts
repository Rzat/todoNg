import { Component, OnInit } from '@angular/core';
import { StockPosition } from '../stock-position/stock-position.component';
import { ActivatedRoute } from '@angular/router';
import { ReportsService } from '../service/data/reports.service';

@Component({
  selector: 'app-stock-report',
  templateUrl: './stock-report.component.html',
  styleUrls: ['./stock-report.component.css']
})
export class StockReportComponent implements OnInit {

  stockReports = [];
  select = '';
  type = '';
  packagingType = '';
  date = '';

  constructor(private route: ActivatedRoute,
    private reportService: ReportsService) { }

  ngOnInit(): void {
    this.select = this.route.snapshot.params['select'];
    this.type = this.route.snapshot.params['type']
    this.packagingType = this.route.snapshot.params['packagingType']
    this.date = this.route.snapshot.params['date']
    this.getStockReport(this.select, this.type, this.packagingType, this.date)
  }

  getStockReport(select, type, packagingType, date) {
    this.reportService.getStockPositionByShopName('rajat', select, type, packagingType, date).subscribe(
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
