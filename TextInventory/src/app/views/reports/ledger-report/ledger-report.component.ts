import { Component, OnInit } from '@angular/core';
import { PageChangedEvent } from "ngx-bootstrap/pagination";
import { CommonService } from "../../../_services/common.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { Validators, FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { reduce } from "rxjs/operators";


@Component({
  selector: 'app-ledger-report',
  templateUrl: './ledger-report.component.html',
  styleUrls: ['./ledger-report.component.css']
})
export class LedgerReportComponent implements OnInit {

  Ledger: FormGroup;
  ledgerType = [];
  firmList = [];
  selectedLedger: string = "";
  selectedFirm: string = "";
  buttonText = "View";
  returnedArray = [];
  dataLength: number;
  itemsPerPage: number = 10;

  constructor(
    private fb: FormBuilder,
    private commonservice: CommonService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.fetchLedger();
    this.fetchFirm();
  }

  createForm() {
    this.Ledger = this.fb.group({
      From_Date:["",Validators.required],
      To_Date:["",Validators.required],
      Ledger_Type: ["",Validators.required],
      Firm_Name: [""],
    });
  }

  get Ledger_Type() {
    return this.Ledger.get("Ledger_Type");
  }

  get Firm_Name() {
    return this.Ledger.get("Firm_Name");
  }
  
  onSubmit(){
    this.spinner.show();
    this.selectedLedger = this.Ledger_Type.value;
    this.selectedFirm = this.Firm_Name.value;
  }

  fetchFirm() {
    this.spinner.show();
    this.commonservice.fetchData(0, 0, "fetch-firm").subscribe((list) => {
      this.firmList = list;
      this.spinner.hide();
    });
  }

  fetchLedger() {
    this.spinner.show();
    this.commonservice.fetchData(0, 0, "fetch-firm").subscribe((list) => {
      this.ledgerType = list;
      this.spinner.hide();
    });
  }
  


}
