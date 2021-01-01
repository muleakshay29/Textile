import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { CommonService } from "../../../_services/common.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-sales-invoice",
  templateUrl: "./sales-invoice.component.html",
  styleUrls: ["./sales-invoice.component.css"],
})
export class SalesInvoiceComponent implements OnInit {
  salesInvoice: FormGroup;
  salesInvoiceID: string;
  beamList: FormArray;
  contractId: string;
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
  deliveryChalanDetails: any[] = [];

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
    this.generateInvoice();
    this.fetchQuality();
    // this.fetchParty();
    // this.fetchFirm();
    this.fetchBroker();
    // this.fetchContract();
    this.fetchShed();

    this.route.params.subscribe((params: Params) => {
      this.salesInvoiceID = params["id"];
      this.DC_NO.patchValue(params["id2"]);
    });
    this.buttonText = "Submit";

    this.fetchDeliveryChalan();
    this.fetchDeliveryChalanDetails();
  }

  createForm() {
    this.salesInvoice = this.fb.group({
      Invoice_No: ["", Validators.required],
      Date: ["", Validators.required],
      From_Party: ["", Validators.required],
      To_Party: ["", Validators.required],
      Loom_No: ["", Validators.required],
      HSN_NO: ["", Validators.required],
      Broker_Name: ["", Validators.required],
      DC_NO: [""],
      DC_Date: [""],
      Quality: [""],
      No_Of_Pieces: [this.defaultValue],
      Total_Meters: [this.defaultValue],
      Sample_Cut_Meters: [this.defaultValue],
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

  generateInvoice() {
    this.invoiceNo = (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    ).toUpperCase();
  }

  /* getInvoice(firm) {
    this.commonservice
      .findData({ From_Party: firm }, "sales-invoice-invoice")
      .subscribe((details) => {
        if (details.length > 0) {
          const invoiceno = details[0].Invoice_No;
          this.Invoice_No.patchValue(Number(invoiceno) + 1);
        } else {
          this.Invoice_No.patchValue(1);
        }
      });
  } */

  getInvoice(firm) {
    this.commonservice
      .findData({ From_Party: firm }, "sales-invoice-manual")
      .subscribe((details) => {
        if (details.length > 0) {
          const invoiceArr = [];
          details.forEach((element) => {
            invoiceArr.push(parseInt(element.Invoice_No));
          });

          const invoiceno = invoiceArr.sort(function (a, b) {
            return b - a;
          })[0];
          // const invoiceno = details[0].Invoice_No;
          this.Invoice_No.patchValue(invoiceno + 1);
        } else {
          this.Invoice_No.patchValue(1);
        }
      });
  }

  onSubmit() {
    this.spinner.show();
    const formData = this.salesInvoice.value;

    formData.Company_Id = this.commonservice.currentUser.Company_Id;
    formData.Year_Id = this.Year_Id;
    formData.Created_By = this.commonservice.currentUser.Company_Id;
    formData.Created_Date = new Date();
    formData.UniqueCode = this.commonservice.generateUniqueCode(
      "SALESINVOICE",
      this.Year_Id
    );
    formData.Form_Type = 0;
    formData.Shed_Name = this.deliveryChalanDetails[0].Shade_Name;

    this.commonservice
      .addData(formData, "add-sales-invoice")
      .subscribe((result) => {
        if (result !== null) {
          const updateDeliveryData = {
            InvoiceNo: formData.Invoice_No,
            SalesUniqueCode: formData.UniqueCode,
            Company_Id: this.commonservice.currentUser.Company_Id,
            Year_Id: this.Year_Id,
            Updated_By: this.commonservice.currentUser.Company_Id,
            Updated_Date: new Date(),
          };

          this.commonservice
            .updateData(
              this.salesInvoiceID,
              updateDeliveryData,
              "update-delivery-sales-code"
            )
            .subscribe();

          const accountTrans = {
            T_Code: result._id,
            Party: formData.To_Party,
            Against_Voucher: "SALES INVOICE",
            Invoice_No: formData.Invoice_No,
            GETPASS: "",
            AmtIn: 0,
            AmtOut: formData.Grand_Total,
            PaidBy: "",
            Date: formData.Date,
            Cheque_No: "",
            PaymentID: "",
            Paid_From_Acc: "",
            Voucher_Type: "SALES INVOICE",
            Shed: formData.Shed,
            Amount: formData.Grand_Total,
            Balance_Type: "",
            Firm: formData.From_Party,
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

          this.toastr.success("Record added successfuly", "Success");
          this.salesInvoice.reset();
          this.router.navigate(["/transaction/delivery-chalan"]);
          this.spinner.hide();
        } else {
          this.toastr.error("Error adding record. Please try again.", "Error");
        }
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

        this.selectedToPartyState = details.State;
        if (
          String(this.selectedFromPartyState) !=
          String(this.selectedToPartyState)
        ) {
          this.enableIGST = true;
        } else {
          this.enableIGST = false;
        }
      });
  }

  fetchContract(contract) {
    if (contract) {
      this.commonservice
        .fetchDetails(contract, "contract-details-sales")
        .subscribe((details) => {
          const rateCalc = (details[0].Pick * details[0].Rate) / 100;
          this.Rate.patchValue(rateCalc);
        });
    }
  }

  fetchFirm(firmid) {
    this.commonservice
      .fetchDetails(firmid, "firm-details")
      .subscribe((details) => {
        this.firmList.push({
          _id: details._id,
          Company_Name: details.Company_Name,
        });

        this.selectedFromPartyState = details.State;
        if (
          String(this.selectedFromPartyState) !=
          String(this.selectedToPartyState)
        ) {
          this.enableIGST = true;
        } else {
          this.enableIGST = false;
        }
      });
  }

  fetchQuality() {
    this.commonservice.fetchData(0, 0, "fetch-quality").subscribe((list) => {
      this.qualityList = list;
    });
  }

  fetchBroker() {
    this.commonservice.fetchData(0, 0, "fetch-broker").subscribe((list) => {
      this.brokerList = list;
    });
  }

  fetchShed() {
    this.commonservice.fetchData(0, 0, "fetch-loom").subscribe((list) => {
      this.shedList = list;
      console.log(list);
    });
  }

  fetchDeliveryChalan() {
    this.commonservice
      .fetchDetails(this.salesInvoiceID, "delivery-chalan-details")
      .subscribe((deliveryChalan) => {
        const date = new Date(deliveryChalan.Date);
        const formatedMonth =
          date.getMonth() > 8
            ? date.getMonth() + 1
            : "0" + (date.getMonth() + 1);

        const formatedDay =
          date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
        const formatedYear = date.getFullYear();
        const dcDate = formatedYear + "-" + formatedMonth + "-" + formatedDay;

        if (deliveryChalan.Shed) {
          this.Shed.disable();
        }

        this.salesInvoice.patchValue({
          DC_Date: dcDate,
          No_Of_Pieces: deliveryChalan.Pieces,
          Total_Meters: deliveryChalan.Meters,
          Sample_Cut_Meters: deliveryChalan.Sample_Cut_Pieces,
          Broker_Name: deliveryChalan.Broker_Name._id,
          From_Party: deliveryChalan.Firm_Name._id,
          To_Party: deliveryChalan.Party_Name._id,
          Shed: deliveryChalan.Shed || "",
        });

        this.deliveryChalanDetails.push(deliveryChalan);

        this.fetchContract(deliveryChalan.Contract);
        this.fetchFirm(deliveryChalan.Firm_Name._id);
        this.fetchParty(deliveryChalan.Party_Name._id);
        this.getInvoice(deliveryChalan.Firm_Name._id);
      });
  }

  fetchDeliveryChalanDetails() {
    console.log(this.salesInvoiceID);
    this.commonservice
      .fetchDetails(this.salesInvoiceID, "delivery-chalan-child-details")
      .subscribe((deliveryChalanDetails) => {
        // this.fetchLoomDetails(deliveryChalanDetails[0].Loom_No);delivery-chalan-child-details
        // this.selectedShed = deliveryChalanDetails[0].Shade_Name;
        console.log(deliveryChalanDetails);
        this.salesInvoice.patchValue({
          Quality: deliveryChalanDetails[0].Quality._id,
          // Loom_No: deliveryChalanDetails[0]._id,
        });
      });
  }

  fetchLoomDetails(loomno) {
    this.commonservice
      .fetchDetails(loomno, "loom-no-details")
      .subscribe((list) => {
        this.loomList.push(list);

        this.salesInvoice.patchValue({
          // Loom_No: list._id,
        });
      });
  }

  getItemCount() {
    this.commonservice
      .getItemCount("delivery-chalan-count")
      .subscribe((count) => {
        this.formCode = count.count;
      });
  }

  calculateTotalAmt(rate) {
    let mtr = this.Total_Meters.value;
    /* if (fold > 0) {
      const per = 100 - fold;
      mtr = this.Total_Meters.value - (this.Total_Meters.value / 100) * per;
    } */
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
      this.Second_Other.value,
      this.FOLD.value
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
      this.Second_Other.value,
      this.FOLD.value
    );
  }

  deductTaxableAmt(SECOND, TP, SL, SECONDOTHER, FOLD) {
    let mtr = 0;
    if (FOLD > 0) {
      const per = 100 - FOLD;
      mtr = this.Total_Meters.value - (this.Total_Meters.value / 100) * per;
      console.log("FOLD IS " + FOLD + " Mtr is " + mtr);
      FOLD = mtr * this.Rate.value;
      FOLD = this.Total_Meters.value * this.Rate.value - FOLD;
      console.log("Fold Amount is " + FOLD);
    }

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
      parseFloat(SECONDOTHER) -
      parseFloat(FOLD);
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
    const totAmt = Number(taxAmt) + Number(totalgst);
    const rOffTemp: any = (totAmt - Math.floor(totAmt)).toFixed(3);

    if (rOffTemp != 0) {
      // this.roundOff = 1 - parseFloat(rOffTemp);

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

  onCancel() {
    this.router.navigate(["/transaction/delivery-chalan"]);
  }
}
