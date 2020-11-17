import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { SharedModule } from "../../_shared/shared.module";

import { YarnMasterComponent } from "./yarn-master/yarn-master.component";
import { QualityMasterComponent } from "./quality-master/quality-master.component";
import { PartyMasterComponent } from "./party-master/party-master.component";
import { LoomMasterComponent } from "./loom-master/loom-master.component";
import { FirmMasterComponent } from "./firm-master/firm-master.component";
import { EmployeeMasterComponent } from "./employee-master/employee-master.component";
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
import { EditQualityComponent } from "./quality-master/edit-quality/edit-quality.component";
import { CompanyMasterComponent } from "./company-master/company-master.component";
import { AddCompanyMasterComponent } from "./company-master/add-company-master/add-company-master.component";
import { YarnContractComponent } from "./contract-master/yarn-contract/yarn-contract.component";
import { SalesContractComponent } from './contract-master/sales-contract/sales-contract.component';
import { InwardContractComponent } from './contract-master/job-contract/inward-contract/inward-contract.component';
import { OutwardContractComponent } from './contract-master/job-contract/outward-contract/outward-contract.component';
import { AddYarnContractComponent } from './contract-master/yarn-contract/add-yarn-contract/add-yarn-contract.component';
import { AddSalesContractComponent } from './contract-master/sales-contract/add-sales-contract/add-sales-contract.component';
import { AddInwardContractComponent } from './contract-master/job-contract/inward-contract/add-inward-contract/add-inward-contract.component';
import { AddOutwardContractComponent } from './contract-master/job-contract/outward-contract/add-outward-contract/add-outward-contract.component';

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
    EditQualityComponent,
    CompanyMasterComponent,
    AddCompanyMasterComponent,
    YarnContractComponent,
    SalesContractComponent,
    InwardContractComponent,
    OutwardContractComponent,
    AddYarnContractComponent,
    AddSalesContractComponent,
    AddInwardContractComponent,
    AddOutwardContractComponent,
  ],
  imports: [MasterRoutingModule, SharedModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MasterModule {}
