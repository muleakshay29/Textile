import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DeliveryChalanComponent } from "./delivery-chalan/delivery-chalan.component";
import { AddDeliveryChalanComponent } from "./delivery-chalan/add-delivery-chalan/add-delivery-chalan.component";
import { SalesInvoiceComponent } from "./sales-invoice/sales-invoice.component";
import { PurchaseInvoiceComponent } from "./purchase-invoice/purchase-invoice.component";
import { SalesInvoiceRegisterComponent } from "./sales-invoice-register/sales-invoice-register.component";
import { DeliveryChalanRegisterComponent } from "./delivery-chalan-register/delivery-chalan-register.component";
import { AddPurchaseInvoiceComponent } from "./purchase-invoice/add-purchase-invoice/add-purchase-invoice.component";
import { AddSalesInvoiceManualComponent } from "./sales-invoice-manual/add-sales-invoice-manual/add-sales-invoice-manual.component";
import { SalesInvoiceManualComponent } from "./sales-invoice-manual/sales-invoice-manual.component";
import { EditSalesInvoiceComponent } from "./sales-invoice/edit-sales-invoice/edit-sales-invoice.component";
import { AuthGuard } from "../../_guards/auth.guard";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Transaction",
    },
    children: [
      {
        path: "",
        redirectTo: "delivery-chalan",
        pathMatch: "full",
        canActivate: [AuthGuard],
      },
      {
        path: "delivery-chalan",
        component: DeliveryChalanComponent,
        data: {
          title: "Delivery Chalan",
        },
        canActivate: [AuthGuard],
      },
      {
        path: "add-delivery-chalan",
        component: AddDeliveryChalanComponent,
        data: {
          title: "Add Delivery Chalan",
        },
        canActivate: [AuthGuard],
      },
      {
        path: "add-delivery-chalan/:id",
        component: AddDeliveryChalanComponent,
        data: {
          title: "Edit Delivery Chalan",
        },
        canActivate: [AuthGuard],
      },

      {
        path: "",
        redirectTo: "sales-invoice",
        pathMatch: "full",
        canActivate: [AuthGuard],
      },
      {
        path: "sales-invoice",
        component: SalesInvoiceComponent,
        data: {
          title: "Sales Invoice",
        },
        canActivate: [AuthGuard],
      },
      {
        path: "sales-invoice/:id/:id2",
        component: SalesInvoiceComponent,
        data: {
          title: "Edit Sales Invoice",
        },
        canActivate: [AuthGuard],
      },
      {
        path: "edit-sales-invoice/:id",
        component: EditSalesInvoiceComponent,
        data: {
          title: "Edit Sales Invoice",
        },
        canActivate: [AuthGuard],
      },

      {
        path: "",
        redirectTo: "sales-invoice-manual",
        pathMatch: "full",
        canActivate: [AuthGuard],
      },
      {
        path: "sales-invoice-manual",
        component: SalesInvoiceManualComponent,
        data: {
          title: "Sales Invoice Manual",
        },
        canActivate: [AuthGuard],
      },
      {
        path: "add-sales-invoice-manual",
        component: AddSalesInvoiceManualComponent,
        data: {
          title: "Add Sales Invoice Manual",
        },
        canActivate: [AuthGuard],
      },
      {
        path: "add-sales-invoice-manual/:id",
        component: AddSalesInvoiceManualComponent,
        data: {
          title: "Edit Sales Invoice Manual",
        },
        canActivate: [AuthGuard],
      },

      {
        path: "",
        redirectTo: "purchase-invoice",
        pathMatch: "full",
        canActivate: [AuthGuard],
      },
      {
        path: "purchase-invoice",
        component: PurchaseInvoiceComponent,
        data: {
          title: "Purchase Invoice",
        },
        canActivate: [AuthGuard],
      },
      {
        path: "add-purchase-invoice",
        component: AddPurchaseInvoiceComponent,
        data: {
          title: "Add Purchase Invoice",
        },
        canActivate: [AuthGuard],
      },

      {
        path: "",
        redirectTo: "sales-invoice-register",
        pathMatch: "full",
        canActivate: [AuthGuard],
      },
      {
        path: "sales-invoice-register",
        component: SalesInvoiceRegisterComponent,
        data: {
          title: "Sales Invoice Register",
        },
        canActivate: [AuthGuard],
      },

      /* {
        path: "sales-invoice-print/:id",
        component: SalesInvoicePrintComponent,
        data: {
          title: "Sales Invoice Print",
        },
      }, */

      {
        path: "",
        redirectTo: "delivery-chalan-register",
        pathMatch: "full",
        canActivate: [AuthGuard],
      },
      {
        path: "delivery-chalan-register",
        component: DeliveryChalanRegisterComponent,
        data: {
          title: "Delivery Chalan Register",
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
export class TransactionRoutingModule {}
