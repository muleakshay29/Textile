import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { InwardOutwardService } from "../../../../_services/inward-outward.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { MasterService } from "../../../../_services/master.service";

@Component({
  selector: "app-add-auto-production",
  templateUrl: "./add-auto-production.component.html",
  styleUrls: ["./add-auto-production.component.css"],
})
export class AddAutoProductionComponent implements OnInit {
  autoProduction: FormGroup;
  autoProductionID: string;
  beamList: FormArray;
  editMode = false;
  buttonText: string;
  shedList = [];
  loomTypes = [];
  loomList = [];
  partyList = [];
  qualityList = [];
  weavingDetails = [];
  defaultValue = 0;
  unloadBeam = 0;
  availableMters = 0;
  autoProductionFlag = 0;
  availableBeamDetails = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private inoutservice: InwardOutwardService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private master: MasterService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.fetchShed();
    // this.fetchQuality();
    // this.fetchParty();
    // this.fetchLoomTypes("5ea1271697f4150c8cf37a52");

    this.route.params.subscribe((params: Params) => {
      this.autoProductionID = params["id"] ? params["id"] : "";
      this.editMode = params["id"] != null;
      this.buttonText = this.editMode ? "Update" : "Create";
      this.initForm();
    });
  }

  createForm() {
    this.autoProduction = this.fb.group({
      From_Date: ["", Validators.required],
      To_Date: ["", Validators.required],
      Shed: ["", Validators.required],
      Loom_Type: ["", Validators.required],
      Loom_No: ["", Validators.required],
      Party_Name: ["", Validators.required],
      Quality: ["", Validators.required],
      Available_Mtrs: [this.defaultValue],
      Total_Beam_Mtrs: [this.defaultValue],
      TAGA_NO: [this.defaultValue, Validators.required],
      Meter: [this.defaultValue, Validators.required],
      Weight: [this.defaultValue, Validators.required],
      RPM: [this.defaultValue, Validators.required],
      Unload_Beam: [this.unloadBeam, Validators.required],
    });
  }

  get From_Date() {
    return this.autoProduction.get("From_Date");
  }

  get To_Date() {
    return this.autoProduction.get("To_Date");
  }

  get Shed() {
    return this.autoProduction.get("Shed");
  }

  get Loom_Type() {
    return this.autoProduction.get("Loom_Type");
  }

  get Loom_No() {
    return this.autoProduction.get("Loom_No");
  }

  get Party_Name() {
    return this.autoProduction.get("Party_Name");
  }

  get Quality() {
    return this.autoProduction.get("Quality");
  }

  get TAGA_NO() {
    return this.autoProduction.get("TAGA_NO");
  }

  get Meter() {
    return this.autoProduction.get("Meter");
  }

  get Weight() {
    return this.autoProduction.get("Weight");
  }

  get RPM() {
    return this.autoProduction.get("RPM");
  }

  get Unload_Beam() {
    return this.autoProduction.get("Unload_Beam");
  }

  onSubmit() {
    this.spinner.show();
    if (!this.editMode) {
      const formData = this.autoProduction.value;
      this.inoutservice
        .addData(formData, "add-auto-production")
        .subscribe((data) => {
          if (data != null) {
            const tagaStock = {
              ProductionID: data._id,
              Shed: formData.Shed,
              Loom_Type: formData.Loom_Type,
              Loom_No: formData.Loom_No,
              Quality: formData.Quality,
              TAGA_Meter: formData.Meter,
              TAGA_NO: formData.TAGA_NO,
              TAGA_Weight: formData.Weight,
            };
            this.inoutservice
              .addData(tagaStock, "add-stock-taga")
              .subscribe((tagaStockDetails) => {
                if (tagaStockDetails != null) {
                  this.toastr.success("Record added successfuly", "Success");
                  this.autoProduction.reset();
                  this.router.navigate(["/production/auto-production"]);
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
            this.toastr.error(
              "Error adding record. Please try again.",
              "Error"
            );
            this.spinner.hide();
          }
        });
    } else {
      const formData = this.autoProduction.value;

      this.inoutservice
        .updateData(this.autoProductionID, formData, "update-auto-production")
        .subscribe((data) => {
          if (data != null) {
            this.toastr.success("Record updated successfuly", "Success");
            this.autoProduction.reset();
            this.router.navigate(["/production/auto-production"]);
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
      this.inoutservice
        .fetchDetails(this.autoProductionID, "auto-production-details")
        .subscribe((details) => {
          const fromdate = new Date(details.From_Date);
          const formatedfromMonth =
            fromdate.getMonth() > 8
              ? fromdate.getMonth() + 1
              : "0" + (fromdate.getMonth() + 1);

          const formatedfromDay =
            fromdate.getDate() > 9
              ? fromdate.getDate()
              : "0" + fromdate.getDate();
          const formatedfromYear = fromdate.getFullYear();
          const FromDate =
            formatedfromYear + "-" + formatedfromMonth + "-" + formatedfromDay;

          const todate = new Date(details.To_Date);
          const formatedtoMonth =
            todate.getMonth() > 8
              ? todate.getMonth() + 1
              : "0" + (todate.getMonth() + 1);

          const formatedtoDay =
            todate.getDate() > 9 ? todate.getDate() : "0" + todate.getDate();
          const formatedtoYear = todate.getFullYear();
          const ToDate =
            formatedtoYear + "-" + formatedtoMonth + "-" + formatedtoDay;

          this.fetchLoomNoList(details.Shed, details.Loom_Type);
          this.fetchLoomTypes(details.Shed);
          this.fetchParty(details.Shed, details.Loom_Type, details.Loom_No);
          this.fetchQuality(details.Shed, details.Loom_Type, details.Loom_No);

          this.autoProduction.setValue({
            From_Date: FromDate,
            To_Date: ToDate,
            Shed: details.Shed,
            Loom_Type: details.Loom_Type,
            Loom_No: details.Loom_No,
            Party_Name: details.Party_Name,
            Quality: details.Quality,
            Available_Mtrs: details.Available_Mtrs,
            Total_Beam_Mtrs: details.Total_Beam_Mtrs,
            TAGA_NO: details.TAGA_NO,
            Meter: details.Meter,
            Weight: details.Weight,
            RPM: details.RPM,
            Unload_Beam: details.Unload_Beam,
          });
          this.spinner.hide();
        });
    }
  }

  fetchShed() {
    this.inoutservice.fetchAllData("fetch-distinct-shed").subscribe((list) => {
      this.shedList = list;
    });
  }

  fetchLoomTypes(shed = "") {
    this.loomTypes = [];
    this.loomList = [];
    this.master
      .findData({ Shed: shed }, "fetch-distinct-loomtypes")
      .subscribe((list) => {
        this.loomTypes = list;
      });
  }

  fetchLoomNoList(shed = "", loomtype = "") {
    this.inoutservice
      .findData({ Shed: shed, Loom_Type: loomtype }, "fetch-distinct-loomno")
      .subscribe((result) => {
        this.loomList = result;
      });
  }

  fetchParty(shed = "", loomtype = "", loomno = 0) {
    this.inoutservice
      .findData(
        { Shed: shed, Loom_Type: loomtype, Loom_No: Number(loomno) },
        "fetch-distinct-party"
      )
      .subscribe((list) => {
        this.partyList = list;
      });
  }

  fetchQuality(shed = "", loomtype = "", loomno = 0) {
    this.inoutservice
      .findData(
        { Shed: shed, Loom_Type: loomtype, Loom_No: Number(loomno) },
        "fetch-distinct-quality"
      )
      .subscribe((list) => {
        this.qualityList = list;
      });
  }

  fetchOtherDetails(shed = "", loomtype = "", loomno = 0, party = "") {
    this.inoutservice
      .findData(
        {
          Shed: shed,
          Loom_Type: loomtype,
          Loom_No: Number(loomno),
          Party_Name: party,
        },
        "fetch-weaving-details"
      )
      .subscribe((details) => {
        this.weavingDetails = details;
        // this.fetchAvilableMtr();
      });
  }

  fetchAvilableMtr() {
    const details = this.weavingDetails[0];
    this.inoutservice
      .findData(
        {
          Party_Name: details.Party_Name,
          SAT_NO: details.SAT_NO,
          BI_Code: details.BI_NO,
        },
        "fetch-available-beam-mtrs"
      )
      .subscribe((result) => {
        if (result.length != 0) {
          this.autoProduction
            .get("Total_Beam_Mtrs")
            .patchValue(result[0].Meaters);
          this.autoProduction
            .get("Available_Mtrs")
            .patchValue(result[0].Meaters);
        } else {
          this.autoProduction.get("Total_Beam_Mtrs").patchValue(0);
          this.autoProduction.get("Available_Mtrs").patchValue(0);
        }
      });
  }

  findAutoProductionDetails(shed = "", loomtype = "", loomno = 0, party = "") {
    this.inoutservice
      .findData(
        {
          Shed: shed,
          Loom_Type: loomtype,
          Loom_No: Number(loomno),
          Party_Name: party,
        },
        "find-auto-production-details"
      )
      .subscribe((result) => {
        if (result.length != 0) {
          let availableMters = 0;
          let total_available_mtrs = 0;

          result.forEach((element) => {
            availableMters += element.Meter;
          });

          total_available_mtrs = result[0].Total_Beam_Mtrs - availableMters;

          const prcnt =
            (total_available_mtrs / result[0].Total_Beam_Mtrs) * 100;
          if (Math.round(prcnt) < 10) {
            this.toastr.error(
              "Error updating record. Please try again.",
              "Error"
            );
          }

          this.autoProduction
            .get("Total_Beam_Mtrs")
            .patchValue(result[0].Total_Beam_Mtrs);

          this.autoProduction
            .get("Available_Mtrs")
            .patchValue(total_available_mtrs);
        } else {
          this.fetchAvilableMtr();
        }
      });
  }

  onCancel() {
    this.router.navigate(["/production/auto-production"]);
  }
}
