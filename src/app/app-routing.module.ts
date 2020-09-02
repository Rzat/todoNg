import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ErrorComponent } from './error/error.component';
import { ListTodosComponent } from './list-todos/list-todos.component';
import { LogoutComponent } from './logout/logout.component';
import { TodoComponent } from './todo/todo.component';
import { MasterComponent } from './master/master.component';
import { MasterBrandListComponent } from './master-brand-list/master-brand-list.component';
import { MasterBrandNameEntryComponent } from './master-brand-name-entry/master-brand-name-entry.component';
import { RouteGuardService } from './service/route-guard.service';
import { DailyComponent } from './daily/daily.component';
import { AddingParchaTypeComponent } from './adding-parcha-type/adding-parcha-type.component';
import { MasterShopEntryComponent } from './master-shop-entry/master-shop-entry.component';
import { DailyPurchaseComponent } from './daily-purchase/daily-purchase.component';
import { FormGroupExampleComponent } from './form-group-example/form-group-example.component';
import { TestComponent } from './test/test.component';
import { IssueStockComponent } from './issue-stock/issue-stock.component';
import { DailySaleComponent } from './daily-sale/daily-sale.component';
import { ReportsComponent } from './reports/reports.component';
import { StockPositionComponent } from './stock-position/stock-position.component';
import { StockReportComponent } from './stock-report/stock-report.component';

IssueStockComponent

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'welcome/:name', component: WelcomeComponent, canActivate: [RouteGuardService] },
  { path: 'todos', component: ListTodosComponent, canActivate: [RouteGuardService] },
  { path: 'logout', component: LogoutComponent, canActivate: [RouteGuardService] },
  { path: 'todos/:id', component: TodoComponent, canActivate: [RouteGuardService] },
  { path: 'master', component: MasterComponent, canActivate: [RouteGuardService] },
  { path: 'masterBrand/:id', component: MasterBrandNameEntryComponent, canActivate: [RouteGuardService] },
  { path: 'masterBrandList', component: MasterBrandListComponent, canActivate: [RouteGuardService] },
  { path: 'daily', component: DailyComponent, canActivate: [RouteGuardService] },
  { path: 'addingParcha', component: AddingParchaTypeComponent, canActivate: [RouteGuardService] },
  { path: 'addingShop', component: MasterShopEntryComponent, canActivate: [RouteGuardService] },
  { path: 'daiyPurchase', component: DailyPurchaseComponent, canActivate: [RouteGuardService] },
  { path: 'issueStock', component: IssueStockComponent, canActivate: [RouteGuardService] },
  { path: 'dailySale', component: DailySaleComponent, canActivate: [RouteGuardService] },
  { path: 'reports', component: ReportsComponent, canActivate: [RouteGuardService] },
  { path: 'stockReport/:byCity/:select/:type/:packagingType/:date', component: StockReportComponent, canActivate: [RouteGuardService] },
  { path: 'stockPosition', component: StockPositionComponent, canActivate: [RouteGuardService] },
  { path: 'formGroup', component: FormGroupExampleComponent, canActivate: [RouteGuardService] },
  { path: 'test', component: TestComponent, canActivate: [RouteGuardService] },

  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
