import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { CommonService } from "../../../../_services/common.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { of } from "rxjs";

@Component({
  selector: "app-add-yarn-outward",
  templateUrl: "./add-yarn-outward.component.html",
  styleUrls: ["./add-yarn-outward.component.css"],
})
export class AddYarnOutwardComponent implements OnInit {
  yarnOutward: FormGroup;
  yarnOutwardID: string;
  editMode = false;
  buttonText: string;
  Year_Id: any;
  partyList = [];
  shedList = [];
  yarnList = [];
  sutTypeList = [];
  pkgList = [];
  defaultZero = 0;
  bagTotal = 0;
  konTotal = 0;
  weightTotal = 0;
  windingBagTotal = 0;
  windingKonTotal = 0;
  windingWeightTotal = 0;
  emptyKonWeightTotal = 0;
  westage = 0;
  totalKon = 0;
  redusedWeight = 0;
  availableStockData: any = [];
  availableOutwardStock: any = [];
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
    this.fetchPkg("5ead05672a1e063f14ea6c18");
    // this.fetchContract();

    this.route.params.subscribe((params: Params) => {
      this.yarnOutwardID = params["id"] ? params["id"] : "";
      this.editMode = params["id"] != null;
      this.buttonText = this.editMode ? "Update" : "Create";
      this.initForm();
    });
  }

  createForm() {
    this.yarnOutward = this.fb.group({
      GETPASS_NO: ["", Validators.required],
      Date: ["", Validators.required],
      Party_Name: ["", Validators.required],
      Shed_Name: ["", Validators.required],
      SUT_Name: ["", Validators.required],
      SUT_Type: ["", Validators.required],
      Color: [""],
      Count: ["", Validators.required],
      GODAWON_Bag: [this.defaultZero, Validators.required],
      GODAWON_Kon: [this.defaultZero, Validators.required],
      GODAWON_Weight: [this.defaultZero, Validators.required],
      GODAWON_Winding_Bag: [this.defaultZero, Validators.required],
      GODAWON_Winding_Kon: [this.defaultZero, Validators.required],
      GODAWON_Winding_Weight: [this.defaultZero, Validators.required],
      KARKHANA_Bag: [this.defaultZero, Validators.required],
      KARKHANA_Kon: [this.defaultZero, Validators.required],
      KARKHANA_Weight: [this.defaultZero, Validators.required],
      KARKHANA_Winding_Bag: [this.defaultZero, Validators.required],
      KARKHANA_Winding_Kon: [this.defaultZero, Validators.required],
      KARKHANA_Winding_Weight: [this.defaultZero, Validators.required],
      Bag_TOTAL: [this.defaultZero],
      Kon_TOTAL: [this.defaultZero],
      Weight_TOTAL: [this.defaultZero],
      Winding_Bag_Total: [this.defaultZero],
      Winding_Kon_Total: [this.defaultZero],
      Winding_Weight_Total: [this.defaultZero],
      BAG: [this.defaultZero],
      KON: [this.defaultZero],
      WEIGHT: [this.defaultZero],
      Package_Type: ["", Validators.required],
      Contract: ["", Validators.required],
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

  get Contract() {
    return this.yarnOutward.get("Contract");
  }

  get GETPASS_NO() {
    return this.yarnOutward.get("GETPASS_NO");
  }

  get Date() {
    return this.yarnOutward.get("Date");
  }

  get Party_Name() {
    return this.yarnOutward.get("Party_Name");
  }

  get Shed_Name() {
    return this.yarnOutward.get("Shed_Name");
  }

  get SUT_Name() {
    return this.yarnOutward.get("SUT_Name");
  }

  get SUT_Type() {
    return this.yarnOutward.get("SUT_Type");
  }

  get Color() {
    return this.yarnOutward.get("Color");
  }

  get Count() {
    return this.yarnOutward.get("Count");
  }

  get GODAWON_Bag() {
    return this.yarnOutward.get("GODAWON_Bag");
  }

  get GODAWON_Kon() {
    return this.yarnOutward.get("GODAWON_Kon");
  }

  get GODAWON_Weight() {
    return this.yarnOutward.get("GODAWON_Weight");
  }

  get GODAWON_Winding_Bag() {
    return this.yarnOutward.get("GODAWON_Winding_Bag");
  }

  get GODAWON_Winding_Kon() {
    return this.yarnOutward.get("GODAWON_Winding_Kon");
  }

  get GODAWON_Winding_Weight() {
    return this.yarnOutward.get("GODAWON_Winding_Weight");
  }

  get KARKHANA_Bag() {
    return this.yarnOutward.get("KARKHANA_Bag");
  }

  get KARKHANA_Kon() {
    return this.yarnOutward.get("KARKHANA_Kon");
  }

  get KARKHANA_Weight() {
    return this.yarnOutward.get("KARKHANA_Weight");
  }

  get KARKHANA_Winding_Bag() {
    return this.yarnOutward.get("KARKHANA_Winding_Bag");
  }

  get KARKHANA_Winding_Kon() {
    return this.yarnOutward.get("KARKHANA_Winding_Kon");
  }

  get KARKHANA_Winding_Weight() {
    return this.yarnOutward.get("KARKHANA_Winding_Weight");
  }

  get Bag_TOTAL() {
    return this.yarnOutward.get("Bag_TOTAL");
  }

  get Kon_TOTAL() {
    return this.yarnOutward.get("Kon_TOTAL");
  }

  get Weight_TOTAL() {
    return this.yarnOutward.get("Weight_TOTAL");
  }

  get Winding_Bag_Total() {
    return this.yarnOutward.get("Winding_Bag_Total");
  }

  get Winding_Kon_Total() {
    return this.yarnOutward.get("Winding_Kon_Total");
  }

  get Winding_Weight_Total() {
    return this.yarnOutward.get("Winding_Weight_Total");
  }

  get BAG() {
    return this.yarnOutward.get("BAG");
  }

  get KON() {
    return this.yarnOutward.get("KON");
  }

  get WEIGHT() {
    return this.yarnOutward.get("WEIGHT");
  }

  get Package_Type() {
    return this.yarnOutward.get("Package_Type");
  }

  onSubmit() {
    this.spinner.show();
    const formData = this.yarnOutward.value;

    if (!this.editMode) {
      formData.Company_Id = this.cmaster.currentUser.Company_Id;
      formData.Year_Id = this.Year_Id;
      formData.Created_By = this.cmaster.currentUser.Company_Id;
      formData.Created_Date = new Date();

      this.cmaster.addData(formData, "add-yarn-outward").subscribe((data) => {
        if (data != null) {
          this.toastr.success("Record added successfuly", "Success");
          this.yarnOutward.reset();
          this.router.navigate(["/inwards/yarn-outward"]);
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
        .updateData(this.yarnOutwardID, formData, "update-yarn-outward")
        .subscribe((data) => {
          if (data != null) {
            this.toastr.success("Record updated successfuly", "Success");
            this.router.navigate(["/inwards/yarn-outward"]);
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
        .fetchDetails(this.yarnOutwardID, "yarn-outward-details")
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

          this.fetchContract(details.Party_Name);

          this.yarnOutward.setValue({
            GETPASS_NO: details.GETPASS_NO,
            Date: getpassDate,
            Party_Name: details.Party_Name,
            Shed_Name: details.Shed_Name,
            Contract: details.Contract,
            SUT_Name: details.SUT_Name,
            SUT_Type: details.SUT_Type,
            Color: details.Color,
            Count: details.Count,
            GODAWON_Bag: details.GODAWON_Bag,
            GODAWON_Kon: details.GODAWON_Kon,
            GODAWON_Weight: details.GODAWON_Weight,
            GODAWON_Winding_Bag: details.GODAWON_Winding_Bag,
            GODAWON_Winding_Kon: details.GODAWON_Winding_Kon,
            GODAWON_Winding_Weight: details.GODAWON_Winding_Weight,
            KARKHANA_Bag: details.KARKHANA_Bag,
            KARKHANA_Kon: details.KARKHANA_Kon,
            KARKHANA_Weight: details.KARKHANA_Weight,
            KARKHANA_Winding_Bag: details.KARKHANA_Winding_Bag,
            KARKHANA_Winding_Kon: details.KARKHANA_Winding_Kon,
            KARKHANA_Winding_Weight: details.KARKHANA_Winding_Weight,
            Bag_TOTAL: details.Bag_TOTAL,
            Kon_TOTAL: details.Kon_TOTAL,
            Weight_TOTAL: details.Weight_TOTAL,
            Winding_Bag_Total: details.Winding_Bag_Total,
            Winding_Kon_Total: details.Winding_Kon_Total,
            Winding_Weight_Total: details.Winding_Weight_Total,
            BAG: details.BAG,
            KON: details.KON,
            WEIGHT: details.WEIGHT,
            Package_Type: details.Package_Type,
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

  fetchSutType(_id: string) {
    this.cmaster
      .fetchDataFrom(_id, "fetch-commonchild-fromCM")
      .subscribe((list) => {
        this.sutTypeList = list;
      });
  }

  fetchPkg(_id: string) {
    this.cmaster
      .fetchDataFrom(_id, "fetch-commonchild-fromCM")
      .subscribe((list) => {
        this.pkgList = list;
      });
  }

  fetchContract(party) {
    this.contractList = [];
    this.cmaster
      .findData({ Party_Name: party }, "find-party-inward-job-contract")
      .subscribe((list) => {
        if (list.length > 0) {
          this.contractList = list;
        } else {
          this.Contract.patchValue(0);
        }
      });
  }

  calculateBagTotal(GODAWONBag, KARKHANABag) {
    if (
      GODAWONBag > this.availableStockData.GODAWON.GODAWON_Bag ||
      GODAWONBag < 0
    ) {
      this.toastr.error("Bag value should be within Available Stock", "Error");
      this.GODAWON_Bag.patchValue(0);
      this.Bag_TOTAL.patchValue(0);
    } else if (
      KARKHANABag > this.availableStockData.KARKHANA.KARKHANA_Bag ||
      KARKHANABag < 0
    ) {
      this.toastr.error("Bag value should be within Available Stock", "Error");
      this.KARKHANA_Bag.patchValue(0);
      this.Bag_TOTAL.patchValue(0);
    } else {
      this.bagTotal = parseFloat(GODAWONBag) + parseFloat(KARKHANABag);
      this.Bag_TOTAL.patchValue(this.bagTotal);
    }
  }

  calculateKonTotal(GODAWONKon, KARKHANAKon) {
    if (
      GODAWONKon > this.availableStockData.GODAWON.GODAWON_Kon ||
      GODAWONKon < 0
    ) {
      this.toastr.error("Bag value should be within Available Stock", "Error");
      this.GODAWON_Kon.patchValue(0);
      this.Kon_TOTAL.patchValue(0);
    } else if (
      KARKHANAKon > this.availableStockData.KARKHANA.KARKHANA_Kon ||
      KARKHANAKon < 0
    ) {
      this.toastr.error("Kon value should be within Available Stock", "Error");
      this.KARKHANA_Kon.patchValue(0);
      this.Kon_TOTAL.patchValue(0);
    } else {
      this.konTotal = parseFloat(GODAWONKon) + parseFloat(KARKHANAKon);
      this.Kon_TOTAL.patchValue(this.konTotal);
    }
  }

  calculateWeightTotal(GODAWONWeight, KARKHANAWeight) {
    if (
      GODAWONWeight > this.availableStockData.GODAWON.GODAWON_Weight ||
      GODAWONWeight < 0
    ) {
      this.toastr.error(
        "Weight value should be within Available Stock",
        "Error"
      );
      this.GODAWON_Weight.patchValue(0);
      this.Weight_TOTAL.patchValue(0);
    } else if (
      KARKHANAWeight > this.availableStockData.KARKHANA.KARKHANA_Weight ||
      KARKHANAWeight < 0
    ) {
      this.toastr.error(
        "Weight value should be within Available Stock",
        "Error"
      );
      this.KARKHANA_Weight.patchValue(0);
      this.Weight_TOTAL.patchValue(0);
    } else {
      this.weightTotal = parseFloat(GODAWONWeight) + parseFloat(KARKHANAWeight);
      this.Weight_TOTAL.patchValue(this.weightTotal);
    }
  }

  calculateWindingBagTotal(GODAWONWindingBag, KARKHANAWindingBag) {
    this.windingBagTotal =
      parseFloat(GODAWONWindingBag) + parseFloat(KARKHANAWindingBag);
    this.Winding_Bag_Total.patchValue(this.windingBagTotal);
  }

  calculateWindingKonTotal(GODAWONWindingKon, KARKHANAWindingKon) {
    this.windingKonTotal =
      parseFloat(GODAWONWindingKon) + parseFloat(KARKHANAWindingKon);
    this.Winding_Kon_Total.patchValue(this.windingKonTotal);
  }

  calculateWindingWeightTotal(GODAWONWindingWeight, KARKHANAWindingWeight) {
    this.windingWeightTotal =
      parseFloat(GODAWONWindingWeight) + parseFloat(KARKHANAWindingWeight);
    this.Winding_Weight_Total.patchValue(this.windingWeightTotal);
  }

  fetchAvailableStock(SUTNAME, SUTTYPE, COUNT, COLOR) {
    const findData = {
      SUT_Name: SUTNAME,
      SUT_Type: SUTTYPE,
      Count: COUNT,
      Color: COLOR,
    };
    this.cmaster
      .findData(findData, "fetch-available-inward-stock")
      .subscribe((data) => {
        this.cmaster
          .findData(findData, "fetch-available-outward-stock")
          .subscribe((data2) => {
            if (Object.keys(data).length > 0) {
              if (Object.keys(data2).length > 0) {
                this.availableStockData = this.filterWithOutwardData(
                  data,
                  data2
                );
              } else {
                this.availableStockData = this.filterData(data);
              }
            } else {
              this.availableStockData = {};
              this.availableStockData = {
                GODAWON: { GODAWON_Weight: 0, GODAWON_Kon: 0, GODAWON_Bag: 0 },
                KARKHANA: {
                  KARKHANA_Weight: 0,
                  KARKHANA_Kon: 0,
                  KARKHANA_Bag: 0,
                },
                TOTAL: { Weight_TOTAL: 0, Kon_TOTAL: 0, Bag_TOTAL: 0 },
              };
            }
          });
      });
  }

  filterWithOutwardData(app, app1) {
    const keys = Object.keys(app[0]);
    const keys1 = Object.keys(app1[0]);

    const sum = app.reduce((output, element) => {
      return keys.reduce((obj, key) => {
        obj[key] = (obj[key] || 0) + output[key] + element[key];
        return obj;
      }, {});
    });

    const sum2 = app1.reduce((output, element) => {
      return keys1.reduce((obj, key) => {
        obj[key] = (obj[key] || 0) + output[key] + element[key];
        return obj;
      }, {});
    });

    delete sum._id;
    delete sum2._id;

    let newData = [];
    const outward = Object.keys(sum2).reduce((obj, key) => {
      newData[key] = sum[key] - (sum2[key] || 0);
      newData[key] = newData[key] < 0 ? 0 : newData[key];
      return newData;
    }, {});

    const result = Object.keys(outward).reduce((output, key) => {
      if (key.includes("GODAWON")) {
        output["GODAWON"] = {
          [key]: outward[key],
          ...(output["GODAWON"] || {}),
        };
      }
      if (key.includes("KARKHANA")) {
        output["KARKHANA"] = {
          [key]: outward[key],
          ...(output["KARKHANA"] || {}),
        };
      }
      if (key.includes("TOTAL")) {
        output["TOTAL"] = { [key]: outward[key], ...(output["TOTAL"] || {}) };
      }
      return output;
    }, {});

    return result;
  }

  filterData(app) {
    const keys = Object.keys(app[0]);

    const sum = app.reduce((output, element) => {
      return keys.reduce((obj, key) => {
        obj[key] = (obj[key] || 0) + output[key] + element[key];
        return obj;
      }, {});
    });

    const result = Object.keys(sum).reduce((output, key) => {
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
    }, {});

    return result;
  }

  onCancel() {
    this.router.navigate(["/inwards/yarn-outward"]);
  }
}
