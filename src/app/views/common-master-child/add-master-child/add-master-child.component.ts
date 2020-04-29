import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { MasterService } from "../../../_services/master.service";
import { Validations } from "../../../_helper/validations";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-add-master-child",
  templateUrl: "./add-master-child.component.html",
})
export class AddMasterChildComponent implements OnInit {
  commonMasterChild: FormGroup;
  cmcID: any;
  commonMasterList = [];
  editMode = false;
  buttonText: string;
  showSpinner: boolean = false;

  constructor(
    private fb: FormBuilder,
    private master: MasterService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.createForm();
    this.fetchCommonMaster();

    this.route.params.subscribe((params: Params) => {
      this.cmcID = params["id"] ? params["id"] : "";
      this.editMode = params["id"] != null;

      this.initForm();

      this.buttonText = this.editMode ? "Update" : "Create";
    });
  }

  createForm() {
    this.commonMasterChild = this.fb.group({
      CM_id: ["", Validators.required],
      CMC_Name: ["", [Validators.required, Validations.alphaNumericPattern]],
    });
  }

  get CM_id() {
    return this.commonMasterChild.get("CM_id");
  }

  get CMC_Name() {
    return this.commonMasterChild.get("CMC_Name");
  }

  onSubmit() {
    this.spinner.show();
    if (!this.editMode) {
      const formData = this.commonMasterChild.value;
      this.master
        .addData(formData, "add-commonmaster-child")
        .subscribe((data) => {
          if (data != null) {
            this.toastr.success("Record added successfuly", "Success");
            this.commonMasterChild.reset();
            this.fetchCommonMaster();
            this.router.navigate(["/masters/common-master-child"]);
            this.spinner.hide();
          } else {
            this.toastr.error(
              "Error adding record. Please try again.",
              "Error"
            );
            this.spinner.hide();
          }
        });
    } else {
      const formData = {
        CMC_Name: this.CMC_Name.value,
      };

      this.master
        .updateData(this.cmcID, formData, "update-commonmaster-child")
        .subscribe((data) => {
          if (data != null) {
            this.toastr.success("Record updated successfuly", "Success");
            this.router.navigate(["/masters/common-master-child"]);
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
        .fetchDetails(this.cmcID, "fetch-commonmasterchild-details")
        .subscribe((details) => {
          this.commonMasterChild.setValue({
            CM_id: details.CM_id,
            CMC_Name: details.CMC_Name,
          });
          this.spinner.hide();
        });
    }
  }

  fetchCommonMaster() {
    this.spinner.show();
    this.master
      .fetchData(0, 0, "fetch-commonmaster")
      .subscribe((commonMasterList) => {
        this.commonMasterList = commonMasterList;
        this.spinner.hide();
      });
  }

  onCancel() {
    this.router.navigate(["/masters/common-master-child"]);
  }
}
