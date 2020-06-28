import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { InwardOutwardService } from "../../../../_services/inward-outward.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { MasterService } from "../../../../_services/master.service";

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
    private inoutservice: InwardOutwardService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private master: MasterService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.fetchShed();
    this.fetchQuality();
    this.fetchParty();
    this.fetchLoomTypes("5ea1271697f4150c8cf37a52");
    // this.fetchBeamInward();

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
    if (!this.editMode) {
      const formData = this.weavingLoadAuto.value;
      this.inoutservice
        .addData(formData, "add-weaving-auto")
        .subscribe((data) => {
          if (data != null) {
            this.toastr.success("Record added successfuly", "Success");
            this.weavingLoadAuto.reset();
            this.router.navigate(["/weaving/weaving-auto"]);
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
      const formData = this.weavingLoadAuto.value;

      this.inoutservice
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
      this.inoutservice
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

          this.fetchLoomNo("", details.Shed);
          this.fetchBeamDetails("", details.SAT_NO);

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

  fetchLoomTypes(_id: string) {
    this.master
      .fetchDataFrom(_id, "fetch-commonchild-fromCM")
      .subscribe((list) => {
        this.loomTypes = list;
      });
  }

  fetchQuality() {
    this.inoutservice.fetchData(0, 0, "fetch-quality").subscribe((list) => {
      this.qualityList = list;
    });
  }

  /* fetchBeamInward() {
    this.inoutservice.fetchData(0, 0, "fetch-beam-inward").subscribe((list) => {
      this.satList = list;
    });
  } */

  fetchBeamInward(SHED_Name) {
    this.inoutservice
      .findData({ Shed: SHED_Name }, "fetch-sat")
      .subscribe((list) => {
        this.satList = list;
      });
  }

  fetchLoomNo(event, shed = "") {
    if (this.editMode) {
      this.fetchBeamInward(shed);
      this.inoutservice
        .findData({ SHED_Name: shed }, "find-all-looms")
        .subscribe((result) => {
          this.loomList = result;
        });
    } else {
      const shed = event.target.value;
      this.fetchBeamInward(shed);
      this.inoutservice
        .findData({ SHED_Name: shed }, "find-all-looms")
        .subscribe((result) => {
          this.loomList = result;
        });
    }
  }

  fetchBeamDetails(event, satno = "") {
    if (this.editMode) {
      const shed = this.Shed.value;
      this.inoutservice
        .findData({ SAT_NO: satno, Shed: shed }, "beam-details")
        .subscribe((result) => {
          this.biList = result;
        });
    } else {
      const satno = event.target.value;
      const shed = this.Shed.value;
      console.log(shed);
      this.inoutservice
        .findData({ SAT_NO: satno, Shed: shed }, "beam-details")
        .subscribe((result) => {
          this.biList = result;
        });
    }
  }

  onCancel() {
    this.router.navigate(["/weaving/weaving-auto"]);
  }
}