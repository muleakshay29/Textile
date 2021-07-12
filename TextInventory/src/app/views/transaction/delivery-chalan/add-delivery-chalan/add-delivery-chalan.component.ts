import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { CommonService } from "../../../../_services/common.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { element } from "protractor";
import { DeliveryChalanPrintComponent } from "../../../../_helper/delivery-chalan-print/delivery-chalan-print.component";

@Component({
  selector: "app-add-delivery-chalan",
  templateUrl: "./add-delivery-chalan.component.html",
  styleUrls: ["./add-delivery-chalan.component.css"],
})
export class AddDeliveryChalanComponent implements OnInit {
  deliveryChalan: FormGroup;
  deliveryChalanID: string;
  beamList: FormArray;
  editMode = false;
  buttonText: string;
  Year_Id: any;
  shedList = [];
  partyList = [];
  qualityList = [];
  firmList = [];
  brokerList = [];
  defaultValue = 0;
  invoiceNo: any;
  TagaStockDetails = [];
  SelectedTagaStockDetails = [];

  totalMtrs = 0;
  totalPieces = 0;
  checkboxCounter = 0;
  warfList = [];
  weftList = [];
  qualityDetails = [];
  totalWarfConsumption = 0;
  totalWeftConsumption = 0;
  chalanNo: number;
  deliveryChalanDetails: [];
  contractList = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private commonservice: CommonService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getYearId();
    this.generateInvoice();
    this.fetchQuality();
    this.fetchParty();
    this.fetchFirm();
    this.fetchBroker();
    this.getItemCount();

    // this.fetchContract();

