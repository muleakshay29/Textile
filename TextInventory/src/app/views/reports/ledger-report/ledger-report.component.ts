import { Component, OnInit } from "@angular/core";
import { PageChangedEvent } from "ngx-bootstrap/pagination";
import { CommonService } from "../../../_services/common.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { Validators, FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { reduce } from "rxjs/operators";
import { LedgerReportPrintComponent } from "../../../_helper/ledger-report-print/ledger-report-print.component";

@Component({
  selector: "app-ledger-report",
  templateUrl: "./ledger-report.component.html",
  styleUrls: ["./ledger-report.component.css"],
})
export class LedgerReportComponent implements OnInit {
  Ledger: FormGroup;
  ledgerType = [];
  firmList = [];
  selectedLedger: string = "";
  selectedFirm: string = "";
  buttonText = "View";
  returnedArray = [];
  pdfData = [];
  keysArr = [];
  dataLength: number;
  itemsPerPage: number = 10;
  totalMeters: number = 0;
  totalCredit: number = 0;
  totalDebit: number = 0;

  constructor(
    private fb: FormBuilder,
    private commonservice: CommonService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.fetchFirm();
  }

  createForm() {
    this.Ledger = this.fb.group({
      From_Date: ["", Validators.required],
      To_Date: ["", Validators.required],
      Ledger_Type: ["sales"],
      Firm_Name: [""],
    });
  }

  get From_Date() {
    return this.Ledger.get("From_Date");
  }

  get To_Date() {
    return this.Ledger.get("To_Date");
  }

  getItemCount(data) {
    this.spinner.show();
    this.commonservice
      .findData(data, "ledger-details-count")
      .subscribe((count) => {
        this.dataLength = count.count;
        this.spinner.hide();
      });
  }

  onSubmit() {
    this.spinner.show();
    this.returnedArray = [];
    this.keysArr = [];
    this.totalMeters = 0;
    this.totalCredit = 0;
    this.totalDebit = 0;
    const formData = this.Ledger.value;
    // this.getItemCount(formData);
    // formData.pageIndex = 0;
    // formData.pageSize = this.itemsPerPage;
    this.legderDetails(formData);
  }

  /* pageChanged(event: PageChangedEvent): void {
    const formData = this.Ledger.value;
    formData.pageIndex = event.page - 1;
    formData.pageSize = this.itemsPerPage;
    this.legderDetails(formData);
  }

  setItemPerPage(event) {
    this.itemsPerPage = event.target.value;
    const formData = this.Ledger.value;
    formData.pageIndex = event.page - 1;
    formData.pageSize = this.itemsPerPage;
    this.legderDetails(formData);
  } */

  legderDetails(formData) {
    this.commonservice
      .findData(formData, "fetch-ledger-details-new")
      .subscribe((data) => {
        if (data) {
          console.log("data.length", data.length);
          // let count = 1;
          data.forEach((element) => {
            if (element.AccTrans && element.AccTrans.length > 0) {
              this.commonservice
                .findData(
                  { _id: element.AccTrans[0]._id },
                  "fetch-ledger-receipts-details"
                )
                .subscribe((details) => {
                  if (details !== null) {
                    let payingAmt = 0;
                    details.forEach((elementDetail) => {
                      payingAmt =
                        payingAmt +
                        elementDetail.Paying_Amount +
                        elementDetail.Tds_Amount;
                    });
                    const debitAmt = element.Grand_Total - payingAmt;

                    this.commonservice
                      .fetchDetails(element.AccTrans[0].Firm, "firm-details")
                      .subscribe((details) => {
                        if (debitAmt > 0) {
                          const ledgerData = {
                            To_Party: element.To_Party.Company_Name,
                            Date: element.Date,
                            Invoice_No: element.Invoice_No,
                            Quality: element.Quality.Design_Name,
                            Total_Meters: element.Total_Meters,
                            Rate: element.Rate,
                            Credit: payingAmt,
                            Debit: debitAmt,
                            Firm_Name: details.Company_Name,
                          };
                          this.pdfData.push(ledgerData);

                          const result = this.pdfData.reduce((prev, next) => {
                            const key = `${next.To_Party}`;
                            prev[key] = prev[key] || [];
                            prev[key].push(next);
                            return prev;
                          }, {});

                          this.returnedArray = result;
                          this.keysArr = Object.keys(this.returnedArray);
                          this.keysArr.sort(function (a, b) {
                            if (a < b) {
                              return -1;
                            }
                            if (a > b) {
                              return 1;
                            }
                            return 0;
                          });

                          for (const key in result) {
                            let meterSum = 0;
                            let creditSum = 0;
                            let debitSum = 0;
                            const party = result[key];
                            party.forEach((element) => {
                              // console.log(element);
                              meterSum = meterSum + element.Total_Meters;
                              creditSum = creditSum + element.Credit;
                              debitSum = debitSum + element.Debit;
                            });

                            /* this.totalMeters = +(
                              this.totalMeters + meterSum
                            ).toFixed(2);
                            this.totalCredit = +(
                              this.totalCredit + creditSum
                            ).toFixed(2);
                            this.totalDebit = +(
                              this.totalDebit + debitSum
                            ).toFixed(2);

                            console.log("totalMeters", this.totalMeters); */

                            result[key].push({
                              To_Party: "",
                              Date: "",
                              Invoice_No: "",
                              Quality: "",
                              Total_Meters: meterSum,
                              Rate: "",
                              Credit: creditSum,
                              Debit: debitSum,
                              Firm_Name: "",
                            });
                          }

                          this.returnedArray = result;
                          // console.log(this.returnedArray);
                        }
                      });
                  }
                });
            }
          });

          this.spinner.hide();
        } else {
          this.spinner.hide();
        }
      });
  }

