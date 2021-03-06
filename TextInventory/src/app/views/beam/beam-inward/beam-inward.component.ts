import { Component, OnInit } from "@angular/core";
import { PageChangedEvent } from "ngx-bootstrap/pagination";
import { CommonService } from "../../../_services/common.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-beam-inward",
  templateUrl: "./beam-inward.component.html",
  styleUrls: ["./beam-inward.component.css"],
})
export class BeamInwardComponent implements OnInit {
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
    this.fetchBeamInward();
  }

  getItemCount() {
    this.spinner.show();
    this.cmservice.getItemCount("beam-inward-count").subscribe((count) => {
      this.dataLength = count.count;
      this.spinner.hide();
    });
  }

  fetchBeamInward(pageIndex = 0, pageSize = this.itemsPerPage) {
    this.spinner.show();
    this.cmservice
      .fetchData(pageIndex, pageSize, "fetch-beam-inward")
      .subscribe((list) => {
        this.returnedArray = list.slice(0, this.itemsPerPage);
        this.spinner.hide();
      });
  }

  pageChanged(event: PageChangedEvent): void {
    this.fetchBeamInward(event.page - 1, this.itemsPerPage);
  }

  setItemPerPage(event) {
    this.itemsPerPage = event.target.value;
    this.fetchBeamInward(event.page - 1, this.itemsPerPage);
  }

  deleteBeamInward(_id) {
    this.cmservice.deleteData(_id, "delete-beam-inward").subscribe((result) => {
      if (result != null) {
        this.toastr.success("Record deleted successfuly", "Success");
        this.fetchBeamInward();
        this.spinner.hide();
      } else {
        this.toastr.error("Error deleting record", "Error");
        this.spinner.hide();
      }
    });
  }

  deleteBeamInwardChild(_id) {
    this.cmservice.deleteData(_id, "delete-beam-inward-child").subscribe();
  }

  deleteBeamInwardDetails(_id) {
    this.cmservice.deleteData(_id, "delete-beam-inward-details").subscribe();
  }

  openModal(Name: string, _id: string) {
    const result = this.cmservice.openModalWithComponent(Name, _id);
    result.content.onClose.subscribe((result: boolean) => {
      if (result == true) {
        this.spinner.show();
        this.deleteBeamInward(_id);
        this.deleteBeamInwardChild(_id);
        this.deleteBeamInwardDetails(Name);
      }
    });
  }
}
