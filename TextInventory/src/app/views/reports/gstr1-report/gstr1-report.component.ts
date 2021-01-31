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
  dataLength: number;
  itemsPerPage: number = 10;
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

  generatePdf(content) {
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
    /* const result = this.commonservice.openPrintModal(
      content,
      content,
      Gstr1ReportPrintComponent
    ); */
  }
}
