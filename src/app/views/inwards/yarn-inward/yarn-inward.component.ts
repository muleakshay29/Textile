import { Component, OnInit } from "@angular/core";
import { PageChangedEvent } from "ngx-bootstrap/pagination";
import { InwardOutwardService } from "../../../_services/inward-outward.service";
import { CommonService } from "../../../_services/common.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-yarn-inward",
  templateUrl: "./yarn-inward.component.html",
  styleUrls: ["./yarn-inward.component.css"],
})
export class YarnInwardComponent implements OnInit {
  returnedArray: any[];
  dataLength: number;
  itemsPerPage: number = 10;

  constructor(
    private inoutservice: InwardOutwardService,
    private cmservice: CommonService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getItemCount();
    this.fetchYarnInward();
  }

  getItemCount() {
    this.spinner.show();
    this.inoutservice.getItemCount("yarn-inward-count").subscribe((count) => {
      this.dataLength = count.count;
      this.spinner.hide();
    });
  }

  fetchYarnInward(pageIndex = 0, pageSize = this.itemsPerPage) {
    this.spinner.show();
    this.inoutservice
      .fetchData(pageIndex, pageSize, "fetch-yarn-inwards")
      .subscribe((list) => {
        this.returnedArray = list.slice(0, this.itemsPerPage);
        this.spinner.hide();
      });
  }

  pageChanged(event: PageChangedEvent): void {
    this.fetchYarnInward(event.page - 1, this.itemsPerPage);
  }

  setItemPerPage(event) {
    this.itemsPerPage = event.target.value;
    this.fetchYarnInward(event.page - 1, this.itemsPerPage);
  }

  deleteYarnInward(_id) {
    this.inoutservice
      .deleteData(_id, "delete-yarn-inward")
      .subscribe((result) => {
        if (result != null) {
          this.toastr.success("Record deleted successfuly", "Success");
          this.fetchYarnInward();
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
        this.deleteYarnInward(_id);
      }
    });
  }
}
