import { Component, OnInit } from "@angular/core";
import { PageChangedEvent } from "ngx-bootstrap/pagination";
import { CommonService } from "../../../_services/common.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-common-master-child",
  templateUrl: "./common-master-child.component.html",
})
export class CommonMasterChildComponent implements OnInit {
  returnedArray: any[];
  dataLength: number;
  itemsPerPage: number = 10;

  /* countApiString: string;
  fetchApiString: string;
  deleteApiString: string;
  searchApiString: string;
  title: string;
  addLink: string;
  columnsData = [];
  columnsShow = []; */

  constructor(
    private cmservice: CommonService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.getItemCount();
    this.fetchCommonMasterChild();

    /* this.countApiString = "cmc-item-count";
    this.fetchApiString = "fetch-commonmaster-child";
    this.deleteApiString = "commonmasterchild";
    this.searchApiString = "";
    this.title = "Common Master Child";
    this.addLink = "/masters/add-common-master-child";
    this.columnsShow = ["Action", "CM_Name", "CMC_Name"];
    this.columnsData = ["CM_id"]; */
  }

  pageChanged(event: PageChangedEvent): void {
    this.fetchCommonMasterChild(event.page - 1, this.itemsPerPage);
  }

  setItemPerPage(event) {
    this.itemsPerPage = event.target.value;
    this.fetchCommonMasterChild(event.page - 1, this.itemsPerPage);
  }

  fetchCommonMasterChild(pageIndex = 0, pageSize = this.itemsPerPage) {
    this.spinner.show();
    this.cmservice
      .fetchData(pageIndex, pageSize, "fetch-commonmaster-child")
      .subscribe((commonMasterCHildList) => {
        this.returnedArray = commonMasterCHildList.slice(0, this.itemsPerPage);
        this.spinner.hide();
      });
  }

  getItemCount() {
    this.cmservice.getItemCount("cmc-item-count").subscribe((data) => {
      this.dataLength = data.count;
    });
  }

  deleteCommonMasterChild(CMC_Id) {
    this.cmservice.deleteData(CMC_Id, "commonmasterchild").subscribe((data) => {
      if (data != null) {
        this.toastr.success("Record deleted successfuly", "Success");
        this.fetchCommonMasterChild();
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
        this.deleteCommonMasterChild(_id);
      }
    });
  }
}
