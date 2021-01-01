import { Component, OnInit } from "@angular/core";
import { HtmltopaperService } from "../../_services/htmltopaper.service";

@Component({
  selector: "app-gstr1-report-print",
  templateUrl: "./gstr1-report-print.component.html",
  styleUrls: ["./gstr1-report-print.component.css"],
})
export class Gstr1ReportPrintComponent implements OnInit {
  content: any;
  returnArray: any;

  constructor(private htmltopaper: HtmltopaperService) {}

  ngOnInit(): void {
    this.returnArray = this.content;
    console.log(this.content);
  }

  printPdf(element) {
    const options = {
      name: "_blank",
      specs: ["fullscreen=yes", "titlebar=yes", "scrollbars=yes"],
      replace: true,
      styles: [
        "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
      ],
    };

    this.htmltopaper.HtmlToPaper(element, options);
  }
}
