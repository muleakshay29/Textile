import { Component, OnInit } from "@angular/core";
import { PageChangedEvent } from "ngx-bootstrap/pagination";
import { CommonService } from "../../../_services/common.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-purchase-invoice",
  templateUrl: "./purchase-invoice.component.html",
  styleUrls: ["./purchase-invoice.component.css"],
})
export class PurchaseInvoiceComponent implements OnInit {
  returnedArray: any[];
  dataLength: number;
  itemsPerPage: number = 10;

  constructor(
    private cmservice: CommonService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getItemCount();
    this.fetchPurchaseInvoice();
  }

  getItemCount() {
    this.spinner.show();
    this.cmservice.getItemCount("purchase-invoice-count").subscribe((count) => {
      this.dataLength = count.count;
      this.spinner.hide();
    });
  }

  fetchPurchaseInvoice(pageIndex = 0, pageSize = this.itemsPerPage) {
    this.spinner.show();
    this.cmservice
      .fetchData(pageIndex, pageSize, "fetch-purchase-invoice")
      .subscribe((list) => {
        console.log(list);
        this.returnedArray = list.slice(0, this.itemsPerPage);
        this.spinner.hide();
      });
  }

  pageChanged(event: PageChangedEvent): void {
    this.fetchPurchaseInvoice(event.page - 1, this.itemsPerPage);
  }

  setItemPerPage(event) {
    this.itemsPerPage = event.target.value;
    this.fetchPurchaseInvoice(event.page - 1, this.itemsPerPage);
  }

  searchRecord(event) {
    const searchTxt = event.target.value;

    if (searchTxt == "" || searchTxt.length == 0) {
      this.fetchPurchaseInvoice();
      this.getItemCount();
      this.spinner.hide();
    }

    if (searchTxt.length >= 3) {
      this.spinner.show();
      this.cmservice
        .findData({ Firm_Name: searchTxt }, "find-purchase-invoice")
        .subscribe((result) => {
          this.returnedArray = result;
          this.dataLength = result.length;
          this.spinner.hide();
        });
    }
  }

  deletePurchaseInvoice(_id) {
    this.cmservice
      .deleteData(_id, "delete-purchase-invoice")
      .subscribe((result) => {
        if (result != null) {
          this.toastr.success("Record deleted successfuly", "Success");
          this.fetchPurchaseInvoice();
          this.spinner.hide();
        } else {
          this.toastr.error("Error deleting record", "Error");
          this.spinner.hide();
        }
      });
  }

  deletePurchaseInvoiceDetails(_id) {
    this.cmservice
      .deleteData(_id, "delete-purchase-invoice-details")
      .subscribe((result) => {
        if (result != null) {
          this.toastr.success("Record deleted successfuly", "Success");
          this.fetchPurchaseInvoice();
          this.spinner.hide();
        } else {
          this.toastr.error("Error deleting record", "Error");
          this.spinner.hide();
        }
      });
  }

  openModal(Name: string, _id: string) {
    const result = this.cmservice.openModalWithComponent(Name, _id);
    result.content.onClose.subscribe((result: boolean) => {
      if (result == true) {
        this.spinner.show();
        this.deletePurchaseInvoice(_id);
        this.deletePurchaseInvoiceDetails(_id);
      }
    });
  }
}
