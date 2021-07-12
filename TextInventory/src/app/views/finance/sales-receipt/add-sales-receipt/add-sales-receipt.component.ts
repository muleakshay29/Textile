import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { CommonService } from "../../../../_services/common.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-add-sales-receipt",
  templateUrl: "./add-sales-receipt.component.html",
  styleUrls: ["./add-sales-receipt.component.css"],
})
export class AddSalesReceiptComponent implements OnInit {
  salesReceipt: FormGroup;
  salesReceiptID: string;
  buttonText: string;
  buttonHide = false;
  Year_Id: any;
  partyList = [];
  accountList = [];
  firmList = [];
  paidByList = [];
  defaultValue = 0;
  ispaidByCheque: boolean = false;
  selectedShed: string;
  selectedFirm: string;
  transactionDetails = [];
  RemainingAmount = 0;
  TdsSmount = 0;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private commonservice: CommonService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getYearId();
    // this.fetchParty();
    // this.fetchFirm();
    this.fetchPaidBy("5ead05782a1e063f14ea6c1a");
    this.fetchAccount();

    this.route.params.subscribe((params: Params) => {
      this.salesReceiptID = params["id"] ? params["id"] : "";
      // this.selectedShed = params["id"] ? params["id"] : "";
      // this.selectedFirm = params["id2"] ? params["id2"] : "";
      this.buttonText = "Create";
      this.initForm();

      // this.Shed.patchValue(this.selectedShed);
    });
  }

  createForm() {
    this.salesReceipt = this.fb.group({
      Receipt_No: [this.transactionDetails["Invoice_No"], Validators.required],
      Date: ["", Validators.required],
      Firm_Name: [""],
      Party_Name: [""],
      Amount: [this.defaultValue],
      Paying_Amount: [this.defaultValue, Validators.required],
      Remaining_Amount: [this.defaultValue],
      Tds_Amount: [this.defaultValue, Validators.required],
      Paid_By: ["", Validators.required],
      Cheque_No: [""],
      Cheque_Date: [],
      Amount_in_Account: ["", Validators.required],
    });
  }

  getYearId() {
    this.Year_Id = localStorage.getItem("selectedYear");
    /* let today = new Date();
    const year = today.getFullYear();
    this.commonservice
      .findData({ CMC_Name: year }, "find-cmcname")
      .subscribe((result) => {
        this.Year_Id = result[0]._id;
      }); */
  }

  get Receipt_No() {
    return this.salesReceipt.get("Receipt_No");
  }

  get Date() {
    return this.salesReceipt.get("Date");
  }

  get Firm_Name() {
    return this.salesReceipt.get("Firm_Name");
  }

  get Party_Name() {
    return this.salesReceipt.get("Party_Name");
  }

  get Amount() {
    return this.salesReceipt.get("Amount");
  }

  get Paying_Amount() {
    return this.salesReceipt.get("Paying_Amount");
  }

  get Remaining_Amount() {
    return this.salesReceipt.get("Remaining_Amount");
  }

  get Tds_Amount() {
    return this.salesReceipt.get("Tds_Amount");
  }
  get Paid_By() {
    return this.salesReceipt.get("Paid_By");
  }

  get Cheque_No() {
    return this.salesReceipt.get("Cheque_No");
  }

  get Cheque_Date() {
    return this.salesReceipt.get("Cheque_Date");
  }

  get Amount_in_Account() {
    return this.salesReceipt.get("Amount_in_Account");
  }

  onSubmit() {
    this.spinner.show();
    const formData = this.salesReceipt.value;

    formData.Company_Id = this.commonservice.currentUser.Company_Id;
    formData.Year_Id = this.Year_Id;
    formData.Created_By = this.commonservice.currentUser.Company_Id;
    formData.Created_Date = new Date();
    formData.Shed = this.selectedShed;
    formData.TransactionID = this.transactionDetails["_id"];
    formData.UniqueCode = this.commonservice.generateUniqueCode(
      "SALESRECEIPT",
      this.Year_Id
    );

    this.commonservice
      .addData(formData, "add-sales-receipt")
      .subscribe((data) => {
        if (data != null) {
          let errorArr = [];

          const accountTrans = {
            T_Code: data._id,
            Party: formData.Party_Name,
            Against_Voucher: "SALES RECEIPT",
            Invoice_No: this.transactionDetails["Invoice_No"],
            GETPASS: formData.Receipt_No,
            AmtIn: formData.Paying_Amount,
            AmtOut: 0,
            PaidBy: formData.Paid_By,
            Date: formData.Date,
            Cheque_No: formData.Cheque_No,
            PaymentID: 0,
            Paid_From_Acc: formData.Amount_in_Account,
            Voucher_Type: "SALES RECEIPT",
            Shed: this.selectedShed,
            Amount: formData.Paying_Amount,
            Balance_Type: 0,
            Firm: this.selectedFirm,
            UniqueCode: formData.UniqueCode,
            Company_Id: this.commonservice.currentUser.Company_Id,
            Year_Id: this.Year_Id,
            Created_By: this.commonservice.currentUser.Company_Id,
            Created_Date: new Date(),
          };

          this.commonservice
            .addData(accountTrans, "add-account-transaction")
            .subscribe((account) => {
              if (account == null) {
                errorArr.push(-1);
              }
            });

          const bankTrans = {
            ACC_Code: formData.Amount_in_Account,
            TransactionForm: "Sales Receipt",
            AmtIn: formData.Paying_Amount,
            AmtOut: 0,
            AgainstVoucher: "Sales Receipt",
            TransactionBy: formData.Paid_By,
            TransactionDate: formData.Date,
            FormCode: 0,
            FormName: "Sales Receipt",
            UniqueCode: formData.UniqueCode,
            Cheque_No: formData.Cheque_No,
            Cheque_Date: formData.Cheque_Date,
            Company_Id: this.commonservice.currentUser.Company_Id,
            Year_Id: this.Year_Id,
            Created_By: this.commonservice.currentUser.Company_Id,
            Created_Date: formData.Date,
            TransactionFormId: data._id,
          };

          this.commonservice
            .addData(bankTrans, "add-bank-transaction")
            .subscribe((bank) => {
              if (bank == null) {
                errorArr.push(-1);
              }
            });

          if (errorArr.includes(-1)) {
            this.toastr.error(
              "Error adding record. Please try again.",
              "Error"
            );
            this.spinner.hide();
          } else {
            this.toastr.success("Record added successfuly", "Success");
            this.salesReceipt.reset();
            this.router.navigate(["/finance/sales-receipt"]);
            this.spinner.hide();
          }
        } else {
          this.toastr.error("Error adding record. Please try again.", "Error");
          this.spinner.hide();
        }
      });
  }

  private initForm() {
    this.spinner.show();
    this.commonservice
      /* .findData(
        { Firm: this.selectedFirm, Shed: this.selectedShed },
        "fetch-sales-account-transaction-details"
      ) */
      .fetchDetails(this.salesReceiptID, "account-transaction-details")
      .subscribe((details) => {
        this.transactionDetails = details;

        this.commonservice
          .fetchDetails(details._id, "sales-receipt-details")
          .subscribe((receiptDetails) => {
            let balance = 0;

            if (receiptDetails.length > 0) {
              balance =
                receiptDetails[receiptDetails.length - 1].Remaining_Amount;
            } else {
              if (details.AmtOut - details.AmtIn > 0) {
                balance = details.AmtOut - details.AmtIn;
              }
            }

            this.salesReceipt.patchValue({
              Firm_Name: details.Firm._id,
              Party_Name: details.Party._id,
              Amount: details.AmtOut,
              Remaining_Amount: balance,
              Tds_Amount: details.Tds_Amount || 0,
              Receipt_No: details.Invoice_No,
            });

            this.RemainingAmount = balance;
          });

        this.fetchParty(details.Party._id);
        this.fetchFirm(details.Firm._id);
        this.selectedShed = details.Shed._id;
        this.selectedFirm = details.Firm._id;
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
            obj[key] = (obj[key] || 0) + output[key] + element[key];
          } else if (key == "Party") {
            obj["Party_Code"] = element[key]["_id"];
            obj["Party_Name"] = element[key]["Company_Name"];
            obj["Firm_Name"] = element["Firm"]["Company_Name"];
            obj["FirmId"] = element["Firm"]["_id"];
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
        Firm_Name: app[0].Firm.Company_Name,
        FirmId: app[0].Firm._id,
      };
    }

    return result;
  }

  fetchParty(party) {
    this.commonservice
      .fetchDetails(party, "party-details")
      .subscribe((details) => {
        this.partyList.push({
          _id: details._id,
          Company_Name: details.Company_Name,
        });
      });
  }

  fetchFirm(firm) {
    this.commonservice
      .fetchDetails(firm, "firm-details")
      .subscribe((details) => {
        this.firmList.push({
          _id: details._id,
          Company_Name: details.Company_Name,
        });
      });
  }

  fetchPaidBy(_id: string) {
    this.commonservice
      .fetchDataFrom(_id, "fetch-commonchild-fromCM")
      .subscribe((list) => {
        this.paidByList = list;
      });
  }

  fetchAccount() {
    this.commonservice.fetchData(0, 0, "fetch-account").subscribe((list) => {
      this.accountList = list;
    });
  }

  setPaidByCheque(paidby) {
    if (paidby == "5ead07652a1e063f14ea6c28") {
      this.ispaidByCheque = true;
      this.Cheque_No.setValidators([Validators.required]);
      this.Cheque_No.updateValueAndValidity();

      this.Cheque_Date.setValidators([Validators.required]);
      this.Cheque_Date.updateValueAndValidity();
    } else {
      this.ispaidByCheque = false;
      this.Cheque_No.clearValidators();
      this.Cheque_No.updateValueAndValidity();

      this.Cheque_Date.clearValidators();
      this.Cheque_Date.updateValueAndValidity();
    }
  }

  calculateRemainingAfterTds(tds) {
    const remAmt = this.RemainingAmount - this.Paying_Amount.value - tds;
    this.Remaining_Amount.patchValue(remAmt);
  }

  calculateRemaining(event) {
    const payingAmt = event.target.value;
    const availableAmt = this.Amount.value;
    const tds = this.Tds_Amount.value;
    let remainingAmt = 0;

    if (this.RemainingAmount > 0 && this.RemainingAmount == availableAmt) {
      remainingAmt = availableAmt - payingAmt;
    } else {
      remainingAmt = this.RemainingAmount - payingAmt - tds;
    }

    this.Remaining_Amount.patchValue(remainingAmt);
    // this.calculateRemainingAfterTds(this.Tds_Amount.value);
  }

  onCancel() {
    this.router.navigate(["/finance/sales-receipt"]);
  }
}
