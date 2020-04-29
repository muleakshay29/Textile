import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { MasterService } from "../../../_services/master.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { Validations } from "../../../_helper/validations";

@Component({
  selector: "app-add-account",
  templateUrl: "./add-account.component.html",
  styleUrls: ["./add-account.component.css"],
})
export class AddAccountComponent implements OnInit {
  accountMaster: FormGroup;
  accID: string;
  editMode = false;
  buttonText: string;

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

    this.route.params.subscribe((params: Params) => {
      this.accID = params["id"] ? params["id"] : "";
      this.editMode = params["id"] != null;
      this.buttonText = this.editMode ? "Update" : "Create";
      this.initForm();
    });
  }

  createForm() {
    this.accountMaster = this.fb.group({
      Bank_Name: ["", Validators.required],
      Account_No: ["", Validators.required],
      Address: ["", Validators.required],
      Branch: ["", Validators.required],
      IFSC_Code: ["", Validators.required],
      Holder_Name: ["", Validators.required],
      Opening_Balance: ["", Validators.required],
    });
  }

  get Bank_Name() {
    return this.accountMaster.get("Bank_Name");
  }

  get Account_No() {
    return this.accountMaster.get("Account_No");
  }

  get Address() {
    return this.accountMaster.get("Address");
  }

  get Branch() {
    return this.accountMaster.get("Branch");
  }

  get IFSC_Code() {
    return this.accountMaster.get("IFSC_Code");
  }

  get Holder_Name() {
    return this.accountMaster.get("Holder_Name");
  }

  get Opening_Balance() {
    return this.accountMaster.get("Opening_Balance");
  }

  onSubmit() {
    this.spinner.show();
    if (!this.editMode) {
      const formData = this.accountMaster.value;
      this.master.addData(formData, "add-account").subscribe((data) => {
        if (data != null) {
          this.toastr.success("Record added successfuly", "Success");
          this.accountMaster.reset();
          this.router.navigate(["/masters/account-master"]);
          this.spinner.hide();
        } else {
          this.toastr.error("Error adding record. Please try again.", "Error");
          this.spinner.hide();
        }
      });
    } else {
      const formData = {
        Bank_Name: this.Bank_Name.value,
        Account_No: this.Account_No.value,
        Address: this.Address.value,
        Branch: this.Branch.value,
        IFSC_Code: this.IFSC_Code.value,
        Holder_Name: this.Holder_Name.value,
        Opening_Balance: this.Opening_Balance.value,
      };

      this.master
        .updateData(this.accID, formData, "update-account")
        .subscribe((data) => {
          if (data != null) {
            this.toastr.success("Record updated successfuly", "Success");
            this.router.navigate(["/masters/account-master"]);
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
        .fetchDetails(this.accID, "account-details")
        .subscribe((details) => {
          this.accountMaster.setValue({
            Bank_Name: details.Bank_Name,
            Account_No: details.Account_No,
            Address: details.Address,
            Branch: details.Branch,
            IFSC_Code: details.IFSC_Code,
            Holder_Name: details.Holder_Name,
            Opening_Balance: details.Opening_Balance,
          });
          this.spinner.hide();
        });
    }
  }

  onCancel() {
    this.router.navigate(["/masters/account-master"]);
  }
}
