import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { CommonService } from "../../../../_services/common.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { Validations } from "../../../../_helper/validations";

@Component({
  selector: "app-add-beam-inward",
  templateUrl: "./add-beam-inward.component.html",
  styleUrls: ["./add-beam-inward.component.css"],
})
export class AddBeamInwardComponent implements OnInit {
  beamInward: FormGroup;
  beamInwardID: string;
  beamList: FormArray;
  editMode = false;
  buttonText: string;
  Year_Id: any;
  invoiceNo: any;
  partyList = [];
  shedList = [];
  brokerList = [];
  qualityList = [];
  defaultZero: number = 0;
  beamErr = 0;

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
    this.generateInvoice();
    this.fetchParty();
    this.fetchShed();
    this.fetchBroker();
    this.fetchQuality();

    this.route.params.subscribe((params: Params) => {
      this.beamInwardID = params["id"] ? params["id"] : "";
      this.editMode = params["id"] != null;
      this.buttonText = this.editMode ? "Update" : "Create";
      this.initForm();
    });
  }

  createBeam(): FormGroup {
    return this.fb.group({
      F_No: ["", Validators.required],
      Meaters: ["", Validators.required],
      Weaver: ["", Validators.required],
      Quality: ["", Validators.required],
      BI_Code: [this.generateBICode(), Validators.required],
    });
  }

  getBeamFormGroup(index): FormGroup {
    const formGroup = this.beamList.controls[index] as FormGroup;
    return formGroup;
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

  createForm() {
    this.beamInward = this.fb.group({
      SAT_NO: ["", Validators.required],
      Invoice_No: [
        this.invoiceNo,
        [Validators.required, Validations.alphaNumericPattern],
      ],
      Date: ["", Validators.required],
      Party_Name: ["", Validators.required],
      Sizing_Name: ["", Validators.required],
      COUNT: [this.defaultZero],
      Yarn_Source: [this.defaultZero],
      WARP: [this.defaultZero],
      WEFT: [this.defaultZero],
      REED: [this.defaultZero],
      PICK: [this.defaultZero],
      WEAVE: [""],
      Creel_Ends: [this.defaultZero],
      Function_Part: [this.defaultZero],
      Total_Ends: [this.defaultZero],
      LENGTH: [this.defaultZero],
      Cut_Mark: [this.defaultZero],
      DBF_Panna: [this.defaultZero],
      Rate_Pick: [this.defaultZero],
      // Quality: ["", Validators.required],
      Shed: ["", Validators.required],
      Broker: [this.defaultZero],
      beamList: this.fb.array([this.createBeam()]),
    });

    this.beamList = this.beamInward.get("beamList") as FormArray;
  }

  generateInvoice() {
    this.invoiceNo = (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    ).toUpperCase();

    // this.Invoice_No.patchValue(this.invoiceNo);
  }

  generateBICode() {
    const bicode = (
      Math.random().toString(36).substring(2, 5) +
      Math.random().toString(36).substring(2, 5)
    ).toUpperCase();
    return bicode;
  }

  get SAT_NO() {
    return this.beamInward.get("SAT_NO");
  }

  get Invoice_No() {
    return this.beamInward.get("Invoice_No");
  }

  get Date() {
    return this.beamInward.get("Date");
  }

  get Party_Name() {
    return this.beamInward.get("Party_Name");
  }

  get Sizing_Name() {
    return this.beamInward.get("Sizing_Name");
  }

  get COUNT() {
    return this.beamInward.get("COUNT");
  }

  get Yarn_Source() {
    return this.beamInward.get("Yarn_Source");
  }

  get WARP() {
    return this.beamInward.get("WARP");
  }

  get WEFT() {
    return this.beamInward.get("WEFT");
  }

  get REED() {
    return this.beamInward.get("REED");
  }

  get PICK() {
    return this.beamInward.get("PICK");
  }

  get WEAVE() {
    return this.beamInward.get("WEAVE");
  }

  get Creel_Ends() {
    return this.beamInward.get("Creel_Ends");
  }

  get Function_Part() {
    return this.beamInward.get("Function_Part");
  }

  get Total_Ends() {
    return this.beamInward.get("Total_Ends");
  }

  get LENGTH() {
    return this.beamInward.get("LENGTH");
  }

  get Cut_Mark() {
    return this.beamInward.get("Cut_Mark");
  }

  get DBF_Panna() {
    return this.beamInward.get("DBF_Panna");
  }

  get Rate_Pick() {
    return this.beamInward.get("Rate_Pick");
  }

  /* get Quality() {
    return this.beamInward.get("Quality");
  } */

  get Shed() {
    return this.beamInward.get("Shed");
  }

  get Broker() {
    return this.beamInward.get("Broker");
  }

  get beamGroup() {
    return this.beamInward.get("beamList") as FormArray;
  }

  addBeam() {
    this.beamList.push(this.createBeam());
  }

  removeBeam(index) {
    this.beamList.removeAt(index);
  }

  onSubmit() {
    this.spinner.show();
    const formData = this.beamInward.value;

    if (!this.editMode) {
      formData.Company_Id = this.cmaster.currentUser.Company_Id;
      formData.Year_Id = this.Year_Id;
      formData.Created_By = this.cmaster.currentUser.Company_Id;
      formData.Created_Date = new Date();

      this.cmaster.addData(formData, "add-beam-inward").subscribe((data) => {
        if (data != null) {
          formData.beamList.forEach((element) => {
            const childData = {
              BeamInwardID: data["_id"],
              F_No: element.F_No,
              Meaters: element.Meaters,
              Weaver: element.Weaver,
              SAT_NO: formData.SAT_NO,
              BI_Code: element.BI_Code,
              Quality: element.Quality,
              Shed: formData.Shed,
            };

            this.cmaster.addData(childData, "add-beam-inward-child").subscribe(
              (result) => {
                if (result != null) {
                  this.beamErr = 0;
                } else {
                  this.beamErr = -1;
                }
              },
              (error) => {
                this.beamErr = -1;
              }
            );

            const beamDetails = {
              Invoice_No: formData.Invoice_No,
              Party_Name: formData.Party_Name,
              Quality: element.Quality,
              SAT_NO: formData.SAT_NO,
              BI_Code: element.BI_Code,
              BI_No: element.F_No,
              BI_CUT: 0,
              Is_Used: 0,
              Shed: formData.Shed,
              Meaters: element.Meaters,
              Form_Type: 2,
              Weaving_Code: "",
              Meater_Out: 0,
            };

            this.cmaster
              .addData(beamDetails, "add-beam-inward-details")
              .subscribe(
                (result) => {
                  if (result != null) {
                    this.beamErr = 0;
                  } else {
                    this.beamErr = -1;
                  }
                },
                (error) => {
                  this.beamErr = -1;
                }
              );
          });

          if (this.beamErr == 0 && this.beamErr == 0) {
            this.toastr.success("Record added successfuly", "Success");
            this.beamInward.reset();
            this.router.navigate(["/beam/beam-inward"]);
            this.spinner.hide();
          } else {
            this.toastr.error(
              "Error adding record. Please try again.",
              "Error"
            );
            this.spinner.hide();
          }
        } else {
          this.toastr.error("Error adding record. Please try again.", "Error");
          this.spinner.hide();
        }
      });
    } else {
      const formData = this.beamInward.value;
      const sizingData = {
        SAT_NO: formData.SAT_NO,
        Invoice_No: formData.Invoice_No,
        Date: formData.Date,
        Party_Name: formData.Party_Name,
        Sizing_Name: formData.Sizing_Name,
        COUNT: formData.COUNT,
        Yarn_Source: formData.Yarn_Source,
        WARP: formData.WARP,
        WEFT: formData.WEFT,
        REED: formData.REED,
        PICK: formData.PICK,
        WEAVE: formData.WEAVE,
        Creel_Ends: formData.Creel_Ends,
        Function_Part: formData.Function_Part,
        Total_Ends: formData.Total_Ends,
        LENGTH: formData.LENGTH,
        Cut_Mark: formData.Cut_Mark,
        DBF_Panna: formData.DBF_Panna,
        Rate_Pick: formData.Rate_Pick,
        // Quality: formData.Quality,
        Shed: formData.Shed,
        Broker: formData.Broker,
        Company_Id: this.cmaster.currentUser.Company_Id,
        Year_Id: this.Year_Id,
        Updated_By: this.cmaster.currentUser.Company_Id,
        Updated_Date: new Date(),
      };

      this.cmaster
        .updateData(this.beamInwardID, sizingData, "update-beam-inward")
        .subscribe((data) => {
          if (data != null) {
            if (formData.beamList.length != 0) {
              this.cmaster
                .deleteData(this.beamInwardID, "delete-beam-inward-child")
                .subscribe((result) => {
                  if (result != null) {
                    formData.beamList.forEach((element) => {
                      const childData = {
                        BeamInwardID: data["_id"],
                        F_No: element.F_No,
                        Meaters: element.Meaters,
                        Weaver: element.Weaver,
                        SAT_NO: formData.SAT_NO,
                        BI_Code: element.BI_Code,
                        Quality: element.Quality,
                        Shed: formData.Shed,
                      };

                      this.cmaster
                        .addData(childData, "add-beam-inward-child")
                        .subscribe(
                          (result) => {
                            if (result != null) {
                              this.beamErr = 0;
                            } else {
                              this.beamErr = -1;
                            }
                          },
                          (error) => {
                            this.beamErr = -1;
                          }
                        );
                    });
                  }
                });
            }

            if (this.beamErr == 0 && this.beamErr == 0) {
              this.toastr.success("Record added successfuly", "Success");
              this.beamInward.reset();
              this.router.navigate(["/beam/beam-inward"]);
              this.spinner.hide();
            } else {
              this.toastr.error(
                "Error adding record. Please try again.",
                "Error"
              );
              this.spinner.hide();
            }
          } else {
            this.toastr.error("Error updating record", "Error");
            this.spinner.hide();
          }
        });
    }
  }

  private initForm() {
    if (this.editMode) {
      this.spinner.show();
      this.fetchBeamChildDetails();
      this.cmaster
        .fetchDetails(this.beamInwardID, "beam-inward-details")
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

          this.beamInward.setValue({
            SAT_NO: details.SAT_NO,
            Invoice_No: details.Invoice_No,
            Date: formatedDate,
            Party_Name: details.Party_Name,
            Sizing_Name: details.Sizing_Name,
            COUNT: details.COUNT,
            Yarn_Source: details.Yarn_Source,
            WARP: details.WARP,
            WEFT: details.WEFT,
            REED: details.REED,
            PICK: details.PICK,
            WEAVE: details.WEAVE,
            Creel_Ends: details.Creel_Ends,
            Function_Part: details.Function_Part,
            Total_Ends: details.Total_Ends,
            LENGTH: details.LENGTH,
            Cut_Mark: details.Cut_Mark,
            DBF_Panna: details.DBF_Panna,
            Rate_Pick: details.Rate_Pick,
            // Quality: details.Quality,
            Shed: details.Shed,
            Broker: details.Broker,
            beamList: "",
          });
          this.spinner.hide();
        });
    }
  }

  fetchBeamChildDetails() {
    this.spinner.show();
    this.cmaster
      .fetchDetails(this.beamInwardID, "beam-inward-child-details")
      .subscribe((beamChildData) => {
        let i = 0;
        this.removeBeam(i);

        for (const iterator of beamChildData) {
          this.beamList.push(this.createBeam());

          this.getBeamFormGroup(i).controls["F_No"].patchValue(iterator.F_No);

          this.getBeamFormGroup(i).controls["Meaters"].patchValue(
            iterator.Meaters
          );

          this.getBeamFormGroup(i).controls["Weaver"].patchValue(
            iterator.Weaver
          );

          /* this.getBeamFormGroup(i).controls["SAT_NO"].patchValue(
            iterator.SAT_NO
          ); */

          this.getBeamFormGroup(i).controls["BI_Code"].patchValue(
            iterator.BI_Code
          );

          this.getBeamFormGroup(i).controls["Quality"].patchValue(
            iterator.Quality._id
          );

          // this.getBeamFormGroup(i).controls["Shed"].patchValue(iterator.Shed);

          i++;
        }

        this.spinner.hide();
      });
  }

  fetchParty() {
    this.cmaster.fetchData(0, 0, "fetch-party").subscribe((list) => {
      this.partyList = list;
    });
  }

  fetchShed() {
    this.cmaster.fetchData(0, 0, "fetch-loom").subscribe((list) => {
      this.shedList = list;
    });
  }

  fetchBroker() {
    this.cmaster.fetchData(0, 0, "fetch-broker").subscribe((list) => {
      this.brokerList = list;
    });
  }

  fetchQuality() {
    this.cmaster.fetchData(0, 0, "fetch-quality").subscribe((list) => {
      this.qualityList = list;
    });
  }

  onCancel() {
    this.router.navigate(["/beam/beam-inward"]);
  }
}
