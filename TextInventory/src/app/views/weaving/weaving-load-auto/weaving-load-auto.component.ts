import { Component, OnInit } from "@angular/core";
import { PageChangedEvent } from "ngx-bootstrap/pagination";
import { CommonService } from "../../../_services/common.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-weaving-load-auto",
  templateUrl: "./weaving-load-auto.component.html",
  styleUrls: ["./weaving-load-auto.component.css"],
})
export class WeavingLoadAutoComponent implements OnInit {
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
    this.fetchWeavingAuto();
  }

  getItemCount() {
    this.spinner.show();
    this.cmservice.getItemCount("weaving-auto-count").subscribe((count) => {
      this.dataLength = count.count;
      this.spinner.hide();
    });
  }

  fetchWeavingAuto(pageIndex = 0, pageSize = this.itemsPerPage) {
    this.spinner.show();
    this.cmservice
      .fetchData(pageIndex, pageSize, "fetch-weaving-auto")
      .subscribe((list) => {
        this.returnedArray = list.slice(0, this.itemsPerPage);
        this.spinner.hide();
      });
  }

  pageChanged(event: PageChangedEvent): void {
    this.fetchWeavingAuto(event.page - 1, this.itemsPerPage);
  }

  setItemPerPage(event) {
    this.itemsPerPage = event.target.value;
    this.fetchWeavingAuto(event.page - 1, this.itemsPerPage);
  }

  searchRecord(event) {
    const searchTxt = event.target.value;

    if (searchTxt == "" || searchTxt.length == 0) {
      this.fetchWeavingAuto();
      this.getItemCount();
      this.spinner.hide();
    }

    if (searchTxt.length >= 3) {
      this.spinner.show();
      this.cmservice
        .findData({ Shed: searchTxt }, "find-weaving-auto")
        .subscribe((result) => {
          this.returnedArray = result;
          this.dataLength = result.length;
          this.spinner.hide();
        });
    }
  }

  deleteWeavingAuto(_id) {
    this.cmservice
      .deleteData(_id, "delete-weaving-auto")
      .subscribe((result) => {
        if (result != null) {
          this.toastr.success("Record deleted successfuly", "Success");
          this.fetchWeavingAuto();
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
        this.deleteWeavingAuto(_id);
      }
    });
  }

  unloadBeam(_id) {
    this.spinner.show();
    this.cmservice
      .updateData(_id, { Unload_Beam: true }, "unload-weaving-beam")
      .subscribe((result) => {
        if (result != null) {
          console.log("Result is " +result);
          this.toastr.success("Record updated successfuly", "Success");
          this.fetchWeavingAuto();
          this.spinner.hide();
        } else {
          this.toastr.error(
            "Error updating record. Please try again.",
            "Error"
          );
          this.spinner.hide();
        }
      });
  }
}
