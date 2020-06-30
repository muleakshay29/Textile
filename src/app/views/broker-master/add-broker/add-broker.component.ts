import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { CommonService } from "../../../_services/common.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { Validations } from "../../../_helper/validations";

@Component({
  selector: "app-add-broker",
  templateUrl: "./add-broker.component.html",
  styleUrls: ["./add-broker.component.css"],
})
export class AddBrokerComponent implements OnInit {
  brokerMaster: FormGroup;
  brokerID: string;
  editMode = false;
  buttonText: string;
  Year_Id: any;
  balanceTypeList = [];

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
    this.fetchBalanceType("5ea15662f27507241406257c");

    this.route.params.subscribe((params: Params) => {
      this.brokerID = params["id"] ? params["id"] : "";
      this.editMode = params["id"] != null;
      this.buttonText = this.editMode ? "Update" : "Create";
      this.initForm();
    });
  }

  createForm() {
    this.brokerMaster = this.fb.group({
      Broker_Name: ["", Validators.required],
      Address: ["", Validators.required],
      Mobile_No: ["", Validators.required],
      Alternate_No: [""],
      Opening_Balance: ["", Validators.required],
      Balance_Type: ["", Validators.required],
    });
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

  get Broker_Name() {
    return this.brokerMaster.get("Broker_Name");
  }

  get Address() {
    return this.brokerMaster.get("Address");
  }

  get Mobile_No() {
    return this.brokerMaster.get("Mobile_No");
  }

  get Alternate_No() {
    return this.brokerMaster.get("Alternate_No");
  }

  get Opening_Balance() {
    return this.brokerMaster.get("Opening_Balance");
  }

  get Balance_Type() {
    return this.brokerMaster.get("Balance_Type");
  }

  onSubmit() {
    this.spinner.show();
    const formData = this.brokerMaster.value;

    if (!this.editMode) {
      formData.Company_Id = this.cmaster.currentUser.Company_Id;
      formData.Year_Id = this.Year_Id;
      formData.Created_By = this.cmaster.currentUser.Company_Id;
      formData.Created_Date = new Date();

      this.cmaster.addData(formData, "add-broker").subscribe((data) => {
        if (data != null) {
          this.toastr.success("Record added successfuly", "Success");
          this.brokerMaster.reset();
          this.router.navigate(["/masters/broker-master"]);
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
        .updateData(this.brokerID, formData, "update-broker")
        .subscribe((data) => {
          if (data != null) {
            this.toastr.success("Record updated successfuly", "Success");
            this.router.navigate(["/masters/broker-master"]);
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
        .fetchDetails(this.brokerID, "broker-details")
        .subscribe((details) => {
          this.brokerMaster.setValue({
            Broker_Name: details.Broker_Name,
            Address: details.Address,
            Mobile_No: details.Mobile_No,
            Alternate_No: details.Alternate_No,
            Opening_Balance: details.Opening_Balance,
            Balance_Type: details.Balance_Type,
          });
          this.spinner.hide();
        });
    }
  }

  fetchBalanceType(_id: string) {
    this.cmaster
      .fetchDataFrom(_id, "fetch-commonchild-fromCM")
      .subscribe((list) => {
        this.balanceTypeList = list;
      });
  }

  onCancel() {
    this.router.navigate(["/masters/broker-master"]);
  }
}
