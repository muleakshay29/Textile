import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { CommonService } from "../../../_services/common.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-year-selection",
  templateUrl: "./year-selection.component.html",
  styleUrls: ["./year-selection.component.css"],
})
export class YearSelectionComponent implements OnInit {
  yearSelectionMaster: FormGroup;
  yearList: any = [];
  yearText: string = "";

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private cmaster: CommonService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.fetchYear("5efca052340358461c413bac");
  }

  createForm() {
    this.yearSelectionMaster = this.fb.group({
      Year_ID: ["", Validators.required],
    });
  }

  getYearId(_id) {
    this.yearText = "";
    this.cmaster
      .fetchDetails(_id, "fetch-commonmasterchild-details")
      .subscribe((result) => {
        this.toastr.success(
          `${result.CMC_Name} is selected as default year now`,
          "Sucess"
        );
      });
  }

  get Year_ID() {
    return this.yearSelectionMaster.get("Year_ID");
  }

  onSubmit() {
    this.spinner.show();
    const selectedYear = this.Year_ID.value;

    if (selectedYear) {
      localStorage.setItem("selectedYear", selectedYear);
      this.getYearId(selectedYear);
      this.router.navigate(["/dashboard"]);
      this.spinner.hide();
    } else {
      this.toastr.error("Invalid Year Selection", "Error");
      this.spinner.hide();
    }
  }

  fetchYear(_id: string) {
    this.cmaster
      .fetchDataFrom(_id, "fetch-commonchild-fromCM")
      .subscribe((list) => {
        this.yearList = list;
      });
  }
}
