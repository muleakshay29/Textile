import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { CommonService } from "../../../../_services/common.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-add-weaving-load-auto",
  templateUrl: "./add-weaving-load-auto.component.html",
  styleUrls: ["./add-weaving-load-auto.component.css"],
})
export class AddWeavingLoadAutoComponent implements OnInit {
  weavingLoadAuto: FormGroup;
  weavingLoadAutoID: string;
  beamList: FormArray;
  editMode = false;
  buttonText: string;
  Year_Id: any;
  shedList = [];
  qualityList = [];
  partyList = [];
  loomTypes = [];
  satList = [];
  loomList = [];
  biList = [];

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
    this.fetchShed();
    this.fetchQuality();

    this.route.params.subscribe((params: Params) => {
      this.weavingLoadAutoID = params["id"] ? params["id"] : "";
      this.editMode = params["id"] != null;
      this.buttonText = this.editMode ? "Update" : "Create";
      this.initForm();
    });
  }

  createForm() {
    this.weavingLoadAuto = this.fb.group({
      Date: ["", Validators.required],
      Shed: ["", Validators.required],
      Loom_Type: ["", Validators.required],
      Loom_No: ["", Validators.required],
      Quality: ["", Validators.required],
      Party_Name: ["", Validators.required],
      SAT_NO: ["", Validators.required],
      BI_NO: ["", Validators.required],
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

  generateBICode() {
    const bicode = (
      Math.random().toString(36).substring(2, 5) +
      Math.random().toString(36).substring(2, 5)
    ).toUpperCase();
    return bicode;
  }

  get Date() {
    return this.weavingLoadAuto.get("Date");
  }

  get Shed() {
    return this.weavingLoadAuto.get("Shed");
  }

  get Loom_Type() {
    return this.weavingLoadAuto.get("Loom_Type");
  }

  get Loom_No() {
    return this.weavingLoadAuto.get("Loom_No");
  }

  get Quality() {
    return this.weavingLoadAuto.get("Quality");
  }

  get Party_Name() {
    return this.weavingLoadAuto.get("Party_Name");
  }

  get SAT_NO() {
    return this.weavingLoadAuto.get("SAT_NO");
  }

  get BI_NO() {
    return this.weavingLoadAuto.get("BI_NO");
  }

  onSubmit() {
    this.spinner.show();
    const formData = this.weavingLoadAuto.value;

    if (!this.editMode) {
      formData.Company_Id = this.cmaster.currentUser.Company_Id;
      formData.Year_Id = this.Year_Id;
      formData.Created_By = this.cmaster.currentUser.Company_Id;
      formData.Created_Date = new Date();

      this.cmaster.addData(formData, "add-weaving-auto").subscribe((data) => {
        if (data != null) {
          this.toastr.success("Record added successfuly", "Success");
          this.weavingLoadAuto.reset();
          this.router.navigate(["/weaving/weaving-auto"]);
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
        .updateData(this.weavingLoadAutoID, formData, "update-weaving-auto")
        .subscribe((data) => {
          if (data != null) {
            this.toastr.success("Record updated successfuly", "Success");
            this.weavingLoadAuto.reset();
            this.router.navigate(["/weaving/weaving-auto"]);
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
      this.cmaster
        .fetchDetails(this.weavingLoadAutoID, "weaving-auto-details")
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

          this.fetchLoomTypes(details.Shed);
          this.fetchParty(details.Quality);
          this.fetchLoomNo("", details.Shed);
          this.fetchBeamDetails("", details.SAT_NO, details.Shed);
          this.fetchBeamInward(details.Quality, details.Party_Name);

          this.weavingLoadAuto.setValue({
            Date: formatedDate,
            Shed: details.Shed,
            Loom_Type: details.Loom_Type,
            Loom_No: details.Loom_No,
            Quality: details.Quality,
            Party_Name: details.Party_Name,
            SAT_NO: details.SAT_NO,
            BI_NO: details.BI_NO,
          });
          this.spinner.hide();
        });
    }
  }

  fetchShed() {
    this.cmaster.fetchData(0, 0, "fetch-loom").subscribe((list) => {
      this.shedList = list;
    });
  }

  fetchLoomTypes(shed = "") {
    this.loomTypes = [];
    this.loomList = [];
    this.cmaster
      .findData({ SHED_Name: shed }, "fetch-common-loomtypes")
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

  fetchLoomNoList(shed = "", loomtype = "") {
    this.spinner.show();
    this.cmaster
      .findData({ SHED_Name: shed, Loom_Type: loomtype }, "fetch-common-loomno")
      .subscribe((list) => {
        this.loomList = [];
        list.forEach((element) => {
          this.cmaster
            .findData({ Loom_No: element._id }, "find-loom-weaving-auto")
            .subscribe((loom) => {
              if (loom.length > 0) {
                this.cmaster
                  .findData(
                    {
                      Shed: shed,
                      Loom_Type: loomtype,
                      Loom_No: element._id,
                    },
                    "find-distinct-auto-production-details"
                  )
                  .subscribe((prodDetails) => {
                    if (
                      Array.isArray(prodDetails) &&
                      prodDetails.length &&
                      prodDetails[0].Unload_Beam
                    ) {
                      this.loomList.push({
                        _id: element._id,
                        Loom_No: element.Loom_No,
                      });
                    }
                  });
              }

              if (loom.length == 0) {
                this.loomList.push({
                  _id: element._id,
                  Loom_No: element.Loom_No,
                });
              }

              this.loomList.sort();
            });
        });

        this.spinner.hide();
      });
  }

  fetchParty(quality = "", loomtype = "", loomno = 0) {
    this.cmaster
      .findData({ Quality: quality }, "fetch-beam-inward-party")
      .subscribe((list) => {
        this.partyList = [];
        list.forEach((element) => {
          this.cmaster
            .fetchDetails(element, "party-details")
            .subscribe((result) => {
              this.partyList.push({
                _id: result._id,
                Company_Name: result.Company_Name,
              });
            });
        });
      });
  }

  fetchQuality(quality = "", loomtype = "", loomno = 0) {
    this.cmaster.fetchData(0, 0, "fetch-quality").subscribe((list) => {
      this.qualityList = list;
    });
  }

  fetchBeamInward(quality, party) {
    this.cmaster
      .findData(
        { Quality: quality, Party_Name: party },
        "fetch-sat-quality-party"
      )
      .subscribe((list) => {
        this.satList = list;
      });
  }

  fetchLoomNo(event, shed = "") {
    if (this.editMode) {
      this.cmaster
        .findData({ SHED_Name: shed }, "find-all-looms")
        .subscribe((result) => {
          this.loomList = result;
        });
    } else {
      const shed = event.target.value;
      this.cmaster
        .findData({ SHED_Name: shed }, "find-all-looms")
        .subscribe((result) => {
          this.loomList = result;
        });
    }
  }

  fetchBeamDetails(event, satno = "", shed = "") {
    if (this.editMode) {
      this.cmaster
        .findData({ SAT_NO: satno }, "beam-details")
        // .findData({ SAT_NO: satno, Shed: shed }, "beam-details")
        .subscribe((result) => {
          this.biList = result;
        });
    } else {
      const satno = event.target.value;
      const shed = this.Shed.value;

      this.cmaster
        .findData({ SAT_NO: satno }, "fetch-common-beams")
        // .findData({ SAT_NO: satno, Shed: shed }, "fetch-common-beams")
        .subscribe((list) => {
          list.forEach((element) => {
            this.cmaster
              .findData(
                { BI_Code: element, SAT_NO: satno, Shed: shed },
                "find-beam"
              )
              .subscribe((result) => {
                this.biList = [];

                this.cmaster
                  .findData(
                    { BI_NO: result[0].BI_Code },
                    "find-beam-weaving-auto"
                  )
                  .subscribe((beam) => {
                    if (beam.length == 0) {
                      this.biList.push({
                        BI_No: "Beam No-" + satno + "-" + result[0].BI_No,
                        BI_Code: result[0].BI_Code,
                      });
                    }
                  });
              });
          });
        });
    }
  }

  onCancel() {
    this.router.navigate(["/weaving/weaving-auto"]);
  }
}
