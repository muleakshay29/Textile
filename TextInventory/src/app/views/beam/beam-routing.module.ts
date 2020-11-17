import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SizingInwardComponent } from "./sizing-inward/sizing-inward.component";
import { AddSizingInwardComponent } from "./sizing-inward/add-sizing-inward/add-sizing-inward.component";
import { BeamInwardComponent } from "./beam-inward/beam-inward.component";
import { AddBeamInwardComponent } from "./beam-inward/add-beam-inward/add-beam-inward.component";
import { AuthGuard } from "../../_guards/auth.guard";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Beam",
    },
    children: [
      {
        path: "",
        redirectTo: "sizing-inward",
        pathMatch: "full",
        canActivate: [AuthGuard],
      },
      {
        path: "sizing-inward",
        component: SizingInwardComponent,
        data: {
          title: "Sizing Inward",
        },
        canActivate: [AuthGuard],
      },
      {
        path: "add-sizing-inward",
        component: AddSizingInwardComponent,
        data: {
          title: "Sizing Inward",
        },
        canActivate: [AuthGuard],
      },
      {
        path: "add-sizing-inward/:id",
        component: AddSizingInwardComponent,
        data: {
          title: "Sizing Inward",
        },
        canActivate: [AuthGuard],
      },

      {
        path: "",
        redirectTo: "beam-inward",
        pathMatch: "full",
        canActivate: [AuthGuard],
      },
      {
        path: "beam-inward",
        component: BeamInwardComponent,
        data: {
          title: "Beam Inward",
        },
        canActivate: [AuthGuard],
      },
      {
        path: "add-beam-inward",
        component: AddBeamInwardComponent,
        data: {
          title: "Beam Inward",
        },
        canActivate: [AuthGuard],
      },
      {
        path: "add-beam-inward/:id",
        component: AddBeamInwardComponent,
        data: {
          title: "Beam Inward",
        },
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeamRoutingModule {}
