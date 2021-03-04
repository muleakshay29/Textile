import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { CommonService } from "../../../_services/common.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { Validators, FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { Gstr1ReportPrintComponent } from "../../../_helper/gstr1-report-print/gstr1-report-print.component";
import * as XLSX from "xlsx";

@Component({
  selector: "app-gstr1-report",
  templateUrl: "./gstr1-report.component.html",
  styleUrls: ["./gstr1-report.component.css"],
})
export class Gstr1ReportComponent implements OnInit {
  GST_Report: FormGroup;
  firmList = [];
  buttonText = "View";
  returnedArray = [];
  detailedExcelContent = [];
  dataLength: number;
  itemsPerPage: number = 10;
  detailedExcel: boolean = false;
  // @ViewChild('printExcel', { static: false }) printExcel: ElementRef;

  /*name of the excel-file which will be downloaded. */
  fileName: string = "";

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
    this.GST_Report = this.fb.group({
      From_Date: ["", Validators.required],
      To_Date: ["", Validators.required],
      Firm_Name: [""],
    });
  }

  get From_Date() {
    return this.GST_Report.get("From_Date");
  }

  get To_Date() {
    return this.GST_Report.get("To_Date");
  }

  fetchFirm() {
    this.spinner.show();
    this.commonservice.fetchData(0, 0, "fetch-firm").subscribe((list) => {
      this.firmList = list;
      this.spinner.hide();
    });
  }

  onSubmit() {
    this.spinner.show();
    const formData = this.GST_Report.value;

    this.commonservice
      .findData(formData, "fetch-gst1-report")
      .subscribe((result) => {
        this.returnedArray = [];
        if (result) {
          this.returnedArray = result;
          this.spinner.hide();
        } else {
          this.toastr.success("No records found", "Information");
          this.spinner.hide();
        }
      });
  }

  generateDetailedExcel(content) {
    this.detailedExcel = true;
    this.spinner.show();

    content.forEach((element) => {
      const detailedContent = {
        Invoice_No: element.Invoice_No,
        Invoice_Date: element.Date,
        Party: element.To_Party.Company_Name,
        GST_NO: element.To_Party.GST_No,
        Pices: element.No_Of_Pieces,
        Meter: element.Total_Meters,
        Rate: element.Rate,
        Total: element.Total_Amount,
        Taxable_Amount: element.Taxable_Amount,
        CGST: element.CGST,
        CGST_Amount: element.CGST_Amt,
        SGST: element.SGST,
        SGST_Amount: element.SGST_Amt,
        IGST: element.IGST,
        IGST_Amount: element.IGST_Amt,
        Total_GST: element.Total_GST_Amt,
        R_Off: element.Round_Off,
        Invoice_Amount: element.Grand_Total,
      };

      this.detailedExcelContent.push(detailedContent);
    });

    setTimeout(() => {
      this.fileName =
        "GSTR1-Detail-Report-" +
        this.From_Date.value +
        "-to-" +
        this.To_Date.value +
        "-Report.xlsx";
      let element = document.getElementById("printDetailedExcel");
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, this.fileName.replace(/ /g, "-"));
      this.spinner.hide();
    }, 3000);
  }

  generatePdf(content) {
    this.detailedExcel = false;
    this.spinner.show();

    setTimeout(() => {
      this.fileName =
        "GSTR1-" +
        this.From_Date.value +
        "-to-" +
        this.To_Date.value +
        "-Report.xlsx";
      console.log("this.To_Date", this.To_Date);
      let element = document.getElementById("printExcel");
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, this.fileName.replace(/ /g, "-"));
      this.spinner.hide();
    }, 3000);
  }
}
