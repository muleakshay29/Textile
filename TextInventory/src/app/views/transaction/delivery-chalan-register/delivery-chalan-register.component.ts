import { Component, OnInit } from "@angular/core";
import { PageChangedEvent } from "ngx-bootstrap/pagination";
import { CommonService } from "../../../_services/common.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { DeliveryChalanPrintComponent } from "../../../_helper/delivery-chalan-print/delivery-chalan-print.component";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: "app-delivery-chalan-register",
  templateUrl: "./delivery-chalan-register.component.html",
  styleUrls: ["./delivery-chalan-register.component.css"],
})
export class DeliveryChalanRegisterComponent implements OnInit {
  returnedArray = [];
  dataLength: number;
  itemsPerPage: number = 10;
  PDFData: any = [];

  constructor(
    private cmservice: CommonService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getItemCount();
    this.fetchDeliveryChalan();
  }

  getItemCount() {
    this.spinner.show();
    this.cmservice.getItemCount("delivery-chalan-count").subscribe((count) => {
      this.dataLength = count.count;
      this.spinner.hide();
    });
  }

  generatePdf(_id, content) {
    /* this.spinner.show();
    this.fetchDeliveryChalanChildDetails(_id, content);
    setTimeout(() => {
      pdfMake.createPdf(this.PDFData).open();
      this.spinner.hide();
    }, 1000); */

    const result = this.cmservice.openPrintModal(
      content,
      _id,
      DeliveryChalanPrintComponent
    );
    result.content.onClose.subscribe((result: boolean) => {
      if (result == true) {
        this.spinner.show();
      }
    });
  }

  fetchDeliveryChalan(pageIndex = 0, pageSize = this.itemsPerPage) {
    this.spinner.show();
    this.cmservice
      .fetchData(pageIndex, pageSize, "fetch-delivery-chalan-sales-invoice")
      .subscribe((list) => {
        this.returnedArray = list.slice(0, this.itemsPerPage);
        this.spinner.hide();
      });
  }

  fetchDeliveryChalanChildDetails(id, content) {
    this.cmservice
      .fetchDetails(id, "delivery-chalan-child-details")
      .subscribe((details) => {
        // this.PDFData = this.getDocumentDefinition(content, details);
        // console.log(this.PDFData);
        return details;
      });
  }

  getDocumentDefinition(content, data) {
    return {
      content: [
        {
          text: content.Shade_Name.SHED_Name,
          bold: true,
          fontSize: 20,
          alignment: "center",
          margin: [0, 0, 0, 20],
        },
        this.getPDFHead(content),
        this.getDeliveryChild(data),
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 20, 0, 10],
          decoration: "underline",
        },
        tableHeader: {
          bold: true,
        },
      },
    };
  }

  getPDFHead(content) {
    const head = [];
    let date = new Date(content.Date);
    const formatedDate =
      date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear();
    head.push([
      {
        columns: [
          [
            {
              width: "33.33%",
              text: "DC No: " + content.Chalan_No,
              margin: [0, 0, 0, 20],
            },
            {
              width: "33.33%",
              text: "TO PARTY: " + content.Party_Name.Company_Name,
              margin: [0, 0, 0, 10],
            },
            {
              width: "33.33%",
              text: "PIECES: " + content.Pieces,
              margin: [0, 0, 0, 10],
            },
            {
              width: "33.33%",
              text: "QUALITY: " + content.Design.Design_Name,
            },
          ],
          [
            {
              width: "33.33%",
              text: "DATE: " + formatedDate,
              margin: [0, 0, 0, 20],
            },
            {
              width: "33.33%",
              text: "PLACE: " + content.Place,
              margin: [0, 0, 0, 10],
            },
            {
              width: "33.33%",
              text: "METERS: " + content.Meters,
            },
          ],
          [
            {
              width: "33.33%",
              text: "FROM PARTY: " + content.Firm_Name.Company_Name,
              margin: [0, 0, 0, 20],
            },
            {
              width: "33.33%",
              text: "BALES: " + content.Bales,
              margin: [0, 0, 0, 10],
            },
            {
              width: "33.33%",
              text: "SAMPLE & CUT METERS: " + content.Sample_Cut_Pieces,
            },
          ],
        ],
      },
    ]);

    return {
      table: {
        widths: ["*"],
        body: [head],
      },
    };
  }

  getDeliveryChild(childData) {
    return {
      table: {
        widths: ["20%", "20%", "20%", "20%", "20%"],
        alignment: "center",
        body: [
          [
            {
              text: "L.NO",
              style: "tableHeader",
            },
            {
              text: "Piece No",
              style: "tableHeader",
            },
            {
              text: "Meter",
              style: "tableHeader",
            },
            {
              text: "Weight",
              style: "tableHeader",
            },
            {
              text: "Gram",
              style: "tableHeader",
            },
          ],
          ...childData.map((ed) => {
            return [
              ed.Loom_No.Loom_No,
              ed.Piece_No,
              ed.Meters,
              ed.Weight,
              ed.GRAMEZ,
            ];
          }),
        ],
      },
    };
  }

  pageChanged(event: PageChangedEvent): void {
    this.fetchDeliveryChalan(event.page - 1, this.itemsPerPage);
  }

  setItemPerPage(event) {
    this.itemsPerPage = event.target.value;
    this.fetchDeliveryChalan(event.page - 1, this.itemsPerPage);
  }

  searchRecord(event) {
    const searchTxt = event.target.value;

    if (searchTxt == "" || searchTxt.length == 0) {
      this.fetchDeliveryChalan();
      this.getItemCount();
      this.spinner.hide();
    }

    if (searchTxt.length >= 3) {
      this.spinner.show();
      this.cmservice
        .findData({ Firm_Name: searchTxt }, "find-delivery-chalan")
        .subscribe((result) => {
          this.returnedArray = result;
          this.dataLength = result.length;
          this.spinner.hide();
        });
    }
  }
}
