import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { InwardOutwardService } from "../../../../_services/inward-outward.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-add-sizing-inward",
  templateUrl: "./add-sizing-inward.component.html",
  styleUrls: ["./add-sizing-inward.component.css"],
})
export class AddSizingInwardComponent implements OnInit {
  sizingInward: FormGroup;
  sizingInwardID: string;
  sizingList: FormArray;
  editMode = false;
  buttonText: string;
  invoiceNo: any;
  partyList = [];
  shedList = [];
  firmList = [];
  brokerList = [];
  qualityList = [];
  defaultZero: number = 0;
  sizingKGAmount = 0;
  warpingMTRAmount = 0;
  grandtotal = 0;
  roundOff = 0;
  sizingErr = 0;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private inoutservice: InwardOutwardService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.generateInvoice();
    this.fetchParty();
    this.fetchShed();
    this.fetchFirm();
    this.fetchBroker();
    this.fetchQuality();

    this.route.params.subscribe((params: Params) => {
      this.sizingInwardID = params["id"] ? params["id"] : "";
      this.editMode = params["id"] != null;
      this.buttonText = this.editMode ? "Update" : "Create";
      this.initForm();
    });
  }

  createSizing(): FormGroup {
    return this.fb.group({
      Bill_No: ["", Validators.required],
      CUT: ["", Validators.required],
      Border: ["", Validators.required],
      SAT_NO: ["", Validators.required],
      BI_Code: [this.generateBICode(), Validators.required],
    });
  }

  getSizingFormGroup(index): FormGroup {
    const formGroup = this.sizingList.controls[index] as FormGroup;
    return formGroup;
  }

  createForm() {
    this.sizingInward = this.fb.group({
      Invoice_No: [this.invoiceNo],
      Date: ["", Validators.required],
      Firm_Name: ["", Validators.required],
      Party_Name: ["", Validators.required],
      COUNT: ["", Validators.required],
      Mill: ["", Validators.required],
      HSN_SAC_Code: ["", Validators.required],
      Ends_Section: ["", Validators.required],
      Part: ["", Validators.required],
      Measure_Yards: ["", Validators.required],
      Cut_Mark: ["", Validators.required],
      Total_Cuts: ["", Validators.required],
      Total_Measures: ["", Validators.required],
      Quality: ["", Validators.required],
      Shade: ["", Validators.required],
      Broker: ["", Validators.required],
      Rate_Pick: ["", Validators.required],
      Sizing_KG: ["", Validators.required],
      Sizing_KG_Rate: ["", Validators.required],
      Sizing_KG_Amount: [this.defaultZero],
      Warping_MTR: ["", Validators.required],
      Warping_MTR_Rate: ["", Validators.required],
      Warping_MTR_Amount: [this.defaultZero],
      TOTAL: [this.defaultZero],
      Discount: [this.defaultZero, Validators.required],
      Add_Less: [this.defaultZero, Validators.required],
      Taxable_Amount: [this.defaultZero],
      CGST: ["", Validators.required],
      CGST_AMOUNT: [this.defaultZero],
      SGST: ["", Validators.required],
      SGST_AMOUNT: [this.defaultZero],
      IGST: [this.defaultZero],
      IGST_AMOUNT: [this.defaultZero],
      GST_TOTAL: [this.defaultZero],
      TOTAL_AMOUNT: [this.defaultZero],
      R_OFF: [this.defaultZero],
      Grand_Total: [this.defaultZero],
      sizingList: this.fb.array([this.createSizing()]),
    });

    this.sizingList = this.sizingInward.get("sizingList") as FormArray;
  }

  generateInvoice() {
    this.invoiceNo = (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    ).toUpperCase();

    this.Invoice_No.patchValue(this.invoiceNo);
  }

  generateBICode() {
    const bicode = (
      Math.random().toString(36).substring(2, 5) +
      Math.random().toString(36).substring(2, 5)
    ).toUpperCase();
    return bicode;
  }

  get Invoice_No() {
    return this.sizingInward.get("Invoice_No");
  }

  get Date() {
    return this.sizingInward.get("Date");
  }

  get Party_Name() {
    return this.sizingInward.get("Party_Name");
  }

  get Firm_Name() {
    return this.sizingInward.get("Firm_Name");
  }

  get COUNT() {
    return this.sizingInward.get("COUNT");
  }

  get Mill() {
    return this.sizingInward.get("Mill");
  }

  get HSN_SAC_Code() {
    return this.sizingInward.get("HSN_SAC_Code");
  }

  get Ends_Section() {
    return this.sizingInward.get("Ends_Section");
  }

  get Part() {
    return this.sizingInward.get("Part");
  }

  get Measure_Yards() {
    return this.sizingInward.get("Measure_Yards");
  }

  get Cut_Mark() {
    return this.sizingInward.get("Cut_Mark");
  }

  get Total_Cuts() {
    return this.sizingInward.get("Total_Cuts");
  }

  get Total_Measures() {
    return this.sizingInward.get("Total_Measures");
  }

  get Quality() {
    return this.sizingInward.get("Quality");
  }

  get Shade() {
    return this.sizingInward.get("Shade");
  }

  get Broker() {
    return this.sizingInward.get("Broker");
  }

  get Rate_Pick() {
    return this.sizingInward.get("Rate_Pick");
  }

  get Sizing_KG() {
    return this.sizingInward.get("Sizing_KG");
  }

  get Sizing_KG_Rate() {
    return this.sizingInward.get("Sizing_KG_Rate");
  }

  get Warping_MTR() {
    return this.sizingInward.get("Warping_MTR");
  }

  get Warping_MTR_Rate() {
    return this.sizingInward.get("Warping_MTR_Rate");
  }

  get Discount() {
    return this.sizingInward.get("Discount");
  }

  get Add_Less() {
    return this.sizingInward.get("Add_Less");
  }

  get sizingGroup() {
    return this.sizingInward.get("sizingList") as FormArray;
  }

  addSizing() {
    this.sizingList.push(this.createSizing());
  }

  removeSizing(index) {
    this.sizingList.removeAt(index);
  }

  onSubmit() {
    this.spinner.show();
    if (!this.editMode) {
      const formData = this.sizingInward.value;
      this.inoutservice
        .addData(formData, "add-sizing-inward")
        .subscribe((data) => {
          if (data != null) {
            formData.sizingList.forEach((element) => {
              const childData = {
                SizingInwardID: data["_id"],
                Bill_No: element.Bill_No,
                CUT: element.CUT,
                Border: element.Border,
                SAT_NO: element.SAT_NO,
                BI_Code: element.BI_Code,
              };

              this.inoutservice
                .addData(childData, "add-sizing-inward-child")
                .subscribe(
                  (result) => {
                    if (result != null) {
                      this.sizingErr = 0;
                    } else {
                      this.sizingErr = -1;
                    }
                  },
                  (error) => {
                    this.sizingErr = -1;
                  }
                );
            });

            if (this.sizingErr == 0 && this.sizingErr == 0) {
              this.toastr.success("Record added successfuly", "Success");
              this.sizingInward.reset();
              this.router.navigate(["/beam/sizing-inward"]);
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
        });
    } else {
      const formData = this.sizingInward.value;
      const sizingData = {
        Invoice_No: formData.Invoice_No,
        Date: formData.Date,
        Firm_Name: formData.Firm_Name,
        Party_Name: formData.Party_Name,
        COUNT: formData.COUNT,
        Mill: formData.Mill,
        HSN_SAC_Code: formData.HSN_SAC_Code,
        Ends_Section: formData.Ends_Section,
        Part: formData.Part,
        Measure_Yards: formData.Measure_Yards,
        Cut_Mark: formData.Cut_Mark,
        Total_Cuts: formData.Total_Cuts,
        Total_Measures: formData.Total_Measures,
        Quality: formData.Quality,
        Shade: formData.Shade,
        Broker: formData.Broker,
        Rate_Pick: formData.Rate_Pick,
        Sizing_KG: formData.Sizing_KG,
        Sizing_KG_Rate: formData.Sizing_KG_Rate,
        Sizing_KG_Amount: formData.Sizing_KG_Amount,
        Warping_MTR: formData.Warping_MTR,
        Warping_MTR_Rate: formData.Warping_MTR_Rate,
        Warping_MTR_Amount: formData.Warping_MTR_Amount,
        TOTAL: formData.TOTAL,
        Discount: formData.Discount,
        Add_Less: formData.Add_Less,
        Taxable_Amount: formData.Taxable_Amount,
        CGST: formData.CGST,
        CGST_AMOUNT: formData.CGST_AMOUNT,
        SGST: formData.SGST,
        SGST_AMOUNT: formData.SGST_AMOUNT,
        IGST: formData.IGST,
        IGST_AMOUNT: formData.IGST_AMOUNT,
        GST_TOTAL: formData.GST_TOTAL,
        TOTAL_AMOUNT: formData.TOTAL_AMOUNT,
        R_OFF: formData.R_OFF,
        Grand_Total: formData.Grand_Total,
      };

      this.inoutservice
        .updateData(this.sizingInwardID, sizingData, "update-sizing-inward")
        .subscribe((data) => {
          if (data != null) {
            if (formData.sizingList.length != 0) {
              this.inoutservice
                .deleteData(this.sizingInwardID, "delete-sizing-inward-child")
                .subscribe((result) => {
                  if (result != null) {
                    formData.sizingList.forEach((element) => {
                      const childData = {
                        SizingInwardID: data["_id"],
                        Bill_No: element.Bill_No,
                        CUT: element.CUT,
                        Border: element.Border,
                        SAT_NO: element.SAT_NO,
                        BI_Code: element.BI_Code,
                      };

                      this.inoutservice
                        .addData(childData, "add-sizing-inward-child")
                        .subscribe(
                          (result) => {
                            if (result != null) {
                              this.sizingErr = 0;
                            } else {
                              this.sizingErr = -1;
                            }
                          },
                          (error) => {
                            this.sizingErr = -1;
                          }
                        );
                    });
                  }
                });
            }

            if (this.sizingErr == 0 && this.sizingErr == 0) {
              this.toastr.success("Record added successfuly", "Success");
              this.sizingInward.reset();
              this.router.navigate(["/beam/sizing-inward"]);
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
      this.fetchSizingChildDetails();
      this.inoutservice
        .fetchDetails(this.sizingInwardID, "sizing-inward-details")
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

          this.sizingInward.setValue({
            Invoice_No: details.Invoice_No,
            Date: formatedDate,
            Firm_Name: details.Firm_Name,
            Party_Name: details.Party_Name,
            COUNT: details.COUNT,
            Mill: details.Mill,
            HSN_SAC_Code: details.HSN_SAC_Code,
            Ends_Section: details.Ends_Section,
            Part: details.Part,
            Measure_Yards: details.Measure_Yards,
            Cut_Mark: details.Cut_Mark,
            Total_Cuts: details.Total_Cuts,
            Total_Measures: details.Total_Measures,
            Quality: details.Quality,
            Shade: details.Shade,
            Broker: details.Broker,
            Rate_Pick: details.Rate_Pick,
            Sizing_KG: details.Sizing_KG,
            Sizing_KG_Rate: details.Sizing_KG_Rate,
            Sizing_KG_Amount: details.Sizing_KG_Amount,
            Warping_MTR: details.Warping_MTR,
            Warping_MTR_Rate: details.Warping_MTR_Rate,
            Warping_MTR_Amount: details.Warping_MTR_Amount,
            TOTAL: details.TOTAL,
            Discount: details.Discount,
            Add_Less: details.Add_Less,
            Taxable_Amount: details.Taxable_Amount,
            CGST: details.CGST,
            CGST_AMOUNT: details.CGST_AMOUNT,
            SGST: details.SGST,
            SGST_AMOUNT: details.SGST_AMOUNT,
            IGST: details.IGST,
            IGST_AMOUNT: details.IGST_AMOUNT,
            GST_TOTAL: details.GST_TOTAL,
            TOTAL_AMOUNT: details.TOTAL_AMOUNT,
            R_OFF: details.R_OFF,
            Grand_Total: details.Grand_Total,
            sizingList: "",
          });
          this.spinner.hide();
        });
    }
  }

  fetchSizingChildDetails() {
    this.spinner.show();
    this.inoutservice
      .fetchDetails(this.sizingInwardID, "sizing-inward-child-details")
      .subscribe((sizingChildData) => {
        let i = 0;
        this.removeSizing(i);

        for (const iterator of sizingChildData) {
          this.sizingList.push(this.createSizing());

          this.getSizingFormGroup(i).controls["Bill_No"].patchValue(
            iterator.Bill_No
          );

          this.getSizingFormGroup(i).controls["CUT"].patchValue(iterator.CUT);

          this.getSizingFormGroup(i).controls["Border"].patchValue(
            iterator.Border
          );

          this.getSizingFormGroup(i).controls["SAT_NO"].patchValue(
            iterator.SAT_NO
          );

          this.getSizingFormGroup(i).controls["BI_Code"].patchValue(
            iterator.BI_Code
          );

          i++;
        }

        this.spinner.hide();
      });
  }

  fetchParty() {
    this.inoutservice.fetchData(0, 0, "fetch-party").subscribe((list) => {
      this.partyList = list;
    });
  }

  fetchFirm() {
    this.inoutservice.fetchData(0, 0, "fetch-firm").subscribe((list) => {
      this.firmList = list;
    });
  }

  fetchShed() {
    this.inoutservice.fetchData(0, 0, "fetch-loom").subscribe((list) => {
      this.shedList = list;
    });
  }

  fetchBroker() {
    this.inoutservice.fetchData(0, 0, "fetch-broker").subscribe((list) => {
      this.brokerList = list;
    });
  }

  fetchQuality() {
    this.inoutservice.fetchData(0, 0, "fetch-quality").subscribe((list) => {
      this.qualityList = list;
    });
  }

  calculateAmount(KG, Rate, Flag) {
    if (Flag == 1) {
      this.sizingKGAmount = KG * Rate;
      this.sizingInward
        .get("Sizing_KG_Amount")
        .patchValue(this.sizingKGAmount.toFixed(2));
    } else {
      this.warpingMTRAmount = KG * Rate;
      this.sizingInward
        .get("Warping_MTR_Amount")
        .patchValue(this.warpingMTRAmount.toFixed(2));
    }

    const total = this.sizingKGAmount + this.warpingMTRAmount;
    this.sizingInward.get("TOTAL").patchValue(total.toFixed(2));
    this.sizingInward.get("Taxable_Amount").patchValue(total.toFixed(2));
  }

  calculateGST(CGSTval, SGSTval) {
    const taxableAmount = this.sizingInward.get("Taxable_Amount").value;

    const cgst = (taxableAmount * CGSTval) / 100;
    this.sizingInward.get("CGST_AMOUNT").patchValue(cgst.toFixed(2));

    const sgst = (taxableAmount * SGSTval) / 100;
    this.sizingInward.get("SGST_AMOUNT").patchValue(sgst.toFixed(2));

    const total_gst = parseFloat(cgst.toFixed(2)) + parseFloat(sgst.toFixed(2));
    this.sizingInward.get("GST_TOTAL").patchValue(total_gst);

    const totalAmt = parseFloat(taxableAmount) + total_gst;
    this.sizingInward.get("TOTAL_AMOUNT").patchValue(totalAmt.toFixed(2));

    const rOffTemp: any = (totalAmt - Math.floor(totalAmt)).toFixed(2);

    if (rOffTemp != 0) {
      this.roundOff = 1 - parseFloat(rOffTemp);

      if (rOffTemp <= 0.5) {
        this.grandtotal = totalAmt - this.roundOff;
        this.roundOff = -this.roundOff;
      } else {
        this.grandtotal = totalAmt + this.roundOff;
        this.roundOff = +this.roundOff;
      }
    } else {
      this.grandtotal = totalAmt;
      this.roundOff = 0;
    }

    this.sizingInward.get("R_OFF").patchValue(this.roundOff.toFixed(2));
    this.sizingInward.get("Grand_Total").patchValue(this.grandtotal.toFixed(2));
  }

  onCancel() {
    this.router.navigate(["/beam/sizing-inward"]);
  }
}
