import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { CommonService } from "../../../../_services/common.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { uniqueCheckValidator } from "../../../../_helper/unique-records.directive";
import { element } from "protractor";

@Component({
  selector: "app-add-auto-production",
  templateUrl: "./add-auto-production.component.html",
  styleUrls: ["./add-auto-production.component.css"],
})
export class AddAutoProductionComponent implements OnInit {
  autoProduction: FormGroup;
  autoProductionID: string;
  beamList: FormArray;
  Year_Id: any;
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
  distinctLooms = [];
  unloadedLooms = [];

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
    this.fetchShed();
    this.getYearId();
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
      // To_Date: ["", Validators.required],
      Shed: ["", Validators.required],
      Loom_Type: ["", Validators.required],
      Loom_No: ["", Validators.required],
      Party_Name: ["", Validators.required],
      Quality: ["", Validators.required],
      Available_Mtrs: [this.defaultValue],
      Total_Beam_Mtrs: [this.defaultValue],
      TAGA_NO: [this.defaultValue, [Validators.required]],
      Meter: [this.defaultValue, Validators.required],
      Weight: [this.defaultValue, Validators.required],
      RPM: [this.defaultValue, Validators.required],
      // Unload_Beam: [this.unloadBeam, Validators.required],
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

  get From_Date() {
    return this.autoProduction.get("From_Date");
  }

  /* get To_Date() {
    return this.autoProduction.get("To_Date");
  } */

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

  /* get Unload_Beam() {
    return this.autoProduction.get("Unload_Beam");
  } */

