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

  constructor(private htmltopaper: HtmltopaperService) {}

  ngOnInit(): void {
    // console.log("this.content", this.content);
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
