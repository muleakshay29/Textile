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

  onSubmit() {
    this.spinner.show();
    const formData = this.Ledger.value;

    this.commonservice
      .findData(formData, "fetch-ledger-details")
      .subscribe((data) => {
        // this.returnedArray = data;

        if (data) {
          data.forEach((element) => {
            this.commonservice
              .findData(
                { _id: element._id },
                "fetch-ledger-account-trans-details"
              )
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
                            payingAmt +
                            element.Paying_Amount +
                            element.Tds_Amount;
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

                /* console.log("receiptDetails", receiptDetails);
                const ledgerData = {
                  To_Party: element.To_Party.Company_Name,
                  Date: element.Date,
                  Invoice_No: element.Invoice_No,
                  Quality: element.Quality.Design_Name,
                  Total_Meters: element.Total_Meters,
                  Rate: element.Rate,
                  Credit: element.Total_Amount + receiptDetails[0].Tds_Amount,
                  Debit: receiptDetails[0].Amount,
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
                this.keysArr = Object.keys(this.returnedArray); */
              });
          });

          this.spinner.hide();
        } else {
          this.spinner.hide();
        }
      });
  }

  fetchFirm() {
    this.spinner.show();
    this.commonservice.fetchData(0, 0, "fetch-firm").subscribe((list) => {
      this.firmList = list;
      this.spinner.hide();
    });
  }

  generatePdf(content) {
    const result = this.commonservice.openPrintModal(
      content,
      content,
      LedgerReportPrintComponent
    );
    /* result.content.onClose.subscribe((result: boolean) => {
      if (result == true) {
        this.spinner.show();
      }
    }); */
  }
}
