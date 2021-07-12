import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { CommonService } from "../../../../_services/common.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { Validations } from "../../../../_helper/validations";

@Component({
  selector: "app-edit-quality",
  templateUrl: "./edit-quality.component.html",
  styleUrls: ["./edit-quality.component.css"],
})
export class EditQualityComponent implements OnInit {
  qualityMaster: FormGroup;
  warp: FormArray;
  weft: FormArray;
  qualityID: string;
  editMode = false;
  buttonText: string;
  Year_Id: any;
  sutList = [];
  warfErr = 0;
  weftErr = 0;
  warfDataList = [];
  weftDataList = [];
  COUNT_COLOR = "Red";

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
    this.fetchYarn();
    this.getYearId();

    this.route.params.subscribe((params: Params) => {
      this.qualityID = params["id"] ? params["id"] : "";
      this.editMode = params["id"] != null;
      this.buttonText = this.editMode ? "Update" : "Create";
      this.initForm();
    });
  }

  createWarp(): FormGroup {
    return this.fb.group({
      SUT_WARP: ["", Validators.required],
      Count_WARP: ["", Validators.required],
      Color_WARP: ["", Validators.required],
      Tara_WARP: ["", Validators.required],
      SUT_Name: [""],
      isEditable_WARP: [true],
    });
  }

  addWarp() {
    this.warp.push(this.createWarp());
  }

  removeWarp(index, deleteFlag = 0) {
    this.warp.removeAt(index);

    if (deleteFlag == 2 && this.warfDataList[index] != null) {
      this.cmaster
        .deleteData(this.warfDataList[index]._id, "delete-warf-byid")
        .subscribe((result) => {
          if (result == null) {
            this.toastr.error("Error deleting record", "Error");
          } else {
            this.toastr.success("Record added successfuly", "Success");
          }
        });
    }
  }

  editWarfRow(group: FormGroup) {
    group.get("isEditable_WARP").setValue(false);
  }

  doneWarfRow(group: FormGroup) {
    group.get("isEditable_WARP").setValue(true);
  }

  createWeft(): FormGroup {
    return this.fb.group({
      SUT_WEFT: ["", Validators.required],
      Count_WEFT: ["", Validators.required],
      Color_WEFT: ["", Validators.required],
      Pick_WEFT: ["", Validators.required],
      SUT_Name: [""],
      isEditable_WEFT: [true],
    });
  }

  addWeft() {
    this.weft.push(this.createWeft());
  }

  removeWeft(index, deleteFlag = 0) {
    this.weft.removeAt(index);

    if (deleteFlag == 2 && this.weftDataList[index] != null) {
      this.cmaster
        .deleteData(this.weftDataList[index]._id, "delete-weft-byid")
        .subscribe((result) => {
          if (result == null) {
            this.toastr.error("Error deleting record", "Error");
          } else {
            this.toastr.success("Record added successfuly", "Success");
          }
        });
    }
  }

  editWeftRow(group: FormGroup) {
    group.get("isEditable_WEFT").setValue(false);
  }

  doneWeftRow(group: FormGroup) {
    group.get("isEditable_WEFT").setValue(true);
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
    this.qualityMaster = this.fb.group({
      Design_Name: ["", Validators.required],
      Part: ["", Validators.required],
      Lasa: ["", Validators.required],
      Panna: ["", Validators.required],
      Meter: ["", Validators.required],
      Westage: ["", Validators.required],
      warpList: this.fb.array([this.createWarp()]),
      weftList: this.fb.array([this.createWeft()]),
    });

    this.warp = this.qualityMaster.get("warpList") as FormArray;
    this.weft = this.qualityMaster.get("weftList") as FormArray;
  }

  get Design_Name() {
    return this.qualityMaster.get("Design_Name");
  }

  get Part() {
    return this.qualityMaster.get("Part");
  }

  get Lasa() {
    return this.qualityMaster.get("Lasa");
  }

  get Panna() {
    return this.qualityMaster.get("Panna");
  }

  get Meter() {
    return this.qualityMaster.get("Meter");
  }

  get Westage() {
    return this.qualityMaster.get("Westage");
  }

  get warpGroup() {
    return this.qualityMaster.get("warpList") as FormArray;
  }

  get weftGroup() {
    return this.qualityMaster.get("weftList") as FormArray;
  }

  fetchYarn() {
    this.spinner.show();
    this.cmaster.fetchData(0, 0, "fetch-yarn").subscribe((list) => {
      this.sutList = list;
      this.spinner.hide();
    });
  }

  private initForm() {
    if (this.editMode) {
      this.spinner.show();
      this.fetchWarpDetails();
      this.fetchWeftDetails();
      this.cmaster
        .fetchDetails(this.qualityID, "quality-details")
        .subscribe((details) => {
          this.Design_Name.patchValue(details.Design_Name);
          this.Part.patchValue(details.Part);
          this.Lasa.patchValue(details.Lasa);
          this.Panna.patchValue(details.Panna);
          this.Meter.patchValue(details.Meter);
          this.Westage.patchValue(details.Westage);
          this.spinner.hide();
        });
    }
  }

  fetchWarpDetails() {
    this.spinner.show();
    this.cmaster
      .fetchDetails(this.qualityID, "fetch-quality-warf")
      .subscribe((warfData) => {
        this.warfDataList = warfData;
        let i = 0;
        this.removeWarp(i);

        for (const iterator of warfData) {
          this.warp.push(this.createWarp());

          this.getWarfFormGroup(i).controls["SUT_WARP"].patchValue(
            iterator.SUT_WARP._id
          );

          this.getWarfFormGroup(i).controls["SUT_Name"].patchValue(
            iterator.SUT_WARP.SUT_Name
          );

          this.getWarfFormGroup(i).controls["Count_WARP"].patchValue(
            iterator.Count_WARP
          );

          this.getWarfFormGroup(i).controls["Color_WARP"].patchValue(
            iterator.Color_WARP
          );

          this.getWarfFormGroup(i).controls["Tara_WARP"].patchValue(
            iterator.Tara_WARP
          );

          i++;
        }
      });
  }

  fetchWeftDetails() {
    this.spinner.show();
    this.cmaster
      .fetchDetails(this.qualityID, "fetch-quality-weft")
      .subscribe((weftData) => {
        this.weftDataList = weftData;
        let i = 0;
        this.removeWeft(i);

        for (const iterator of weftData) {
          this.weft.push(this.createWeft());

          this.getWeftFormGroup(i).controls["SUT_WEFT"].patchValue(
            iterator.SUT_WEFT._id
          );

          this.getWeftFormGroup(i).controls["SUT_Name"].patchValue(
            iterator.SUT_WEFT.SUT_Name
          );

          this.getWeftFormGroup(i).controls["Count_WEFT"].patchValue(
            iterator.Count_WEFT
          );

          this.getWeftFormGroup(i).controls["Color_WEFT"].patchValue(
            iterator.Color_WEFT
          );

          this.getWeftFormGroup(i).controls["Pick_WEFT"].patchValue(
            iterator.Pick_WEFT
          );

          i++;
        }
      });
  }

  getWarfFormGroup(index): FormGroup {
    const formGroup = this.warp.controls[index] as FormGroup;
    return formGroup;
  }

  getWeftFormGroup(index): FormGroup {
    const formGroup = this.weft.controls[index] as FormGroup;
    return formGroup;
  }

  onSubmit() {
    this.spinner.show();
    const formData = this.qualityMaster.value;
    const qualityData = {
      Design_Name: formData.Design_Name,
      Part: formData.Part,
      Lasa: formData.Lasa,
      Panna: formData.Panna,
      Meter: formData.Meter,
      Westage: formData.Westage,
      Company_Id: this.cmaster.currentUser.Company_Id,
      Year_Id: this.Year_Id,
      Updated_By: this.cmaster.currentUser.Company_Id,
      Updated_Date: new Date(),
    };

    this.cmaster
      .updateData(this.qualityID, qualityData, "update-quality")
      .subscribe(
        (data) => {
          if (data != null) {
            if (formData.warpList.length != 0) {
              this.cmaster
                .deleteData(this.qualityID, "delete-quality-warf")
                .subscribe((result) => {
                  if (result != null) {
                    formData.warpList.forEach((element) => {
                      const warfData = {
                        QualityID: this.qualityID,
                        SUT_WARP: element.SUT_WARP,
                        Count_WARP: element.Count_WARP,
                        Color_WARP: element.Color_WARP,
                        Tara_WARP: element.Tara_WARP,
                      };

                      this.cmaster
                        .addData(warfData, "add-quality-warf")
                        .subscribe(
                          (warfResult) => {
                            if (warfResult != null) {
                              this.warfErr = 0;
                            } else {
                              this.warfErr = -1;
                            }
                          },
                          (error) => {
                            this.warfErr = -1;
                          }
                        );
                    });
                  }
                });
            }

            if (formData.weftList.length != 0) {
              this.cmaster
                .deleteData(this.qualityID, "delete-quality-weft")
                .subscribe((result) => {
                  if (result != null) {
                    formData.weftList.forEach((element) => {
                      const weftData = {
                        QualityID: this.qualityID,
                        SUT_WEFT: element.SUT_WEFT,
                        Count_WEFT: element.Count_WEFT,
                        Color_WEFT: element.Color_WEFT,
                        Pick_WEFT: element.Pick_WEFT,
                      };

                      this.cmaster
                        .addData(weftData, "add-quality-weft")
                        .subscribe(
                          (weftResult) => {
                            if (weftResult != null) {
                              this.weftErr = 0;
                            } else {
                              this.weftErr = -1;
                            }
                          },
                          (error) => {
                            this.weftErr = -1;
                          }
                        );
                    });
                  }
                });
            }

            if (this.warfErr == 0 && this.weftErr == 0) {
              this.toastr.success("Record updated successfuly", "Success");
              this.qualityMaster.reset();
              this.router.navigate(["/masters/quality-master"]);
              this.spinner.hide();
            } else {
              this.toastr.error(
                "Error updating record. Please try again.",
                "Error"
              );
              this.spinner.hide();
            }
          } else {
            this.toastr.error("Error updating record", "Error");
            this.spinner.hide();
          }
        },
        (error) => {
          this.toastr.error(
            "Error updating record. Please try again.",
            "Error"
          );
          this.spinner.hide();
        }
      );
  }

  onCancel() {
    this.router.navigate(["/masters/quality-master"]);
  }
}
