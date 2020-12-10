import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
import { DefaultLayoutComponent } from "./containers";
const APP_CONTAINERS = [DefaultLayoutComponent];

import { AppRoutingModule } from "./app-routing.module";
import { LoginComponent } from "./views/login/login.component";
import { RegisterCompanyComponent } from "./views/register-company/register-company.component";
import { MasterModule } from "./views/master/master.module";
import { SharedModule } from "./_shared/shared.module";
import { RegisterComponent } from "./views/register/register.component";
import { JwtInterceptor } from "./_helper/jwt.interceptor";
import { DeleteConfirmationComponent } from "./_helper/delete-confirmation/delete-confirmation.component";
import { InwardsModule } from "./views/inwards/inwards.module";
import { ReportModule } from "./views/reports/report.module";
import { SalesInvoicePrintComponent } from "./_helper/sales-invoice-print/sales-invoice-print.component";
import { DeliveryChalanPrintComponent } from "./_helper/delivery-chalan-print/delivery-chalan-print.component";
import { ConfirmWindowComponent } from "./_helper/confirm-window/confirm-window.component";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MasterModule,
    SharedModule,
    InwardsModule,
    ReportModule,
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    LoginComponent,
    RegisterComponent,
    RegisterCompanyComponent,
    DeleteConfirmationComponent,
    SalesInvoicePrintComponent,
    DeliveryChalanPrintComponent,
    ConfirmWindowComponent,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  entryComponents: [
    DeleteConfirmationComponent,
    SalesInvoicePrintComponent,
    DeliveryChalanPrintComponent,
    ConfirmWindowComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
