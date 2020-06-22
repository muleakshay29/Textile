import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { InwardOutwardService } from "../../../../_services/inward-outward.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-add-winding-outward",
  templateUrl: "./add-winding-outward.component.html",
  styleUrls: ["./add-winding-outward.component.css"],
})
export class AddWindingOutwardComponent implements OnInit {
  windingOutward: FormGroup;
  windingOutwardID: string;
  editMode = false;
  buttonText: string;
  partyList = [];
  shedList = [];
  yarnList = [];
  sutTypeList = [];
  defaultZero: number = 0;
  bagTotal = 0;
  konTotal = 0;
  weightTotal = 0;
  selectedSUT;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private inoutservice: InwardOutwardService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.fetchParty();
    this.fetchShed();
    this.fetchYarn();
    this.fetchSutType("5ead05572a1e063f14ea6c17");

    this.route.params.subscribe((params: Params) => {
      this.windingOutwardID = params["id"] ? params["id"] : "";
      this.editMode = params["id"] != null;
      this.buttonText = this.editMode ? "Update" : "Create";
      this.initForm();
    });
  }

  createForm() {
    this.windingOutward = this.fb.group({
      GETPASS: ["", Validators.required],
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
      KARKHANA_Bag: [this.defaultZero, Validators.required],
      KARKHANA_Kon: [this.defaultZero, Validators.required],
      KARKHANA_Weight: [this.defaultZero, Validators.required],
      Bag_TOTAL: [this.defaultZero],
      Kon_TOTAL: [this.defaultZero],
      Weight_TOTAL: [this.defaultZero],
    });
  }

  get GETPASS() {
    return this.windingOutward.get("GETPASS");
  }

  get Date() {
    return this.windingOutward.get("Date");
  }

  get Party_Name() {
    return this.windingOutward.get("Party_Name");
  }

  get Shed_Name() {
    return this.windingOutward.get("Shed_Name");
  }

  get SUT_Name() {
    return this.windingOutward.get("SUT_Name");
  }

  get SUT_Type() {
    return this.windingOutward.get("SUT_Type");
  }

  get Color() {
    return this.windingOutward.get("Color");
  }

  get Count() {
    return this.windingOutward.get("Count");
  }

  get GODAWON_Bag() {
    return this.windingOutward.get("GODAWON_Bag");
  }

  get GODAWON_Kon() {
    return this.windingOutward.get("GODAWON_Kon");
  }

  get GODAWON_Weight() {
    return this.windingOutward.get("GODAWON_Weight");
  }

  get KARKHANA_Bag() {
    return this.windingOutward.get("KARKHANA_Bag");
  }

  get KARKHANA_Kon() {
    return this.windingOutward.get("KARKHANA_Kon");
  }

  get KARKHANA_Weight() {
    return this.windingOutward.get("KARKHANA_Weight");
  }

  get Bag_TOTAL() {
    return this.windingOutward.get("Bag_TOTAL");
  }

  get Kon_TOTAL() {
    return this.windingOutward.get("Kon_TOTAL");
  }

  get Weight_TOTAL() {
    return this.windingOutward.get("Weight_TOTAL");
  }

  onSubmit() {
    this.spinner.show();
    if (!this.editMode) {
      const formData = this.windingOutward.value;
      this.inoutservice
        .addData(formData, "add-winding-outward")
        .subscribe((data) => {
          if (data != null) {
            this.toastr.success("Record added successfuly", "Success");
            this.windingOutward.reset();
            this.router.navigate(["/inwards/winding-outward"]);
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
      const formData = this.windingOutward.value;

      this.inoutservice
        .updateData(this.windingOutwardID, formData, "update-winding-outward")
        .subscribe((data) => {
          if (data != null) {
            this.toastr.success("Record updated successfuly", "Success");
            this.router.navigate(["/inwards/winding-outward"]);
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
      this.inoutservice
        .fetchDetails(this.windingOutwardID, "winding-outward-details")
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

          this.windingOutward.setValue({
            GETPASS: details.GETPASS,
            Date: formatedDate,
            Party_Name: details.Party_Name,
            Shed_Name: details.Shed_Name,
            SUT_Name: details.SUT_Name,
            SUT_Type: details.SUT_Type,
            Color: details.Color,
            Count: details.Count,
            GODAWON_Bag: details.GODAWON_Bag,
            GODAWON_Kon: details.GODAWON_Kon,
            GODAWON_Weight: details.GODAWON_Weight,
            KARKHANA_Bag: details.KARKHANA_Bag,
            KARKHANA_Kon: details.KARKHANA_Kon,
            KARKHANA_Weight: details.KARKHANA_Weight,
            Bag_TOTAL: details.Bag_TOTAL,
            Kon_TOTAL: details.Kon_TOTAL,
            Weight_TOTAL: details.Weight_TOTAL,
          });
          this.spinner.hide();
        });
    }
  }

  fetchParty() {
    this.inoutservice.fetchData(0, 0, "fetch-party").subscribe((list) => {
      this.partyList = list;
    });
  }

  fetchShed() {
    this.inoutservice.fetchData(0, 0, "fetch-loom").subscribe((list) => {
      this.shedList = list;
    });
  }

  fetchYarn() {
    this.inoutservice.fetchData(0, 0, "fetch-yarn").subscribe((list) => {
      this.yarnList = list;
    });
  }

  fetchSutType(_id: string) {
    this.inoutservice
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
  }

  calculateWeightTotal(GODAWONWeight, KARKHANAWeight) {
    this.weightTotal = parseFloat(GODAWONWeight) + parseFloat(KARKHANAWeight);
    this.Weight_TOTAL.patchValue(this.weightTotal);
  }

  onCancel() {
    this.router.navigate(["/inwards/winding-outward"]);
  }
}
