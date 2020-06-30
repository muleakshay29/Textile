import { Component, OnInit } from "@angular/core";
import { PageChangedEvent } from "ngx-bootstrap/pagination";
import { CommonService } from "../../../_services/common.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-yarn-inward-invoice",
  templateUrl: "./yarn-inward-invoice.component.html",
  styleUrls: ["./yarn-inward-invoice.component.css"],
})
export class YarnInwardInvoiceComponent implements OnInit {
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
    this.fetchYarnInwardInvoice();
  }

  getItemCount() {
    this.spinner.show();
    this.cmservice
      .getItemCount("yarn-inward-invoice-count")
      .subscribe((count) => {
        this.dataLength = count.count;
        this.spinner.hide();
      });
  }

  fetchYarnInwardInvoice(pageIndex = 0, pageSize = this.itemsPerPage) {
    this.spinner.show();
    this.cmservice
      .fetchData(pageIndex, pageSize, "fetch-yarn-inward-invoice")
      .subscribe((list) => {
        this.returnedArray = list.slice(0, this.itemsPerPage);
        this.spinner.hide();
      });
  }

  pageChanged(event: PageChangedEvent): void {
    this.fetchYarnInwardInvoice(event.page - 1, this.itemsPerPage);
  }

  setItemPerPage(event) {
    this.itemsPerPage = event.target.value;
    this.fetchYarnInwardInvoice(event.page - 1, this.itemsPerPage);
  }

  deleteYarnInwardInvoice(_id) {
    this.cmservice
      .deleteData(_id, "delete-yarn-inward-invoice")
      .subscribe((result) => {
        if (result != null) {
          this.toastr.success("Record deleted successfuly", "Success");
          this.fetchYarnInwardInvoice();
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
        this.deleteYarnInwardInvoice(_id);
      }
    });
  }
}
