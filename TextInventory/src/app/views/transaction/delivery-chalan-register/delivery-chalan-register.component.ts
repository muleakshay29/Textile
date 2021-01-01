import { Component, OnInit } from "@angular/core";
import { PageChangedEvent } from "ngx-bootstrap/pagination";
import { CommonService } from "../../../_services/common.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { DeliveryChalanPrintComponent } from "../../../_helper/delivery-chalan-print/delivery-chalan-print.component";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { SalesInvoicePrintComponent } from "../../../_helper/sales-invoice-print/sales-invoice-print.component";

@Component({
  selector: "app-delivery-chalan-register",
  templateUrl: "./delivery-chalan-register.component.html",
  styleUrls: ["./delivery-chalan-register.component.css"],
})
export class DeliveryChalanRegisterComponent implements OnInit {
  returnedArray = [];
  dataLength: number;
  itemsPerPage: number = 10;
  PDFData: any = [];
  bsModalRef: BsModalRef;

  constructor(
    private cmservice: CommonService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getItemCount();
    this.fetchDeliveryChalan();
  }

  getItemCount() {
    this.spinner.show();
    this.cmservice.getItemCount("delivery-chalan-count").subscribe((count) => {
      this.dataLength = count.count;
      this.spinner.hide();
    });
  }

  generatePdf(_id, content) {
    const result = this.cmservice.openPrintModal(
      content,
      _id,
      DeliveryChalanPrintComponent
    );
    result.content.onClose.subscribe((result: boolean) => {
      if (result == true) {
        this.spinner.show();
      }
    });
  }

  viewInvoice(id, content) {
    const result = this.cmservice.openPrintModal(
      content,
      id,
      DeliveryChalanPrintComponent
    );
    result.content.onClose.subscribe((result: boolean) => {
      if (result == true) {
        this.spinner.show();
      }
    });
  }

  fetchDeliveryChalan(pageIndex = 0, pageSize = this.itemsPerPage) {
    this.spinner.show();
    this.cmservice
      .fetchData(pageIndex, pageSize, "fetch-delivery-chalan-sales-invoice")
      .subscribe((list) => {
        this.returnedArray = list.slice(0, this.itemsPerPage);
        this.spinner.hide();
      });
  }

  fetchDeliveryChalanChildDetails(id, content) {
    this.cmservice
      .fetchDetails(id, "delivery-chalan-child-details")
      .subscribe((details) => {
        // this.PDFData = this.getDocumentDefinition(content, details);
        // console.log(this.PDFData);
        return details;
      });
  }

  pageChanged(event: PageChangedEvent): void {
    this.fetchDeliveryChalan(event.page - 1, this.itemsPerPage);
  }

  setItemPerPage(event) {
    this.itemsPerPage = event.target.value;
    this.fetchDeliveryChalan(event.page - 1, this.itemsPerPage);
  }

  searchRecord(event) {
    const searchTxt = event.target.value;

    if (searchTxt == "" || searchTxt.length == 0) {
      this.fetchDeliveryChalan();
      this.getItemCount();
      this.spinner.hide();
    }

    if (searchTxt.length >= 3) {
      this.spinner.show();
      this.cmservice
        .findData({ Firm_Name: searchTxt }, "find-delivery-chalan")
        .subscribe((result) => {
          this.returnedArray = result;
          this.dataLength = result.length;
          this.spinner.hide();
        });
    }
  }
}
