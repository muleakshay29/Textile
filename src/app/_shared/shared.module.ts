import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { PERFECT_SCROLLBAR_CONFIG } from "ngx-perfect-scrollbar";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

import { P404Component } from "../views/error/404.component";
import { ErrorMessageComponent } from "../_helper/error-message/error-message.component";
import { PaginationComponent } from "../_helper/pagination/pagination.component";

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from "@coreui/angular";

import { NgxSpinnerModule } from "ngx-spinner";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { TabsModule } from "ngx-bootstrap/tabs";
import { ModalModule } from "ngx-bootstrap/modal";
import { ChartsModule } from "ng2-charts";
import { ToastrModule } from "ngx-toastr";
import { PaginationModule } from "ngx-bootstrap/pagination";

@NgModule({
  declarations: [P404Component, ErrorMessageComponent, PaginationComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PerfectScrollbarModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    ChartsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    PaginationModule.forRoot(),
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PerfectScrollbarModule,
    AppAsideModule,
    AppBreadcrumbModule,
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    BsDropdownModule,
    TabsModule,
    ModalModule,
    ChartsModule,
    ToastrModule,
    NgxSpinnerModule,
    PaginationModule,
    P404Component,
    ErrorMessageComponent,
    PaginationComponent,
  ],
})
export class SharedModule {}
