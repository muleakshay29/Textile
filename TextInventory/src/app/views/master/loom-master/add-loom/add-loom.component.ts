import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { CommonService } from "../../../../_services/common.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { Validations } from "../../../../_helper/validations";

@Component({
  selector: "app-add-loom",
  templateUrl: "./add-loom.component.html",
  styleUrls: ["./add-loom.component.css"],
})
export class AddLoomComponent implements OnInit {
  loomMaster: FormGroup;
  loomID: string;
  editMode = false;
  buttonText: string;
  Year_Id: any;
  UniqueCode: any;
  stateList = [];
  loomTypes = [];

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
    this.fetchState("5ea035da1492733c189e6ff2");
    this.fetchLoomTypes("5ea1271697f4150c8cf37a52");

    this.route.params.subscribe((params: Params) => {
      this.loomID = params["id"] ? params["id"] : "";
      this.editMode = params["id"] != null;
      this.buttonText = this.editMode ? "Update" : "Create";
      this.initForm();
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

  createForm() {
    this.loomMaster = this.fb.group({
      SHED_Name: ["", [Validators.required, Validations.alphaNumericPattern]],
      Location: ["", Validators.required],
      Loom_Type: ["", Validators.required],
      No_of_Looms: ["", Validators.required],
    });
  }

  get SHED_Name() {
    return this.loomMaster.get("SHED_Name");
  }

  get Location() {
    return this.loomMaster.get("Location");
  }

  get Loom_Type() {
    return this.loomMaster.get("Loom_Type");
  }

  get No_of_Looms() {
    return this.loomMaster.get("No_of_Looms");
  }

  onSubmit() {
    this.spinner.show();
    const formData = this.loomMaster.value;

    if (!this.editMode) {
      this.UniqueCode = this.cmaster.generateUniqueCode(
        "LOOMMASTER",
        this.Year_Id
      );

      formData.Company_Id = this.cmaster.currentUser.Company_Id;
      formData.Year_Id = this.Year_Id;
      formData.Created_By = this.cmaster.currentUser.Company_Id;
      formData.Created_Date = new Date();
      formData.UniqueCode = this.UniqueCode;

      this.cmaster.addData(formData, "add-loom").subscribe((data) => {
        if (data != null) {
          for (let i = 1; i <= formData.No_of_Looms; i++) {
            const loomDetailData = {
              LoomID: data._id,
              SHED_Name: formData.SHED_Name,
              Location: formData.Location,
              Loom_Type: formData.Loom_Type,
              Loom_No: i,
            };

            this.cmaster
              .addData(loomDetailData, "add-loom-details")
              .subscribe();
          }

          this.toastr.success("Record added successfuly", "Success");
          this.loomMaster.reset();
          this.router.navigate(["/masters/loom-master"]);
          this.spinner.hide();
        } else {
          this.toastr.error("Error adding record. Please try again.", "Error");
          this.spinner.hide();
        }
      });
    } else {
      this.cmaster
        .deleteData(this.loomID, "delete-loom-details")
        .subscribe((result) => {
          formData.Company_Id = this.cmaster.currentUser.Company_Id;
          formData.Year_Id = this.Year_Id;
          formData.Updated_By = this.cmaster.currentUser.Company_Id;
          formData.Updated_Date = new Date();

          this.cmaster
            .updateData(this.loomID, formData, "update-loom")
            .subscribe((data) => {
              if (data != null) {
                for (let i = 1; i <= formData.No_of_Looms; i++) {
                  const loomDetailData = {
                    LoomID: this.loomID,
                    SHED_Name: formData.SHED_Name,
                    Location: formData.Location,
                    Loom_Type: formData.Loom_Type,
                    Loom_No: i,
                  };

                  this.cmaster
                    .addData(loomDetailData, "add-loom-details")
                    .subscribe();
                }

                this.toastr.success("Record updated successfuly", "Success");
                this.router.navigate(["/masters/loom-master"]);
                this.spinner.hide();
              } else {
                this.toastr.error("Error updating record", "Error");
                this.spinner.hide();
              }
            });
        });
    }
  }

  private initForm() {
    if (this.editMode) {
      this.spinner.show();
      this.cmaster
        .fetchDetails(this.loomID, "loom-details")
        .subscribe((details) => {
          this.loomMaster.setValue({
            SHED_Name: details.SHED_Name,
            Location: details.Location._id,
            Loom_Type: details.Loom_Type._id,
            No_of_Looms: details.No_of_Looms,
          });
          this.spinner.hide();
        });
    }
  }

  fetchState(_id: string) {
    this.cmaster
      .fetchDataFrom(_id, "fetch-commonchild-fromCM")
      .subscribe((list) => {
        this.stateList = list;
      });
  }

  fetchLoomTypes(_id: string) {
    this.cmaster
      .fetchDataFrom(_id, "fetch-commonchild-fromCM")
      .subscribe((list) => {
        this.loomTypes = list;
      });
  }

  onCancel() {
    this.router.navigate(["/masters/loom-master"]);
  }
}
