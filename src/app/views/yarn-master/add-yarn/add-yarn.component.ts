import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { CommonService } from "../../../_services/common.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-add-yarn",
  templateUrl: "./add-yarn.component.html",
  styleUrls: ["./add-yarn.component.css"],
})
export class AddYarnComponent implements OnInit {
  yarnMaster: FormGroup;
  yarnID: string;
  editMode = false;
  buttonText: string;
  Year_Id: any;

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
    this.getYearId();

    this.route.params.subscribe((params: Params) => {
      this.yarnID = params["id"] ? params["id"] : "";
      this.editMode = params["id"] != null;
      this.buttonText = this.editMode ? "Update" : "Create";
      this.initForm();
    });
  }

  createForm() {
    this.yarnMaster = this.fb.group({
      SUT_Name: ["", Validators.required],
      CGST: ["", Validators.required],
      SGST: ["", Validators.required],
      IGST: ["", Validators.required],
    });
  }

  get SUT_Name() {
    return this.yarnMaster.get("SUT_Name");
  }

  get CGST() {
    return this.yarnMaster.get("CGST");
  }

  get SGST() {
    return this.yarnMaster.get("SGST");
  }

  get IGST() {
    return this.yarnMaster.get("IGST");
  }

  getYearId() {
    let today = new Date();
    const year = today.getFullYear();
    this.cmaster
      .findData({ CMC_Name: year }, "find-cmcname")
      .subscribe((result) => {
        this.Year_Id = result[0]._id;
      });
  }

  onSubmit() {
    this.spinner.show();
    const formData = this.yarnMaster.value;

    if (!this.editMode) {
      formData.Company_Id = this.cmaster.currentUser.Company_Id;
      formData.Year_Id = this.Year_Id;
      formData.Created_By = this.cmaster.currentUser.Company_Id;
      formData.Created_Date = new Date();

      this.cmaster.addData(formData, "add-yarn").subscribe((data) => {
        if (data != null) {
          this.toastr.success("Record added successfuly", "Success");
          this.yarnMaster.reset();
          this.router.navigate(["/masters/yarn-master"]);
          this.spinner.hide();
        } else {
          this.toastr.error("Error adding record. Please try again.", "Error");
          this.spinner.hide();
        }
      });
    } else {
      formData.Company_Id = this.cmaster.currentUser.Company_Id;
      formData.Year_Id = this.Year_Id;
      formData.Updated_By = this.cmaster.currentUser.Company_Id;
      formData.Updated_Date = new Date();

      this.cmaster
        .updateData(this.yarnID, formData, "update-yarn")
        .subscribe((data) => {
          if (data != null) {
            this.toastr.success("Record updated successfuly", "Success");
            this.router.navigate(["/masters/yarn-master"]);
            this.spinner.hide();
          } else {
            this.toastr.error("Error updating record", "Error");
            this.spinner.hide();
          }
        });
    }
  }

  private initForm() {
    if (this.editMode) {
      this.spinner.show();
      this.cmaster
        .fetchDetails(this.yarnID, "yarn-details")
        .subscribe((details) => {
          this.yarnMaster.setValue({
            SUT_Name: details.SUT_Name,
            CGST: details.CGST,
            SGST: details.SGST,
            IGST: details.IGST,
          });
          this.spinner.hide();
        });
    }
  }

  onCancel() {
    this.router.navigate(["/masters/yarn-master"]);
  }
}
