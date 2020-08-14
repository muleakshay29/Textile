import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { CommonService } from "../../_services/common.service";
import { AuthenticationService } from "../../_services/authentication.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { Validations } from "../../_helper/validations";

@Component({
  selector: "app-register-company",
  templateUrl: "./register-company.component.html",
  styleUrls: ["./register-company.component.css"],
})
export class RegisterCompanyComponent implements OnInit {
  companyMaster: FormGroup;
  buttonText: string;
  stateList = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cmaster: CommonService,
    private auth: AuthenticationService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.fetchState("5ea035da1492733c189e6ff2");
    this.buttonText = "Register Company";
  }

  createForm() {
    this.companyMaster = this.fb.group(
      {
        Comp_Name: ["", [Validators.required, Validations.alphaNumericPattern]],
        Comp_Address: ["", Validators.required],
        Comp_State: ["", Validators.required],
        Comp_Owner: [""],
        Comp_Email: [""],
        Comp_GSTNo: ["", Validators.required],
        Comp_Pan: ["", Validators.required],
        Comp_Contact1: [""],
        Comp_Contact2: [""],
        Username: ["", [Validators.required, Validations.alphaNumericPattern]],
        Password: ["", [Validators.required, Validations.passwordValidator]],
        Re_Password: ["", Validators.required],
      },
      {
        validator: Validations.passwordMatchValidator,
      }
    );
  }

  get Comp_Name() {
    return this.companyMaster.get("Comp_Name");
  }

  get Comp_Address() {
    return this.companyMaster.get("Comp_Address");
  }

  get Comp_State() {
    return this.companyMaster.get("Comp_State");
  }

  get Comp_Owner() {
    return this.companyMaster.get("Comp_Owner");
  }

  get Comp_Email() {
    return this.companyMaster.get("Comp_Email");
  }

  get Comp_GSTNo() {
    return this.companyMaster.get("Comp_GSTNo");
  }

  get Comp_Pan() {
    return this.companyMaster.get("Comp_Pan");
  }

  get Comp_Contact1() {
    return this.companyMaster.get("Comp_Contact1");
  }

  get Comp_Contact2() {
    return this.companyMaster.get("Comp_Contact2");
  }

  get Username() {
    return this.companyMaster.get("Username");
  }

  get Password() {
    return this.companyMaster.get("Password");
  }

  get Re_Password() {
    return this.companyMaster.get("Re_Password");
  }

  register() {
    this.spinner.show();
    const formData = this.companyMaster.value;

    this.cmaster.addData(formData, "add-company").subscribe((data) => {
      if (data != null) {
        const userRegister = {
          First_Name: formData.Comp_Name,
          Last_Name: formData.Comp_Name,
          Username: formData.Username,
          Password: formData.Password,
          Company_Id: data._id,
        };
        this.auth.register(userRegister).subscribe((user) => {
          if (user != null) {
            this.toastr.success("Company Registered successfuly", "Success");
            this.companyMaster.reset();
            this.router.navigate(["/login"]);
            this.spinner.hide();
          } else {
            this.toastr.error(
              "Error Registering Company. Please try again.",
              "Error"
            );
            this.spinner.hide();
          }
        });
      } else {
        this.toastr.error("Error adding record. Please try again.", "Error");
        this.spinner.hide();
      }
    });
  }

  fetchState(_id: string) {
    this.cmaster
      .fetchDataFrom(_id, "fetch-commonchild-fromCM")
      .subscribe((list) => {
        this.stateList = list;
      });
  }

  onCancel() {
    this.router.navigate(["/login"]);
  }
}
