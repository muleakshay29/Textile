import { Component, OnInit } from "@angular/core";
import { navItems } from "../../_nav";
import { AuthenticationService } from "../../_services/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "./default-layout.component.html",
})
export class DefaultLayoutComponent implements OnInit {
  d: Date = new Date();
  copyRightYear;

  public sidebarMinimized = false;
  public navItems = navItems;

  constructor(private auth: AuthenticationService, private router: Router) {}

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  ngOnInit() {
    this.copyRightYear = this.d.getFullYear();
  }

  logout() {
    this.auth.logout().subscribe(() => {
      localStorage.removeItem("currentUser");
      this.router.navigate(["/login"]);
    });
  }
}
