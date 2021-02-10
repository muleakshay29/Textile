import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DashboardComponent } from "./dashboard.component";
import { AuthGuard } from "../../_guards/auth.guard";
import { DefaultLayoutComponent } from "../../containers";
import { YearSelectionComponent } from "./year-selection/year-selection.component";

const routes: Routes = [
  {
    path: "",
    component: YearSelectionComponent,
    data: {
      title: "Select Year",
    },
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    data: {
      title: "Dashboard",
    },
    canActivate: [AuthGuard],
  },
  {
    path: "year-selection",
    component: YearSelectionComponent,
    data: {
      title: "Select Year",
    },
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
