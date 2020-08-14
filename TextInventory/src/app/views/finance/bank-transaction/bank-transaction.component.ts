import { Component, OnInit } from "@angular/core";
import { PageChangedEvent } from "ngx-bootstrap/pagination";
import { CommonService } from "../../../_services/common.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-bank-transaction",
  templateUrl: "./bank-transaction.component.html",
  styleUrls: ["./bank-transaction.component.css"],
})
export class BankTransactionComponent implements OnInit {
  returnedArray: any[];
  dataLength: number;
  itemsPerPage: number = 10;
  accountList = [];
  selectedAccount = "";

  constructor(
    private cmservice: CommonService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.fetchAccount();
  }

  getItemCount(account) {
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
  }

  fetchAccount() {
    this.spinner.show();
    this.cmservice.fetchData(0, 0, "fetch-account").subscribe((list) => {
      this.accountList = list;
      this.spinner.hide();
    });
  }
}