    this.route.params.subscribe((params: Params) => {
      this.deliveryChalanID = params["id"] ? params["id"] : "";
      this.editMode = params["id"] != null;
      this.buttonText = this.editMode ? "Update" : "Create";
      this.initForm();
    });
  }

  createForm() {
    this.deliveryChalan = this.fb.group({
      Chalan_No: ["", Validators.required],
      Date: ["", Validators.required],
      Firm_Name: ["", Validators.required],
      Broker_Name: ["", Validators.required],
      Party_Name: ["", Validators.required],
      Place: ["", Validators.required],
      Bales: [this.defaultValue, Validators.required],
      Pieces: [this.defaultValue],
      Folding: [this.defaultValue, Validators.required],
      Meters: [this.defaultValue],
      Sample_Cut_Pieces: [this.defaultValue, Validators.required],
      Design: ["", Validators.required],
      Shade_Name: ["", Validators.required],
      Total_Warf_Consumption: [this.defaultValue],
      Total_Weft_Consumption: [this.defaultValue],
      Contract: ["", Validators.required],
    });
  }

  getYearId() {
    this.Year_Id = localStorage.getItem("selectedYear");
    /* let today = new Date();
    const year = today.getFullYear();
    this.commonservice
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

    // this.Chalan_No.patchValue(this.invoiceNo);
  }

  get Contract() {
    return this.deliveryChalan.get("Contract");
  }

  get Chalan_No() {
    return this.deliveryChalan.get("Chalan_No");
  }

  get Date() {
    return this.deliveryChalan.get("Date");
  }

  get Firm_Name() {
    return this.deliveryChalan.get("Firm_Name");
  }

  get Broker_Name() {
    return this.deliveryChalan.get("Broker_Name");
  }

  get Party_Name() {
    return this.deliveryChalan.get("Party_Name");
  }

  get Place() {
    return this.deliveryChalan.get("Place");
  }

  get Folding() {
    return this.deliveryChalan.get("Folding");
  }

  get Bales() {
    return this.deliveryChalan.get("Bales");
  }

  get Sample_Cut_Pieces() {
    return this.deliveryChalan.get("Sample_Cut_Pieces");
  }

  get Design() {
    return this.deliveryChalan.get("Design");
  }

  get Shade_Name() {
    return this.deliveryChalan.get("Shade_Name");
  }

  get Total_Warf_Consumption() {
    return this.deliveryChalan.get("Total_Warf_Consumption");
  }

  get Total_Weft_Consumption() {
    return this.deliveryChalan.get("Total_Weft_Consumption");
  }

  onSubmit() {
    this.spinner.show();
    const formData = this.deliveryChalan.value;

    if (!this.editMode) {
      formData.Company_Id = this.commonservice.currentUser.Company_Id;
      formData.Year_Id = this.Year_Id;
      formData.Created_By = this.commonservice.currentUser.Company_Id;
      formData.Created_Date = new Date();
      formData.UniqueCode = this.commonservice.generateUniqueCode(
        "DELIVERYCHALAN",
        this.Year_Id
      );

      this.commonservice
        .addData(formData, "add-delivery-chalan")
        .subscribe((data) => {
          if (data != null) {
            let pieceCounter = 0;
            let errorArr = [];

            this.SelectedTagaStockDetails.forEach((element) => {
              pieceCounter++;
              const gramez = 0;
              const chalanDetails = {
                DeliveryCHalanID: data._id,
                Quality: formData.Design,
                Shade_Name: formData.Shade_Name,
                Loom_No: element.Loom_No,
                Piece_No: pieceCounter,
                Meters: element.TAGA_Meter,
                Weight: element.TAGA_Weight,
                TAGA_NO: element.TAGA_NO,
                Status: 0,
                GRAMEZ:
                  element.TAGA_Weight > 0
                    ? element.TAGA_Meter / element.TAGA_Weight
                    : element.TAGA_Meter,
              };

              this.commonservice
                .addData(chalanDetails, "add-delivery-chalan-details")
                .subscribe((result) => {
                  if (result !== null) {
                    errorArr.push(0);
                  } else {
                    errorArr.push(-1);
                  }
                });

              const updateStockData = {
                Delivery_Chalan_Id: data._id,
                Updated_By: this.commonservice.currentUser.Company_Id,
                Updated_Date: new Date(),
                IsUsed: 1,
              };

              this.commonservice
                .updateData(
                  element.id,
                  updateStockData,
                  "update-stock-taga-with-delivery-chaln"
                )
                .subscribe((result) => {
                  if (result !== null) {
                    this.toastr.success(
                      "Record added successfuly in stock taga",
                      "Success"
                    );
                  } else {
                    this.toastr.error(
                      "Error adding record In Staock taga. Please try again.",
                      "Error"
                    );
                  }
                });
            });

            this.warfList.forEach((element) => {
              const yarnStockData = {
                InwardOutwardId: data._id,
                Invoice_No: formData.Chalan_No,
                Date: formData.Date,
                Party_Name: formData.Party_Name,
                Shed_Name: formData.Shade_Name,
                SUT_Name: element.SUT_WARP,
                SUT_Type: "WARF",
                SutUse: "warf",
                Color: element.Color_WARP,
                Count: element.Count_WARP,
                Location: formData.Place,
                BagIn: 0,
                KonIn: 0,
                WeightIn: 0,
                EmptyKonIn: 0,
                BagOut: 0,
                KonOut: 0,
                WeightOut: element.WarfConsumption,
                EmptyKonOut: 0,
                EntryFrom: "Delivery Chalan",
                Quality: formData.Design,
                Company_Id: this.commonservice.currentUser.Company_Id,
                Year_Id: this.Year_Id,
                Created_By: this.commonservice.currentUser.Company_Id,
                Created_Date: new Date(),
              };
              this.commonservice
                .addData(yarnStockData, "add-stock-yarn")
                .subscribe((stock) => {
                  if (stock !== null) {
                    errorArr.push(0);
                    this.toastr.success(
                      "Record added successfuly in stock taga",
                      "Success"
                    );
                  } else {
                    errorArr.push(-1);
                    this.toastr.error(
                      "Error adding record In Staock taga. Please try again.",
                      "Error"
                    );
                  }
                });
            });

            this.weftList.forEach((element) => {
              const yarnStockData = {
                Invoice_No: formData.Chalan_No,
                Date: formData.Date,
                Party_Name: formData.Party_Name,
                Shed_Name: formData.Shade_Name,
                SUT_Name: element.SUT_WEFT,
                SUT_Type: "WEFT",
                SutUse: "weft",
                Color: element.Color_WEFT,
                Count: element.Count_WEFT,
                Location: formData.Place,
                BagIn: 0,
                KonIn: 0,
                WeightIn: 0,
                EmptyKonIn: 0,
                BagOut: 0,
                KonOut: 0,
                WeightOut: element.WeftConsumption,
                EmptyKonOut: 0,
                EntryFrom: "Delivery Chalan",
                Quality: formData.Design,
              };
              this.commonservice
                .addData(yarnStockData, "add-stock-yarn")
                .subscribe((stock) => {
                  if (stock !== null) {
                    errorArr.push(0);
                  } else {
                    errorArr.push(-1);
                  }
                });
            });

            if (errorArr.includes(-1)) {
              this.toastr.error(
                "Error adding record. Please try again.",
                "Error"
              );
              this.spinner.hide();
            } else {
              this.commonservice
                .fetchDetails(
                  data._id,
                  "fetch-delivery-chalan-sales-invoice-by-id"
                )
                .subscribe((content) => {
                  console.log("content", content);
                  this.commonservice.openPrintModal(
                    content,
                    data._id,
                    DeliveryChalanPrintComponent
                  );
                  /* result.content.onClose.subscribe((result: boolean) => {
                    if (result == true) {
                      this.spinner.show();
                    }
                  }); */
                });

              this.toastr.success("Record added successfuly", "Success");
              this.deliveryChalan.reset();
              this.router.navigate(["/transaction/delivery-chalan"]);
              this.spinner.hide();
            }
          } else {
            this.toastr.error(
              "Error adding record. Please try again.",
              "Error"
            );
            this.spinner.hide();
          }
        });
    } else {
      formData.Company_Id = this.commonservice.currentUser.Company_Id;
      formData.Year_Id = this.Year_Id;
      formData.Updated_By = this.commonservice.currentUser.Company_Id;
      formData.Updated_Date = new Date();

      this.commonservice
        .updateData(this.deliveryChalanID, formData, "update-delivery-chalan")
        .subscribe((data) => {
          if (data != null) {
            console.log(data);

            this.toastr.success(
              "Record updated successfuly " + data,
              "Success"
            );
            this.deliveryChalan.reset();
            this.router.navigate(["/transaction/delivery-chalan"]);
            this.spinner.hide();
          } else {
            this.toastr.error(
              "Error updating record. Please try again.",
              "Error"
            );
            this.spinner.hide();
          }
        });
    }
  }

  private initForm() {
    if (this.editMode) {
      this.spinner.show();
      this.commonservice
        .fetchDetails(this.deliveryChalanID, "delivery-chalan-details")
        .subscribe((details) => {
          const fromdate = new Date(details.Date);
          const formatedfromMonth =
            fromdate.getMonth() > 8
              ? fromdate.getMonth() + 1
              : "0" + (fromdate.getMonth() + 1);

          const formatedfromDay =
            fromdate.getDate() > 9
              ? fromdate.getDate()
              : "0" + fromdate.getDate();
          const formatedfromYear = fromdate.getFullYear();
          const formatedDate =
            formatedfromYear + "-" + formatedfromMonth + "-" + formatedfromDay;

          this.fetchContract(details.Party_Name);

          this.deliveryChalan.setValue({
            Chalan_No: details.Chalan_No,
            Date: formatedDate,
            Firm_Name: details.Firm_Name,
            Broker_Name: details.Broker_Name,
            Party_Name: details.Party_Name,
            Contract: details.Contract || 0,
            Folding: details.Folding || 0,
            Place: details.Place,
            Bales: details.Bales,
            Pieces: details.Pieces,
            Meters: details.Meters,
            Sample_Cut_Pieces: details.Sample_Cut_Pieces,
            Design: details.Design,
            Shade_Name: details.Shade_Name,
          });
          this.spinner.hide();
        });
    }
  }

  fetchDeliveryChalanDetails(Quality, Shed) {
    this.commonservice
      .findData({ Quality, Shed }, "delivery-chalan-taga-details")
      .subscribe((deliveryChalanDetails) => {
        const tags = deliveryChalanDetails.map(({ TAGA_NO }) => TAGA_NO);
        const data = this.TagaStockDetails.filter(
          ({ TAGA_NO }) => !tags.includes(TAGA_NO)
        );

        this.TagaStockDetails = data;

        if (data.length == 0) {
          this.toastr.success(
            "There are no record found for Taga.",
            "Information"
          );

          this.Design.patchValue("");
          this.Shade_Name.patchValue("");
        }
      });
  }

  fetchParty() {
    this.commonservice.fetchData(0, 0, "fetch-party").subscribe((list) => {
      this.partyList = list;
    });
  }

  fetchQuality() {
    this.commonservice.fetchData(0, 0, "fetch-quality").subscribe((list) => {
      this.qualityList = list;
    });
  }

  fetchFirm() {
    this.commonservice.fetchData(0, 0, "fetch-firm").subscribe((list) => {
      this.firmList = list;
    });
  }

  fetchBroker() {
    this.commonservice.fetchData(0, 0, "fetch-broker").subscribe((list) => {
      this.brokerList = list;
    });
  }

  fetchContract(party) {
    this.contractList = [];
    this.commonservice
      .findData({ Party_Name: party }, "find-party-inward-job-contract")
      .subscribe((list) => {
        if (list.length > 0) {
          this.contractList = list;
        } else {
          this.Contract.patchValue(0);
        }
      });
  }

  fetchShed(quality) {
    this.commonservice
      .findData({ Quality: quality }, "fetch-shed-frm-quality")
      .subscribe((list) => {
        // this.shedList = list;
        this.shedList = [];

        list.forEach((element) => {
          this.commonservice
            .fetchDetails(element, "loom-details")
            .subscribe((result) => {
              this.shedList.push({
                _id: result._id,
                SHED_Name: result.SHED_Name,
              });
            });
        });
      });
  }

  fetchStockTagaDetails(Quality, Shed, Party_Name) {
    this.commonservice
      .findData({ Quality, Shed, Party_Name }, "fetch-stock-taga-details")
      .subscribe((tagaDetails) => {
        this.TagaStockDetails = tagaDetails;
      });
  }

  calculateDetails(TAGA, e, folding = 0) {
    // const foldingValue = folding ? folding : this.Folding.value;
    const checkUncheck = e.target.checked;

    if (checkUncheck == true) {
      this.totalMtrs +=
        this.Folding.value > 0
          ? (TAGA.TAGA_Meter / 100) * this.Folding.value
          : TAGA.TAGA_Meter;
      this.checkboxCounter++;

      this.warfList.forEach((element) => {
        const warfConusmtion = element.PER_METER * this.totalMtrs;
        element.WarfConsumption = warfConusmtion.toFixed(6);
      });

      this.weftList.forEach((element) => {
        const weftConusmtion = element.PER_METER * this.totalMtrs;
        element.WeftConsumption = weftConusmtion.toFixed(6);
      });

      console.log(TAGA);
      // Loom_No: element.Loom_No,
      //           Piece_No: pieceCounter,
      //           Meters: element.TAGA_Meter,
      //           Weight: element.TAGA_Weight,
      //           TAGA_NO: element.TAGA_NO,

      this.SelectedTagaStockDetails.push({
        Loom_No: TAGA.Loom_No,
        TAGA_Meter: TAGA.TAGA_Meter,
        TAGA_Weight: TAGA.TAGA_Weight,
        TAGA_NO: TAGA.TAGA_NO,
        id: TAGA._id,
      });

      this.calculateTotalConsumptions();
    } else {
      if (this.totalMtrs <= 0) {
        this.totalMtrs = 0;
      } else {
        // this.totalMtrs -= TAGA.TAGA_Meter;
        this.totalMtrs -=
          this.Folding.value > 0
            ? (TAGA.TAGA_Meter / 100) * this.Folding.value
            : TAGA.TAGA_Meter;

        this.totalMtrs = this.totalMtrs <= 0 ? 0 : +this.totalMtrs;
      }
      this.checkboxCounter--;

      this.SelectedTagaStockDetails = this.SelectedTagaStockDetails.filter(
        (e) => {
          return e._id !== TAGA._id;
        }
      );

      this.warfList.forEach((element) => {
        const warfConusmtion = Math.round(element.PER_METER * this.totalMtrs);
        element.WarfConsumption = warfConusmtion.toFixed(6);
      });

      this.weftList.forEach((element) => {
        const weftConusmtion = Math.round(element.PER_METER * this.totalMtrs);
        element.WeftConsumption = weftConusmtion.toFixed(6);
      });

      this.calculateTotalConsumptions();
    }

    this.deliveryChalan.get("Pieces").patchValue(this.checkboxCounter);
    this.deliveryChalan.get("Meters").patchValue(this.totalMtrs);
  }

  findQuality(Design_Name) {
    this.spinner.show();
    this.commonservice
      .fetchDetails(Design_Name, "quality-details")
      .subscribe((details) => {
        this.warfList = [];
        this.weftList = [];
        this.fetchWarpDetails(details);
        this.fetchWeftDetails(details);
        this.spinner.hide();
      });
  }

  fetchWarpDetails(quality) {
    this.spinner.show();
    this.commonservice
      .fetchDetails(quality._id, "fetch-quality-warf")
      .subscribe((warfData) => {
        warfData.forEach((element) => {
          let calc1 = 0;
          let calc2 = 0;
          let calc3 = 0;
          let calc4 = 0;
          let westage = 0;

          calc1 = element.Tara_WARP * quality.Part * quality.Lasa;

          calc2 = calc1 / 1852;

          calc3 = calc2 / element.Count_WARP;

          westage = (calc3 / 100) * quality.Westage;

          calc4 = calc3 + westage;

          const warfDetails = {
            SUT_WARP: element.SUT_WARP.SUT_Name,
            Count_WARP: element.Count_WARP,
            Color_WARP: element.Color_WARP,
            PER_METER: calc4.toFixed(6),
            WarfConsumption: 0,
          };

          this.warfList.push(warfDetails);
        });
        this.spinner.hide();
      });
  }

  fetchWeftDetails(quality) {
    this.spinner.show();
    this.commonservice
      .fetchDetails(quality._id, "fetch-quality-weft")
      .subscribe((weftData) => {
        weftData.forEach((element) => {
          let calc1 = 0;
          let calc2 = 0;
          let calc3 = 0;
          let calc4 = 0;
          let westage = 0;

          calc1 = element.Pick_WEFT * quality.Panna * quality.Meter;

          calc2 = calc1 / 1693.33;

          calc3 = calc2 / element.Count_WEFT;

          westage = (calc3 / 100) * quality.Westage;

          calc4 = calc3 + westage;

          const weftDetails = {
            SUT_WEFT: element.SUT_WEFT.SUT_Name,
            Count_WEFT: element.Count_WEFT,
            Color_WEFT: element.Color_WEFT,
            PER_METER: calc4.toFixed(6),
            WeftConsumption: 0,
          };

          this.weftList.push(weftDetails);
        });

        this.spinner.hide();
      });
  }

  calculateTotalConsumptions() {
    this.totalWarfConsumption = 0;
    this.totalWeftConsumption = 0;

    this.warfList.forEach((element) => {
      this.totalWarfConsumption += Number(element.WarfConsumption);
    });

    this.deliveryChalan
      .get("Total_Warf_Consumption")
      .patchValue(this.totalWarfConsumption);

    this.weftList.forEach((element) => {
      this.totalWeftConsumption += Number(element.WeftConsumption);
    });

    this.deliveryChalan
      .get("Total_Weft_Consumption")
      .patchValue(this.totalWeftConsumption.toFixed(6));
  }

  getItemCount() {
    this.commonservice
      .getItemCount("delivery-chalan-count")
      .subscribe((count) => {
        this.chalanNo = Number(count.count) + 1;
        this.Chalan_No.patchValue(Number(count.count) + 1);
      });
  }

  onCancel() {
    this.router.navigate(["/transaction/delivery-chalan"]);
  }

  generatePdf(_id, content) {
    const result = this.commonservice.openPrintModal(
      content,
      _id,
      DeliveryChalanPrintComponent
    );
    result.content.onClose.subscribe((result: boolean) => {
      if (result == true) {
        this.spinner.show();
      }
    });
  }
}
