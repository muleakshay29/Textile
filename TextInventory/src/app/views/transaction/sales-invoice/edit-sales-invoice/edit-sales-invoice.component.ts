import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { CommonService } from "../../../../_services/common.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-edit-sales-invoice",
  templateUrl: "./edit-sales-invoice.component.html",
  styleUrls: ["./edit-sales-invoice.component.css"],
})
export class EditSalesInvoiceComponent implements OnInit {
  salesInvoice: FormGroup;
  salesInvoiceID: string;
  beamList: FormArray;
  editMode = false;
  buttonText: string;
  Year_Id: any;
  shedList = [];
  partyList = [];
  firmList = [];
  qualityList = [];
  loomList = [];
  brokerList = [];
  defaultValue = 0;
  invoiceNo: any;
  grandtotal = 0;
  roundOff = 0;
  formCode;
  selectedShed: string;
  selectedFromPartyState: string = "";
  selectedToPartyState: string = "";
  enableIGST = false;
  salesInvoiceDetails = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private commonservice: CommonService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getYearId();
    this.fetchShed();

    this.route.params.subscribe((params: Params) => {
      this.salesInvoiceID = params["id"];
      this.buttonText = "Update";
      this.initForm();
    });
  }

  createForm() {
    this.salesInvoice = this.fb.group({
      Invoice_No: [{ value: "", disabled: true }],
      Date: [{ value: "", disabled: true }],
      From_Party: [{ value: "", disabled: true }],
      To_Party: [{ value: "", disabled: true }],
      Loom_No: [{ value: "", disabled: true }],
      HSN_NO: [{ value: "", disabled: true }],
      Broker_Name: [{ value: "", disabled: true }],
      DC_NO: [{ value: "", disabled: true }],
      DC_Date: [{ value: "", disabled: true }],
      Quality: [{ value: "", disabled: true }],
      No_Of_Pieces: [{ value: "", disabled: true }],
      Total_Meters: [{ value: "", disabled: true }],
      Sample_Cut_Meters: [{ value: "", disabled: true }],
      Rate: ["", Validators.required],
      Total_Amount: [this.defaultValue],
      Packing: [this.defaultValue],
      Checking: [this.defaultValue],
      Packing_Other: [this.defaultValue],
      Second: [this.defaultValue],
      TP: [this.defaultValue],
      SL: [this.defaultValue],
      FOLD: [this.defaultValue],
      Second_Other: [this.defaultValue],
      Taxable_Amount: [this.defaultValue],
      CGST: [this.defaultValue],
      CGST_Amt: [this.defaultValue],
      SGST: [this.defaultValue],
      SGST_Amt: [this.defaultValue],
      IGST: [this.defaultValue],
      IGST_Amt: [this.defaultValue],
      Total_GST_Amt: [this.defaultValue],
      Round_Off: [this.defaultValue],
      Grand_Total: [this.defaultValue],
      Shed: ["", Validators.required],
    });
  }

  get Invoice_No() {
    return this.salesInvoice.get("Invoice_No");
  }

  get Date() {
    return this.salesInvoice.get("Date");
  }

  get From_Party() {
    return this.salesInvoice.get("From_Party");
  }

  get To_Party() {
    return this.salesInvoice.get("To_Party");
  }

  get Loom_No() {
    return this.salesInvoice.get("Loom_No");
  }

  get HSN_NO() {
    return this.salesInvoice.get("HSN_NO");
  }

  get Broker_Name() {
    return this.salesInvoice.get("Broker_Name");
  }

  get DC_NO() {
    return this.salesInvoice.get("DC_NO");
  }

  get DC_Date() {
    return this.salesInvoice.get("DC_Date");
  }

  get Quality() {
    return this.salesInvoice.get("Quality");
  }

  get No_Of_Pieces() {
    return this.salesInvoice.get("No_Of_Pieces");
  }

  get Total_Meters() {
    return this.salesInvoice.get("Total_Meters");
  }

  get Sample_Cut_Meters() {
    return this.salesInvoice.get("Total_Meters");
  }

  get Rate() {
    return this.salesInvoice.get("Rate");
  }

  get Total_Amount() {
    return this.salesInvoice.get("Total_Amount");
  }

  get Packing() {
    return this.salesInvoice.get("Packing");
  }

  get Checking() {
    return this.salesInvoice.get("Checking");
  }

  get Packing_Other() {
    return this.salesInvoice.get("Packing_Other");
  }

  get Second() {
    return this.salesInvoice.get("Second");
  }

  get TP() {
    return this.salesInvoice.get("TP");
  }

  get SL() {
    return this.salesInvoice.get("SL");
  }

  get FOLD() {
    return this.salesInvoice.get("FOLD");
  }

  get Second_Other() {
    return this.salesInvoice.get("Second_Other");
  }

  get Taxable_Amount() {
    return this.salesInvoice.get("Taxable_Amount");
  }

  get CGST() {
    return this.salesInvoice.get("CGST");
  }

  get CGST_Amt() {
    return this.salesInvoice.get("CGST_Amt");
  }

  get SGST() {
    return this.salesInvoice.get("SGST");
  }

  get SGST_Amt() {
    return this.salesInvoice.get("SGST_Amt");
  }

  get IGST() {
    return this.salesInvoice.get("IGST");
  }

  get IGST_Amt() {
    return this.salesInvoice.get("IGST_Amt");
  }

  get Total_GST_Amt() {
    return this.salesInvoice.get("Total_GST_Amt");
  }

  get Round_Off() {
    return this.salesInvoice.get("Round_Off");
  }

  get Grand_Total() {
    return this.salesInvoice.get("Grand_Total");
  }

  get Shed() {
    return this.salesInvoice.get("Shed");
  }

  getYearId() {
    let today = new Date();
    const year = today.getFullYear();
    this.commonservice
      .findData({ CMC_Name: year }, "find-cmcname")
      .subscribe((result) => {
        this.Year_Id = result[0]._id;
      });
  }

  private initForm() {
    this.spinner.show();
    this.commonservice
      .fetchDetails(this.salesInvoiceID, "sales-invoice-details")
      .subscribe((details) => {
        console.log(details);
        this.salesInvoiceDetails = details;
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

        const dcdate = new Date(details.DC_Date);
        const formateddcMonth =
          dcdate.getMonth() > 8
            ? dcdate.getMonth() + 1
            : "0" + (dcdate.getMonth() + 1);

        const formateddcDay =
          dcdate.getDate() > 9 ? dcdate.getDate() : "0" + dcdate.getDate();
        const formateddcYear = dcdate.getFullYear();
        const DCDate =
          formateddcYear + "-" + formateddcMonth + "-" + formateddcDay;

        if (details.Shed) {
          this.Shed.disable();
        }

        this.salesInvoice.setValue({
          Invoice_No: details.Invoice_No,
          Date: formatedDate,
          From_Party: details.From_Party._id,
          To_Party: details.To_Party._id,
          Loom_No: details.Loom_No,
          HSN_NO: details.HSN_NO,
          Broker_Name: details.Broker_Name._id,
          DC_NO: details.DC_NO,
          DC_Date: DCDate,
          Quality: details.Quality._id,
          No_Of_Pieces: details.No_Of_Pieces,
          Total_Meters: details.Total_Meters,
          Sample_Cut_Meters: details.Sample_Cut_Meters,
          Rate: details.Rate,
          Total_Amount: details.Total_Amount,
          Packing: details.Packing,
          Checking: details.Checking,
          Packing_Other: details.Packing_Other,
          Second: details.Second,
          TP: details.TP,
          SL: details.SL,
          FOLD: details.FOLD,
          Second_Other: details.Second_Other,
          Taxable_Amount: details.Taxable_Amount,
          CGST: details.CGST,
          CGST_Amt: details.CGST_Amt,
          SGST: details.SGST,
          SGST_Amt: details.SGST_Amt,
          IGST: details.IGST,
          IGST_Amt: details.IGST_Amt,
          Total_GST_Amt: details.Total_GST_Amt,
          Round_Off: details.Round_Off,
          Grand_Total: details.Grand_Total,
          Shed: details.Shed || "",
        });

        this.fetchFirm(details.From_Party._id);
        this.fetchParty(details.To_Party._id);
        this.fetchQuality(details.Quality._id);
        this.fetchBroker(details.Broker_Name._id);
        this.findDeliveryChalan(details.Invoice_No, details.UniqueCode);
        this.spinner.hide();
      });
  }

  fetchParty(partyid) {
    this.commonservice
      .fetchDetails(partyid, "party-details")
      .subscribe((details) => {
        this.partyList.push({
          _id: details._id,
          Company_Name: details.Company_Name,
        });
      });
  }

  fetchFirm(firmid) {
    this.commonservice
      .fetchDetails(firmid, "firm-details")
      .subscribe((details) => {
        this.firmList.push({
          _id: details._id,
          Company_Name: details.Company_Name,
        });
      });
  }

  fetchQuality(Quality) {
    this.commonservice
      .fetchDetails(Quality, "quality-details")
      .subscribe((details) => {
        this.qualityList.push({
          _id: details._id,
          Design_Name: details.Design_Name,
        });
      });
  }

  fetchBroker(brokerid) {
    this.commonservice
      .fetchDetails(brokerid, "broker-details")
      .subscribe((details) => {
        this.brokerList.push({
          _id: details._id,
          Broker_Name: details.Broker_Name,
        });
      });
  }

  fetchShed() {
    this.commonservice.fetchData(0, 0, "fetch-loom").subscribe((list) => {
      this.shedList = list;
      console.log(list);
    });
  }

  calculateTotalAmt(rate, fold) {
    let mtr = this.Total_Meters.value;
    if (fold > 0) {
      const per = 100 - fold;
      mtr = this.Total_Meters.value - (this.Total_Meters.value / 100) * per;
    }
    const totalAmt = rate * mtr;
    this.Total_Amount.patchValue(totalAmt.toFixed(2));
    this.Taxable_Amount.patchValue(totalAmt.toFixed(2));
    this.addTaxableAmt(
      this.Packing.value,
      this.Checking.value,
      this.Packing_Other.value
    );
    this.deductTaxableAmt(
      this.Second.value,
      this.TP.value,
      this.SL.value,
      this.Second_Other.value
    );
  }

  addTaxableAmt(PACKING, CHECKING, PACKINGOTHER) {
    let taxAmt = this.Total_Amount.value;
    taxAmt =
      parseFloat(taxAmt) +
      parseFloat(PACKING) +
      parseFloat(CHECKING) +
      parseFloat(PACKINGOTHER);
    this.Taxable_Amount.patchValue(taxAmt);
    this.deductTaxableAmt(
      this.Second.value,
      this.TP.value,
      this.SL.value,
      this.Second_Other.value
    );
  }

  deductTaxableAmt(SECOND, TP, SL, SECONDOTHER) {
    let amount =
      parseFloat(this.Total_Amount.value) +
      parseFloat(this.Packing.value) +
      parseFloat(this.Checking.value) +
      parseFloat(this.Packing_Other.value);
    const taxAmt =
      amount -
      parseFloat(SECOND) -
      parseFloat(TP) -
      parseFloat(SL) -
      parseFloat(SECONDOTHER);
    this.Taxable_Amount.patchValue(taxAmt);
  }

  calculateCGST(event) {
    const cgst = event.target.value;
    const taxAmt = this.Taxable_Amount.value;
    const cgstAmt = (taxAmt * cgst) / 100;
    this.CGST_Amt.patchValue(cgstAmt);
    this.calculateTotalAmount();
  }

  calculateSGST(event) {
    const sgst = event.target.value;
    const taxAmt = this.Taxable_Amount.value;
    const sgstAmt = (taxAmt * sgst) / 100;
    this.SGST_Amt.patchValue(sgstAmt);
    this.calculateTotalAmount();
  }

  calculateIGST(event) {
    const igst = event.target.value;
    const taxAmt = this.Taxable_Amount.value;
    const igstAmt = (taxAmt * igst) / 100;
    this.IGST_Amt.patchValue(igstAmt);
    this.calculateTotalAmount();
  }

  calculateTotalAmount() {
    const cgst = this.CGST_Amt.value;
    const sgst = this.SGST_Amt.value;
    const igst = this.IGST_Amt.value;
    const totalgst = cgst + sgst + igst;
    this.Total_GST_Amt.patchValue(totalgst.toFixed(2));

    const taxAmt = this.Taxable_Amount.value;
    const totAmt = taxAmt + totalgst;
    const rOffTemp: any = (totAmt - Math.floor(totAmt)).toFixed(3);

    if (rOffTemp != 0) {
      if (rOffTemp <= 0.5) {
        this.grandtotal = totAmt - rOffTemp;
        this.roundOff = -rOffTemp;
      } else {
        this.roundOff = 1 - parseFloat(rOffTemp);
        this.grandtotal = totAmt + this.roundOff;
        this.roundOff = +this.roundOff;
      }
    } else {
      this.grandtotal = totAmt;
      this.roundOff = 0;
    }

    this.Round_Off.patchValue(this.roundOff.toFixed(2));
    this.Grand_Total.patchValue(this.grandtotal.toFixed(2));
  }

  findDeliveryChalan(InvoiceNo, SalesUniqueCod) {
    this.commonservice
      .findData(
        { InvoiceNo: InvoiceNo, SalesUniqueCod: SalesUniqueCod },
        "find-delivery-chalan-details"
      )
      .subscribe((details) => {
        console.log(details);
        this.selectedShed = details[0].Shade_Name;
      });
  }

  onSubmit() {
    this.spinner.show();
    const formData = this.salesInvoice.value;

    formData.Company_Id = this.commonservice.currentUser.Company_Id;
    formData.Year_Id = this.Year_Id;
    formData.Updated_By = this.commonservice.currentUser.Company_Id;
    formData.Updated_Date = new Date();

    this.commonservice
      .updateData(this.salesInvoiceID, formData, "update-sales-invoice")
      .subscribe((data) => {
        if (data != null) {
          /* this.commonservice
            .deleteData(this.salesInvoiceID, "delete-common-account-trans")
            .subscribe((result) => {
              if (result.ok == 1) {
                const accountTrans = {
                  T_Code: this.salesInvoiceID,
                  Party: this.salesInvoiceDetails["To_Party"],
                  Against_Voucher: "SALES INVOICE",
                  Invoice_No: this.salesInvoiceDetails["Invoice_No"],
                  GETPASS: "",
                  AmtIn: 0,
                  AmtOut: formData.Grand_Total,
                  PaidBy: "",
                  Date: this.salesInvoiceDetails["Date"],
                  Cheque_No: "",
                  PaymentID: "",
                  Paid_From_Acc: "",
                  Voucher_Type: "SALES INVOICE",
                  Shed: formData.Shed,
                  Amount: formData.Grand_Total,
                  Balance_Type: "",
                  Firm: this.salesInvoiceDetails["From_Party"],
                  UniqueCode: this.commonservice.generateUniqueCode(
                    "SALESINVOICE",
                    this.Year_Id
                  ),
                  Company_Id: this.commonservice.currentUser.Company_Id,
                  Year_Id: this.Year_Id,
                  Created_By: this.commonservice.currentUser.Company_Id,
                  Created_Date: new Date(),
                };

                this.commonservice
                  .addData(accountTrans, "add-account-transaction")
                  .subscribe();

                this.toastr.success("Record updated successfuly", "Success");
                this.router.navigate(["/transaction/sales-invoice-register"]);
                this.spinner.hide();
              }
            }); */

          this.commonservice
            .findData(
              { T_Code: this.salesInvoiceID },
              "find-common-account-transaction"
            )
            .subscribe((count) => {
              if (count && count.length > 0) {
                const accountTrans = {
                  Party: this.salesInvoiceDetails["To_Party"],
                  Against_Voucher: "SALES INVOICE",
                  Invoice_No: this.salesInvoiceDetails["Invoice_No"],
                  AmtOut: formData.Grand_Total,
                  Date: this.salesInvoiceDetails["Date"],
                  Voucher_Type: "SALES INVOICE",
                  Amount: formData.Grand_Total,
                  Firm: this.salesInvoiceDetails["From_Party"],
                  Shed: this.salesInvoiceDetails["Shed"],
                  Company_Id: this.commonservice.currentUser.Company_Id,
                  Year_Id: this.Year_Id,
                  Updated_By: this.commonservice.currentUser.Company_Id,
                  Updated_Date: new Date(),
                };

                this.commonservice
                  .updateData(
                    this.salesInvoiceID,
                    accountTrans,
                    "update-common-account-transaction"
                  )
                  .subscribe((update) => {
                    this.toastr.success(
                      "Record updated successfuly",
                      "Success"
                    );
                    this.router.navigate([
                      "/transaction/sales-invoice-register",
                    ]);
                    this.spinner.hide();
                  });
              } else {
                const accountTrans = {
                  T_Code: this.salesInvoiceID,
                  Party: this.salesInvoiceDetails["To_Party"],
                  Against_Voucher: "SALES INVOICE",
                  Invoice_No: this.salesInvoiceDetails["Invoice_No"],
                  GETPASS: "",
                  AmtIn: 0,
                  AmtOut: formData.Grand_Total,
                  PaidBy: "",
                  Date: this.salesInvoiceDetails["Date"],
                  Cheque_No: "",
                  PaymentID: "",
                  Paid_From_Acc: "",
                  Voucher_Type: "SALES INVOICE",
                  Shed: formData.Shed,
                  Amount: formData.Grand_Total,
                  Balance_Type: "",
                  Firm: this.salesInvoiceDetails["From_Party"],
                  UniqueCode: this.commonservice.generateUniqueCode(
                    "SALESINVOICE",
                    this.Year_Id
                  ),
                  Company_Id: this.commonservice.currentUser.Company_Id,
                  Year_Id: this.Year_Id,
                  Created_By: this.commonservice.currentUser.Company_Id,
                  Created_Date: new Date(),
                };

                this.commonservice
                  .addData(accountTrans, "add-account-transaction")
                  .subscribe();

                this.toastr.success("Record updated successfuly", "Success");
                this.router.navigate(["/transaction/sales-invoice-register"]);
                this.spinner.hide();
              }
            });
        } else {
          this.toastr.error("Error updating record", "Error");
          this.spinner.hide();
        }
      });
  }

  onCancel() {
    this.router.navigate(["/transaction/sales-invoice-register"]);
  }
}
