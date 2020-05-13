import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { P404Component } from "./views/error/404.component";
import { LoginComponent } from "./views/login/login.component";
import { DefaultLayoutComponent } from "./containers";
import { RegisterComponent } from "./views/register/register.component";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
    data: {
      title: "Login Page",
    },
  },
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "register",
    component: RegisterComponent,
    data: {
      title: "Register",
    },
  },
  {
    path: "404",
    component: P404Component,
    data: {
      title: "Page 404",
    },
  },
  {
    path: "",
    component: DefaultLayoutComponent,
    data: {
      title: "Home",
    },
    children: [
      {
        path: "dashboard",
        loadChildren: () =>
          import("./views/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: "masters",
        loadChildren: () =>
          import("./views/master.module").then((m) => m.MasterModule),
      },
      {
        path: "inwards",
        loadChildren: () =>
          import("./views/inwards/inwards.module").then((m) => m.InwardsModule),
      },
    ],
  },
  { path: "**", component: P404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
