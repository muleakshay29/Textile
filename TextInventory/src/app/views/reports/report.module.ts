import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { SharedModule } from "../../_shared/shared.module";
import { ReportRoutingModule } from "./report-routing.module";

import { LedgerReportComponent } from "./ledger-report/ledger-report.component";
import { Gstr1ReportComponent } from "./gstr1-report/gstr1-report.component";
import { Gstr2ReportComponent } from "./gstr2-report/gstr2-report.component";
import { PartyHishobReportComponent } from "./party-hishob-report/party-hishob-report.component";
import { ConsumptionReportComponent } from "./consumption-report/consumption-report.component";
import { BeamStockReportComponent } from "./stock/beam-stock-report/beam-stock-report.component";
import { TageStockReportComponent } from "./stock/tage-stock-report/tage-stock-report.component";
import { YarnStockReportComponent } from "./stock/yarn-stock-report/yarn-stock-report.component";
import { BeamPerformanceReportComponent } from "./beam-performance-report/beam-performance-report.component";

@NgModule({
  declarations: [
    LedgerReportComponent,
    Gstr1ReportComponent,
    Gstr2ReportComponent,
    PartyHishobReportComponent,
    ConsumptionReportComponent,
    BeamStockReportComponent,
    TageStockReportComponent,
    YarnStockReportComponent,
    BeamPerformanceReportComponent,
  ],
  imports: [ReportRoutingModule, SharedModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ReportModule {}
