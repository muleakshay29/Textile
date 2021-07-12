import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { CommonService } from "../../../../_services/common.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-add-winding-inward",
  templateUrl: "./add-winding-inward.component.html",
  styleUrls: ["./add-winding-inward.component.css"],
})
export class AddWindingInwardComponent implements OnInit {
  windingInward: FormGroup;
  windingInwardID: string;
  editMode = false;
  buttonText: string;
  Year_Id: any;
  partyList = [];
  shedList = [];
  yarnList = [];
  sutTypeList = [];
  defaultZero = 0;
  bagTotal = 0;
  konTotal = 0;
  weightTotal = 0;
  emptyKonTotal = 0;
  emptyKonWeightTotal = 0;
  westage = 0;
  totalKon = 0;
  redusedWeight = 0;
  contractList = [];

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
    this.fetchShed();
    this.fetchYarn();
    this.fetchSutType("5ead05572a1e063f14ea6c17");
    this.fetchContract();

    this.route.params.subscribe((params: Params) => {
      this.windingInwardID = params["id"] ? params["id"] : "";
      this.editMode = params["id"] != null;
      this.buttonText = this.editMode ? "Update" : "Create";
      this.initForm();
    });
  }

  createForm() {
    this.windingInward = this.fb.group({
      GETPASS: ["", Validators.required],
      Date: ["", Validators.required],
      Party_Name: ["", Validators.required],
      Shed_Name: ["", Validators.required],
      Outward_GETPASS: ["", Validators.required],
      Outward_Date: ["", Validators.required],
      SUT_Name: ["", Validators.required],
      SUT_Type: ["", Validators.required],
      Color: [""],
      Count: ["", Validators.required],
      Total_Outward_Kon: [this.defaultZero],
      Total_Outward_Weight: [this.defaultZero],
      GODAWON_Bag: [this.defaultZero, Validators.required],
      GODAWON_Kon: [this.defaultZero, Validators.required],
      GODAWON_Weight: [this.defaultZero, Validators.required],
      GODAWON_Empty_Kon: [this.defaultZero, Validators.required],
      GODAWON_Empty_Kon_Weight: [this.defaultZero, Validators.required],
      KARKHANA_Bag: [this.defaultZero, Validators.required],
      KARKHANA_Kon: [this.defaultZero, Validators.required],
      KARKHANA_Weight: [this.defaultZero, Validators.required],
      KARKHANA_Empty_Kon: [this.defaultZero, Validators.required],
      KARKHANA_Empty_Kon_Weight: [this.defaultZero, Validators.required],
      Bag_TOTAL: [this.defaultZero],
      Kon_TOTAL: [this.defaultZero],
      Weight_TOTAL: [this.defaultZero],
      Empty_Kon_Total: [this.defaultZero],
      Empty_Kon_Weight_Total: [this.defaultZero],
      Total_Kon: [this.defaultZero],
      Westage: [this.defaultZero, Validators.required],
      Redused_Weight: [this.defaultZero],
      Contract: ["", Validators.required],
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

  get Contract() {
    return this.windingInward.get("Contract");
  }

  get GETPASS() {
    return this.windingInward.get("GETPASS");
  }

  get Date() {
    return this.windingInward.get("Date");
  }

  get Party_Name() {
    return this.windingInward.get("Party_Name");
  }

  get Shed_Name() {
    return this.windingInward.get("Shed_Name");
  }

  get SUT_Name() {
    return this.windingInward.get("SUT_Name");
  }

  get SUT_Type() {
    return this.windingInward.get("SUT_Type");
  }

  get Color() {
    return this.windingInward.get("Color");
  }

  get Count() {
    return this.windingInward.get("Count");
  }

  get Outward_GETPASS() {
    return this.windingInward.get("Outward_GETPASS");
  }

  get Outward_Date() {
    return this.windingInward.get("Outward_Date");
  }

  get GODAWON_Bag() {
    return this.windingInward.get("GODAWON_Bag");
  }

  get GODAWON_Kon() {
    return this.windingInward.get("GODAWON_Kon");
  }

  get GODAWON_Weight() {
    return this.windingInward.get("GODAWON_Weight");
  }

  get GODAWON_Empty_Kon() {
    return this.windingInward.get("GODAWON_Empty_Kon");
  }

  get GODAWON_Empty_Kon_Weight() {
    return this.windingInward.get("GODAWON_Empty_Kon_Weight");
  }

  get KARKHANA_Bag() {
    return this.windingInward.get("KARKHANA_Bag");
  }

  get KARKHANA_Kon() {
    return this.windingInward.get("KARKHANA_Kon");
  }

  get KARKHANA_Weight() {
    return this.windingInward.get("KARKHANA_Weight");
  }

  get KARKHANA_Empty_Kon() {
    return this.windingInward.get("KARKHANA_Empty_Kon");
  }

  get KARKHANA_Empty_Kon_Weight() {
    return this.windingInward.get("KARKHANA_Empty_Kon_Weight");
  }

  get Bag_TOTAL() {
    return this.windingInward.get("Bag_TOTAL");
  }

  get Kon_TOTAL() {
    return this.windingInward.get("Kon_TOTAL");
  }

  get Weight_TOTAL() {
    return this.windingInward.get("Weight_TOTAL");
  }

  get Empty_Kon_Total() {
    return this.windingInward.get("Empty_Kon_Total");
  }

  get Empty_Kon_Weight_Total() {
    return this.windingInward.get("Empty_Kon_Weight_Total");
  }

  get Total_Kon() {
    return this.windingInward.get("Total_Kon");
  }

  get Westage() {
    return this.windingInward.get("Westage");
  }

  get Redused_Weight() {
    return this.windingInward.get("Redused_Weight");
  }

  onSubmit() {
    this.spinner.show();
    const formData = this.windingInward.value;

    if (!this.editMode) {
      formData.Company_Id = this.cmaster.currentUser.Company_Id;
      formData.Year_Id = this.Year_Id;
      formData.Created_By = this.cmaster.currentUser.Company_Id;
      formData.Created_Date = new Date();

      this.cmaster.addData(formData, "add-winding-inward").subscribe((data) => {
        if (data != null) {
          this.toastr.success("Record added successfuly", "Success");
          this.windingInward.reset();
          this.router.navigate(["/inwards/winding-inward"]);
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
        .updateData(this.windingInwardID, formData, "update-winding-inward")
        .subscribe((data) => {
          if (data != null) {
            this.toastr.success("Record updated successfuly", "Success");
            this.router.navigate(["/inwards/winding-inward"]);
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
        .fetchDetails(this.windingInwardID, "winding-inward-details")
        .subscribe((details) => {
          const getpassdate = new Date(details.Date);
          const getpassMonth =
            getpassdate.getMonth() > 8
              ? getpassdate.getMonth() + 1
              : "0" + (getpassdate.getMonth() + 1);

          const getpassDay =
            getpassdate.getDate() > 9
              ? getpassdate.getDate()
              : "0" + getpassdate.getDate();
          const getpassYear = getpassdate.getFullYear();
          const getpassDate =
            getpassYear + "-" + getpassMonth + "-" + getpassDay;

          const outwardgetpassdate = new Date(details.Outward_Date);
          const outwardgetpassMonth =
            outwardgetpassdate.getMonth() > 8
              ? outwardgetpassdate.getMonth() + 1
              : "0" + (outwardgetpassdate.getMonth() + 1);

          const outwardgetpassDay =
            outwardgetpassdate.getDate() > 9
              ? outwardgetpassdate.getDate()
              : "0" + outwardgetpassdate.getDate();
          const outwardgetpassYear = outwardgetpassdate.getFullYear();
          const outwardgetpassDate =
            outwardgetpassYear +
            "-" +
            outwardgetpassMonth +
            "-" +
            outwardgetpassDay;

          this.windingInward.setValue({
            GETPASS: details.GETPASS,
            Date: getpassDate,
            Party_Name: details.Party_Name,
            Shed_Name: details.Shed_Name,
            Contract: details.Contract,
            Outward_GETPASS: details.Outward_GETPASS,
            Outward_Date: outwardgetpassDate,
            SUT_Name: details.SUT_Name,
            SUT_Type: details.SUT_Type,
            Color: details.Color,
            Count: details.Count,
            Total_Outward_Kon: details.Total_Outward_Kon,
            Total_Outward_Weight: details.Total_Outward_Weight,
            GODAWON_Bag: details.GODAWON_Bag,
            GODAWON_Kon: details.GODAWON_Kon,
            GODAWON_Weight: details.GODAWON_Weight,
            GODAWON_Empty_Kon: details.GODAWON_Empty_Kon,
            GODAWON_Empty_Kon_Weight: details.GODAWON_Empty_Kon_Weight,
            KARKHANA_Bag: details.KARKHANA_Bag,
            KARKHANA_Kon: details.KARKHANA_Kon,
            KARKHANA_Weight: details.KARKHANA_Weight,
            KARKHANA_Empty_Kon: details.KARKHANA_Empty_Kon,
            KARKHANA_Empty_Kon_Weight: details.KARKHANA_Empty_Kon_Weight,
            Bag_TOTAL: details.Bag_TOTAL,
            Kon_TOTAL: details.Kon_TOTAL,
            Weight_TOTAL: details.Weight_TOTAL,
            Empty_Kon_Total: details.Empty_Kon_Total,
            Empty_Kon_Weight_Total: details.Empty_Kon_Weight_Total,
            Total_Kon: details.Total_Kon,
            Westage: details.Westage,
            Redused_Weight: details.Redused_Weight,
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

  fetchShed() {
    this.cmaster.fetchData(0, 0, "fetch-loom").subscribe((list) => {
      this.shedList = list;
    });
  }

  fetchYarn() {
    this.cmaster.fetchData(0, 0, "fetch-yarn").subscribe((list) => {
      this.yarnList = list;
    });
  }

  fetchContract() {
    this.cmaster
      .fetchData(0, 0, "fetch-outward-job-contract")
      .subscribe((list) => {
        this.contractList = list;
      });
  }

  fetchSutType(_id: string) {
    this.cmaster
      .fetchDataFrom(_id, "fetch-commonchild-fromCM")
      .subscribe((list) => {
        this.sutTypeList = list;
      });
  }

  calculateBagTotal(GODAWONBag, KARKHANABag) {
    this.bagTotal = parseFloat(GODAWONBag) + parseFloat(KARKHANABag);
    this.Bag_TOTAL.patchValue(this.bagTotal);
  }

  calculateKonTotal(GODAWONKon, KARKHANAKon) {
    this.konTotal = parseFloat(GODAWONKon) + parseFloat(KARKHANAKon);
    this.Kon_TOTAL.patchValue(this.konTotal);
    const totalOutwardKon = this.windingInward.get("Total_Outward_Kon").value;
    this.totalKon = totalOutwardKon - this.konTotal;
    this.Total_Kon.patchValue(this.totalKon);
  }

  calculateWeightTotal(GODAWONWeight, KARKHANAWeight) {
    this.weightTotal = parseFloat(GODAWONWeight) + parseFloat(KARKHANAWeight);
    this.Weight_TOTAL.patchValue(this.weightTotal);
    this.calculateRedusedWeight();
  }

  calculateEmptyKonTotal(GODAWONEmptyKon, KARKHANAEmptyKon) {
    this.emptyKonTotal =
      parseFloat(GODAWONEmptyKon) + parseFloat(KARKHANAEmptyKon);
    this.Empty_Kon_Total.patchValue(this.emptyKonTotal);
  }

  calculateEmptyKonWeightTotal(GODAWONEmptyKonWeight, KARKHANAEmptyKonWeight) {
    this.emptyKonWeightTotal =
      parseFloat(GODAWONEmptyKonWeight) + parseFloat(KARKHANAEmptyKonWeight);
    this.Empty_Kon_Weight_Total.patchValue(this.emptyKonWeightTotal);
    this.calculateRedusedWeight();
  }

  calculateRedusedWeight() {
    const totalOutwardWeight = this.windingInward.get("Total_Outward_Weight")
      .value;

    const totalWeight =
      this.weightTotal +
      this.emptyKonWeightTotal +
      parseFloat(this.Westage.value);

    this.redusedWeight = totalOutwardWeight - totalWeight;
    this.Redused_Weight.patchValue(this.redusedWeight);
  }

  fetchTotalOutwards(SUTNAME, SUTTYPE, COUNT, COLOR) {
    const findData = {
      SUT_Name: SUTNAME,
      SUT_Type: SUTTYPE,
      Count: COUNT,
      Color: COLOR,
    };

    this.cmaster.findData(findData, "fetch-outward-stock").subscribe((data) => {
      const totalData = this.filterData(data);

      this.windingInward
        .get("Total_Outward_Kon")
        .patchValue(totalData.Kon_TOTAL);
      this.windingInward
        .get("Total_Outward_Weight")
        .patchValue(totalData.Weight_TOTAL);
    });
  }

  filterData(app) {
    const keys = Object.keys(app[0]);

    const sum = app.reduce((output, element) => {
      return keys.reduce((obj, key) => {
        obj[key] = (obj[key] || 0) + output[key] + element[key];
        return obj;
      }, {});
    });

    /* const result = Object.keys(sum).reduce((output, key) => {
      if (key.includes("GODAWON")) {
        output["GODAWON"] = {
          [key]: sum[key],
          ...(output["GODAWON"] || {}),
        };
      }
      if (key.includes("KARKHANA")) {
        output["KARKHANA"] = {
          [key]: sum[key],
          ...(output["KARKHANA"] || {}),
        };
      }
      if (key.includes("TOTAL")) {
        output["TOTAL"] = { [key]: sum[key], ...(output["TOTAL"] || {}) };
      }
      return output;
    }, {}); */

    return sum;
  }

  onCancel() {
    this.router.navigate(["/inwards/winding-inward"]);
  }
}
