import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DeliveryChalanComponent } from "./delivery-chalan/delivery-chalan.component";
import { AddDeliveryChalanComponent } from "./delivery-chalan/add-delivery-chalan/add-delivery-chalan.component";

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
      },
      {
        path: "delivery-chalan",
        component: DeliveryChalanComponent,
        data: {
          title: "Delivery Chalan",
        },
      },
      {
        path: "add-delivery-chalan",
        component: AddDeliveryChalanComponent,
        data: {
          title: "Add Delivery Chalan",
        },
      },
      {
        path: "add-delivery-chalan/:id",
        component: AddDeliveryChalanComponent,
        data: {
          title: "Edit Delivery Chalan",
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionRoutingModule {}
