import { Component, OnInit } from "@angular/core";
import { PageChangedEvent } from "ngx-bootstrap/pagination";
import { CommonService } from "../../../_services/common.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { Validators, FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { reduce } from "rxjs/operators";

@Component({
  selector: "app-sales-receipt",
  templateUrl: "./sales-receipt.component.html",
  styleUrls: ["./sales-receipt.component.css"],
})
export class SalesReceiptComponent implements OnInit {
  salesReceipt: FormGroup;
  shedList = [];
  firmList = [];
  selectedShed: string = "";
  selectedFirm: string = "";
  buttonText = "View";
  returnedArray = [];
  dataLength: number;
  itemsPerPage: number = 10;

  constructor(
    private fb: FormBuilder,
    private commonservice: CommonService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.createForm();
    // this.fetchShed();
    // this.fetchFirm();
    this.getItemCount();
    this.fetchAccountTransactions();
  }

  createForm() {
    this.salesReceipt = this.fb.group({
      Shed_Name: ["", Validators.required],
      Firm_Name: ["", Validators.required],
    });
  }

  get Shed_Name() {
    return this.salesReceipt.get("Shed_Name");
  }

  get Firm_Name() {
    return this.salesReceipt.get("Firm_Name");
  }

  getItemCount() {
    this.spinner.show();
    this.commonservice
      .getItemCount("sales-account-transaction-details-count")
      .subscribe((count) => {
        this.dataLength = count.count;
        this.spinner.hide();
      });
  }

  fetchAccountTransactions(pageIndex = 0, pageSize = this.itemsPerPage) {
    this.spinner.show();
    this.commonservice
      .fetchData(
        pageIndex,
        pageSize,
        "fetch-sales-account-transaction-details-without-filter"
      )
      .subscribe((data) => {
        if (data.length > 0) {
          /* data.forEach((element) => {
            this.commonservice
              .fetchDetails(element._id, "sales-receipt-details")
              .subscribe((details) => {
                let balance = 0;

                if (details.length > 0) {
                  const sum = details.reduce((next, prev) => {
                    return next + Number(prev.Paying_Amount);
                  }, 0);

                  const totalAmount = details[details.length - 1].Amount;
                  balance = totalAmount - sum;

                  if (balance > 0) {
                    const data = {
                      _id: element._id,
                      Invoice_No: element.Invoice_No,
                      Party_Code: element.Party._id,
                      Party_Name: element.Party.Company_Name,
                      Balance: balance,
                    };

                    this.returnedArray.push(data);
                  }
                } else {
                  if (element.AmtOut - element.AmtIn > 0) {
                    balance = element.AmtOut - element.AmtIn;

                    const data = {
                      _id: element._id,
                      Invoice_No: element.Invoice_No,
                      Party_Code: element.Party._id,
                      Party_Name: element.Party.Company_Name,
                      Balance: balance,
                    };
                    this.returnedArray.push(data);
                  }
                }
              });
          }); */

          this.returnedArray = this.processResult(data);

          if (this.returnedArray && this.returnedArray.length > 0) {
            this.returnedArray = data.slice(0, this.itemsPerPage);
            this.spinner.hide();
          }
        } else {
          this.returnedArray = null;
          this.toastr.success("No data found.", "Information");
        }

        this.spinner.hide();
      });
  }

  processResult(data) {
    let tempResultArr = [];
    data.forEach((element) => {
      this.commonservice
        .fetchDetails(element._id, "sales-receipt-details")
        .subscribe((details) => {
          let balance = 0;

          if (details.length > 0) {
            const sum = details.reduce((next, prev) => {
              return next + Number(prev.Paying_Amount);
            }, 0);

            const totalAmount = details[details.length - 1].Amount;
            balance = totalAmount - sum;

            if (balance > 0) {
              const data = {
                _id: element._id,
                Invoice_No: element.Invoice_No,
                Party_Code: element.Party._id,
                Party_Name: element.Party.Company_Name,
                Balance: balance,
              };

              tempResultArr.push(data);
            }
          } else {
            if (element.AmtOut - element.AmtIn > 0) {
              balance = element.AmtOut - element.AmtIn;

              const data = {
                _id: element._id,
                Invoice_No: element.Invoice_No,
                Party_Code: element.Party._id,
                Party_Name: element.Party.Company_Name,
                Balance: balance,
              };
              tempResultArr.push(data);
            }
          }
        });
    });

    return tempResultArr;
  }

