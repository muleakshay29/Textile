import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { CommonService } from "../../../../_services/common.service";
import { Validations } from "../../../../_helper/validations";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-add-common-master",
  templateUrl: "./add-common-master.component.html",
})
export class AddCommonMasterComponent implements OnInit {
  commonMaster: FormGroup;
  cmID: any;
  editMode = false;
  buttonText: string;

  constructor(
    private fb: FormBuilder,
    private cmaster: CommonService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.createForm();

    this.route.params.subscribe((params: Params) => {
      this.cmID = params["id"] ? params["id"] : "";
      this.editMode = params["id"] != null;

      this.initForm();

      this.buttonText = this.editMode ? "Update" : "Create";
    });
  }

  createForm() {
    this.commonMaster = this.fb.group({
      CM_Name: ["", [Validators.required, Validations.alphaNumericPattern]],
    });
  }

  get CM_Name() {
    return this.commonMaster.get("CM_Name");
  }

  onSubmit() {
    this.spinner.show();
    if (!this.editMode) {
      const formData = this.commonMaster.value;
      this.cmaster.addData(formData, "add-commonmaster").subscribe((data) => {
        if (data != null) {
          this.toastr.success("Record added successfuly", "Success");
          this.commonMaster.reset();
          this.router.navigate(["/masters/common-master"]);
          this.spinner.hide();
        } else {
          this.toastr.error("Error adding record. Please try again.", "Error");
          this.spinner.hide();
        }
      });
    } else {
      const formData = {
        CM_Name: this.CM_Name.value,
      };

      this.cmaster
        .updateData(this.cmID, formData, "update-commonmaster")
        .subscribe((data) => {
          if (data != null) {
            this.toastr.success("Record updated successfuly", "Success");
            this.router.navigate(["/masters/common-master"]);
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
        .fetchDetails(this.cmID, "fetch-commonmaster-details")
        .subscribe((details) => {
          this.commonMaster.setValue({
            CM_Name: details.CM_Name,
          });
          this.spinner.hide();
        });
    }
  }

  onCancel() {
    this.router.navigate(["/masters/common-master"]);
  }
}
