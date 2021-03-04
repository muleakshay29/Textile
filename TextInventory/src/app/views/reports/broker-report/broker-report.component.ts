import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { CommonService } from "../../../_services/common.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { Validators, FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { Gstr1ReportPrintComponent } from "../../../_helper/gstr1-report-print/gstr1-report-print.component";
import * as XLSX from "xlsx";
import { HtmltopaperService } from "../../../_services/htmltopaper.service";

@Component({
  selector: "app-broker-report",
  templateUrl: "./broker-report.component.html",
  styleUrls: ["./broker-report.component.css"],
})
export class BrokerReportComponent implements OnInit {
  BrokerReport: FormGroup;
  buttonText = "View";
  returnedArray = [];
  keysArr = [];
  dataLength: number;
  itemsPerPage: number = 10;

  constructor(
    private fb: FormBuilder,
    private commonservice: CommonService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private htmltopaper: HtmltopaperService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.BrokerReport = this.fb.group({
      From_Date: ["", Validators.required],
      To_Date: ["", Validators.required],
    });
  }

  get From_Date() {
    return this.BrokerReport.get("From_Date");
  }

  get To_Date() {
    return this.BrokerReport.get("To_Date");
  }

  onSubmit() {
    this.spinner.show();
    const formData = this.BrokerReport.value;

    this.commonservice
      .findData(formData, "broker-report")
      .subscribe((result) => {
        this.returnedArray = [];
        if (result) {
          // this.returnedArray = result;
          let tempResult = [];

          result.forEach((element) => {
            const brokerData = {
              Broker_Name: element.Broker_Name.Broker_Name,
              Invoice_No: element.Invoice_No,
              Date: element.Date,
              Party_Name: element.From_Party.Company_Name,
              Firm_Name: element.To_Party.Company_Name,
              Total_Meters: element.Total_Meters,
              Rate: element.Rate,
              Taxable_Amount: element.Taxable_Amount,
              Total_GST_Amt: element.Total_GST_Amt,
              Grand_Total: element.Grand_Total,
            };

            tempResult.push(brokerData);
          });

          const brokerGroup = tempResult.reduce((prev, next) => {
            const key = `${next.Broker_Name}`;
            prev[key] = prev[key] || [];
            prev[key].push(next);
            return prev;
          }, {});

          this.returnedArray = brokerGroup;
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
          this.spinner.hide();
        } else {
          this.toastr.success("No records found", "Information");
          this.spinner.hide();
        }
      });
  }

  printPdf() {
    const options = {
      name: "_blank",
      specs: ["fullscreen=yes", "titlebar=yes", "scrollbars=yes"],
      replace: true,
      styles: [
        "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css",
        "./ledger-report-print.component.css",
      ],
    };

    this.htmltopaper.HtmlToPaper("print-html", options);
  }
}
