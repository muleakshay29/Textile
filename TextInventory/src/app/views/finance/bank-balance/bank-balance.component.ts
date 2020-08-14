import { Component, OnInit } from "@angular/core";
import { PageChangedEvent } from "ngx-bootstrap/pagination";
import { CommonService } from "../../../_services/common.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-bank-balance",
  templateUrl: "./bank-balance.component.html",
  styleUrls: ["./bank-balance.component.css"],
})
export class BankBalanceComponent implements OnInit {
  returnedArray = [];
  dataLength: number;
  itemsPerPage: number = 10;

  constructor(
    private cmservice: CommonService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.fetchBanks();
  }

  /* getItemCount(account) {
    this.cmservice
      .findData({ Bank_Name: account }, "bank-transaction-count")
      .subscribe((count) => {
        this.dataLength = count.count;
      });
  }

  pageChanged(event: PageChangedEvent): void {
    this.searchRecord(this.selectedAccount, event.page - 1, this.itemsPerPage);
  }

  setItemPerPage(event) {
    this.itemsPerPage = event.target.value;
    this.searchRecord(this.selectedAccount, event.page - 1, this.itemsPerPage);
  }

  searchRecord(account = "", pageIndex = 0, pageSize = this.itemsPerPage) {
    this.spinner.show();
    this.selectedAccount = account;

    if (account == "") {
      this.returnedArray = [];
      this.spinner.hide();
    }

    this.cmservice
      .findData(
        { Bank_Name: account, pageIndex, pageSize },
        "find-bank-transaction"
      )
      .subscribe((result) => {
        if (result.length > 0) {
          this.getItemCount(account);
          this.returnedArray = result.slice(0, this.itemsPerPage);
        } else {
          this.returnedArray = [];
          this.dataLength = 0;
        }

        this.spinner.hide();
      });
  } */

  fetchBanks() {
    this.spinner.show();
    this.cmservice.fetchData(0, 0, "fetch-distinct-bank").subscribe((list) => {
      list.forEach((element) => {
        this.cmservice
          .fetchDetails(element, "fetch-bank-transaction-details")
          .subscribe((details) => {
            let amtIn = 0;
            let amtOut = 0;

            details.forEach((trans) => {
              amtIn += Number(trans.AmtIn);
              amtOut += Number(trans.AmtOut);
            });

            this.returnedArray.push({
              Bank_Name: details[0].ACC_Code.Bank_Name,
              Account_No: details[0].ACC_Code.Account_No,
              Balance: (Number(amtIn) - Number(amtOut)).toFixed(2),
            });

            this.spinner.hide();
          });
      });

      console.log(this.returnedArray);
    });
  }
}
