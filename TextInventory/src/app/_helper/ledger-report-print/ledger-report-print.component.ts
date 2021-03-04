import { Component, OnInit } from "@angular/core";
import { HtmltopaperService } from "../../_services/htmltopaper.service";

@Component({
  selector: "app-ledger-report-print",
  templateUrl: "./ledger-report-print.component.html",
  styleUrls: ["./ledger-report-print.component.css"],
})
export class LedgerReportPrintComponent implements OnInit {
  content: any;
  returnArray: any = [];
  keysArr: any = [];
  totalMeters: number = 0;
  totalCredit: number = 0;
  totalDebit: number = 0;
  From_Date: any;
  To_Date: any;

  constructor(private htmltopaper: HtmltopaperService) {}

  ngOnInit(): void {
    // console.log("this.content", this.content);
    console.log(this.From_Date);
    console.log(this.To_Date);
    this.groupLedgerData(this.content);
  }

  groupLedgerData(content) {
    const result = content.reduce((prev, next) => {
      const key = `${next.To_Party}`;
      prev[key] = prev[key] || [];
      prev[key].push(next);
      return prev;
    }, {});
    this.returnArray = result;
    this.keysArr = Object.keys(this.returnArray);
    console.log("this.keysArr", this.keysArr);

    this.keysArr.sort(function (a, b) {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    });

    for (const key in result) {
      let meterSum = 0;
      let creditSum = 0;
      let debitSum = 0;
      const party = result[key];
      party.forEach((element) => {
        // console.log(element);
        meterSum = meterSum + element.Total_Meters;
        creditSum = creditSum + element.Credit;
        debitSum = debitSum + element.Debit;
      });

      this.totalMeters = +(this.totalMeters + meterSum).toFixed(2);
      this.totalCredit = +(this.totalCredit + creditSum).toFixed(2);
      this.totalDebit = +(this.totalDebit + debitSum).toFixed(2);

      result[key].push({
        To_Party: "",
        Date: "",
        Invoice_No: "",
        Quality: "",
        Total_Meters: meterSum,
        Rate: "",
        Credit: creditSum,
        Debit: debitSum,
        Firm_Name: "",
      });
    }

    this.returnArray = result;

    // console.log("this.returnArray", Array.from(this.returnArray));
    // console.log("this.returnArray keys", Object.keys(this.returnArray));

    /* this.keysArr.forEach((element) => {
      console.log("this.returnArray", this.returnArray[element]);
    }); */
  }

  printPdf(element) {
    const options = {
      name: "_blank",
      specs: ["fullscreen=yes", "titlebar=yes", "scrollbars=yes"],
      replace: true,
      styles: [
        "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css",
        "./ledger-report-print.component.css",
      ],
    };

    this.htmltopaper.HtmlToPaper(element, options);
  }
}
