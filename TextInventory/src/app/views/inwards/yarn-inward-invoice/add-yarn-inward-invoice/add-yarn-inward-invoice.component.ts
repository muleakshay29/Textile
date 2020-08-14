import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { CommonService } from "../../../../_services/common.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-add-yarn-inward-invoice",
  templateUrl: "./add-yarn-inward-invoice.component.html",
  styleUrls: ["./add-yarn-inward-invoice.component.css"],
})
export class AddYarnInwardInvoiceComponent implements OnInit {
  yarnInward: FormGroup;
  yarnInwardID: string;
  editMode = false;
  buttonText: string;
  Year_Id: any;
  invoiceNo: any;
  partyList = [];
  shedList = [];
  yarnList = [];
  sutTypeList = [];
  firmList = [];
  pkgList = [];
  defaultZero: number = 0;
  bagTotal: number = 0;
  konTotal = 0;
  weightTotal = 0;
  roundOff = 0;
  ratekg = 0;
  calamount = 0;
  grandtotal = 0;
  selectedSUT;
  hideShowPanel = false;

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
    this.generateInvoice();
    this.fetchParty();
    this.fetchShed();
    this.fetchFirm();
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

  showHidePanel(event) {
    const selectedFirm = event.target.value;
    if (selectedFirm != "") {
      this.hideShowPanel = true;
    } else {
      this.hideShowPanel = false;
    }
  }

