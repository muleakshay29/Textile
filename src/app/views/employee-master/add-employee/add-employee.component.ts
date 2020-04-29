import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { MasterService } from "../../../_services/master.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { Validations } from "../../../_helper/validations";

@Component({
  selector: "app-add-employee",
  templateUrl: "./add-employee.component.html",
  styleUrls: ["./add-employee.component.css"],
})
export class AddEmployeeComponent implements OnInit {
  employeeMaster: FormGroup;
  empID: string;
  editMode = false;
  buttonText: string;
  locationList = [];
  empTypeList = [];
  balanceTypeList = [];

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
    this.fetchEmployee("5ea15659f27507241406257b");
    this.fetchBalanceType("5ea15662f27507241406257c");

    this.route.params.subscribe((params: Params) => {
      this.empID = params["id"] ? params["id"] : "";
      this.editMode = params["id"] != null;
      this.buttonText = this.editMode ? "Update" : "Create";
      this.initForm();
    });
  }

  createForm() {
    this.employeeMaster = this.fb.group(
      {
        Employee_Name: ["", Validators.required],
        Address: ["", Validators.required],
        Mobile_No: ["", Validators.required],
        Alternate_No: [""],
        Location: ["", Validators.required],
        Employee_Type: ["", Validators.required],
        Bank_Name: ["", Validators.required],
        Branch: ["", Validators.required],
        Account_No: ["", Validators.required],
        IFSC_Code: ["", Validators.required],
        Username: ["", [Validators.required, Validations.alphaNumericPattern]],
        Password: ["", [Validators.required, Validations.passwordValidator]],
        Re_Password: ["", Validators.required],
        Advance_Balance: ["", Validators.required],
        Advance_Balance_Type: ["", Validators.required],
        Baki_Balance: ["", Validators.required],
        Baki_Balance_Type: ["", Validators.required],
      },
      {
        validator: Validations.passwordMatchValidator,
      }
    );
  }

  get Employee_Name() {
    return this.employeeMaster.get("Employee_Name");
  }

  get Address() {
    return this.employeeMaster.get("Address");
  }

  get Mobile_No() {
    return this.employeeMaster.get("Mobile_No");
  }

  get Alternate_No() {
    return this.employeeMaster.get("Alternate_No");
  }

  get Location() {
    return this.employeeMaster.get("Location");
  }

  get Employee_Type() {
    return this.employeeMaster.get("Employee_Type");
  }

  get Bank_Name() {
    return this.employeeMaster.get("Bank_Name");
  }

  get Branch() {
    return this.employeeMaster.get("Branch");
  }

  get Account_No() {
    return this.employeeMaster.get("Account_No");
  }

  get IFSC_Code() {
    return this.employeeMaster.get("IFSC_Code");
  }

  get Username() {
    return this.employeeMaster.get("Username");
  }

  get Password() {
    return this.employeeMaster.get("Password");
  }

  get Re_Password() {
    return this.employeeMaster.get("Re_Password");
  }

  get Advance_Balance() {
    return this.employeeMaster.get("Advance_Balance");
  }

  get Advance_Balance_Type() {
    return this.employeeMaster.get("Advance_Balance_Type");
  }

  get Baki_Balance() {
    return this.employeeMaster.get("Baki_Balance");
  }

  get Baki_Balance_Type() {
    return this.employeeMaster.get("Baki_Balance_Type");
  }

  onSubmit() {
    this.spinner.show();
    if (!this.editMode) {
      const formData = this.employeeMaster.value;
      this.master.addData(formData, "add-employee").subscribe((data) => {
        if (data != null) {
          this.toastr.success("Record added successfuly", "Success");
          this.employeeMaster.reset();
          this.router.navigate(["/masters/employee-master"]);
          this.spinner.hide();
        } else {
          this.toastr.error("Error adding record. Please try again.", "Error");
          this.spinner.hide();
        }
      });
    } else {
      const formData = {
        Employee_Name: this.Employee_Name.value,
        Address: this.Address.value,
        Mobile_No: this.Mobile_No.value,
        Alternate_No: this.Alternate_No.value,
        Location: this.Location.value,
        Employee_Type: this.Employee_Type.value,
        Bank_Name: this.Bank_Name.value,
        Branch: this.Branch.value,
        Account_No: this.Account_No.value,
        IFSC_Code: this.IFSC_Code.value,
        Username: this.Username.value,
        Password: this.Password.value,
        Advance_Balance: this.Advance_Balance.value,
        Advance_Balance_Type: this.Advance_Balance_Type.value,
        Baki_Balance: this.Baki_Balance.value,
        Baki_Balance_Type: this.Baki_Balance_Type.value,
      };

      this.master
        .updateData(this.empID, formData, "update-employee")
        .subscribe((data) => {
          if (data != null) {
            this.toastr.success("Record updated successfuly", "Success");
            this.router.navigate(["/masters/employee-master"]);
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
        .fetchDetails(this.empID, "employee-details")
        .subscribe((details) => {
          this.employeeMaster.setValue({
            Employee_Name: details.Employee_Name,
            Address: details.Address,
            Mobile_No: details.Mobile_No,
            Alternate_No: details.Alternate_No,
            Location: details.Location,
            Employee_Type: details.Employee_Type,
            Bank_Name: details.Bank_Name,
            Branch: details.Branch,
            Account_No: details.Account_No,
            IFSC_Code: details.IFSC_Code,
            Username: details.Username,
            Password: details.Password,
            Re_Password: details.Password,
            Advance_Balance: details.Advance_Balance,
            Advance_Balance_Type: details.Advance_Balance_Type,
            Baki_Balance: details.Baki_Balance,
            Baki_Balance_Type: details.Baki_Balance_Type,
          });
          this.spinner.hide();
        });
    }
  }

  fetchState(_id: string) {
    this.master
      .fetchDataFrom(_id, "fetch-commonchild-fromCM")
      .subscribe((list) => {
        this.locationList = list;
      });
  }

  fetchEmployee(_id: string) {
    this.master
      .fetchDataFrom(_id, "fetch-commonchild-fromCM")
      .subscribe((list) => {
        this.empTypeList = list;
      });
  }

  fetchBalanceType(_id: string) {
    this.master
      .fetchDataFrom(_id, "fetch-commonchild-fromCM")
      .subscribe((list) => {
        this.balanceTypeList = list;
      });
  }

  onCancel() {
    this.router.navigate(["/masters/employee-master"]);
  }
}
