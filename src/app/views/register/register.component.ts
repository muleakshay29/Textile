import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "../../_services/authentication.service";
import { Validations } from "../../_helper/validations";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { CommonService } from "../../_services/common.service";

@Component({
  selector: "app-register",
  templateUrl: "register.component.html",
})
export class RegisterComponent implements OnInit {
  userRegister: FormGroup;
  companyList = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private cmservice: CommonService
  ) {}

  ngOnInit() {
    this.fetchCompany();

    this.userRegister = this.fb.group(
      {
        First_Name: [
          "",
          [Validators.required, Validations.alphaNumericPattern],
        ],
        Last_Name: ["", [Validators.required, Validations.alphaNumericPattern]],
        Username: ["", [Validators.required, Validations.alphaNumericPattern]],
        Company_Id: ["", Validators.required],
        Password: ["", [Validators.required, Validations.passwordValidator]],
        Re_Password: ["", Validators.required],
      },
      {
        validator: Validations.passwordMatchValidator,
      }
    );
  }

  get First_Name() {
    return this.userRegister.get("First_Name");
  }

  get Last_Name() {
    return this.userRegister.get("Last_Name");
  }

  get Username() {
    return this.userRegister.get("Username");
  }

  get Company_Id() {
    return this.userRegister.get("Company_Id");
  }

  get Password() {
    return this.userRegister.get("Password");
  }

  get Re_Password() {
    return this.userRegister.get("Re_Password");
  }

  register() {
    const formData = this.userRegister.value;
    this.spinner.show();

    this.auth.register(formData).subscribe((user) => {
      if (user != null) {
        this.toastr.success("User Registered successfuly", "Success");
        this.userRegister.reset();
        this.router.navigate(["/login"]);
        this.spinner.hide();
      } else {
        this.toastr.error("Error Registering User. Please try again.", "Error");
        this.spinner.hide();
      }
    });
  }

  fetchCompany() {
    this.spinner.show();
    this.cmservice.fetchData(0, 0, "fetch-company").subscribe((list) => {
      this.companyList = list;
      this.spinner.hide();
    });
  }
}
