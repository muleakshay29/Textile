import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { CommonService } from "../../../../_services/common.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { Validations } from "../../../../_helper/validations";
import { element } from "protractor";

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
  Year_Id: any;
  invoiceNo: any;
  partyList = [];
  shedList = [];
  yarnList = [];
  sutTypeList = [];
  qualityList = [];
  pkgList = [];
  defaultZero: number = 0;
  bagTotal = 0;
  konTotal = 0;
  weightTotal = 0;
  selectedSUT;
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
    this.generateInvoice();
    this.fetchParty();
    this.fetchShed();
    this.fetchYarn();
    // this.fetchQuality();
    this.fetchSutType("5ead05572a1e063f14ea6c17");
    this.fetchPkg("5ead05672a1e063f14ea6c18");
    // this.fetchContract();

    this.route.params.subscribe((params: Params) => {
      this.yarnInwardID = params["id"] ? params["id"] : "";
      this.editMode = params["id"] != null;
      this.buttonText = this.editMode ? "Update" : "Create";
      this.initForm();
    });
  }

  createForm() {
    this.yarnInward = this.fb.group({
      Invoice_No: [
        this.invoiceNo,
        [Validators.required, Validations.alphaNumericPattern],
      ],
      GETPASS: ["", Validators.required],
      Date: ["", Validators.required],
      Party_Name: ["", Validators.required],
      Shed_Name: ["", Validators.required],
      Quality: ["", Validators.required],
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
      Kon_TOTAL: [this.defaultZero, Validations.zeroValueCheck],
      Weight_TOTAL: [this.defaultZero, Validations.zeroValueCheck],
      Gross_Weight: [this.defaultZero, Validators.required],
      Package_Type: ["", Validators.required],
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

  generateInvoice() {
    this.invoiceNo = (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    ).toUpperCase();

    // this.Invoice_No.patchValue(this.invoiceNo);
  }

  get Contract() {
    return this.yarnInward.get("Contract");
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

  get Quality() {
    return this.yarnInward.get("Quality");
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
    const formData = this.yarnInward.value;

    if (!this.editMode) {
      formData.Company_Id = this.cmaster.currentUser.Company_Id;
      formData.Year_Id = this.Year_Id;
      formData.Created_By = this.cmaster.currentUser.Company_Id;
      formData.Created_Date = new Date();

      this.cmaster.addData(formData, "add-yarn-inward").subscribe((data) => {
        if (data != null) {
          const yarnStockData = {
            // InwardOutwardId: data._id,
            Invoice_No: formData.Invoice_No,
            GETPASS: formData.GETPASS,
            Date: formData.Date,
            Party_Name: formData.Party_Name,
            Shed_Name: formData.Shed_Name,
            SUT_Name: formData.SUT_Name,
            SUT_Type: formData.SUT_Type,
            SutUse: formData.SUT_Type,
            Color: formData.Color,
            Count: formData.Count,
            BagIn: formData.Bag_TOTAL,
            KonIn: formData.Kon_TOTAL,
            WeightIn: formData.Weight_TOTAL,
            EmptyKonIn: 0,
            BagOut: 0,
            KonOut: 0,
            WeightOut: formData.Gross_Weight,
            EmptyKonOut: 0,
            EntryFrom: "Yarn Inward",
            Company_Id: this.cmaster.currentUser.Company_Id,
            Year_Id: this.Year_Id,
            Created_By: this.cmaster.currentUser.Company_Id,
            Created_Date: new Date(),
          };
          this.cmaster
            .addData(yarnStockData, "add-stock-yarn")
            .subscribe((stock) => {
              if (stock !== null) {
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
        .updateData(this.yarnInwardID, formData, "update-yarn-inward")
        .subscribe((data) => {
          if (data != null) {
            this.cmaster
              .deleteData(this.yarnInwardID, "delete-stock-yarn")
              .subscribe((result) => {
                if (result != null) {
                  const yarnStockData = {
                    InwardOutwardId: data._id,
                    Invoice_No: formData.Invoice_No,
                    GETPASS: formData.GETPASS,
                    Date: formData.Date,
                    Party_Name: formData.Party_Name,
                    Shed_Name: formData.Shed_Name,
                    SUT_Name: formData.SUT_Name,
                    SUT_Type: formData.SUT_Type,
                    SutUse: formData.SUT_Type,
                    Color: formData.Color,
                    Count: formData.Count,
                    BagIn: formData.Bag_TOTAL,
                    KonIn: formData.Kon_TOTAL,
                    WeightIn: formData.Weight_TOTAL,
                    EmptyKonIn: 0,
                    BagOut: 0,
                    KonOut: 0,
                    WeightOut: formData.Gross_Weight,
                    EmptyKonOut: 0,
                    EntryFrom: "Yarn Inward",
                    Company_Id: this.cmaster.currentUser.Company_Id,
                    Year_Id: this.Year_Id,
                    Updated_By: this.cmaster.currentUser.Company_Id,
                    Updated_Date: new Date(),
                  };

                  this.cmaster
                    .addData(yarnStockData, "add-stock-yarn")
                    .subscribe((stock) => {
                      if (stock !== null) {
                        this.toastr.success(
                          "Record added successfuly",
                          "Success"
                        );
                        this.yarnInward.reset();
                        this.router.navigate(["/inwards/yarn-inward"]);
                        this.spinner.hide();
                      }
                    });
                }
              });
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

          this.fetchContract(details.Party_Name);
          this.fetchQuality(details.Contract);

          this.yarnInward.setValue({
            Invoice_No: details.Invoice_No,
            GETPASS: details.GETPASS,
            Date: formatedDate,
            Party_Name: details.Party_Name,
            Shed_Name: details.Shed_Name,
            SUT_Name: details.SUT_Name,
            Contract: details.Contract,
            Quality: details.Quality,
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

  fetchQuality(contract) {
    this.qualityList = [];
    if (contract == 0) {
      this.cmaster.fetchData(0, 0, "fetch-quality").subscribe((list) => {
        this.qualityList = list;
      });
    } else {
      if (this.contractList.length > 0) {
        this.contractList.filter((element) => {
          if (contract == element._id) {
            this.cmaster
              .fetchDetails(element.Quality._id, "quality-details")
              .subscribe((details) => {
                this.qualityList.push(details);
              });
          }
        });
      } else {
        this.cmaster.fetchData(0, 0, "fetch-quality").subscribe((list) => {
          this.qualityList = list;
        });
      }
    }
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
          this.fetchQuality(0);
        }
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
