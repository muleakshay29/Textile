import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { CommonService } from "../../../../_services/common.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { element } from "protractor";

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
    this.generateInvoice();
    this.fetchQuality();
    this.fetchParty();
    this.fetchFirm();
    this.fetchBroker();

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
      Meters: [this.defaultValue],
      Sample_Cut_Pieces: [this.defaultValue, Validators.required],
      Design: ["", Validators.required],
      Shade_Name: ["", Validators.required],
      Total_Warf_Consumption: [this.defaultValue],
      Total_Weft_Consumption: [this.defaultValue],
    });
  }

  generateInvoice() {
    this.invoiceNo = (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    ).toUpperCase();

    this.Chalan_No.patchValue(this.invoiceNo);
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
    if (!this.editMode) {
      const formData = this.deliveryChalan.value;
      this.commonservice
        .addData(formData, "add-delivery-chalan")
        .subscribe((data) => {
          if (data != null) {
            let pieceCounter = 0;
            let errorArr = [];

            this.SelectedTagaStockDetails.forEach((element) => {
              pieceCounter++;
              const chalanDetails = {
                DeliveryCHalanID: data._id,
                Quality: formData.Design,
                Shade_Name: formData.Shade_Name,
                Loom_No: element.Loom_No,
                Piece_No: pieceCounter,
                Meters: element.TAGA_Meter,
                Weight: element.TAGA_Weight,
                Status: 0,
                GRAMEZ: element.TAGA_Meter / element.TAGA_Weight,
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
            });

            if (errorArr.includes(-1)) {
              this.toastr.error(
                "Error adding record. Please try again.",
                "Error"
              );
              this.spinner.hide();
            } else {
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
      const formData = this.deliveryChalan.value;
      this.commonservice
        .updateData(this.deliveryChalanID, formData, "update-delivery-chalan")
        .subscribe((data) => {
          if (data != null) {
            this.toastr.success("Record updated successfuly", "Success");
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

          this.deliveryChalan.setValue({
            Chalan_No: details.Chalan_No,
            Date: formatedDate,
            Firm_Name: details.Firm_Name,
            Broker_Name: details.Broker_Name,
            Party_Name: details.Party_Name,
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

  fetchShed(quality) {
    this.commonservice
      .findData({ Quality: quality }, "fetch-shed-frm-quality")
      .subscribe((list) => {
        this.shedList = list;
      });
  }

  fetchStockTagaDetails(Quality, Shed) {
    this.commonservice
      .findData({ Quality, Shed }, "fetch-stock-taga-details")
      .subscribe((tagaDetails) => {
        this.TagaStockDetails = tagaDetails;
      });
  }

  calculateDetails(TAGA, e) {
    const checkUncheck = e.target.checked;

    if (checkUncheck == true) {
      this.totalMtrs += TAGA.TAGA_Meter;
      this.checkboxCounter++;
      this.SelectedTagaStockDetails.push(TAGA);

      this.warfList.forEach((element) => {
        element.WarfConsumption = Math.round(
          element.PER_METER * this.totalMtrs
        );
      });

      this.weftList.forEach((element) => {
        element.WeftConsumption = Math.round(
          element.PER_METER * this.totalMtrs
        );
      });

      this.calculateTotalConsumptions();
    } else {
      if (this.totalMtrs <= 0) {
        this.totalMtrs = 0;
      } else {
        this.totalMtrs -= TAGA.TAGA_Meter;
      }
      this.checkboxCounter--;

      this.SelectedTagaStockDetails = this.SelectedTagaStockDetails.filter(
        (e) => {
          return e._id !== TAGA._id;
        }
      );

      this.warfList.forEach((element) => {
        element.WarfConsumption = Math.round(
          element.PER_METER * this.totalMtrs
        );
      });

      this.weftList.forEach((element) => {
        element.WeftConsumption = Math.round(
          element.PER_METER * this.totalMtrs
        );
      });

      this.calculateTotalConsumptions();
    }

    this.deliveryChalan.get("Pieces").patchValue(this.checkboxCounter);
    this.deliveryChalan.get("Meters").patchValue(this.totalMtrs);
  }

  findQuality(Design_Name) {
    this.spinner.show();
    this.commonservice
      .findData({ Design_Name }, "find-quality")
      .subscribe((details) => {
        this.warfList = [];
        this.weftList = [];
        this.fetchWarpDetails(details[0]);
        this.fetchWeftDetails(details[0]);
        this.spinner.hide();
      });
  }

  fetchWarpDetails(quality) {
    this.spinner.show();
    this.commonservice
      .fetchDetails(quality._id, "fetch-quality-warf")
      .subscribe((warfData) => {
        warfData.forEach((element) => {
          let perMeter = 0;
          perMeter =
            (element.Tara_WARP * quality.Part * quality.Lasa) /
            (1852 / element.Count_WARP);

          const warfDetails = {
            SUT_WARP: element.SUT_WARP.SUT_Name,
            Count_WARP: element.Count_WARP,
            Color_WARP: element.Color_WARP,
            PER_METER: Math.round(perMeter).toFixed(2),
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
          let perMeter = 0;
          perMeter =
            (element.Pick_WEFT * quality.Panna * quality.Meter) /
            (1693.33 / element.Count_WEFT);

          const weftDetails = {
            SUT_WEFT: element.SUT_WEFT.SUT_Name,
            Count_WEFT: element.Count_WEFT,
            Color_WEFT: element.Color_WEFT,
            PER_METER: Math.round(perMeter).toFixed(2),
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
      this.totalWarfConsumption += element.WarfConsumption;
    });

    this.deliveryChalan
      .get("Total_Warf_Consumption")
      .patchValue(this.totalWarfConsumption.toFixed(2));

    this.weftList.forEach((element) => {
      this.totalWeftConsumption += element.WeftConsumption;
    });

    this.deliveryChalan
      .get("Total_Weft_Consumption")
      .patchValue(this.totalWeftConsumption.toFixed(2));
  }

  onCancel() {
    this.router.navigate(["/transaction/delivery-chalan"]);
  }
}
