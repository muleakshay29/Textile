import { Component, OnInit } from "@angular/core";
import { PageChangedEvent } from "ngx-bootstrap/pagination";
import { CommonService } from "../../../_services/common.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { SalesInvoicePrintComponent } from "../../../_helper/sales-invoice-print/sales-invoice-print.component";
import { ArIndusriesReceiptPrintComponent } from "../../../_helper/ar-indusries-receipt-print/ar-indusries-receipt-print.component";
import { InvoiceDesign3Component } from "../../../_helper/invoice-design3/invoice-design3.component";

@Component({
  selector: "app-sales-invoice-manual",
  templateUrl: "./sales-invoice-manual.component.html",
  styleUrls: ["./sales-invoice-manual.component.css"],
})
export class SalesInvoiceManualComponent implements OnInit {
  returnedArray: any[];
  dataLength: number;
  itemsPerPage: number = 10;
  firmDesign: number;

  constructor(
    private cmservice: CommonService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getItemCount();
    this.fetchSalesInvoiceManual();
  }

  getItemCount() {
    this.spinner.show();
    this.cmservice
      .getItemCount("sales-invoice-manual-count")
      .subscribe((count) => {
        this.dataLength = count.count;
        this.spinner.hide();
      });
  }

  fetchSalesInvoiceManual(pageIndex = 0, pageSize = this.itemsPerPage) {
    this.spinner.show();
    this.cmservice
      .fetchData(pageIndex, pageSize, "fetch-sales-invoice-manual")
      .subscribe((list) => {
        this.returnedArray = list.slice(0, this.itemsPerPage);
        this.spinner.hide();
      });
  }

  pageChanged(event: PageChangedEvent): void {
    this.fetchSalesInvoiceManual(event.page - 1, this.itemsPerPage);
  }

  setItemPerPage(event) {
    this.itemsPerPage = event.target.value;
    this.fetchSalesInvoiceManual(event.page - 1, this.itemsPerPage);
  }

  searchRecord(event) {
    const searchTxt = event.target.value;
    console.log("searchTxt", searchTxt);

    if (searchTxt == "" || searchTxt.length == 0) {
      this.fetchSalesInvoiceManual();
      this.getItemCount();
      this.spinner.hide();
    }

    if (searchTxt.length >= 1) {
      this.spinner.show();
      this.cmservice
        .findData({ Invoice_No: searchTxt }, "find-sales-invoice")
        .subscribe((result) => {
          this.returnedArray = result;
          this.dataLength = result.length;
          this.spinner.hide();
        });
    }
  }

  viewInvoice(content, firmId) {
    this.cmservice.fetchDetails(firmId, "firm-details").subscribe((details) => {
      // this.firmDesign = details.ReceiptDesign;

      let result;
      if (details.ReceiptDesign == 1) {
        result = this.cmservice.openPrintModal(
          "",
          content,
          SalesInvoicePrintComponent
        );
      }

      if (details.ReceiptDesign == 2) {
        result = this.cmservice.openPrintModal(
          "",
          content,
          ArIndusriesReceiptPrintComponent
        );
      }

      if (details.ReceiptDesign == 3) {
        result = this.cmservice.openPrintModal(
          "",
          content,
          InvoiceDesign3Component
        );
      }

      result.content.onClose.subscribe((result: boolean) => {
        if (result == true) {
          this.spinner.show();
        }
      });
    });

    /* const result = this.cmservice.openPrintModal(
      "",
      content,
      SalesInvoicePrintComponent
    );
    result.content.onClose.subscribe((result: boolean) => {
      if (result == true) {
        this.spinner.show();
      }
    });

    console.log("content", content); */
    // console.log("ReceiptDesign", ReceiptDesign);

    /* let result;
    if (ReceiptDesign == 1) {
      result = this.cmservice.openPrintModal(
        "",
        content,
        SalesInvoicePrintComponent
      );
    }

    if (ReceiptDesign == 2) {
      result = this.cmservice.openPrintModal(
        "",
        content,
        ArIndusriesReceiptPrintComponent
      );
    }

    result.content.onClose.subscribe((result: boolean) => {
      if (result == true) {
        this.spinner.show();
      }
    }); */
  }
}
