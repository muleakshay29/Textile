import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LedgerReportComponent } from "./ledger-report/ledger-report.component";
import { Gstr1ReportComponent } from "./gstr1-report/gstr1-report.component";
import { Gstr2ReportComponent } from "./gstr2-report/gstr2-report.component";
import { PartyHishobReportComponent } from "./party-hishob-report/party-hishob-report.component";
import { ConsumptionReportComponent } from "./consumption-report/consumption-report.component";
import { BeamStockReportComponent } from "./stock/beam-stock-report/beam-stock-report.component";
import { TageStockReportComponent } from "./stock/tage-stock-report/tage-stock-report.component";
import { YarnStockReportComponent } from "./stock/yarn-stock-report/yarn-stock-report.component";
import { AuthGuard } from "../../_guards/auth.guard";
import { BeamPerformanceReportComponent } from "./beam-performance-report/beam-performance-report.component";
import { BrokerReportComponent } from "./broker-report/broker-report.component";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Inwards",
    },
    children: [
      {
        path: "",
        redirectTo: "ledger-report",
        pathMatch: "full",
        canActivate: [AuthGuard],
      },
      {
        path: "ledger-report",
        component: LedgerReportComponent,
        data: {
          title: "Ledger Report",
        },
        canActivate: [AuthGuard],
      },

      {
        path: "",
        redirectTo: "gst1-report",
        pathMatch: "full",
        canActivate: [AuthGuard],
      },
      {
        path: "gst1-report",
        component: Gstr1ReportComponent,
        data: {
          title: "GST1 Report",
        },
        canActivate: [AuthGuard],
      },

      {
        path: "",
        redirectTo: "gst2-report",
        pathMatch: "full",
        canActivate: [AuthGuard],
      },
      {
        path: "gst2-report",
        component: Gstr2ReportComponent,
        data: {
          title: "GST2 Report",
        },
        canActivate: [AuthGuard],
      },

      {
        path: "",
        redirectTo: "party-hishob-report",
        pathMatch: "full",
        canActivate: [AuthGuard],
      },
      {
        path: "party-hishob-report",
        component: PartyHishobReportComponent,
        data: {
          title: "Party Hishob Report",
        },
        canActivate: [AuthGuard],
      },

      {
        path: "",
        redirectTo: "beam-performance-report",
        pathMatch: "full",
        canActivate: [AuthGuard],
      },
      {
        path: "beam-performance-report",
        component: BeamPerformanceReportComponent,
        data: {
          title: "Beam Perfomance Report",
        },
        canActivate: [AuthGuard],
      },

      {
        path: "",
        redirectTo: "consumption-report",
        pathMatch: "full",
        canActivate: [AuthGuard],
      },
      {
        path: "consumption-report",
        component: ConsumptionReportComponent,
        data: {
          title: "Consumption Report",
        },
        canActivate: [AuthGuard],
      },

      {
        path: "",
        redirectTo: "stock-yarn-report",
        pathMatch: "full",
        canActivate: [AuthGuard],
      },
      {
        path: "stock-yarn-report",
        component: YarnStockReportComponent,
        data: {
          title: "Stock Yarn Report",
        },
        canActivate: [AuthGuard],
      },

      {
        path: "",
        redirectTo: "stock-tage-report",
        pathMatch: "full",
        canActivate: [AuthGuard],
      },
      {
        path: "stock-tage-report",
        component: TageStockReportComponent,
        data: {
          title: "Stock Tage Report",
        },
        canActivate: [AuthGuard],
      },

      {
        path: "",
        redirectTo: "stock-beam-report",
        pathMatch: "full",
        canActivate: [AuthGuard],
      },
      {
        path: "stock-beam-report",
        component: BeamStockReportComponent,
        data: {
          title: "Stock Beam Report",
        },
        canActivate: [AuthGuard],
      },

      {
        path: "",
        redirectTo: "broker-report",
        pathMatch: "full",
        canActivate: [AuthGuard],
      },
      {
        path: "broker-report",
        component: BrokerReportComponent,
        data: {
          title: "Broker Report",
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
export class ReportRoutingModule {}
