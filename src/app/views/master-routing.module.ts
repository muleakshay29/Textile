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
      },
      {
        path: "common-master",
        component: CommonMasterComponent,
        data: {
          title: "Common Master",
        },
      },
      {
        path: "add-common-master",
        component: AddCommonMasterComponent,
        data: {
          title: "Add common Master",
        },
      },
      {
        path: "add-common-master/:id",
        component: AddCommonMasterComponent,
        data: {
          title: "Edit common Master",
        },
      },

      {
        path: "",
        redirectTo: "common-master-child",
        pathMatch: "full",
      },
      {
        path: "common-master-child",
        component: CommonMasterChildComponent,
        data: {
          title: "Common Master Child",
        },
      },
      {
        path: "add-common-master-child",
        component: AddMasterChildComponent,
        data: {
          title: "Add common Master Child",
        },
      },
      {
        path: "add-common-master-child/:id",
        component: AddMasterChildComponent,
        data: {
          title: "Edit Common Master Child",
        },
      },

      {
        path: "",
        redirectTo: "yarn-master",
        pathMatch: "full",
      },
      {
        path: "yarn-master",
        component: YarnMasterComponent,
        data: {
          title: "Yarn Master",
        },
      },
      {
        path: "add-yarn",
        component: AddYarnComponent,
        data: {
          title: "Add Yarn Master",
        },
      },
      {
        path: "add-yarn/:id",
        component: AddYarnComponent,
        data: {
          title: "Edit Yarn Master",
        },
      },

      {
        path: "",
        redirectTo: "quality-master",
        pathMatch: "full",
      },
      {
        path: "quality-master",
        component: QualityMasterComponent,
        data: {
          title: "Quality Master",
        },
      },
      {
        path: "add-quality",
        component: AddQualityComponent,
        data: {
          title: "Quality Master",
        },
      },
      {
        path: "edit-quality/:id",
        component: EditQualityComponent,
        data: {
          title: "Edit Quality Master",
        },
      },

      {
        path: "",
        redirectTo: "party-master",
        pathMatch: "full",
      },
      {
        path: "party-master",
        component: PartyMasterComponent,
        data: {
          title: "Party Master",
        },
      },
      {
        path: "add-party",
        component: AddPartyComponent,
        data: {
          title: "Party Master",
        },
      },
      {
        path: "add-party/:id",
        component: AddPartyComponent,
        data: {
          title: "Edit Party Master",
        },
      },

      {
        path: "",
        redirectTo: "loom-master",
        pathMatch: "full",
      },
      {
        path: "loom-master",
        component: LoomMasterComponent,
        data: {
          title: "Loom Master",
        },
      },
      {
        path: "add-loom",
        component: AddLoomComponent,
        data: {
          title: "Loom Master",
        },
      },
      {
        path: "add-loom/:id",
        component: AddLoomComponent,
        data: {
          title: "Edit Loom Master",
        },
      },

      {
        path: "",
        redirectTo: "firm-master",
        pathMatch: "full",
      },
      {
        path: "firm-master",
        component: FirmMasterComponent,
        data: {
          title: "Firm Master",
        },
      },
      {
        path: "add-firm",
        component: AddFirmComponent,
        data: {
          title: "Firm Master",
        },
      },
      {
        path: "add-firm/:id",
        component: AddFirmComponent,
        data: {
          title: "Edit Firm Master",
        },
      },

      {
        path: "",
        redirectTo: "employee-master",
        pathMatch: "full",
      },
      {
        path: "employee-master",
        component: EmployeeMasterComponent,
        data: {
          title: "Employee Master",
        },
      },
      {
        path: "add-employee",
        component: AddEmployeeComponent,
        data: {
          title: "Employee Master",
        },
      },
      {
        path: "add-employee/:id",
        component: AddEmployeeComponent,
        data: {
          title: "Edit Employee Master",
        },
      },

      {
        path: "",
        redirectTo: "broker-master",
        pathMatch: "full",
      },
      {
        path: "broker-master",
        component: BrokerMasterComponent,
        data: {
          title: "Broker Master",
        },
      },
      {
        path: "add-broker",
        component: AddBrokerComponent,
        data: {
          title: "Broker Master",
        },
      },
      {
        path: "add-broker/:id",
        component: AddBrokerComponent,
        data: {
          title: "Edit Broker Master",
        },
      },

      {
        path: "",
        redirectTo: "account-master",
        pathMatch: "full",
      },
      {
        path: "account-master",
        component: AccountMasterComponent,
        data: {
          title: "Account Master",
        },
      },
      {
        path: "add-account",
        component: AddAccountComponent,
        data: {
          title: "Account Master",
        },
      },
      {
        path: "add-account/:id",
        component: AddAccountComponent,
        data: {
          title: "Edit Account Master",
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterRoutingModule {}
