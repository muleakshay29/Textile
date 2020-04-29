import { Component, OnInit } from "@angular/core";
import { PageChangedEvent } from "ngx-bootstrap/pagination";
import { MasterService } from "../../_services/master.service";
import { CommonService } from "../../_services/common.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-loom-master",
  templateUrl: "./loom-master.component.html",
  styleUrls: ["./loom-master.component.css"],
})
export class LoomMasterComponent implements OnInit {
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
    this.fetchLooms();
  }

  getItemCount() {
    this.spinner.show();
    this.master.getItemCount("loom-count").subscribe((count) => {
      this.dataLength = count.count;
      this.spinner.hide();
    });
  }

  fetchLooms(pageIndex = 0, pageSize = this.itemsPerPage) {
    this.spinner.show();
    this.master
      .fetchData(pageIndex, pageSize, "fetch-loom")
      .subscribe((list) => {
        this.returnedArray = list.slice(0, this.itemsPerPage);
        this.spinner.hide();
      });
  }

  pageChanged(event: PageChangedEvent): void {
    this.fetchLooms(event.page - 1, this.itemsPerPage);
  }

  setItemPerPage(event) {
    this.itemsPerPage = event.target.value;
    this.fetchLooms(event.page - 1, this.itemsPerPage);
  }

  searchRecord(event) {
    const searchTxt = event.target.value;

    if (searchTxt == "" || searchTxt.length == 0) {
      this.fetchLooms();
      this.getItemCount();
      this.spinner.hide();
    }

    if (searchTxt.length >= 3) {
      this.spinner.show();
      this.master
        .findData({ SHED_Name: searchTxt }, "find-loom")
        .subscribe((result) => {
          this.returnedArray = result;
          this.dataLength = result.length;
          this.spinner.hide();
        });
    }
  }

  deleteLoom(_id) {
    this.master.deleteData(_id, "delete-loom").subscribe((result) => {
      if (result != null) {
        this.toastr.success("Record deleted successfuly", "Success");
        this.fetchLooms();
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
        this.deleteLoom(_id);
      }
    });
  }
}
