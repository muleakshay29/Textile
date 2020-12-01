import { Component, OnInit } from "@angular/core";
import { CommonService } from "../../_services/common.service";
import { HtmltopaperService } from "../../_services/htmltopaper.service";

@Component({
  selector: "app-delivery-chalan-print",
  templateUrl: "./delivery-chalan-print.component.html",
  styles: [
    `
      .modal-body {
        padding: 0.9rem;
      }
    `,
  ],
})
export class DeliveryChalanPrintComponent implements OnInit {
  content: any;
  date: Date;
  _id: string;
  formatedDate;
  data: any;
  data2: any;

  constructor(
    private cmservice: CommonService,
    private htmltopaper: HtmltopaperService
  ) {}

  ngOnInit(): void {
    // console.log(this.content);
    this.fetchDeliveryChalanChildDetails();
    this.date = new Date(this.content.Date);
    this.formatedDate =
      this.date.getDay() +
      "/" +
      this.date.getMonth() +
      "/" +
      this.date.getFullYear();
  }

  fetchDeliveryChalanChildDetails() {
    this.cmservice
      .fetchDetails(this._id, "delivery-chalan-child-details")
      .subscribe((details) => {
        this.data = details.slice(0, 30);
        this.data2 = details.slice(30, 30);

        console.log(this.data);
        console.log(this.data2);
      });
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
