import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { MasterService } from "../../../_services/master.service";
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
  showSpinner = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private master: MasterService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.createForm();

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

  onSubmit() {
    this.spinner.show();
    if (!this.editMode) {
      const formData = this.yarnMaster.value;
      this.master.addData(formData, "add-yarn").subscribe((data) => {
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
      const formData = {
        SUT_Name: this.SUT_Name.value,
        CGST: this.CGST.value,
        SGST: this.SGST.value,
        IGST: this.IGST.value,
      };

      this.master
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
      this.master
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
