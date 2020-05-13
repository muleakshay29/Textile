import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { InwardOutwardService } from "../../../../_services/inward-outward.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-add-yarn-inward",
  templateUrl: "./add-yarn-inward.component.html",
  styleUrls: ["./add-yarn-inward.component.css"],
})
export class AddYarnInwardComponent implements OnInit {
  yarnInward: FormGroup;
  yarnInwardID: string;
  editMode = false;
  buttonText: string;
  invoiceNo: any;
  partyList = [];
  shedList = [];
  yarnList = [];
  sutTypeList = [];
  pkgList = [];
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
    this.generateInvoice();
    this.fetchParty();
    this.fetchShed();
    this.fetchYarn();
    this.fetchSutType("5ead05572a1e063f14ea6c17");
    this.fetchPkg("5ead05672a1e063f14ea6c18");

    this.route.params.subscribe((params: Params) => {
      this.yarnInwardID = params["id"] ? params["id"] : "";
      this.editMode = params["id"] != null;
      this.buttonText = this.editMode ? "Update" : "Create";
      this.initForm();
    });
  }

  createForm() {
    this.yarnInward = this.fb.group({
      Invoice_No: [this.invoiceNo],
      GETPASS: ["", Validators.required],
      Date: ["", Validators.required],
      Party_Name: ["", Validators.required],
      Shed_Name: ["", Validators.required],
      SUT_Name: ["", Validators.required],
      SUT_Type: ["", Validators.required],
      Color: ["", Validators.required],
      Count: ["", Validators.required],
      GODAWON_Bag: ["", Validators.required],
      GODAWON_Kon: ["", Validators.required],
      GODAWON_Weight: ["", Validators.required],
      KARKHANA_Bag: ["", Validators.required],
      KARKHANA_Kon: ["", Validators.required],
      KARKHANA_Weight: ["", Validators.required],
      Bag_TOTAL: [""],
      Kon_TOTAL: [""],
      Weight_TOTAL: [""],
      Gross_Weight: ["", Validators.required],
      Package_Type: ["", Validators.required],
    });
  }

  generateInvoice() {
    this.invoiceNo = (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    ).toUpperCase();

    this.Invoice_No.patchValue(this.invoiceNo);
  }

  get Invoice_No() {
    return this.yarnInward.get("Invoice_No");
  }

  get GETPASS() {
    return this.yarnInward.get("GETPASS");
  }

  get Date() {
    return this.yarnInward.get("Date");
  }

  get Party_Name() {
    return this.yarnInward.get("Party_Name");
  }

  get Shed_Name() {
    return this.yarnInward.get("Shed_Name");
  }

  get SUT_Name() {
    return this.yarnInward.get("SUT_Name");
  }

  get SUT_Type() {
    return this.yarnInward.get("SUT_Type");
  }

  get Color() {
    return this.yarnInward.get("Color");
  }

  get Count() {
    return this.yarnInward.get("Count");
  }

  get GODAWON_Bag() {
    return this.yarnInward.get("GODAWON_Bag");
  }

  get GODAWON_Kon() {
    return this.yarnInward.get("GODAWON_Kon");
  }

  get GODAWON_Weight() {
    return this.yarnInward.get("GODAWON_Weight");
  }

  get KARKHANA_Bag() {
    return this.yarnInward.get("KARKHANA_Bag");
  }

  get KARKHANA_Kon() {
    return this.yarnInward.get("KARKHANA_Kon");
  }

  get KARKHANA_Weight() {
    return this.yarnInward.get("KARKHANA_Weight");
  }

  get Bag_TOTAL() {
    return this.yarnInward.get("Bag_TOTAL");
  }

  get Kon_TOTAL() {
    return this.yarnInward.get("Kon_TOTAL");
  }

  get Weight_TOTAL() {
    return this.yarnInward.get("Weight_TOTAL");
  }

  get Gross_Weight() {
    return this.yarnInward.get("Gross_Weight");
  }

  get Package_Type() {
    return this.yarnInward.get("Package_Type");
  }

  onSubmit() {
    this.spinner.show();
    if (!this.editMode) {
      const formData = this.yarnInward.value;
      this.inoutservice
        .addData(formData, "add-yarn-inward")
        .subscribe((data) => {
          if (data != null) {
            this.toastr.success("Record added successfuly", "Success");
            this.yarnInward.reset();
            this.router.navigate(["/inwards/yarn-inward"]);
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
      const formData = this.yarnInward.value;

      this.inoutservice
        .updateData(this.yarnInwardID, formData, "update-yarn-inward")
        .subscribe((data) => {
          if (data != null) {
            this.toastr.success("Record updated successfuly", "Success");
            this.router.navigate(["/inwards/yarn-inward"]);
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
        .fetchDetails(this.yarnInwardID, "yarn-inward-details")
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

          this.yarnInward.setValue({
            Invoice_No: details.Invoice_No,
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
            Gross_Weight: details.Gross_Weight,
            Package_Type: details.Package_Type,
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

  fetchPkg(_id: string) {
    this.inoutservice
      .fetchDataFrom(_id, "fetch-commonchild-fromCM")
      .subscribe((list) => {
        this.pkgList = list;
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
    this.router.navigate(["/inwards/yarn-inward"]);
  }
}
