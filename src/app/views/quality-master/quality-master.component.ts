import { Component, OnInit } from "@angular/core";
import { PageChangedEvent } from "ngx-bootstrap/pagination";
import { MasterService } from "../../_services/master.service";
import { CommonService } from "../../_services/common.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-quality-master",
  templateUrl: "./quality-master.component.html",
  styleUrls: ["./quality-master.component.css"],
})
export class QualityMasterComponent implements OnInit {
  returnedArray: any[];
  dataLength: number;
  itemsPerPage: number = 10;

  constructor(
    private master: MasterService,
    private cmservice: CommonService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getItemCount();
    this.fetchQuality();
  }

  getItemCount() {
    this.spinner.show();
    this.master.getItemCount("quality-count").subscribe((count) => {
      this.dataLength = count.count;
      this.spinner.hide();
    });
  }

  fetchQuality(pageIndex = 0, pageSize = this.itemsPerPage) {
    this.spinner.show();
    this.master
      .fetchData(pageIndex, pageSize, "fetch-quality")
      .subscribe((list) => {
        this.returnedArray = list.slice(0, this.itemsPerPage);
        this.spinner.hide();
      });
  }

  pageChanged(event: PageChangedEvent): void {
    this.fetchQuality(event.page - 1, this.itemsPerPage);
  }

  setItemPerPage(event) {
    this.itemsPerPage = event.target.value;
    this.fetchQuality(event.page - 1, this.itemsPerPage);
  }

  searchRecord(event) {
    const searchTxt = event.target.value;

    if (searchTxt == "" || searchTxt.length == 0) {
      this.fetchQuality();
      this.getItemCount();
      this.spinner.hide();
    }

    if (searchTxt.length >= 3) {
      this.spinner.show();
      this.master
        .findData({ Design_Name: searchTxt }, "find-quality")
        .subscribe((result) => {
          this.returnedArray = result;
          this.dataLength = result.length;
          this.spinner.hide();
        });
    }
  }

  deleteQuality(_id) {
    this.master.deleteData(_id, "delete-quality").subscribe((result) => {
      if (result != null) {
        this.toastr.success("Record deleted successfuly", "Success");
        this.fetchQuality();
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
        this.deleteQuality(_id);
      }
    });
  }
}
