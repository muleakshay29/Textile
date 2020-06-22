import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WindingInwardComponent } from "./winding-inward/winding-inward.component";
import { YarnInwardComponent } from "./yarn-inward/yarn-inward.component";
import { YarnOutwardComponent } from "./yarn-outward/yarn-outward.component";
import { AddYarnInwardComponent } from "./yarn-inward/add-yarn-inward/add-yarn-inward.component";
import { YarnInwardInvoiceComponent } from "./yarn-inward-invoice/yarn-inward-invoice.component";
import { AddYarnInwardInvoiceComponent } from "./yarn-inward-invoice/add-yarn-inward-invoice/add-yarn-inward-invoice.component";
import { AddWindingInwardComponent } from "./winding-inward/add-winding-inward/add-winding-inward.component";
import { AddYarnOutwardComponent } from "./yarn-outward/add-yarn-outward/add-yarn-outward.component";
import { WindingOutwardComponent } from "./winding-outward/winding-outward.component";
import { AddWindingOutwardComponent } from "./winding-outward/add-winding-outward/add-winding-outward.component";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Inwards",
    },
    children: [
      {
        path: "",
        redirectTo: "winding-inward",
        pathMatch: "full",
      },
      {
        path: "winding-inward",
        component: WindingInwardComponent,
        data: {
          title: "Winding Inward",
        },
      },
      {
        path: "add-winding-inward",
        component: AddWindingInwardComponent,
        data: {
          title: "Winding Inward",
        },
      },
      {
        path: "add-winding-inward/:id",
        component: AddWindingInwardComponent,
        data: {
          title: "Winding Inward",
        },
      },

      {
        path: "winding-outward",
        component: WindingOutwardComponent,
        data: {
          title: "Winding outward",
        },
      },
      {
        path: "add-winding-outward",
        component: AddWindingOutwardComponent,
        data: {
          title: "Winding outward",
        },
      },
      {
        path: "add-winding-outward/:id",
        component: AddWindingOutwardComponent,
        data: {
          title: "Winding outward",
        },
      },

      {
        path: "yarn-inward",
        component: YarnInwardComponent,
        data: {
          title: "Yarn Inward",
        },
      },
      {
        path: "add-yarn-inward",
        component: AddYarnInwardComponent,
        data: {
          title: "Yarn Inward",
        },
      },
      {
        path: "add-yarn-inward/:id",
        component: AddYarnInwardComponent,
        data: {
          title: "Yarn Inward",
        },
      },

      {
        path: "yarn-inward-invoice",
        component: YarnInwardInvoiceComponent,
        data: {
          title: "Yarn Inward Invoice",
        },
      },
      {
        path: "add-yarn-inward-invoice",
        component: AddYarnInwardInvoiceComponent,
        data: {
          title: "Yarn Inward Invoice",
        },
      },
      {
        path: "add-yarn-inward-invoice/:id",
        component: AddYarnInwardInvoiceComponent,
        data: {
          title: "Yarn Inward Invoice",
        },
      },

      {
        path: "yarn-outward",
        component: YarnOutwardComponent,
        data: {
          title: "Yarn Outward",
        },
      },
      {
        path: "add-yarn-outward",
        component: AddYarnOutwardComponent,
        data: {
          title: "Yarn Outward",
        },
      },
      {
        path: "add-yarn-outward/:id",
        component: AddYarnOutwardComponent,
        data: {
          title: "Yarn Outward",
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InwardsRoutingModule {}
