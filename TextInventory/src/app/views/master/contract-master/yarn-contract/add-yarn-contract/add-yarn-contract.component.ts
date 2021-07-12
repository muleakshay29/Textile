import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { CommonService } from "../../../../../_services/common.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-add-yarn-contract",
  templateUrl: "./add-yarn-contract.component.html",
})
export class AddYarnContractComponent implements OnInit {
  yarnContract: FormGroup;
  yarnContractID: string;
  editMode = false;
  buttonText: string;
  Year_Id: any;
  defaultValue: number = 0;
  partyList = [];
  brokerList = [];
  yarnList = [];
  yarnGST: number = 0;
  includingReadonly = false;
  excludingReadonly = false;

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
    this.fetchParty();
    this.fetchBroker();
    this.fetchYarn();

    this.route.params.subscribe((params: Params) => {
      this.yarnContractID = params["id"] ? params["id"] : "";
      this.editMode = params["id"] != null;
      this.buttonText = this.editMode ? "Update" : "Create";
      this.initForm();
    });
  }

  createForm() {
    this.yarnContract = this.fb.group({
      Contract_No: ["", Validators.required],
      Date: ["", Validators.required],
      Party_Name: ["", Validators.required],
      Broker_Name: ["", Validators.required],
      Yarn_Name: ["", Validators.required],
      Count: [this.defaultValue, Validators.required],
      Mill: ["", Validators.required],
      Bags: [this.defaultValue],
      Weight: [this.defaultValue, Validators.required],
      Net_Rate_Including: [this.defaultValue, Validators.required],
      Net_Rate_Excluding: [this.defaultValue, Validators.required],
      Rate_KG: [this.defaultValue, Validators.required],
    });
  }

  getYearId() {
    this.Year_Id = localStorage.getItem("selectedYear");
    /* let today = new Date();
    const year = today.getFullYear();
    this.cmaster
      .findData({ CMC_Name: year }, "find-cmcname")
      .subscribe((result) => {
        this.Year_Id = result[0]._id;
      }); */
  }

  get Contract_No() {
    return this.yarnContract.get("Contract_No");
  }

  get Date() {
    return this.yarnContract.get("Date");
  }

  get Party_Name() {
    return this.yarnContract.get("Party_Name");
  }

  get Broker_Name() {
    return this.yarnContract.get("Broker_Name");
  }

  get Yarn_Name() {
    return this.yarnContract.get("Yarn_Name");
  }

  get Count() {
    return this.yarnContract.get("Count");
  }

  get Mill() {
    return this.yarnContract.get("Mill");
  }

  get Bags() {
    return this.yarnContract.get("Bags");
  }

  get Weight() {
    return this.yarnContract.get("Weight");
  }

  get Net_Rate_Including() {
    return this.yarnContract.get("Net_Rate_Including");
  }

  get Net_Rate_Excluding() {
    return this.yarnContract.get("Net_Rate_Excluding");
  }

  get Rate_KG() {
    return this.yarnContract.get("Rate_KG");
  }

  onSubmit() {
    this.spinner.show();
    const formData = this.yarnContract.value;

    if (!this.editMode) {
      formData.Contract_No = "Yarn-Contract-" + formData.Contract_No;
      formData.Company_Id = this.cmaster.currentUser.Company_Id;
      formData.Year_Id = this.Year_Id;
      formData.Created_By = this.cmaster.currentUser.Company_Id;
      formData.Created_Date = new Date();

      this.cmaster.addData(formData, "add-yarn-contract").subscribe((data) => {
        if (data != null) {
          this.toastr.success("Record added successfuly", "Success");
          this.yarnContract.reset();
          this.router.navigate(["/masters/yarn-contract"]);
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
        .updateData(this.yarnContractID, formData, "update-yarn-contract")
        .subscribe((data) => {
          if (data != null) {
            this.toastr.success("Record updated successfuly", "Success");
            this.router.navigate(["/masters/yarn-contract"]);
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
        .fetchDetails(this.yarnContractID, "yarn-contract-details")
        .subscribe((details) => {
          const date = new Date(details.Date);
          const formatedMonth =
            date.getMonth() > 8
              ? date.getMonth() + 1
              : "0" + (date.getMonth() + 1);

          const formatedDay =
            date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
          const formatedYear = date.getFullYear();
          const formatedDate =
            formatedYear + "-" + formatedMonth + "-" + formatedDay;

          this.Contract_No.disable();
          this.yarnContract.setValue({
            Contract_No: details.Contract_No,
            Date: formatedDate,
            Party_Name: details.Party_Name._id,
            Broker_Name: details.Broker_Name._id,
            Yarn_Name: details.Yarn_Name._id,
            Count: details.Count,
            Mill: details.Mill,
            Bags: details.Bags,
            Weight: details.Weight,
            Net_Rate_Including: details.Net_Rate_Including,
            Net_Rate_Excluding: details.Net_Rate_Excluding,
            Rate_KG: details.Rate_KG,
          });
          this.spinner.hide();
        });
    }
  }

  fetchParty() {
    this.cmaster.fetchData(0, 0, "fetch-party").subscribe((list) => {
      this.partyList = list;
    });
  }

  fetchBroker() {
    this.cmaster.fetchData(0, 0, "fetch-broker").subscribe((list) => {
      this.brokerList = list;
    });
  }

  fetchYarn() {
    this.cmaster.fetchData(0, 0, "fetch-yarn").subscribe((list) => {
      this.yarnList = list;
    });
  }

  fetchYarnDetails(event) {
    const yarn = event.target.value;
    this.cmaster.fetchDetails(yarn, "yarn-details").subscribe((details) => {
      this.yarnGST = details.CGST + details.SGST;
      console.log(this.yarnGST);
    });
  }

  calculateNetRate(event, flag) {
    const rate = event.target.value;
    if (this.Yarn_Name.value) {
      if (flag == 1) {
        this.excludingReadonly = true;
        const gstAmt = (rate * this.yarnGST) / 100;
        this.Net_Rate_Excluding.setValue(Number(rate) - Number(gstAmt));
      }

      if (flag == 2) {
        this.includingReadonly = true;
        const gstAmt = (rate * this.yarnGST) / 100;
        this.Net_Rate_Including.setValue(Number(rate) + Number(gstAmt));
      }
    } else {
      this.toastr.error("Please Select Yarn First", "Information");
    }
  }

  onCancel() {
    this.router.navigate(["/masters/yarn-contract"]);
  }
}
