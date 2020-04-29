import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { SharedModule } from "../_shared/shared.module";

import { YarnMasterComponent } from "../views/yarn-master/yarn-master.component";
import { QualityMasterComponent } from "../views/quality-master/quality-master.component";
import { PartyMasterComponent } from "../views/party-master/party-master.component";
import { LoomMasterComponent } from "../views/loom-master/loom-master.component";
import { FirmMasterComponent } from "../views/firm-master/firm-master.component";
import { EmployeeMasterComponent } from "../views/employee-master/employee-master.component";
import { MasterRoutingModule } from "./master-routing.module";
import { BrokerMasterComponent } from "./broker-master/broker-master.component";
import { AccountMasterComponent } from "./account-master/account-master.component";
import { AddYarnComponent } from "./yarn-master/add-yarn/add-yarn.component";
import { AddQualityComponent } from "./quality-master/add-quality/add-quality.component";
import { AddPartyComponent } from "./party-master/add-party/add-party.component";
import { AddLoomComponent } from "./loom-master/add-loom/add-loom.component";
import { AddFirmComponent } from "./firm-master/add-firm/add-firm.component";
import { AddEmployeeComponent } from "./employee-master/add-employee/add-employee.component";
import { AddBrokerComponent } from "./broker-master/add-broker/add-broker.component";
import { AddAccountComponent } from "./account-master/add-account/add-account.component";
import { CommonMasterComponent } from "./common-master/common-master.component";
import { CommonMasterChildComponent } from "./common-master-child/common-master-child.component";
import { AddCommonMasterComponent } from "./common-master/add-common-master/add-common-master.component";
import { AddMasterChildComponent } from "./common-master-child/add-master-child/add-master-child.component";

@NgModule({
  declarations: [
    YarnMasterComponent,
    QualityMasterComponent,
    PartyMasterComponent,
    LoomMasterComponent,
    FirmMasterComponent,
    EmployeeMasterComponent,
    BrokerMasterComponent,
    AccountMasterComponent,
    AddYarnComponent,
    AddQualityComponent,
    AddPartyComponent,
    AddLoomComponent,
    AddFirmComponent,
    AddEmployeeComponent,
    AddBrokerComponent,
    AddAccountComponent,
    CommonMasterComponent,
    CommonMasterChildComponent,
    AddCommonMasterComponent,
    AddMasterChildComponent,
  ],
  imports: [MasterRoutingModule, SharedModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MasterModule {}
