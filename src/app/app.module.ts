import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { ListTodosComponent } from './list-todos/list-todos.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { LogoutComponent } from './logout/logout.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TodoComponent } from './todo/todo.component';
import { MasterComponent } from './master/master.component';
import { MasterBrandNameEntryComponent } from './master-brand-name-entry/master-brand-name-entry.component';
import { HttpIntercepterBasicAuthService } from './service/http/http-intercepter-basic-auth.service';
import { MasterBrandListComponent } from './master-brand-list/master-brand-list.component';
import { DailyComponent } from './daily/daily.component';
import { AddingParchaTypeComponent } from './adding-parcha-type/adding-parcha-type.component';
import { MasterShopEntryComponent } from './master-shop-entry/master-shop-entry.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule, MatInputModule, MatSelectModule, MatListModule, MatTableModule, MatGridListModule, MatCheckboxModule } from '@angular/material';
import { DailyPurchaseComponent } from './daily-purchase/daily-purchase.component';
import { FormGroupExampleComponent } from './form-group-example/form-group-example.component';
import { TestComponent } from './test/test.component';
import { IssueStockComponent } from './issue-stock/issue-stock.component';
import { DailySaleComponent } from './daily-sale/daily-sale.component';
import { ReportsComponent } from './reports/reports.component';
import { StockPositionComponent } from './stock-position/stock-position.component';
import { StockReportComponent } from './stock-report/stock-report.component';
import { PurchaseReportComponent } from './purchase-report/purchase-report.component';




@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    ErrorComponent,
    ListTodosComponent,
    MenuComponent,
    FooterComponent,
    LogoutComponent,
    TodoComponent,
    MasterComponent,
    MasterBrandNameEntryComponent,
    MasterBrandListComponent,
    DailyComponent,
    AddingParchaTypeComponent,
    MasterShopEntryComponent,
    DailyPurchaseComponent,
    FormGroupExampleComponent,
    TestComponent,
    IssueStockComponent,
    DailySaleComponent,
    ReportsComponent,
    StockPositionComponent,
    StockReportComponent,
    PurchaseReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    MatTableModule,
    MatGridListModule,
    MatCheckboxModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpIntercepterBasicAuthService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
