import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { CommonService } from "../../../_services/common.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { Validations } from "../../../_helper/validations";

@Component({
  selector: "app-add-company-master",
  templateUrl: "./add-company-master.component.html",
  styleUrls: ["./add-company-master.component.css"],
})
export class AddCompanyMasterComponent implements OnInit {
  companyMaster: FormGroup;
  companyID: string;
  editMode = false;
  buttonText: string;
  stateList = [];

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
    this.fetchState("5ea035da1492733c189e6ff2");

    this.route.params.subscribe((params: Params) => {
      this.companyID = params["id"] ? params["id"] : "";
      this.editMode = params["id"] != null;
      this.buttonText = this.editMode ? "Update" : "Create";
      this.initForm();
    });
  }

  createForm() {
    this.companyMaster = this.fb.group({
      Comp_Name: ["", [Validators.required, Validations.alphaNumericPattern]],
      Comp_Address: ["", Validators.required],
      Comp_State: ["", Validators.required],
      Comp_Owner: ["", Validators.required],
      Comp_Email: [""],
      Comp_GSTNo: ["", Validators.required],
      Comp_Pan: ["", Validators.required],
      Comp_Contact1: ["", Validators.required],
      Comp_Contact2: [""],
    });
  }

  get Comp_Name() {
    return this.companyMaster.get("Comp_Name");
  }

  get Comp_Address() {
    return this.companyMaster.get("Comp_Address");
  }

  get Comp_State() {
    return this.companyMaster.get("Comp_State");
  }

  get Comp_Owner() {
    return this.companyMaster.get("Comp_Owner");
  }

  get Comp_Email() {
    return this.companyMaster.get("Comp_Email");
  }

  get Comp_GSTNo() {
    return this.companyMaster.get("Comp_GSTNo");
  }

  get Comp_Pan() {
    return this.companyMaster.get("Comp_Pan");
  }

  get Comp_Contact1() {
    return this.companyMaster.get("Comp_Contact1");
  }

  get Comp_Contact2() {
    return this.companyMaster.get("Comp_Contact2");
  }

  onSubmit() {
    this.spinner.show();
    const formData = this.companyMaster.value;

    if (!this.editMode) {
      this.cmaster.addData(formData, "add-company").subscribe((data) => {
        if (data != null) {
          this.toastr.success("Record added successfuly", "Success");
          this.companyMaster.reset();
          this.router.navigate(["/masters/company-master"]);
          this.spinner.hide();
        } else {
          this.toastr.error("Error adding record. Please try again.", "Error");
          this.spinner.hide();
        }
      });
    } else {
      this.cmaster
        .updateData(this.companyID, formData, "update-company")
        .subscribe((data) => {
          if (data != null) {
            this.toastr.success("Record updated successfuly", "Success");
            this.router.navigate(["/masters/company-master"]);
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
        .fetchDetails(this.companyID, "company-details")
        .subscribe((details) => {
          this.companyMaster.setValue({
            Comp_Name: details.Comp_Name,
            Comp_Address: details.Comp_Address,
            Comp_State: details.Comp_State,
            Comp_Owner: details.Comp_Owner,
            Comp_Email: details.Comp_Email,
            Comp_GSTNo: details.Comp_GSTNo,
            Comp_Pan: details.Comp_Pan,
            Comp_Contact1: details.Comp_Contact1,
            Comp_Contact2: details.Comp_Contact2,
          });
          this.spinner.hide();
        });
    }
  }

  fetchState(_id: string) {
    this.cmaster
      .fetchDataFrom(_id, "fetch-commonchild-fromCM")
      .subscribe((list) => {
        this.stateList = list;
      });
  }

  onCancel() {
    this.router.navigate(["/masters/company-master"]);
  }
}
