import { NgModule } from "@angular/core";
import { SharedModule } from "../../_shared/shared.module";

import { DashboardComponent } from "./dashboard.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { YearSelectionComponent } from "./year-selection/year-selection.component";

@NgModule({
  imports: [DashboardRoutingModule, SharedModule],
  declarations: [DashboardComponent, YearSelectionComponent],
})
export class DashboardModule {}
