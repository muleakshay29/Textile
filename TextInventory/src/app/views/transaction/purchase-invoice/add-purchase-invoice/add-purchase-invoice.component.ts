import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Validators, FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { CommonService } from "../../../../_services/common.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-add-purchase-invoice",
  templateUrl: "./add-purchase-invoice.component.html",
  styleUrls: ["./add-purchase-invoice.component.css"],
})
export class AddPurchaseInvoiceComponent implements OnInit {
  purchaseInvoice: FormGroup;
  purchaseInvoiceID: string;
  product: FormArray;
  editMode = false;
  buttonText: string;
  Year_Id: any;
  shedList = [];
  partyList = [];
  firmList = [];
  loomList = [];
  stateList = [];
  paymentTypeList = [];
  paidByList = [];
  accountList = [];
  defaultValue = 0;
  invoiceNo: any;
  totalTaxableAmount: number;
  totalGSTAmount: number;
  grandTotal = 0;
  roundOff = 0;
  isTaxable: boolean = false;
  ispaidByCheque: boolean = false;
  invoiceDetailsErr = [];
  formCode;
  selectedSupplierState: string = "";
  selectedFirmState: string = "";
  enableIGST = false;
  showNA = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private commonservice: CommonService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getYearId();
    this.fetchParty();
    this.fetchFirm();
    this.fetchLoom();
    this.getItemCount();
    this.fetchState("5ea035da1492733c189e6ff2");
    this.fetchPaymentType("5ead05812a1e063f14ea6c1b");
    this.fetchPaidBy("5ead05782a1e063f14ea6c1a");
    this.fetchAccount();

    this.route.params.subscribe((params: Params) => {
      this.purchaseInvoiceID = params["id"];
    });
    this.buttonText = "Submit";