  /* ledgerAccTransDetails(data) {
    data.forEach((element) => {
      // console.log(e1.AccTrans);
      this.commonservice
        .findData(
          { _id: element.AccTrans[0]._id },
          "fetch-ledger-receipts-details"
        )
        .subscribe((details) => {
          if (details !== null) {
            // const element = e1.AccTrans[0];
            let payingAmt = 0;
            details.forEach((elementDetail) => {
              payingAmt =
                payingAmt +
                elementDetail.Paying_Amount +
                elementDetail.Tds_Amount;
            });
            const debitAmt = element.Grand_Total - payingAmt;

            if (debitAmt > 0) {
              const ledgerData = {
                To_Party: element.To_Party.Company_Name,
                Date: element.Date,
                Invoice_No: element.Invoice_No,
                Quality: element.Quality.Design_Name,
                Total_Meters: element.Total_Meters,
                Rate: element.Rate,
                Credit: payingAmt,
                Debit: debitAmt,
                // Firm_Name: receiptDetails[0].Firm.Company_Name,
                Firm_Name: "",
              };
              this.pdfData.push(ledgerData);

              const result = this.pdfData.reduce((prev, next) => {
                const key = `${next.To_Party}`;
                prev[key] = prev[key] || [];
                prev[key].push(next);
                return prev;
              }, {});
              this.returnedArray = result;
              this.keysArr = Object.keys(this.returnedArray);
              this.keysArr.sort(function (a, b) {
                if (a < b) {
                  return -1;
                }
                if (a > b) {
                  return 1;
                }
                return 0;
              });
            }
          }

          console.log("this.returnedArray", this.returnedArray);
        });
    });
  } */

  /* ledgerAccTransDetails1(data) {
    data.forEach((element) => {
      this.commonservice
        .findData({ _id: element._id }, "fetch-ledger-account-trans-details")
        .subscribe((receiptDetails) => {
          if (receiptDetails !== null) {
            this.commonservice
              .findData(
                { _id: receiptDetails[0]._id },
                "fetch-ledger-receipts-details"
              )
              .subscribe((details) => {
                if (details !== null) {
                  let payingAmt = 0;
                  details.forEach((element) => {
                    payingAmt =
                      payingAmt + element.Paying_Amount + element.Tds_Amount;
                  });
                  const debitAmt = element.Grand_Total - payingAmt;

                  if (debitAmt > 0) {
                    const ledgerData = {
                      To_Party: element.To_Party.Company_Name,
                      Date: element.Date,
                      Invoice_No: element.Invoice_No,
                      Quality: element.Quality.Design_Name,
                      Total_Meters: element.Total_Meters,
                      Rate: element.Rate,
                      Credit: payingAmt,
                      Debit: debitAmt,
                      Firm_Name: receiptDetails[0].Firm.Company_Name,
                    };
                    this.pdfData.push(ledgerData);

                    const result = this.pdfData.reduce((prev, next) => {
                      const key = `${next.To_Party}`;
                      prev[key] = prev[key] || [];
                      prev[key].push(next);
                      return prev;
                    }, {});
                    this.returnedArray = result;
                    this.keysArr = Object.keys(this.returnedArray);
                    this.keysArr.sort(function (a, b) {
                      if (a < b) {
                        return -1;
                      }
                      if (a > b) {
                        return 1;
                      }
                      return 0;
                    });
                  }
                }
              });
          }
        });
    });
  } */

  fetchFirm() {
    this.spinner.show();
    this.commonservice.fetchData(0, 0, "fetch-firm").subscribe((list) => {
      this.firmList = list;
      this.spinner.hide();
    });
  }

  generatePdf(content) {
    const initialState = {
      _id: content,
      content: content,
      From_Date: this.From_Date.value,
      To_Date: this.To_Date.value,
    };
    const result = this.commonservice.customPrintModel(
      initialState,
      LedgerReportPrintComponent
    );
    /* result.content.onClose.subscribe((result: boolean) => {
      if (result == true) {
        this.spinner.show();
      }
    }); */
  }
}
