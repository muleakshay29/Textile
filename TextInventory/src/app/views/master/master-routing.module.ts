import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { YarnMasterComponent } from "./yarn-master/yarn-master.component";
import { QualityMasterComponent } from "./quality-master/quality-master.component";
import { PartyMasterComponent } from "./party-master/party-master.component";
import { LoomMasterComponent } from "./loom-master/loom-master.component";
import { FirmMasterComponent } from "./firm-master/firm-master.component";
import { BrokerMasterComponent } from "./broker-master/broker-master.component";
import { EmployeeMasterComponent } from "./employee-master/employee-master.component";
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
import { AddYarnContractComponent } from "./contract-master/yarn-contract/add-yarn-contract/add-yarn-contract.component";
import { SalesContractComponent } from "./contract-master/sales-contract/sales-contract.component";
import { InwardContractComponent } from "./contract-master/job-contract/inward-contract/inward-contract.component";
import { AddInwardContractComponent } from "./contract-master/job-contract/inward-contract/add-inward-contract/add-inward-contract.component";
import { OutwardContractComponent } from "./contract-master/job-contract/outward-contract/outward-contract.component";
import { AddOutwardContractComponent } from "./contract-master/job-contract/outward-contract/add-outward-contract/add-outward-contract.component";
import { AddSalesContractComponent } from "./contract-master/sales-contract/add-sales-contract/add-sales-contract.component";
import { AuthGuard } from "../../_guards/auth.guard";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Masters",
    },
    children: [
      {
        path: "",
        redirectTo: "common-master",
        pathMatch: "full",
        canActivate: [AuthGuard],
      },
      {
        path: "common-master",
        component: CommonMasterComponent,
        data: {
          title: "Common Master",
        },
        canActivate: [AuthGuard],
      },
      {
        path: "add-common-master",
        component: AddCommonMasterComponent,
        data: {
          title: "Add common Master",
        },
        canActivate: [AuthGuard],
      },
      {
        path: "add-common-master/:id",
        component: AddCommonMasterComponent,
        data: {
          title: "Edit common Master",
        },
        canActivate: [AuthGuard],
      },

      {
        path: "",
        redirectTo: "common-master-child",
        pathMatch: "full",
        canActivate: [AuthGuard],
      },
      {
        path: "common-master-child",
        component: CommonMasterChildComponent,
        data: {
          title: "Common Master Child",
        },
        canActivate: [AuthGuard],
      },
      {
        path: "add-common-master-child",
        component: AddMasterChildComponent,
        data: {
          title: "Add common Master Child",
        },
        canActivate: [AuthGuard],
      },
      {
        path: "add-common-master-child/:id",
        component: AddMasterChildComponent,
        data: {
          title: "Edit Common Master Child",
        },
        canActivate: [AuthGuard],
      },

      {
        path: "",
        redirectTo: "company-master",
        pathMatch: "full",
        canActivate: [AuthGuard],
      },
      {
        path: "company-master",
        component: CompanyMasterComponent,
        data: {
          title: "Company Master",
        },
        canActivate: [AuthGuard],
      },
      {
        path: "add-company-master",
        component: AddCompanyMasterComponent,
        data: {
          title: "Add Company Master",
        },
        canActivate: [AuthGuard],
      },
      {
        path: "add-company-master/:id",
        component: AddCompanyMasterComponent,
        data: {
          title: "Edit Company Master",
        },
        canActivate: [AuthGuard],
      },

      {
        path: "",
        redirectTo: "yarn-master",
        pathMatch: "full",
        canActivate: [AuthGuard],
      },
      {
        path: "yarn-master",
        component: YarnMasterComponent,
        data: {
          title: "Yarn Master",
        },
        canActivate: [AuthGuard],
      },
      {
        path: "add-yarn",
        component: AddYarnComponent,
        data: {
          title: "Add Yarn Master",
        },
        canActivate: [AuthGuard],
      },
      {
        path: "add-yarn/:id",
        component: AddYarnComponent,
        data: {
          title: "Edit Yarn Master",
        },
        canActivate: [AuthGuard],
      },

      {
        path: "",
        redirectTo: "quality-master",
        pathMatch: "full",
        canActivate: [AuthGuard],
      },
      {
        path: "quality-master",
        component: QualityMasterComponent,
        data: {
          title: "Quality Master",
        },
        canActivate: [AuthGuard],
      },
      {
        path: "add-quality",
        component: AddQualityComponent,
        data: {
          title: "Quality Master",
        },
        canActivate: [AuthGuard],
      },
      {
        path: "edit-quality/:id",
        component: EditQualityComponent,
        data: {
          title: "Edit Quality Master",
        },
        canActivate: [AuthGuard],
      },

      {
        path: "",
        redirectTo: "party-master",
        pathMatch: "full",
        canActivate: [AuthGuard],
      },
      {
        path: "party-master",
        component: PartyMasterComponent,
        data: {
          title: "Party Master",
        },
        canActivate: [AuthGuard],
      },
      {
        path: "add-party",
        component: AddPartyComponent,
        data: {
          title: "Party Master",
        },
        canActivate: [AuthGuard],
      },
      {
        path: "add-party/:id",
        component: AddPartyComponent,
        data: {
          title: "Edit Party Master",
        },
        canActivate: [AuthGuard],
      },

      {
        path: "",
        redirectTo: "loom-master",
        pathMatch: "full",
        canActivate: [AuthGuard],
      },
      {
        path: "loom-master",
        component: LoomMasterComponent,
        data: {
          title: "Loom Master",
        },
        canActivate: [AuthGuard],
      },
      {
        path: "add-loom",
        component: AddLoomComponent,
        data: {
          title: "Loom Master",
        },
        canActivate: [AuthGuard],
      },
      {
        path: "add-loom/:id",
        component: AddLoomComponent,
        data: {
          title: "Edit Loom Master",
        },
        canActivate: [AuthGuard],
      },

      {
        path: "",
        redirectTo: "firm-master",
        pathMatch: "full",
        canActivate: [AuthGuard],
      },
      {
        path: "firm-master",
        component: FirmMasterComponent,
        data: {
          title: "Firm Master",
        },
        canActivate: [AuthGuard],
      },
      {
        path: "add-firm",
        component: AddFirmComponent,
        data: {
          title: "Firm Master",
        },
        canActivate: [AuthGuard],
      },
      {
        path: "add-firm/:id",
        component: AddFirmComponent,
        data: {
          title: "Edit Firm Master",
        },
        canActivate: [AuthGuard],
      },

      {
        path: "",
        redirectTo: "employee-master",
        pathMatch: "full",
        canActivate: [AuthGuard],
      },
      {
        path: "employee-master",
        component: EmployeeMasterComponent,
        data: {
          title: "Employee Master",
        },
        canActivate: [AuthGuard],
      },
      {
        path: "add-employee",
        component: AddEmployeeComponent,
        data: {
          title: "Employee Master",
        },
        canActivate: [AuthGuard],
      },
      {
        path: "add-employee/:id",
        component: AddEmployeeComponent,
        data: {
          title: "Edit Employee Master",
        },
        canActivate: [AuthGuard],
      },

      {
        path: "",
        redirectTo: "broker-master",
        pathMatch: "full",
        canActivate: [AuthGuard],
      },
      {
        path: "broker-master",
        component: BrokerMasterComponent,
        data: {
          title: "Broker Master",
        },
        canActivate: [AuthGuard],
      },
      {
        path: "add-broker",
        component: AddBrokerComponent,
        data: {
          title: "Broker Master",
        },
        canActivate: [AuthGuard],
      },
      {
        path: "add-broker/:id",
        component: AddBrokerComponent,
        data: {
          title: "Edit Broker Master",
        },
        canActivate: [AuthGuard],
      },

      {
        path: "",
        redirectTo: "account-master",
        pathMatch: "full",
        canActivate: [AuthGuard],
      },
      {
        path: "account-master",
        component: AccountMasterComponent,
        data: {
          title: "Account Master",
        },
        canActivate: [AuthGuard],
      },
      {
        path: "add-account",
        component: AddAccountComponent,
        data: {
          title: "Account Master",
        },
        canActivate: [AuthGuard],
      },
      {
        path: "add-account/:id",
        component: AddAccountComponent,
        data: {
          title: "Edit Account Master",
        },
        canActivate: [AuthGuard],
      },

      {
        path: "",
        redirectTo: "yarn-contract",
        pathMatch: "full",
        canActivate: [AuthGuard],
      },
      {
        path: "yarn-contract",
        component: YarnContractComponent,
        data: {
          title: "Yarn Contract",
        },
        canActivate: [AuthGuard],
      },
      {
        path: "add-yarn-contract",
        component: AddYarnContractComponent,
        data: {
          title: "Add Yarn Contract",
        },
        canActivate: [AuthGuard],
      },
      {
        path: "add-yarn-contract/:id",
        component: AddYarnContractComponent,
        data: {
          title: "Edit Yarn Contract",
        },
        canActivate: [AuthGuard],
      },

      {
        path: "",
        redirectTo: "sales-contract",
        pathMatch: "full",
        canActivate: [AuthGuard],
      },
      {
        path: "sales-contract",
        component: SalesContractComponent,
        data: {
          title: "Sales Contract",
        },
        canActivate: [AuthGuard],
      },
      {
        path: "add-sales-contract",
        component: AddSalesContractComponent,
        data: {
          title: "Add Sales Contract",
        },
        canActivate: [AuthGuard],
      },
      {
        path: "add-sales-contract/:id",
        component: AddSalesContractComponent,
        data: {
          title: "Edit Sales Contract",
        },
        canActivate: [AuthGuard],
      },

      {
        path: "",
        redirectTo: "inward-job-contract",
        pathMatch: "full",
        canActivate: [AuthGuard],
      },
      {
        path: "inward-job-contract",
        component: InwardContractComponent,
        data: {
          title: "Inward Job Contract",
        },
        canActivate: [AuthGuard],
      },
      {
        path: "add-inward-job-contract",
        component: AddInwardContractComponent,
        data: {
          title: "Add Inward Job",
        },
        canActivate: [AuthGuard],
      },
      {
        path: "add-inward-job-contract/:id",
        component: AddInwardContractComponent,
        data: {
          title: "Edit Inward Job",
        },
        canActivate: [AuthGuard],
      },

      {
        path: "",
        redirectTo: "outward-job-contract",
        pathMatch: "full",
        canActivate: [AuthGuard],
      },
      {
        path: "outward-job-contract",
        component: OutwardContractComponent,
        data: {
          title: "Outward Job Contract",
        },
        canActivate: [AuthGuard],
      },
      {
        path: "add-outward-job-contract",
        component: AddOutwardContractComponent,
        data: {
          title: "Add Outward Job Contract",
        },
        canActivate: [AuthGuard],
      },
      {
        path: "add-outward-job-contract/:id",
        component: AddOutwardContractComponent,
        data: {
          title: "Edit Outward Job Contract",
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
export class MasterRoutingModule {}
