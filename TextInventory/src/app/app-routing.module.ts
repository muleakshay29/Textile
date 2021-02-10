import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { P404Component } from "./views/error/404.component";
import { LoginComponent } from "./views/login/login.component";
import { DefaultLayoutComponent } from "./containers";
import { RegisterComponent } from "./views/register/register.component";
import { RegisterCompanyComponent } from "./views/register-company/register-company.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/login",
    pathMatch: "full",
  },
  {
    path: "login",
    component: LoginComponent,
    data: {
      title: "Login Page",
    },
  },
  {
    path: "register",
    component: RegisterComponent,
    data: {
      title: "Register",
    },
  },
  {
    path: "register-company",
    component: RegisterCompanyComponent,
    data: {
      title: "Register Company",
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
        path: "",
        loadChildren: () =>
          import("./views/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: "masters",
        loadChildren: () =>
          import("./views/master/master.module").then((m) => m.MasterModule),
      },
      {
        path: "inwards",
        loadChildren: () =>
          import("./views/inwards/inwards.module").then((m) => m.InwardsModule),
      },
      {
        path: "beam",
        loadChildren: () =>
          import("./views/beam/beam.module").then((m) => m.BeamModule),
      },
      {
        path: "weaving",
        loadChildren: () =>
          import("./views/weaving/weaving.module").then((m) => m.WeavingModule),
      },
      {
        path: "production",
        loadChildren: () =>
          import("./views/production/production.module").then(
            (m) => m.ProductionModule
          ),
      },
      {
        path: "transaction",
        loadChildren: () =>
          import("./views/transaction/transaction.module").then(
            (m) => m.TransactionModule
          ),
      },
      {
        path: "finance",
        loadChildren: () =>
          import("./views/finance/finance.module").then((m) => m.FinanceModule),
      },
      {
        path: "reports",
        loadChildren: () =>
          import("./views/reports/report.module").then((m) => m.ReportModule),
      },
    ],
  },
  /* {
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
          import("./views/master/master.module").then((m) => m.MasterModule),
      },
      {
        path: "inwards",
        loadChildren: () =>
          import("./views/inwards/inwards.module").then((m) => m.InwardsModule),
      },
      {
        path: "beam",
        loadChildren: () =>
          import("./views/beam/beam.module").then((m) => m.BeamModule),
      },
      {
        path: "weaving",
        loadChildren: () =>
          import("./views/weaving/weaving.module").then((m) => m.WeavingModule),
      },
      {
        path: "production",
        loadChildren: () =>
          import("./views/production/production.module").then(
            (m) => m.ProductionModule
          ),
      },
      {
        path: "transaction",
        loadChildren: () =>
          import("./views/transaction/transaction.module").then(
            (m) => m.TransactionModule
          ),
      },
      {
        path: "finance",
        loadChildren: () =>
          import("./views/finance/finance.module").then((m) => m.FinanceModule),
      },
    ],
  }, */
  { path: "**", component: P404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
