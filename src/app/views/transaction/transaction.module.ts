import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { SharedModule } from "../../_shared/shared.module";

import { TransactionRoutingModule } from "./transaction-routing.module";
import { DeliveryChalanComponent } from "./delivery-chalan/delivery-chalan.component";
import { AddDeliveryChalanComponent } from './delivery-chalan/add-delivery-chalan/add-delivery-chalan.component';

@NgModule({
  declarations: [DeliveryChalanComponent, AddDeliveryChalanComponent],
  imports: [SharedModule, TransactionRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TransactionModule {}
