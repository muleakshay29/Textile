import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WeavingLoadMagComponent } from "./weaving-load-mag/weaving-load-mag.component";
import { AddWeavingLoadMagComponent } from "./weaving-load-mag/add-weaving-load-mag/add-weaving-load-mag.component";
import { WeavingLoadAutoComponent } from "./weaving-load-auto/weaving-load-auto.component";
import { AddWeavingLoadAutoComponent } from "./weaving-load-auto/add-weaving-load-auto/add-weaving-load-auto.component";
import { AuthGuard } from "../../_guards/auth.guard";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Weaving",
    },
    children: [
      {
        path: "",
        redirectTo: "weaving-mag",
        pathMatch: "full",
        canActivate: [AuthGuard],
      },
      {
        path: "weaving-mag",
        component: WeavingLoadMagComponent,
        data: {
          title: "Weaving Load (Mag)",
        },
        canActivate: [AuthGuard],
      },
      {
        path: "add-weaving-mag",
        component: AddWeavingLoadMagComponent,
        data: {
          title: "Add Weaving Load (Mag)",
        },
        canActivate: [AuthGuard],
      },
      {
        path: "add-weaving-mag/:id",
        component: AddWeavingLoadMagComponent,
        data: {
          title: "Edit Weaving Load (Mag)",
        },
        canActivate: [AuthGuard],
      },

      {
        path: "",
        redirectTo: "weaving-auto",
        pathMatch: "full",
        canActivate: [AuthGuard],
      },
      {
        path: "weaving-auto",
        component: WeavingLoadAutoComponent,
        data: {
          title: "Weaving Load (Auto)",
        },
        canActivate: [AuthGuard],
      },
      {
        path: "add-weaving-auto",
        component: AddWeavingLoadAutoComponent,
        data: {
          title: "Add Weaving Load (Auto)",
        },
        canActivate: [AuthGuard],
      },
      {
        path: "add-weaving-auto/:id",
        component: AddWeavingLoadAutoComponent,
        data: {
          title: "Edit Weaving Load (Auto)",
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
export class WeavingRoutingModule {}
