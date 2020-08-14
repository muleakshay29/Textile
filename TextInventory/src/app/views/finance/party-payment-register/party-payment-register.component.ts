import { Component, OnInit } from "@angular/core";
import { PageChangedEvent } from "ngx-bootstrap/pagination";
import { CommonService } from "../../../_services/common.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-party-payment-register",
  templateUrl: "./party-payment-register.component.html",
  styleUrls: ["./party-payment-register.component.css"],
})
export class PartyPaymentRegisterComponent implements OnInit {
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
    this.fetchPurchasePayment();
  }

  getItemCount() {
    this.spinner.show();
    this.cmservice.getItemCount("purchase-payment-count").subscribe((count) => {
      this.dataLength = count.count;
      this.spinner.hide();
    });
  }

  fetchPurchasePayment(pageIndex = 0, pageSize = this.itemsPerPage) {
    this.spinner.show();
    this.cmservice
      .fetchData(pageIndex, pageSize, "fetch-purchase-payment-aggrigate")
      .subscribe((list) => {
        this.calculateSumData(list);
      });
  }

  calculateSumData(list) {
    list.forEach((element) => {
      this.cmservice
        .fetchDetails(element._id, "purchase-payment-details")
        .subscribe((details) => {
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
    this.fetchPurchasePayment(event.page - 1, this.itemsPerPage);
  }

  setItemPerPage(event) {
    this.itemsPerPage = event.target.value;
    this.fetchPurchasePayment(event.page - 1, this.itemsPerPage);
  }

  searchRecord(event) {
    const searchTxt = event.target.value;

    if (searchTxt == "" || searchTxt.length == 0) {
      this.fetchPurchasePayment();
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
