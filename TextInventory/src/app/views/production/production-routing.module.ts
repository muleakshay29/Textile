import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AutoProductionComponent } from "./auto-production/auto-production.component";
import { AddAutoProductionComponent } from "./auto-production/add-auto-production/add-auto-production.component";
import { MagProductionComponent } from "./mag-production/mag-production.component";
import { AddMagProductionComponent } from "./mag-production/add-mag-production/add-mag-production.component";
import { AuthGuard } from "../../_guards/auth.guard";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Production",
    },
    children: [
      {
        path: "",
        redirectTo: "auto-production",
        pathMatch: "full",
        canActivate: [AuthGuard],
      },
      {
        path: "auto-production",
        component: AutoProductionComponent,
        data: {
          title: "Auto Production",
        },
        canActivate: [AuthGuard],
      },
      {
        path: "add-auto-production",
        component: AddAutoProductionComponent,
        data: {
          title: "Add Auto Production",
        },
        canActivate: [AuthGuard],
      },
      {
        path: "add-auto-production/:id",
        component: AddAutoProductionComponent,
        data: {
          title: "Edit Auto Production",
        },
        canActivate: [AuthGuard],
      },

      {
        path: "",
        redirectTo: "mag-production",
        pathMatch: "full",
        canActivate: [AuthGuard],
      },
      {
        path: "mag-production",
        component: MagProductionComponent,
        data: {
          title: "Mag Production",
        },
        canActivate: [AuthGuard],
      },
      {
        path: "add-mag-production",
        component: AddMagProductionComponent,
        data: {
          title: "Add Mag Production",
        },
        canActivate: [AuthGuard],
      },
      {
        path: "add-mag-production/:id",
        component: AddMagProductionComponent,
        data: {
          title: "Edit Mag Production",
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
export class ProductionRoutingModule {}