    this.purchaseInvoice.get("productList").valueChanges.subscribe((values) => {
      this.totalGSTAmount = 0;
      this.totalTaxableAmount = 0;

      const gstctrl = <FormArray>this.purchaseInvoice.controls["productList"];
      gstctrl.controls.forEach((x) => {
        let parsed = parseFloat(x.get("GST_Amt").value);
        this.totalGSTAmount += parsed;
        this.ref.detectChanges();
      });

      const amtctrl = <FormArray>this.purchaseInvoice.controls["productList"];
      amtctrl.controls.forEach((x) => {
        let parsed = parseFloat(x.get("Product_Amount").value);
        this.totalTaxableAmount += parsed;
        this.ref.detectChanges();
      });

      this.Total_GST_Amt.patchValue(this.totalGSTAmount.toFixed(2));
      this.Taxable_Amount.patchValue(this.totalTaxableAmount.toFixed(2));
      this.calculateRoundofGrandTotal();
    });
  }

  createForm() {
    this.purchaseInvoice = this.fb.group({
      Invoice_No: ["", Validators.required],
      Date: ["", Validators.required],
      Supplier_Name: ["", Validators.required],
      Taxable: ["", Validators.required],
      Payment_Type: ["", Validators.required],
      Firm_Name: ["", Validators.required],
      Shed_Name: ["", Validators.required],
      Taxable_Amount: [this.defaultValue],
      Add: [this.defaultValue],
      Round_Off: [this.defaultValue],
      Total_GST_Amt: [this.defaultValue],
      Less: [this.defaultValue],
      Grand_Total: [this.defaultValue],
      Pay_From_Acc: ["", Validators.required],
      Paid_By: ["", Validators.required],
      Cheque_No: [""],
      Cheque_Date: [""],
      productList: this.fb.array([]),
    });

    this.product = this.purchaseInvoice.get("productList") as FormArray;
  }

  createProduct(): FormGroup {
    return this.fb.group({
      Product_Name: ["", Validators.required],
      P_QTY: ["", Validators.required],
      P_Rate: ["", Validators.required],
      Free_QTY: [this.defaultValue, Validators.required],
      Discount: [this.defaultValue, Validators.required],
      Product_Amount: [this.defaultValue],
      CGST: [this.defaultValue, Validators.required],
      CGST_Amt: [this.defaultValue],
      SGST: [this.defaultValue, Validators.required],
      SGST_Amt: [this.defaultValue],
      IGST: [this.defaultValue, Validators.required],
      IGST_Amt: [this.defaultValue],
      GST_Amt: [this.defaultValue],
      Net_Amt: [this.defaultValue],
      // Location: ["", Validators.required],
    });
  }

  addProduct() {
    this.product.push(this.createProduct());
  }

  removeProduct(index) {
    this.product.removeAt(index);
  }

  get productGroup() {
    return this.purchaseInvoice.get("productList") as FormArray;
  }

  get Invoice_No() {
    return this.purchaseInvoice.get("Invoice_No");
  }

  get Date() {
    return this.purchaseInvoice.get("Date");
  }

  get Supplier_Name() {
    return this.purchaseInvoice.get("Supplier_Name");
  }

  get Taxable() {
    return this.purchaseInvoice.get("Taxable");
  }

  get Payment_Type() {
    return this.purchaseInvoice.get("Payment_Type");
  }

  get Firm_Name() {
    return this.purchaseInvoice.get("Firm_Name");
  }

  get Shed_Name() {
    return this.purchaseInvoice.get("Shed_Name");
  }

  get Taxable_Amount() {
    return this.purchaseInvoice.get("Taxable_Amount");
  }

  get Add() {
    return this.purchaseInvoice.get("Add");
  }

  get Less() {
    return this.purchaseInvoice.get("Less");
  }

  get Round_Off() {
    return this.purchaseInvoice.get("Round_Off");
  }

  get Total_GST_Amt() {
    return this.purchaseInvoice.get("Total_GST_Amt");
  }

  get Grand_Total() {
    return this.purchaseInvoice.get("Grand_Total");
  }

  get Pay_From_Acc() {
    return this.purchaseInvoice.get("Pay_From_Acc");
  }

  get Paid_By() {
    return this.purchaseInvoice.get("Paid_By");
  }

  get Cheque_No() {
    return this.purchaseInvoice.get("Cheque_No");
  }

  get Cheque_Date() {
    return this.purchaseInvoice.get("Cheque_Date");
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

  getProductFormGroup(index): FormGroup {
    const formGroup = this.product.controls[index] as FormGroup;
    return formGroup;
  }

  fetchSupplierDetails(event) {
    const supplier = event.target.value;
    this.commonservice
      .fetchDetails(supplier, "party-details")
      .subscribe((partyDetails) => {
        this.selectedSupplierState = partyDetails.State;

        if (this.selectedSupplierState != "" && partyDetails.State != "") {
          if (
            String(this.selectedSupplierState) != String(this.selectedFirmState)
          ) {
            this.enableIGST = true;
          } else {
            this.enableIGST = false;
          }
        } else {
          this.enableIGST = false;
        }
      });
  }

  fetchFirmDetails(event) {
    const firm = event.target.value;
    this.commonservice
      .fetchDetails(firm, "firm-details")
      .subscribe((firmDetails) => {
        this.selectedFirmState = firmDetails.State;

        if (this.selectedSupplierState != "" && firmDetails.State != "") {
          if (
            String(this.selectedSupplierState) != String(this.selectedFirmState)
          ) {
            this.enableIGST = true;
          } else {
            this.enableIGST = false;
          }
        } else {
          this.enableIGST = false;
        }
      });
  }

  onSubmit() {
    this.spinner.show();
    const formData = this.purchaseInvoice.value;
    formData.Company_Id = this.commonservice.currentUser.Company_Id;
    formData.Year_Id = this.Year_Id;
    formData.Created_By = this.commonservice.currentUser.Company_Id;
    formData.Created_Date = new Date();
    formData.P_Code = this.commonservice.generateUniqueCode(
      "PURCHASEINVOICE",
      this.Year_Id
    );

    this.commonservice
      .addData(formData, "add-purchase-invoice")
      .subscribe((result) => {
        if (result !== null) {
          let errorArr = [];

          formData.productList.forEach((element) => {
            const purchaseInvoiceDetails = {
              PurchaseInvoiceID: result._id,
              Product_Name: element.Product_Name,
              P_QTY: element.P_QTY,
              P_Rate: element.P_Rate,
              Free_QTY: element.Free_QTY,
              Discount: element.Discount,
              Product_Amount: element.Product_Amount,
              CGST: element.CGST,
              CGST_Amt: element.CGST_Amt,
              SGST: element.SGST,
              SGST_Amt: element.SGST_Amt,
              IGST: element.IGST,
              IGST_Amt: element.IGST_Amt,
              Shed: formData.Shed_Name,
              GST_Amt: element.GST_Amt,
              Net_Amt: element.Net_Amt,
              Company_Id: this.commonservice.currentUser.Company_Id,
              Year_Id: this.Year_Id,
              Created_By: this.commonservice.currentUser.Company_Id,
              Created_Date: new Date(),
              UniqueCode: this.commonservice.generateUniqueCode(
                "PURCHASEINVOICEDETAILS",
                this.Year_Id
              ),
            };

            this.commonservice
              .addData(purchaseInvoiceDetails, "add-purchase-invoice-details")
              .subscribe((details) => {
                if (details == null) {
                  errorArr.push(-1);
                }
              });
          });

          const bankTrans = {
            ACC_Code: formData.Pay_From_Acc,
            TransactionForm: "Purchase Invoice",
            AmtIn: 0,
            AmtOut: formData.Grand_Total,
            AgainstVoucher: "Purchase Invoice",
            TransactionBy: formData.Paid_By,
            TransactionDate: formData.Date,
            FormCode: this.formCode + 1,
            FormName: "Purchase Invoice",
            UniqueCode: this.commonservice.generateUniqueCode(
              "BANKTRANSACTION",
              this.Year_Id
            ),
            Cheque_No: formData.Cheque_No,
            Cheque_Date: formData.Cheque_Date,
            Company_Id: this.commonservice.currentUser.Company_Id,
            Year_Id: this.Year_Id,
            Created_By: this.commonservice.currentUser.Company_Id,
            Created_Date: formData.Date,
            TransactionFormId: result._id,
          };

          this.commonservice
            .addData(bankTrans, "add-bank-transaction")
            .subscribe((bank) => {
              if (bank == null) {
                errorArr.push(-1);
              }
            });

          const accountTrans = {
            T_Code: result._id,
            Party: formData.Supplier_Name,
            Against_Voucher: "Purchase INVOICE",
            Invoice_No: formData.Invoice_No,
            GETPASS: "",
            AmtIn: formData.Grand_Total,
            AmtOut: 0,
            PaidBy: formData.Paid_By,
            Date: formData.Date,
            Cheque_No: formData.Cheque_No,
            PaymentID: "",
            Paid_From_Acc: "",
            Voucher_Type: "PURCHASE INVOICE",
            Shed: formData.Shed_Name,
            Amount: formData.Grand_Total,
            Balance_Type: "",
            Firm: formData.Firm_Name,
            UniqueCode: this.commonservice.generateUniqueCode(
              "PURCHASEINVOICE",
              this.Year_Id
            ),
            Company_Id: this.commonservice.currentUser.Company_Id,
            Year_Id: this.Year_Id,
            Created_By: this.commonservice.currentUser.Company_Id,
            Created_Date: new Date(),
          };

          this.commonservice
            .addData(accountTrans, "add-account-transaction")
            .subscribe((account) => {
              if (account == null) {
                errorArr.push(-1);
              }
            });

          if (errorArr.includes(-1)) {
            this.toastr.error(
              "Error adding record. Please try again.",
              "Error"
            );

            this.commonservice.deleteData(
              result._id,
              "delete-purchase-invoice"
            );
            this.commonservice.deleteData(
              result._id,
              "delete-purchase-invoice-details"
            );

            this.spinner.hide();
          } else {
            this.toastr.success("Record added successfuly", "Success");
            this.purchaseInvoice.reset();
            this.router.navigate(["/transaction/purchase-invoice"]);
            this.spinner.hide();
          }
        } else {
          this.toastr.error("Error adding record. Please try again.", "Error");
        }
      });
  }

  fetchParty() {
    this.commonservice.fetchData(0, 0, "fetch-party").subscribe((list) => {
      this.partyList = list;
    });
  }

  fetchFirm() {
    this.commonservice.fetchData(0, 0, "fetch-firm").subscribe((list) => {
      this.firmList = list;
    });
  }

  fetchLoom() {
    this.commonservice.fetchData(0, 0, "fetch-loom").subscribe((list) => {
      this.shedList = list;
    });
  }

  fetchAccount() {
    this.commonservice.fetchData(0, 0, "fetch-account").subscribe((list) => {
      this.accountList = list;
    });
  }

  fetchState(_id: string) {
    this.commonservice
      .fetchDataFrom(_id, "fetch-commonchild-fromCM")
      .subscribe((list) => {
        this.stateList = list;
      });
  }

  fetchPaymentType(_id: string) {
    this.commonservice
      .fetchDataFrom(_id, "fetch-commonchild-fromCM")
      .subscribe((list) => {
        this.paymentTypeList = list;
      });
  }

  fetchPaidBy(_id: string) {
    this.commonservice
      .fetchDataFrom(_id, "fetch-commonchild-fromCM")
      .subscribe((list) => {
        this.paidByList = list;
      });
  }

  getItemCount() {
    this.commonservice
      .getItemCount("purchase-invoice-count")
      .subscribe((count) => {
        this.formCode = count.count;
      });
  }

  calculateAmount(pqty, prate, discount, i) {
    const total = pqty * prate;
    const tempdisc = total * (discount / 100);
    const totalAmt = total - tempdisc;
    this.getProductFormGroup(i).controls["Product_Amount"].patchValue(
      totalAmt.toFixed(2)
    );

    const cgst = this.getProductFormGroup(i).controls["CGST"].value;
    this.calculateCGST(cgst, i);

    const sgst = this.getProductFormGroup(i).controls["SGST"].value;
    this.calculateSGST(sgst, i);

    const igst = this.getProductFormGroup(i).controls["IGST"].value;
    this.calculateIGST(igst, i);
  }

  calculateCGST(cgst, i) {
    const productAmt = this.getProductFormGroup(i).controls["Product_Amount"]
      .value;
    const cgstAmt = (productAmt * cgst) / 100;
    this.getProductFormGroup(i).controls["CGST_Amt"].patchValue(
      cgstAmt.toFixed(2)
    );
    this.calculateTotalAmount(i);
  }

  calculateSGST(sgst, i) {
    const productAmt = this.getProductFormGroup(i).controls["Product_Amount"]
      .value;
    const sgstAmt = (productAmt * sgst) / 100;
    this.getProductFormGroup(i).controls["SGST_Amt"].patchValue(
      sgstAmt.toFixed(2)
    );
    this.calculateTotalAmount(i);
  }

  calculateIGST(igst, i) {
    const productAmt = this.getProductFormGroup(i).controls["Product_Amount"]
      .value;
    const igstAmt = (productAmt * igst) / 100;
    this.getProductFormGroup(i).controls["IGST_Amt"].patchValue(
      igstAmt.toFixed(2)
    );
    this.calculateTotalAmount(i);
  }

  calculateTotalAmount(i) {
    const cgst = this.getProductFormGroup(i).controls["CGST_Amt"].value;
    const sgst = this.getProductFormGroup(i).controls["SGST_Amt"].value;
    const igst = this.getProductFormGroup(i).controls["IGST_Amt"].value;
    const totalgst = Number(cgst) + Number(sgst) + Number(igst);
    this.getProductFormGroup(i).controls["GST_Amt"].patchValue(
      totalgst.toFixed(2)
    );

    const taxAmt = this.getProductFormGroup(i).controls["Product_Amount"].value;
    const totAmt = Number(taxAmt) + totalgst;
    this.getProductFormGroup(i).controls["Net_Amt"].patchValue(totAmt);
  }

  calculateGrandTotal(event, flag) {
    let add = 0;
    let less = 0;
    if (flag == 1) {
      add = parseInt(event.target.value);
      less = parseInt(this.Less.value);
    } else {
      add = parseInt(this.Add.value);
      less = parseInt(event.target.value);
    }

    const tmpgrtotal = this.grandTotal;
    let temp = tmpgrtotal - less + add;
    this.Grand_Total.patchValue(temp.toFixed(2));
  }

  calculateRoundofGrandTotal() {
    const totAmt =
      Number(this.totalTaxableAmount) + Number(this.totalGSTAmount);
    const rOffTemp: any = (totAmt - Math.floor(totAmt)).toFixed(3);

    if (rOffTemp != 0) {
      // this.roundOff = 1 - parseFloat(rOffTemp);

      if (rOffTemp <= 0.5) {
        this.grandTotal = totAmt - rOffTemp;
        this.roundOff = -rOffTemp;
      } else {
        this.roundOff = 1 - parseFloat(rOffTemp);
        this.grandTotal = totAmt + this.roundOff;
        this.roundOff = +this.roundOff;
      }
    } else {
      this.grandTotal = totAmt;
      this.roundOff = 0;
    }

    this.Round_Off.patchValue(this.roundOff.toFixed(2));
    this.Grand_Total.patchValue(this.grandTotal.toFixed(2));
  }

  setTaxable(taxable) {
    if (taxable == 1) {
      this.isTaxable = true;

      /* this.productGroup.controls.map((ctrl) => {
        ctrl["controls"].CGST.patchValue("");
        ctrl["controls"].SGST.patchValue("");
      }); */
    } else {
      this.isTaxable = false;

      /* this.productGroup.controls.map((ctrl) => {
        ctrl["controls"].CGST.patchValue(0);
        ctrl["controls"].SGST.patchValue(0);
      }); */
    }
  }

  setPaidByCheque(paidby) {
    if (paidby == "5ead07652a1e063f14ea6c28") {
      this.ispaidByCheque = true;
      this.Cheque_No.setValidators([Validators.required]);
      this.Cheque_No.updateValueAndValidity();

      this.Cheque_Date.setValidators([Validators.required]);
      this.Cheque_Date.updateValueAndValidity();
    } else {
      this.ispaidByCheque = false;
      this.Cheque_No.clearValidators();
      this.Cheque_No.updateValueAndValidity();

      this.Cheque_Date.clearValidators();
      this.Cheque_Date.updateValueAndValidity();
    }
  }

  togglePayAccount(event) {
    const credit = event.target.value;

    if (credit == "5ead078e2a1e063f14ea6c2a") {
      this.Pay_From_Acc.disable();
      this.Pay_From_Acc.clearValidators();
      this.Pay_From_Acc.updateValueAndValidity();
    } else {
      this.Pay_From_Acc.enable();
      this.Pay_From_Acc.setValidators([Validators.required]);
      this.Pay_From_Acc.updateValueAndValidity();
    }
  }

  onCancel() {
    this.router.navigate(["/transaction/purchase-invoice"]);
  }
}
