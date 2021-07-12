import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";
import { Subject } from "rxjs";
import { CommonService } from "../../_services/common.service";
import { NgxSpinnerService } from "ngx-spinner";
var converter = require("number-to-words");

@Component({
  selector: "app-invoice-design3",
  templateUrl: "./invoice-design3.component.html",
  styleUrls: ["./invoice-design3.component.css"],
})
export class InvoiceDesign3Component implements OnInit {
  content = [];
  public onClose: Subject<boolean>;
  salesInvoiceDetails = {
    Firm_Name: null,
    Firm_Address: null,
    Firm_Mobile: null,
    Firm_Alternate_No: null,
    Firm_Email_ID: null,
    Firm_GST_No: null,
    Firm_Pan_No: null,
    Party_Name: null,
    Party_Address: null,
    Party_GST_No: null,
    Party_Pan_No: null,
    Party_State_Code: null,
    Total_Due: null,
    Invoice_No: null,
    Date: null,
    // Place_of_Delivery: null,
    Broker_Name: null,
    DC_NO: null,
    Quality: null,
    Loom_No: null,
    HSN_NO: null,
    No_Of_Pieces: null,
    Total_Meters: null,
    Rate: null,
    Total_Amount: null,
    Packing: null,
    Checking: null,
    Packing_Other: null,
    ADD: null,
    Second: null,
    TP: null,
    SL: null,
    FOLD: null,
    Second_Other: null,
    LESS: null,
    Taxable_Amount: null,
    CGST: null,
    CGST_Amt: null,
    SGST: null,
    SGST_Amt: null,
    IGST: null,
    IGST_Amt: null,
    Round_Off: null,
    Grand_Total: null,
    Amount_in_Words: null,
    Bank_Name: null,
    Account_No: null,
    IFSC_Code: null,
    CD_Percent: 0,
    CD_Amount: 0,
  };
  salesInvoiceID: string;
  _id: string;

  constructor(
    public bsModalRef: BsModalRef,
    private commonservice: CommonService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.onClose = new Subject();
    this.fetchSalesInvoiceDetails();
  }

  fetchSalesInvoiceDetails() {
    // this.spinner.show();
    this.commonservice
      .fetchDetails(this._id, "sales-invoice-details")
      .subscribe((details) => {
        this.commonservice
          .findData(
            {
              InvoiceNo: details.Invoice_No,
              SalesUniqueCod: details.UniqueCode,
            },
            "find-delivery-chalan-details"
          )
          .subscribe((deliveryChalan) => {
            let less = 0;
            let mtr = 0;
            let FOLD = 0;
            if (details.FOLD > 0) {
              //  less = details.Total_Meters - ((details.Total_Meters/100) *(100 - details.FOLD));
              //  less = less * details.Rate;
              //  less = (details.Total_Meters * details.Rate) - less;
              const per = 100 - details.FOLD;
              mtr = details.Total_Meters - (details.Total_Meters / 100) * per;
              console.log("FOLD IS " + FOLD + " Mtr is " + mtr);
              FOLD = mtr * details.Rate;
              FOLD = details.Total_Meters * details.Rate - FOLD;
              console.log("Fold Amount is " + FOLD);
            }

            const lessAmt =
              Number(details.Second) +
              Number(details.TP) +
              Number(details.SL) +
              Number(FOLD) +
              Number(details.Second_Other);
            const addAmt =
              Number(details.Packing) +
              Number(details.Checking) +
              Number(details.Packing_Other);

            const invoiceData = {
              Firm_Name: details.From_Party["Company_Name"],
              Firm_Address: details.From_Party.Address,
              Firm_Mobile: details.From_Party.Mobile_No,
              Firm_Alternate_No: details.From_Party.Alternate_No,
              Firm_Email_ID: details.From_Party.Email_ID,
              Firm_GST_No: details.From_Party.GST_No,
              Firm_Pan_No: details.From_Party.Pan_No,
              Party_Name: details.To_Party.Company_Name,
              Party_Address: details.To_Party.Address,
              Party_GST_No: details.To_Party.GST_No,
              Party_Pan_No: details.To_Party.Pan_No,
              Party_State_Code: details.To_Party.State.CMC_Name,
              Total_Due: details.Grand_Total,
              Invoice_No: details.Invoice_No,
              Date: details.Date,
              // Place_of_Delivery: deliveryChalan ? deliveryChalan[0].Place : "",
              Broker_Name: details.Broker_Name.Broker_Name,
              DC_NO: details.DC_NO,
              Quality: details.Quality.Design_Name,
              Loom_No: details.Loom_No,
              HSN_NO: details.HSN_NO,
              No_Of_Pieces: details.No_Of_Pieces,
              Total_Meters: details.Total_Meters.toFixed(2),
              Rate: details.Rate,
              Total_Amount: details.Total_Amount.toFixed(2),
              Packing: details.Packing,
              Checking: details.Checking,
              Packing_Other: details.Packing_Other,
              ADD: addAmt.toFixed(2),
              Second: details.Second,
              TP: details.TP,
              SL: details.SL,
              FOLD: details.FOLD,
              Second_Other: details.Second_Other,
              LESS: lessAmt.toFixed(2),
              Taxable_Amount: details.Taxable_Amount.toFixed(2),
              CGST: details.CGST.toFixed(2),
              CGST_Amt: details.CGST_Amt.toFixed(2),
              SGST: details.SGST.toFixed(2),
              SGST_Amt: details.SGST_Amt.toFixed(2),
              IGST: details.IGST.toFixed(2),
              IGST_Amt: details.IGST_Amt.toFixed(2),
              Round_Off: details.Round_Off.toFixed(2),
              Grand_Total: details.Grand_Total.toFixed(2),
              Amount_in_Words: converter.toWords(details.Grand_Total),
              CD_Percent: details.CD_Percent || 0,
              CD_Amount: details.CD_Amount || 0,
              Bank_Name:
                details.From_Party.Bank_Name == ""
                  ? " - "
                  : details.From_Party.Bank_Name,
              Account_No:
                details.From_Party.Account_No == ""
                  ? " - "
                  : details.From_Party.Account_No,
              IFSC_Code:
                details.From_Party.IFSC_Code == ""
                  ? " - "
                  : details.From_Party.IFSC_Code,
            };

            this.salesInvoiceDetails = invoiceData;
            // this.spinner.hide();
          });
      });
  }
}
