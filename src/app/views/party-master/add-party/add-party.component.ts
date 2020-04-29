import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { MasterService } from "../../../_services/master.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { Validations } from "../../../_helper/validations";

@Component({
  selector: "app-add-party",
  templateUrl: "./add-party.component.html",
  styleUrls: ["./add-party.component.css"],
})
export class AddPartyComponent implements OnInit {
  partyMaster: FormGroup;
  partyID: string;
  editMode = false;
  buttonText: string;
  stateList = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private master: MasterService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.fetchState("5ea035da1492733c189e6ff2");

    this.route.params.subscribe((params: Params) => {
      this.partyID = params["id"] ? params["id"] : "";
      this.editMode = params["id"] != null;
      this.buttonText = this.editMode ? "Update" : "Create";
      this.initForm();
    });
  }

  createForm() {
    this.partyMaster = this.fb.group({
      Company_Name: ["", Validators.required],
      Owner_Name: ["", Validators.required],
      Address: ["", Validators.required],
      Mobile_No: ["", Validators.required],
      Alternate_No: [""],
      GST_No: ["", [Validators.required, Validations.characterNumberPattern]],
      Pan_No: ["", [Validators.required, Validations.characterNumberPattern]],
      State: ["", Validators.required],
      Email_ID: ["", Validators.required],
      Bank_Name: ["", Validators.required],
      Branch: ["", Validators.required],
      Account_No: ["", Validators.required],
      IFSC_Code: ["", Validators.required],
    });
  }

  get Company_Name() {
    return this.partyMaster.get("Company_Name");
  }

  get Owner_Name() {
    return this.partyMaster.get("Owner_Name");
  }

  get Address() {
    return this.partyMaster.get("Address");
  }

  get Mobile_No() {
    return this.partyMaster.get("Mobile_No");
  }

  get Alternate_No() {
    return this.partyMaster.get("Alternate_No");
  }

  get GST_No() {
    return this.partyMaster.get("GST_No");
  }

  get Pan_No() {
    return this.partyMaster.get("Pan_No");
  }

  get State() {
    return this.partyMaster.get("State");
  }

  get Email_ID() {
    return this.partyMaster.get("Email_ID");
  }

  get Bank_Name() {
    return this.partyMaster.get("Bank_Name");
  }

  get Branch() {
    return this.partyMaster.get("Branch");
  }

  get Account_No() {
    return this.partyMaster.get("Account_No");
  }

  get IFSC_Code() {
    return this.partyMaster.get("IFSC_Code");
  }

  onSubmit() {
    this.spinner.show();
    if (!this.editMode) {
      const formData = this.partyMaster.value;
      this.master.addData(formData, "add-party").subscribe((data) => {
        if (data != null) {
          this.toastr.success("Record added successfuly", "Success");
          this.partyMaster.reset();
          this.router.navigate(["/masters/party-master"]);
          this.spinner.hide();
        } else {
          this.toastr.error("Error adding record. Please try again.", "Error");
          this.spinner.hide();
        }
      });
    } else {
      const formData = {
        Company_Name: this.Company_Name.value,
        Owner_Name: this.Owner_Name.value,
        Address: this.Address.value,
        Mobile_No: this.Mobile_No.value,
        Alternate_No: this.Alternate_No.value,
        GST_No: this.GST_No.value,
        Pan_No: this.Pan_No.value,
        State: this.State.value,
        Email_ID: this.Email_ID.value,
        Bank_Name: this.Bank_Name.value,
        Branch: this.Branch.value,
        Account_No: this.Account_No.value,
        IFSC_Code: this.IFSC_Code.value,
      };

      this.master
        .updateData(this.partyID, formData, "update-party")
        .subscribe((data) => {
          if (data != null) {
            this.toastr.success("Record updated successfuly", "Success");
            this.router.navigate(["/masters/party-master"]);
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
      this.master
        .fetchDetails(this.partyID, "party-details")
        .subscribe((details) => {
          this.partyMaster.setValue({
            Company_Name: details.Company_Name,
            Owner_Name: details.Owner_Name,
            Address: details.Address,
            Mobile_No: details.Mobile_No,
            Alternate_No: details.Alternate_No,
            GST_No: details.GST_No,
            Pan_No: details.Pan_No,
            State: details.State,
            Email_ID: details.Email_ID,
            Bank_Name: details.Bank_Name,
            Branch: details.Branch,
            Account_No: details.Account_No,
            IFSC_Code: details.IFSC_Code,
          });
          this.spinner.hide();
        });
    }
  }

  fetchState(_id: string) {
    this.master
      .fetchDataFrom(_id, "fetch-commonchild-fromCM")
      .subscribe((list) => {
        this.stateList = list;
      });
  }

  onCancel() {
    this.router.navigate(["/masters/party-master"]);
  }
}
