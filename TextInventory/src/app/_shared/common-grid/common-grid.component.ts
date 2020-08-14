import { Component, OnInit, Input } from "@angular/core";
import { PageChangedEvent } from "ngx-bootstrap/pagination";
import { CommonService } from "../../_services/common.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "common-grid",
  templateUrl: "./common-grid.component.html",
  styleUrls: ["./common-grid.component.css"],
})
export class CommonGridComponent implements OnInit {
  returnedArray: any[];
  dataLength: number;
  itemsPerPage: number = 10;

  @Input() countApiString: string;
  @Input() fetchApiString: string;
  @Input() deleteApiString: string;
  @Input() searchApiString: string;
  @Input() title: string;
  @Input() addLink: string;
  @Input() columnsData: any;
  @Input() columnsShow: any;

  constructor(
    private cmservice: CommonService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getItemCount();
    this.fetchRecords();
  }

  getItemCount() {
    this.spinner.show();
    this.cmservice.getItemCount(this.countApiString).subscribe((count) => {
      this.dataLength = count.count;
      this.spinner.hide();
    });
  }

  fetchRecords(pageIndex = 0, pageSize = this.itemsPerPage) {
    this.spinner.show();
    this.cmservice
      .fetchData(pageIndex, pageSize, this.fetchApiString)
      .subscribe((list) => {
        this.returnedArray = list.slice(0, this.itemsPerPage);
        this.spinner.hide();

        list.forEach((element) => {
          for (const col of this.columnsData) {
            if (typeof element[col] == "object") {
              const colLength = this.columnsShow.length;
              const lastRecord = this.columnsShow[colLength - 1];
              element[lastRecord] = element[col][lastRecord];

              // delete element[col];
              // const index = this.columnsShow.indexOf(col);
              // if (index > -1) {
              //   this.columnsShow.splice(index, 1);
              // }
            }
          }
        });

        console.log(this.columnsShow);
        console.log(list);
      });
  }

  pageChanged(event: PageChangedEvent): void {
    this.fetchRecords(event.page - 1, this.itemsPerPage);
  }

  setItemPerPage(event) {
    this.itemsPerPage = event.target.value;
    this.fetchRecords(event.page - 1, this.itemsPerPage);
  }

  searchRecord(event) {
    const searchTxt = event.target.value;

    if (searchTxt == "" || searchTxt.length == 0) {
      this.fetchRecords();
      this.getItemCount();
      this.spinner.hide();
    }

    if (searchTxt.length >= 3) {
      this.spinner.show();
      this.cmservice
        .findData({ SHED_Name: searchTxt }, this.searchApiString)
        .subscribe((result) => {
          this.returnedArray = result;
          this.dataLength = result.length;
          this.spinner.hide();
        });
    }
  }

  deleteRecord(_id) {
    this.cmservice.deleteData(_id, this.deleteApiString).subscribe((result) => {
      if (result != null) {
        // this.deleteRecordDetails(_id);
        this.toastr.success("Record deleted successfuly", "Success");
        this.fetchRecords();
        this.spinner.hide();
      } else {
        this.toastr.error("Error deleting record", "Error");
        this.spinner.hide();
      }
    });
  }

  /* deleteRecordDetails(_id) {
    this.cmservice.deleteData(_id, "delete-loom-details").subscribe();
  } */

  openModal(Name: string, _id: string) {
    const result = this.cmservice.openModalWithComponent(Name, _id);
    result.content.onClose.subscribe((result: boolean) => {
      if (result == true) {
        this.spinner.show();
        this.deleteRecord(_id);
      }
    });
  }
}
