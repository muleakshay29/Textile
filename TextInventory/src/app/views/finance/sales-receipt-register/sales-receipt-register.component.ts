import { Component, OnInit } from "@angular/core";
import { PageChangedEvent } from "ngx-bootstrap/pagination";
import { CommonService } from "../../../_services/common.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-sales-receipt-register",
  templateUrl: "./sales-receipt-register.component.html",
  styleUrls: ["./sales-receipt-register.component.css"],
})
export class SalesReceiptRegisterComponent implements OnInit {
  returnedArray = [];
  dataLength: number;
  itemsPerPage: number = 10;

  constructor(
    private cmservice: CommonService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getItemCount();
    this.fetchSalesReceipt();
  }

  getItemCount() {
    this.spinner.show();
    this.cmservice.getItemCount("sales-receipt-count").subscribe((count) => {
      this.dataLength = count.count;
      this.spinner.hide();
    });
  }

  fetchSalesReceipt(pageIndex = 0, pageSize = this.itemsPerPage) {
    this.spinner.show();
    this.cmservice
      .fetchData(pageIndex, pageSize, "fetch-sales-receipt")
      .subscribe((list) => {
        /* this.returnedArray = list.slice(0, this.itemsPerPage);
        this.spinner.hide(); */
        this.calculateSumData(list);
      });
  }

  calculateSumData(list) {
    list.forEach((element) => {
      this.cmservice
        .fetchDetails(element.TransactionID, "sales-receipt-details")
        .subscribe((details) => {
          console.log(details);
          let paidAmt = 0;
          const amtToRcv = details[0].Amount;

          details.forEach((element) => {
            paidAmt += element.Paying_Amount;
          });

          const remAmt = amtToRcv - paidAmt;

          const data = {
            Cheque_No: details[0].Cheque_No,
            Cheque_Date: details[0].Cheque_Date,
            Shed: details[0].Shed,
            _id: details[0]._id,
            Receipt_No: details[0].Receipt_No,
            Date: details[0].Date,
            Firm_Name: details[0].Firm_Name,
            Party_Name: details[0].Party_Name,
            Amount: details[0].Amount,
            Paying_Amount: paidAmt,
            Remaining_Amount: remAmt,
            Paid_By: details[0].Paid_By,
            Amount_in_Account: details[0].Amount_in_Account,
            TransactionID: details[0].TransactionID,
          };

          this.returnedArray.push(data);
        });
    });

    this.spinner.hide();
  }

  pageChanged(event: PageChangedEvent): void {
    this.fetchSalesReceipt(event.page - 1, this.itemsPerPage);
  }

  setItemPerPage(event) {
    this.itemsPerPage = event.target.value;
    this.fetchSalesReceipt(event.page - 1, this.itemsPerPage);
  }

  searchRecord(event) {
    const searchTxt = event.target.value;

    if (searchTxt == "" || searchTxt.length == 0) {
      this.fetchSalesReceipt();
      this.getItemCount();
      this.spinner.hide();
    }

    if (searchTxt.length >= 3) {
      this.spinner.show();
      this.cmservice
        .findData({ Bank_Name: searchTxt }, "find-account")
        .subscribe((result) => {
          this.returnedArray = result;
          this.dataLength = result.length;
          this.spinner.hide();
        });
    }
  }
}