  onSubmit() {
    this.spinner.show();
    const formData = this.autoProduction.value;

    if (!this.editMode) {
      formData.Company_Id = this.cmaster.currentUser.Company_Id;
      formData.Year_Id = this.Year_Id;
      formData.Created_By = this.cmaster.currentUser.Company_Id;
      formData.Created_Date = new Date();

      this.cmaster
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
              Company_Id: this.cmaster.currentUser.Company_Id,
              Year_Id: this.Year_Id,
              Created_By: this.cmaster.currentUser.Company_Id,
              Created_Date: new Date(),
              Party_Name: formData.Party_Name,
            };
            this.cmaster
              .addData(tagaStock, "add-stock-taga")
              .subscribe((tagaStockDetails) => {
                if (tagaStockDetails != null) {
                  this.toastr.success("Record added successfuly", "Success");
                  // this.autoProduction.reset();
                  // this.router.navigate(["/production/auto-production"]);
                  this.Loom_No.reset();
                  this.Party_Name.reset();
                  this.Quality.reset();
                  this.autoProduction.get("Available_Mtrs").reset();
                  this.autoProduction.get("Total_Beam_Mtrs").reset();
                  this.TAGA_NO.reset();
                  this.Meter.reset();
                  this.Weight.reset();
                  // this.RPM.reset();
                  // this.openModal();
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
      formData.Company_Id = this.cmaster.currentUser.Company_Id;
      formData.Year_Id = this.Year_Id;
      formData.Updated_By = this.cmaster.currentUser.Company_Id;
      formData.Updated_Date = new Date();

      
       this.cmaster
      // .addData(this.autoProductionID,tagaStock, "add-stock-taga")
        .updateData(this.autoProductionID, formData, "update-auto-production")
        .subscribe((data) => {
          if (data != null) {
           
            const tagaStock = {
           // ProductionID: data._id, //this.autoProductionID,
              TAGA_Meter: formData.Meter,
             
              TAGA_Weight: formData.Weight,
              Updated_By: this.cmaster.currentUser.Company_Id,
              Updated_Date: new Date(),
           
            };     
           
            this.cmaster
              .updateData(this.autoProductionID,tagaStock, "update-stock-taga")
              .subscribe((tagaStockDetails) => {
                if (tagaStockDetails != null) {
                  this.toastr.success("Record updated successfuly", "Success");
                  this.autoProduction.reset();
                  this.router.navigate(["/production/auto-production"]);
                  this.spinner.hide();
                }
                else
                {
                  this.toastr.error(
                    "Error updating record. Please try again.",
                    "Error"
                  );
                  this.spinner.hide();
                }
              
              });
            
            
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
      this.cmaster
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

          /* const todate = new Date(details.To_Date);
          const formatedtoMonth =
            todate.getMonth() > 8
              ? todate.getMonth() + 1
              : "0" + (todate.getMonth() + 1);

          const formatedtoDay =
            todate.getDate() > 9 ? todate.getDate() : "0" + todate.getDate();
          const formatedtoYear = todate.getFullYear();
          const ToDate =
            formatedtoYear + "-" + formatedtoMonth + "-" + formatedtoDay; */

          this.fetchLoomNoList(details.Shed, details.Loom_Type);
          this.fetchLoomTypes(details.Shed);
           this.fetchParty(details.Party_Name);
           this.fetchQuality(details.Quality);

          this.autoProduction.setValue({
            From_Date: FromDate,
            // To_Date: ToDate,
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
            // Unload_Beam: details.Unload_Beam,
          });
          this.spinner.hide();
        });
    }
  }

  fetchShed() {
    this.cmaster.fetchAllData("fetch-distinct-shed").subscribe((list) => {
      list.forEach((element) => {
        this.cmaster
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

  fetchLoomTypes(shed = "") {
    this.loomTypes = [];
    this.loomList = [];
    this.cmaster
      .findData({ Shed: shed }, "fetch-distinct-loomtypes")
      .subscribe((list) => {
        list.forEach((element) => {
          this.cmaster
            .fetchDetails(element, "fetch-commonmasterchild-details")
            .subscribe((result) => {
              this.loomTypes = [];
              this.loomTypes.push({
                _id: result._id,
                Loom_Type: result.CMC_Name,
              });
            });
        });
      });
  }

  fetchDistinctLooms() {
    this.distinctLooms = this.distinctLooms.filter(
      (val) => !this.unloadedLooms.includes(val)
    );
    this.distinctLooms.forEach((element2) => {
      this.cmaster
        .fetchDetails(element2, "loom-no-details")
        .subscribe((result) => {
          this.loomList.push({
            _id: result._id,
            Loom_No: result.Loom_No,
          });
        });
    });
  }

  fetchLoomNoList(shed = "", loomtype = "") {
    this.cmaster
      .findData({ Shed: shed, Loom_Type: loomtype }, "fetch-distinct-loomno")
      .subscribe((list) => {
        list.forEach((element) => {
          this.cmaster
            .fetchDetails(element, "loom-no-details")
            .subscribe((result) => {
              this.loomList.push({
                _id: result._id,
                Loom_No: result.Loom_No,
              });

              this.cmaster
                .findData(
                  {
                    Shed: shed,
                    Loom_Type: loomtype,
                    Loom_No: element,
                  },
                  "find-auto-production-details"
                )
                .subscribe((details) => {
                  console.log(`${result.Loom_No} details`, details);
                });
            });
        });
      });

    /* .subscribe((list) => {
        this.distinctLooms = list;
        console.log("loomList", this.loomList);
        list.forEach((element, key, arr) => {
          this.cmaster
            .findData(
              {
                Shed: shed,
                Loom_Type: loomtype,
                Loom_No: element,
              },
              "find-distinct-auto-production-details"
            )
            .subscribe((prodDetails) => {
              if (Array.isArray(prodDetails) && prodDetails.length) {
                this.unloadedLooms.push(prodDetails[0].Loom_No);
                if (key === arr.length - 1) {
                  this.fetchDistinctLooms();
                }
              }
            });
        });
        console.log("loomList", this.loomList);
        // this.fetchDistinctLooms();
      }); */

    /* .subscribe((list) => {
        this.loomList = [];
        this.distinctLooms = list;
        list.forEach((element) => {
          this.cmaster
            .findData(
              {
                Shed: shed,
                Loom_Type: loomtype,
                Loom_No: element,
              },
              "find-distinct-auto-production-details"
            )
            .subscribe((prodDetails) => {
              return prodDetails.forEach((prodElement) => {
                return this.distinctLooms.splice(
                  this.distinctLooms.indexOf(prodElement.Loom_No),
                  1
                );

                // console.log("distinctLooms", this.distinctLooms);
              });

              this.distinctLooms.forEach((element2) => {
                console.log("element2", element2);
                this.cmaster
                  .fetchDetails(element2, "loom-no-details")
                  .subscribe((result) => {
                    this.loomList.push({
                      _id: result._id,
                      Loom_No: result.Loom_No,
                    });
                  });
              });
            });
        });

        console.log("distinctLooms", this.distinctLooms);
      }); */
  }

  fetchParty(partyId) {
    this.cmaster.fetchDetails(partyId, "party-details").subscribe((result) => {
      this.partyList = [];
      this.partyList.push({
        _id: result._id,
        Company_Name: result.Company_Name,
      });
    });
  }

  fetchQuality(qualityId) {
    this.cmaster
      .fetchDetails(qualityId, "quality-details")
      .subscribe((result) => {
        this.qualityList = [];
        this.qualityList.push({
          _id: result._id,
          Design_Name: result.Design_Name,
        });
      });
  }

  /* fetchParty(shed = "", loomtype = "", loomno = 0) {
    this.cmaster
      .findData(
        { Shed: shed, Loom_Type: loomtype, Loom_No: loomno },
        "fetch-distinct-party"
      )
      .subscribe((list) => {
        list.forEach((element) => {
          this.cmaster
            .fetchDetails(element, "party-details")
            .subscribe((result) => {
              this.partyList = [];
              this.partyList.push({
                _id: result._id,
                Company_Name: result.Company_Name,
              });
            });
        });
      });
  }

  fetchQuality(shed = "", loomtype = "", loomno = 0) {
    this.cmaster
      .findData(
        { Shed: shed, Loom_Type: loomtype, Loom_No: loomno },
        "fetch-distinct-quality"
      )
      .subscribe((list) => {
        list.forEach((element) => {
          this.cmaster
            .fetchDetails(element, "quality-details")
            .subscribe((result) => {
              this.qualityList = [];
              this.qualityList.push({
                _id: result._id,
                Design_Name: result.Design_Name,
              });
            });
        });
      });
  } */

  fetchOtherDetails(shed = "", loomtype = "", loomno = 0, party = "") {
    this.cmaster
      .findData(
        {
          Shed: shed,
          Loom_Type: loomtype,
          Loom_No: loomno,
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
    // const details = this.weavingDetails;
    this.cmaster
      .findData(
        {
          Shed: this.weavingDetails["Shed"],
          SAT_NO: this.weavingDetails["SAT_NO"],
          BI_Code: this.weavingDetails["BI_NO"],
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

  findPartQuality(shed = "", loomtype = "", loomno = 0) {
    this.cmaster
      .findData(
        { Shed: shed, Loom_Type: loomtype, Loom_No: loomno },
        "find-weaving-part-quality"
      )
      .subscribe((details) => {
        this.Party_Name.patchValue(details[0].Party_Name);
        this.Quality.patchValue(details[0].Quality);
        this.weavingDetails = details[0];
        this.fetchParty(details[0].Party_Name);
        this.fetchQuality(details[0].Quality);
        this.findAutoProductionDetails(shed, loomtype, loomno);
      });
  }

  findAutoProductionDetails(shed = "", loomtype = "", loomno = 0, party = "") {
    this.cmaster
      .findData(
        {
          Shed: shed,
          Loom_Type: loomtype,
          Loom_No: loomno,
          // Party_Name: party,
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
            this.toastr.error("Please Unload the Beam", "Error");
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

    this.TAGA_NO.setAsyncValidators(
      uniqueCheckValidator(
        this.cmaster,
        {
          Shed: shed,
        },
        "TAGA_NO",
        "find-auto-production-taga"
      )
    );
  }

  onCancel() {
    this.router.navigate(["/production/auto-production"]);
  }

  openModal() {
    const result = this.cmaster.openConfirmModal();
    result.content.onClose.subscribe((result: boolean) => {
      if (result == true) {
        this.spinner.hide();
      } else {
        this.router.navigate(["/production/auto-production"]);
      }
    });
  }
}
