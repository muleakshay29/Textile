import { Component, OnInit } from "@angular/core";
import { PageChangedEvent } from "ngx-bootstrap/pagination";
import { MasterService } from "../../_services/master.service";
import { CommonService } from "../../_services/common.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-common-master",
  templateUrl: "./common-master.component.html",
})
export class CommonMasterComponent implements OnInit {
  returnedArray: any[];
  dataLength: number;
  itemsPerPage: number = 10;

  constructor(
    private master: MasterService,
    private cmservice: CommonService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.fetchCommonMaster();
    this.getItemCount();
  }

  pageChanged(event: PageChangedEvent): void {
    this.fetchCommonMaster(event.page - 1, this.itemsPerPage);
  }

  setItemPerPage(event) {
    this.itemsPerPage = event.target.value;
    this.fetchCommonMaster(event.page - 1, this.itemsPerPage);
  }

  fetchCommonMaster(pageIndex = 0, pageSize = this.itemsPerPage) {
    this.spinner.show();
    this.master
      .fetchData(pageIndex, pageSize, "fetch-commonmaster")
      .subscribe((commonMasterList) => {
        this.returnedArray = commonMasterList.slice(0, this.itemsPerPage);
        this.spinner.hide();
      });
  }

  getItemCount() {
    this.master.getItemCount("cm-item-count").subscribe((data) => {
      this.dataLength = data.count;
    });
  }

  deleteCommonMaster(_id) {
    this.master.deleteData(_id, "commonmaster").subscribe((data) => {
      if (data != null) {
        this.fetchCommonMaster();
        this.toastr.success("Record deleted successfuly", "Success");
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
        this.deleteCommonMaster(_id);
      }
    });
  }
}
