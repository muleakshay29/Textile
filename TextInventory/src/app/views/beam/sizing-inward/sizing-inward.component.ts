import { Component, OnInit } from "@angular/core";
import { PageChangedEvent } from "ngx-bootstrap/pagination";
import { CommonService } from "../../../_services/common.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-sizing-inward",
  templateUrl: "./sizing-inward.component.html",
  styleUrls: ["./sizing-inward.component.css"],
})
export class SizingInwardComponent implements OnInit {
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
    this.fetchSizingInwardInvoice();
  }

  getItemCount() {
    this.spinner.show();
    this.cmservice.getItemCount("sizing-inward-count").subscribe((count) => {
      this.dataLength = count.count;
      this.spinner.hide();
    });
  }

  fetchSizingInwardInvoice(pageIndex = 0, pageSize = this.itemsPerPage) {
    this.spinner.show();
    this.cmservice
      .fetchData(pageIndex, pageSize, "fetch-sizing-inward")
      .subscribe((list) => {
        this.returnedArray = list.slice(0, this.itemsPerPage);
        this.spinner.hide();
      });
  }

  pageChanged(event: PageChangedEvent): void {
    this.fetchSizingInwardInvoice(event.page - 1, this.itemsPerPage);
  }

  setItemPerPage(event) {
    this.itemsPerPage = event.target.value;
    this.fetchSizingInwardInvoice(event.page - 1, this.itemsPerPage);
  }

  deleteSizingInward(_id) {
    this.cmservice
      .deleteData(_id, "delete-sizing-inward")
      .subscribe((result) => {
        if (result != null) {
          this.toastr.success("Record deleted successfuly", "Success");
          this.fetchSizingInwardInvoice();
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
        this.deleteSizingInward(_id);
      }
    });
  }
}
