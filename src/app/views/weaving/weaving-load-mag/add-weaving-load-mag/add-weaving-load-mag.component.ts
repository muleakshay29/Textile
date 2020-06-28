import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { InwardOutwardService } from "../../../../_services/inward-outward.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { MasterService } from "../../../../_services/master.service";

@Component({
  selector: "app-add-weaving-load-mag",
  templateUrl: "./add-weaving-load-mag.component.html",
  styleUrls: ["./add-weaving-load-mag.component.css"],
})
export class AddWeavingLoadMagComponent implements OnInit {
  weavingLoadMag: FormGroup;
  weavingLoadMagID: string;
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
    // this.generateInvoice();
    this.fetchShed();
    this.fetchQuality();
    this.fetchParty();
    this.fetchLoomTypes("5ea1271697f4150c8cf37a52");
    // this.fetchBeamInward();

    this.route.params.subscribe((params: Params) => {
      this.weavingLoadMagID = params["id"] ? params["id"] : "";
      this.editMode = params["id"] != null;
      this.buttonText = this.editMode ? "Update" : "Create";
      this.initForm();
    });
  }

  createForm() {
    this.weavingLoadMag = this.fb.group({
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
    return this.weavingLoadMag.get("Date");
  }

  get Shed() {
    return this.weavingLoadMag.get("Shed");
  }

  get Loom_Type() {
    return this.weavingLoadMag.get("Loom_Type");
  }

  get Loom_No() {
    return this.weavingLoadMag.get("Loom_No");
  }

  get Quality() {
    return this.weavingLoadMag.get("Quality");
  }

  get Party_Name() {
    return this.weavingLoadMag.get("Party_Name");
  }

  get SAT_NO() {
    return this.weavingLoadMag.get("SAT_NO");
  }

  get BI_NO() {
    return this.weavingLoadMag.get("BI_NO");
  }

  onSubmit() {
    this.spinner.show();
    if (!this.editMode) {
      const formData = this.weavingLoadMag.value;
      this.inoutservice
        .addData(formData, "add-weaving-mag")
        .subscribe((data) => {
          if (data != null) {
            this.toastr.success("Record added successfuly", "Success");
            this.weavingLoadMag.reset();
            this.router.navigate(["/weaving/weaving-mag"]);
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
      const formData = this.weavingLoadMag.value;

      this.inoutservice
        .updateData(this.weavingLoadMagID, formData, "update-weaving-mag")
        .subscribe((data) => {
          if (data != null) {
            this.toastr.success("Record updated successfuly", "Success");
            this.weavingLoadMag.reset();
            this.router.navigate(["/weaving/weaving-mag"]);
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
        .fetchDetails(this.weavingLoadMagID, "weaving-mag-details")
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

          this.weavingLoadMag.setValue({
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

  /* fetchBeamInward() {
    this.inoutservice.fetchData(0, 0, "fetch-beam-inward").subscribe((list) => {
      this.satList = list;
    });
  } */

  fetchBeamInward(SHED_Name) {
    console.log(SHED_Name);
    this.inoutservice.findData(SHED_Name, "fetch-sat").subscribe((list) => {
      this.satList = list;
    });
  }

  fetchBeamDetails(event, satno = "") {
    if (this.editMode) {
      this.inoutservice
        .findData({ SAT_NO: satno }, "beam-details")
        .subscribe((result) => {
          this.biList = result;
        });
    } else {
      const satno = event.target.value;
      this.inoutservice
        .findData({ SAT_NO: satno }, "beam-details")
        .subscribe((result) => {
          this.biList = result;
        });
    }
  }

  onCancel() {
    this.router.navigate(["/weaving/weaving-mag"]);
  }
}
