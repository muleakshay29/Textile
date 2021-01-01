import { Component, OnInit } from "@angular/core";
import { CommonService } from "../../_services/common.service";
import { HtmltopaperService } from "../../_services/htmltopaper.service";
import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "app-delivery-chalan-print",
  templateUrl: "./delivery-chalan-print.component.html",
})
export class DeliveryChalanPrintComponent implements OnInit {
  content: any;
  date: any;
  _id: string;
  formatedDate;
  data: any = [];
  data2: any = [];

  constructor(
    public bsModalRef: BsModalRef,
    private cmservice: CommonService,
    private htmltopaper: HtmltopaperService
  ) {}

  ngOnInit(): void {
    // console.log(this.content);
    this.fetchDeliveryChalanChildDetails();
    // console.log("this.content.Date", this.content.Date);
    const tempDate = new Date(this.content.Date).toLocaleDateString("sq-AL", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    this.date = tempDate.split("/");
    this.formatedDate = this.date[1] + "/" + this.date[0] + "/" + this.date[2];

    /* this.date = new Date(tempDate);
    console.log("this.date", this.date);
    this.formatedDate =
      this.date.getDay() +
      "/" +
      this.date.getMonth() +
      "/" +
      this.date.getFullYear(); */
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