  createForm() {
    this.yarnInward = this.fb.group({
      Invoice_No: [this.invoiceNo],
      GETPASS: ["", Validators.required],
      Date: ["", Validators.required],
      Party_Name: ["", Validators.required],
      Shed_Name: ["", Validators.required],
      Firm_Name: ["", Validators.required],
      SUT_Name: ["", Validators.required],
      SUT_Type: ["", Validators.required],
      Color: ["", Validators.required],
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
      Gross_Weight: ["", Validators.required],
      Package_Type: ["", Validators.required],
      Rate_KG: ["", Validators.required],
      Amount: ["", Validators.required],
      CGST_AMOUNT: ["", Validators.required],
      SGST_AMOUNT: ["", Validators.required],
      IGST_AMOUNT: ["", Validators.required],
      CGST: [""],
      SGST: [""],
      IGST: [""],
      GST_TOTAL: [""],
      TOTAL_AMOUNT: [""],
      Round_OFF: [""],
      Grand_Total: [""],
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

  get Firm_Name() {
    return this.yarnInward.get("Firm_Name");
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

  get Rate_KG() {
    return this.yarnInward.get("Rate_KG");
  }

  get Amount() {
    return this.yarnInward.get("Amount");
  }

  get CGST_AMOUNT() {
    return this.yarnInward.get("CGST_AMOUNT");
  }

  get SGST_AMOUNT() {
    return this.yarnInward.get("SGST_AMOUNT");
  }

  get IGST_AMOUNT() {
    return this.yarnInward.get("IGST_AMOUNT");
  }

  get Round_OFF() {
    return this.yarnInward.get("Round_OFF");
  }

  get Grand_Total() {
    return this.yarnInward.get("Grand_Total");
  }

  onSubmit() {
    this.spinner.show();
    const formData = this.yarnInward.value;

    if (!this.editMode) {
      formData.Company_Id = this.cmaster.currentUser.Company_Id;
      formData.Year_Id = this.Year_Id;
      formData.Created_By = this.cmaster.currentUser.Company_Id;
      formData.Created_Date = new Date();

      this.cmaster
        .addData(formData, "add-yarn-inward-invoice")
        .subscribe((data) => {
          if (data != null) {
            this.toastr.success("Record added successfuly", "Success");
            this.yarnInward.reset();
            this.router.navigate(["/inwards/yarn-inward-invoice"]);
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
      formData.Company_Id = this.cmaster.currentUser.Company_Id;
      formData.Year_Id = this.Year_Id;
      formData.Updated_By = this.cmaster.currentUser.Company_Id;
      formData.Updated_Date = new Date();

      this.cmaster
        .updateData(this.yarnInwardID, formData, "update-yarn-inward-invoice")
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
      this.hideShowPanel = true;

      this.cmaster
        .fetchDetails(this.yarnInwardID, "yarn-inward-invoice-details")
        .subscribe((details) => {
          this.selectedSUT = this.yarnList.filter((e) => {
            return e._id === details.SUT_Name;
          });

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
            Amount: details.Amount,
            Bag_TOTAL: details.Bag_TOTAL,
            CGST: details.CGST,
            CGST_AMOUNT: details.CGST_AMOUNT,
            Color: details.Color,
            Count: details.Count,
            Date: formatedDate,
            GETPASS: details.GETPASS,
            GODAWON_Bag: details.GODAWON_Bag,
            GODAWON_Kon: details.GODAWON_Kon,
            GODAWON_Weight: details.GODAWON_Weight,
            GST_TOTAL: details.GST_TOTAL,
            Grand_Total: details.Grand_Total,
            Gross_Weight: details.Gross_Weight,
            IGST: details.IGST,
            IGST_AMOUNT: details.IGST_AMOUNT,
            Invoice_No: details.Invoice_No,
            KARKHANA_Bag: details.KARKHANA_Bag,
            KARKHANA_Kon: details.KARKHANA_Kon,
            KARKHANA_Weight: details.KARKHANA_Weight,
            Kon_TOTAL: details.Kon_TOTAL,
            Package_Type: details.Package_Type,
            Party_Name: details.Party_Name,
            Firm_Name: details.Firm_Name,
            Rate_KG: details.Rate_KG,
            Round_OFF: details.Round_OFF,
            SGST: details.SGST,
            SGST_AMOUNT: details.SGST_AMOUNT,
            SUT_Name: details.SUT_Name,
            SUT_Type: details.SUT_Type,
            Shed_Name: details.Shed_Name,
            TOTAL_AMOUNT: details.TOTAL_AMOUNT,
            Weight_TOTAL: details.Weight_TOTAL,
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

  fetchFirm() {
    this.cmaster.fetchData(0, 0, "fetch-firm").subscribe((list) => {
      this.firmList = list;
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

  setGST(sut) {
    if (!this.Party_Name.value) {
      this.toastr.error("Please select Party first", "Error");
      this.SUT_Name.patchValue("");
    } else {
      // const sut = event.target.value;
      this.selectedSUT = this.yarnList.filter((e) => {
        return e._id === sut;
      });

      console.log(this.selectedSUT);

      this.yarnInward.get("CGST").patchValue(this.selectedSUT[0]["CGST"]);
      this.yarnInward.get("SGST").patchValue(this.selectedSUT[0]["SGST"]);
      this.yarnInward.get("IGST").patchValue(this.selectedSUT[0]["IGST"]);
    }
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

    this.calculateAmount(this.Rate_KG.value);
  }

  calculateAmount(rateKG) {
    if (!this.SUT_Name.value) {
      this.toastr.error("Please select SUT Name first", "Error");
    } else if (this.Weight_TOTAL.value == 0) {
      this.toastr.error(
        "Please enter values for GODAWON and KARKHANA",
        "Error"
      );
    } else {
      const amt = rateKG * this.Weight_TOTAL.value;
      this.Amount.patchValue(amt.toFixed(2));

      const cgst = (amt * this.selectedSUT[0]["CGST"]) / 100;
      this.CGST_AMOUNT.patchValue(cgst.toFixed(2));

      const sgst = (amt * this.selectedSUT[0]["SGST"]) / 100;
      this.SGST_AMOUNT.patchValue(sgst.toFixed(2));

      const igst = (amt * this.selectedSUT[0]["IGST"]) / 100;
      this.IGST_AMOUNT.patchValue(igst.toFixed(2));

      const total_gst =
        parseFloat(cgst.toFixed(2)) +
        parseFloat(sgst.toFixed(2)) +
        parseFloat(igst.toFixed(2));
      this.yarnInward.get("GST_TOTAL").patchValue(total_gst.toFixed(2));

      const totalAmt = amt + total_gst;
      this.yarnInward.get("TOTAL_AMOUNT").patchValue(totalAmt.toFixed(2));

      const rOffTemp: any = (totalAmt - Math.floor(totalAmt)).toFixed(3);

      if (rOffTemp != 0) {
        this.roundOff = 1 - parseFloat(rOffTemp);

        if (rOffTemp <= 0.5) {
          this.grandtotal = totalAmt - this.roundOff;
          this.roundOff = -this.roundOff;
        } else {
          this.grandtotal = totalAmt + this.roundOff;
          this.roundOff = +this.roundOff;
        }
      } else {
        this.grandtotal = totalAmt;
        this.roundOff = 0;
      }

      this.Round_OFF.patchValue(this.roundOff.toFixed(2));
      this.Grand_Total.patchValue(this.grandtotal.toFixed(2));
    }
  }

  onCancel() {
    this.router.navigate(["/inwards/yarn-inward-invoice"]);
  }
}
