import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "../../_services/authentication.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-login",
  templateUrl: "login.component.html",
})
export class LoginComponent implements OnInit {
  userLogin: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    if (this.auth.currentUserValue) {
      this.router.navigate(["/dashboard"]);
    }
  }

  ngOnInit() {
    this.userLogin = this.fb.group({
      Username: ["", Validators.required],
      Password: ["", Validators.required],
    });

    this.auth.logout();
  }

  get Username() {
    return this.userLogin.get("Username");
  }

  get Password() {
    return this.userLogin.get("Password");
  }

  ngSubmit() {
    this.spinner.show();
    const formData = this.userLogin.value;

    this.auth.login(formData).subscribe((user) => {
      if (user) {
        this.toastr.success("Logged in Successfuly!", "Sucess");
        this.userLogin.reset();
        // this.router.navigate(["/dashboard"]);
        this.router.navigate(["/year-selection"]);
        this.spinner.hide();
      } else {
        this.toastr.error("Invalid Login Credentials!", "Error");
        this.spinner.hide();
      }
    });
  }
}