  pageChanged(event: PageChangedEvent): void {
    this.fetchAccountTransactions(event.page - 1, this.itemsPerPage);
  }

  setItemPerPage(event) {
    this.itemsPerPage = event.target.value;
    this.fetchAccountTransactions(event.page - 1, this.itemsPerPage);
  }

  searchRecord(event) {
    const searchTxt = event.target.value;

    if (searchTxt == "" || searchTxt.length == 0) {
      this.fetchAccountTransactions();
      this.getItemCount();
      this.spinner.hide();
    }

    if (searchTxt.length >= 1) {
      this.spinner.show();
      this.commonservice
        .findData(
          { Invoice_No: searchTxt },
          "find-sales-account-transaction-details"
        )
        .subscribe((result) => {
          // this.returnedArray = result;
          this.returnedArray = this.processResult(result);
          this.dataLength = result.length;
          this.spinner.hide();
        });
    }
  }

  onSubmit() {
    this.spinner.show();
    this.selectedShed = this.Shed_Name.value;
    this.selectedFirm = this.Firm_Name.value;

    this.commonservice
      .findData(
        { Firm: this.Firm_Name.value, Shed: this.Shed_Name.value },
        "fetch-sales-account-transaction-details"
      )
      .subscribe((data) => {
        if (data.length > 0) {
          // this.returnedArray = this.filterData(data);
          this.returnedArray = [];

          // data.slice(0, 10).forEach((element) => {
          data.forEach((element) => {
            // console.log("element", element);
            this.commonservice
              .fetchDetails(element._id, "sales-receipt-details")
              .subscribe((details) => {
                let balance = 0;

                if (details.length > 0) {
                  const sum = details.reduce((next, prev) => {
                    return next + Number(prev.Paying_Amount);
                  }, 0);

                  // balance = details[details.length - 1].Remaining_Amount;
                  const totalAmount = details[details.length - 1].Amount;
                  balance = totalAmount - sum;

                  if (balance > 0) {
                    const data = {
                      _id: element._id,
                      Invoice_No: element.Invoice_No,
                      Party_Code: element.Party._id,
                      Party_Name: element.Party.Company_Name,
                      Balance: balance,
                    };

                    this.returnedArray.push(data);
                  }
                } else {
                  if (element.AmtOut - element.AmtIn > 0) {
                    balance = element.AmtOut - element.AmtIn;

                    const data = {
                      _id: element._id,
                      Invoice_No: element.Invoice_No,
                      Party_Code: element.Party._id,
                      Party_Name: element.Party.Company_Name,
                      Balance: balance,
                    };
                    this.returnedArray.push(data);
                  }
                }
              });
          });

          if (this.returnedArray && this.returnedArray.length > 0) {
            this.spinner.hide();
          }
        } else {
          this.returnedArray = null;
          this.toastr.success("No data found.", "Information");
        }
        this.spinner.hide();
      });
  }

  filterData(app) {
    const keys = Object.keys(app[0]);
    let result: any;

    if (app.length > 1) {
      result = app.reduce((output, element) => {
        return keys.reduce((obj, key) => {
          if (key == "AmtIn" || key == "AmtOut") {
            obj[key] =
              (obj[key] || 0) + Number(output[key]) + Number(element[key]);
          } else if (key == "Party") {
            obj["Party_Code"] = element[key]["_id"];
            obj["Party_Name"] = element[key]["Company_Name"];
          }
          return obj;
        }, {});
      });
    } else {
      result = {
        AmtIn: app[0].AmtIn,
        AmtOut: app[0].AmtOut,
        Party_Code: app[0].Party._id,
        Party_Name: app[0].Party.Company_Name,
      };
    }

    return result;
  }

  fetchShed() {
    this.spinner.show();
    this.commonservice.fetchData(0, 0, "fetch-loom").subscribe((list) => {
      this.shedList = list;
      this.spinner.hide();
    });
  }

  fetchFirm() {
    this.spinner.show();
    this.commonservice.fetchData(0, 0, "fetch-firm").subscribe((list) => {
      this.firmList = list;
      this.spinner.hide();
    });
  }
}
