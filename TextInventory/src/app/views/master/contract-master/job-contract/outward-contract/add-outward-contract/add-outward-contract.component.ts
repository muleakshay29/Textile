import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { CommonService } from "../../../../../../_services/common.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-add-outward-contract",
  templateUrl: "./add-outward-contract.component.html",
  styleUrls: ["./add-outward-contract.component.css"],
})
export class AddOutwardContractComponent implements OnInit {
  outwardContract: FormGroup;
  outwardContractID: string;
  editMode = false;
  buttonText: string;
  Year_Id: any;
  defaultValue: number = 0;
  partyList = [];
  brokerList = [];
  qualityList = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private cmaster: CommonService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getYearId();
    this.fetchParty();
    this.fetchBroker();
    this.fetchQuality();

    this.route.params.subscribe((params: Params) => {
      this.outwardContractID = params["id"] ? params["id"] : "";
      this.editMode = params["id"] != null;
      this.buttonText = this.editMode ? "Update" : "Create";
      this.initForm();
    });
  }

  createForm() {
    this.outwardContract = this.fb.group({
      Contract_No: ["", Validators.required],
      Date: ["", Validators.required],
      Party_Name: ["", Validators.required],
      Broker_Name: ["", Validators.required],
      Quality: ["", Validators.required],
      Phani: [this.defaultValue, Validators.required],
      Pick: [this.defaultValue, Validators.required],
      Pannha: [this.defaultValue, Validators.required],
      Meters: [this.defaultValue, Validators.required],
      Beams: [this.defaultValue],
      Total_Loom: [this.defaultValue],
      Rate: [this.defaultValue, Validators.required],
      GST: [this.defaultValue, Validators.required],
      Rate_with_GST: [this.defaultValue, Validators.required],
      Delivery_Period: ["", Validators.required],
      Payment_Days: [this.defaultValue, Validators.required],
      Warf: [this.defaultValue, Validators.required],
      Weft: [this.defaultValue, Validators.required],
      Brokrage: [this.defaultValue, Validators.required],
    });
  }

  getYearId() {
    this.Year_Id = localStorage.getItem("selectedYear");
    /* let today = new Date();
    const year = today.getFullYear();
    this.cmaster
      .findData({ CMC_Name: year }, "find-cmcname")
      .subscribe((result) => {
        this.Year_Id = result[0]._id;
      }); */
  }

  get Contract_No() {
    return this.outwardContract.get("Contract_No");
  }

  get Date() {
    return this.outwardContract.get("Date");
  }

  get Party_Name() {
    return this.outwardContract.get("Party_Name");
  }

  get Broker_Name() {
    return this.outwardContract.get("Broker_Name");
  }

  get Quality() {
    return this.outwardContract.get("Quality");
  }

  get Phani() {
    return this.outwardContract.get("Phani");
  }

  get Pick() {
    return this.outwardContract.get("Pick");
  }

  get Pannha() {
    return this.outwardContract.get("Pannha");
  }

  get Beams() {
    return this.outwardContract.get("Beams");
  }

  get Total_Loom() {
    return this.outwardContract.get("Total_Loom");
  }

  get Meters() {
    return this.outwardContract.get("Meters");
  }

  get Rate() {
    return this.outwardContract.get("Rate");
  }

  get GST() {
    return this.outwardContract.get("GST");
  }

  get Rate_with_GST() {
    return this.outwardContract.get("Rate_with_GST");
  }

  get Delivery_Period() {
    return this.outwardContract.get("Delivery_Period");
  }

  get Payment_Days() {
    return this.outwardContract.get("Payment_Days");
  }

  get Warf() {
    return this.outwardContract.get("Warf");
  }

  get Weft() {
    return this.outwardContract.get("Weft");
  }

  get Brokrage() {
    return this.outwardContract.get("Brokrage");
  }

  onSubmit() {
    this.spinner.show();
    const formData = this.outwardContract.value;

    if (!this.editMode) {
      formData.Contract_No = "Job-Outward-Contract-" + formData.Contract_No;
      formData.Company_Id = this.cmaster.currentUser.Company_Id;
      formData.Year_Id = this.Year_Id;
      formData.Created_By = this.cmaster.currentUser.Company_Id;
      formData.Created_Date = new Date();

      this.cmaster
        .addData(formData, "add-outward-job-contract")
        .subscribe((data) => {
          if (data != null) {
            this.toastr.success("Record added successfuly", "Success");
            this.outwardContract.reset();
            this.router.navigate(["/masters/outward-job-contract"]);
            this.spinner.hide();
          } else {
            this.toastr.error(
              "Error adding record. Please try again.",
              "Error"
            );
            this.spinner.hide();
          }
        });
    } else {
      formData.Company_Id = this.cmaster.currentUser.Company_Id;
      formData.Year_Id = this.Year_Id;
      formData.Updated_By = this.cmaster.currentUser.Company_Id;
      formData.Updated_Date = new Date();

      this.cmaster
        .updateData(
          this.outwardContractID,
          formData,
          "update-outward-job-contract"
        )
        .subscribe((data) => {
          if (data != null) {
            this.toastr.success("Record updated successfuly", "Success");
            this.router.navigate(["/masters/outward-job-contract"]);
            this.spinner.hide();
          } else {
            this.toastr.error("Error updating record", "Error");
            this.spinner.hide();
          }
        });
    }
  }

  private initForm() {
    if (this.editMode) {
      this.spinner.show();
      this.cmaster
        .fetchDetails(this.outwardContractID, "outward-job-contract-details")
        .subscribe((details) => {
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

          const deliveryDate = new Date(details.Delivery_Period);
          const formatedDeliveryMonth =
            deliveryDate.getMonth() > 8
              ? deliveryDate.getMonth() + 1
              : "0" + (deliveryDate.getMonth() + 1);
          const formatedDeliveryDay =
            deliveryDate.getDate() > 9
              ? deliveryDate.getDate()
              : "0" + deliveryDate.getDate();
          const formatedDeliveryYear = deliveryDate.getFullYear();
          const formatedDeliveryDate =
            formatedDeliveryYear +
            "-" +
            formatedDeliveryMonth +
            "-" +
            formatedDeliveryDay;

          this.Contract_No.disable();
          this.outwardContract.setValue({
            Contract_No: details.Contract_No,
            Date: formatedDate,
            Party_Name: details.Party_Name._id,
            Broker_Name: details.Broker_Name._id,
            Quality: details.Quality._id,
            Phani: details.Phani,
            Pick: details.Pick,
            Pannha: details.Pannha,
            Meters: details.Meters,
            Beams: details.Beams,
            Total_Loom: details.Total_Loom,
            Rate: details.Rate,
            GST: details.GST,
            Rate_with_GST: details.Rate_with_GST,
            Delivery_Period: formatedDeliveryDate,
            Payment_Days: details.Payment_Days,
            Warf: details.Warf,
            Weft: details.Weft,
            Brokrage: details.Brokrage,
          });

          this.spinner.hide();
        });
    }
  }

  fetchParty() {
    this.cmaster.fetchData(0, 0, "fetch-party").subscribe((list) => {
      this.partyList = list;
    });
  }

  fetchBroker() {
    this.cmaster.fetchData(0, 0, "fetch-broker").subscribe((list) => {
      this.brokerList = list;
    });
  }

  fetchQuality() {
    this.cmaster.fetchData(0, 0, "fetch-quality").subscribe((list) => {
      this.qualityList = list;
    });
  }

  calculateRate() {
    const rate = this.Rate.value;
    const gst = this.GST.value;
    const ratewithgst = this.Rate_with_GST.value;

    if (rate > 0 && gst > 0 && ratewithgst == 0) {
      const gstAmt = (rate * gst) / 100;
      this.Rate_with_GST.setValue(Number(rate) + Number(gstAmt));
    }

    if (ratewithgst > 0 && gst > 0 && rate == 0) {
      const net_price = ratewithgst / (1 + gst / 100);
      this.Rate.setValue(net_price.toFixed(2));
    }
  }

  onCancel() {
    this.router.navigate(["/masters/outward-job-contract"]);
  }
}
