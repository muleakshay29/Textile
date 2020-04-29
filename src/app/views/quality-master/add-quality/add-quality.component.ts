import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { MasterService } from "../../../_services/master.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { Validations } from "../../../_helper/validations";

@Component({
  selector: "app-add-quality",
  templateUrl: "./add-quality.component.html",
  styleUrls: ["./add-quality.component.css"],
})
export class AddQualityComponent implements OnInit {
  qualityMaster: FormGroup;
  warp: FormArray;
  weft: FormArray;
  qualityID: string;
  editMode = false;
  buttonText: string;
  sutList = [];
  warfErr = 0;
  weftErr = 0;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private master: MasterService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.fetchYarn();

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
    });
  }

  get SUT_WARP() {
    return this.warp.get("SUT_WARP");
  }

  get Count_WARP() {
    return this.warp.get("Count_WARP");
  }

  get Color_WARP() {
    return this.warp.get("Color_WARP");
  }

  get Tara_WARP() {
    return this.warp.get("Tara_WARP");
  }

  createWeft(): FormGroup {
    return this.fb.group({
      SUT_WEFT: ["", Validators.required],
      Count_WEFT: ["", Validators.required],
      Color_WEFT: ["", Validators.required],
      Pick_WEFT: ["", Validators.required],
    });
  }

  get SUT_WEFT() {
    return this.weft.get("SUT_WEFT");
  }

  get Count_WEFT() {
    return this.weft.get("Count_WEFT");
  }

  get Color_WEFT() {
    return this.weft.get("Color_WEFT");
  }

  get Pick_WEFT() {
    return this.weft.get("Pick_WEFT");
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

  addWarp() {
    this.warp.push(this.createWarp());
  }

  removeWarp(index) {
    this.warp.removeAt(index);
  }

  addWeft() {
    this.weft.push(this.createWeft());
  }

  removeWeft(index) {
    this.weft.removeAt(index);
  }

  onSubmit() {
    this.spinner.show();
    if (!this.editMode) {
      const formData = this.qualityMaster.value;
      this.master.addData(formData, "add-quality").subscribe(
        (data) => {
          if (data != null) {
            formData.warpList.forEach((element) => {
              const warfData = {
                QualityID: data["_id"],
                SUT_WARP: element.SUT_WARP,
                Count_WARP: element.Count_WARP,
                Color_WARP: element.Color_WARP,
                Tara_WARP: element.Tara_WARP,
              };

              this.master.addData(warfData, "add-quality-warf").subscribe(
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

            formData.weftList.forEach((element) => {
              const weftData = {
                QualityID: data["_id"],
                SUT_WEFT: element.SUT_WEFT,
                Count_WEFT: element.Count_WEFT,
                Color_WEFT: element.Color_WEFT,
                Pick_WEFT: element.Pick_WEFT,
              };

              this.master.addData(weftData, "add-quality-weft").subscribe(
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

            if (this.warfErr == 0 && this.weftErr == 0) {
              this.toastr.success("Record added successfuly", "Success");
              this.qualityMaster.reset();
              this.router.navigate(["/masters/quality-master"]);
              this.spinner.hide();
            } else {
              this.toastr.error(
                "Error adding record. Please try again.",
                "Error"
              );
              this.spinner.hide();
            }
          } else {
            this.toastr.error(
              "Error adding record. Please try again.",
              "Error"
            );
            this.spinner.hide();
          }
        },
        (error) => {
          this.toastr.error("Error adding record. Please try again.", "Error");
          this.spinner.hide();
        }
      );
    } else {
      const formData = this.qualityMaster.value;

      this.master
        .updateData(this.qualityID, formData, "update-quality")
        .subscribe(
          (data) => {
            if (data != null) {
              formData.warpList.forEach((element) => {
                console.log(element);
                const warfData = {
                  QualityID: this.qualityID,
                  SUT_WARP: element.SUT_WARP,
                  Count_WARP: element.Count_WARP,
                  Color_WARP: element.Color_WARP,
                  Tara_WARP: element.Tara_WARP,
                };

                /* this.master.updateData(warfData, "update-quality-warf").subscribe(
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
                ); */
              });

              /* formData.weftList.forEach((element) => {
                const weftData = {
                  QualityID: this.qualityID,
                  SUT_WEFT: element.SUT_WEFT,
                  Count_WEFT: element.Count_WEFT,
                  Color_WEFT: element.Color_WEFT,
                  Pick_WEFT: element.Pick_WEFT,
                };

                this.master.addData(weftData, "update-quality-weft").subscribe(
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
              }); */

              /* if (this.warfErr == 0 && this.weftErr == 0) {
                this.toastr.success("Record added successfuly", "Success");
                this.qualityMaster.reset();
                this.router.navigate(["/masters/quality-master"]);
                this.spinner.hide();
              } else {
                this.toastr.error(
                  "Error adding record. Please try again.",
                  "Error"
                );
                this.spinner.hide();
              } */

              /* this.toastr.success("Record updated successfuly", "Success");
              this.router.navigate(["/masters/quality-master"]);
              this.spinner.hide(); */
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
  }

  fetchYarn() {
    this.spinner.show();
    this.master.fetchData(0, 0, "fetch-yarn").subscribe((list) => {
      this.sutList = list;
      this.spinner.hide();
    });
  }

  private initForm() {
    if (this.editMode) {
      this.spinner.show();
      this.fetchWarpDetails();
      this.fetchWeftDetails();
      this.master
        .fetchDetails(this.qualityID, "quality-details")
        .subscribe((details) => {
          this.qualityMaster.setValue({
            Design_Name: details.Design_Name,
            Part: details.Part,
            Lasa: details.Lasa,
            Panna: details.Panna,
            Meter: details.Meter,
            Westage: details.Westage,
            warpList: "",
            weftList: "",
          });
          this.spinner.hide();
        });
    }
  }

  fetchWarpDetails() {
    this.spinner.show();
    this.master
      .fetchDetails(this.qualityID, "fetch-quality-warf")
      .subscribe((warfData) => {
        let i = 0;
        this.removeWarp(i);
        for (const iterator of warfData) {
          this.warp.push(this.createWarp());

          this.getWarfFormGroup(i).controls["SUT_WARP"].patchValue(
            iterator.SUT_WARP
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
    this.master
      .fetchDetails(this.qualityID, "fetch-quality-weft")
      .subscribe((weftData) => {
        let i = 0;
        this.removeWeft(i);
        for (const iterator of weftData) {
          this.weft.push(this.createWeft());

          this.getWeftFormGroup(i).controls["SUT_WEFT"].patchValue(
            iterator.SUT_WEFT
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

  onCancel() {
    this.router.navigate(["/masters/quality-master"]);
  }
}
