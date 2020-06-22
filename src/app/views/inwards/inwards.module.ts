import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { SharedModule } from "../../_shared/shared.module";
import { InwardsRoutingModule } from "./inwards-routing.module";
import { WindingInwardComponent } from "./winding-inward/winding-inward.component";
import { YarnInwardComponent } from "./yarn-inward/yarn-inward.component";
import { YarnOutwardComponent } from "./yarn-outward/yarn-outward.component";
import { YarnInwardInvoiceComponent } from "./yarn-inward-invoice/yarn-inward-invoice.component";
import { AddYarnInwardInvoiceComponent } from "./yarn-inward-invoice/add-yarn-inward-invoice/add-yarn-inward-invoice.component";
import { AddYarnOutwardComponent } from "./yarn-outward/add-yarn-outward/add-yarn-outward.component";
import { AddYarnInwardComponent } from "./yarn-inward/add-yarn-inward/add-yarn-inward.component";
import { AddWindingInwardComponent } from './winding-inward/add-winding-inward/add-winding-inward.component';
import { WindingOutwardComponent } from './winding-outward/winding-outward.component';
import { AddWindingOutwardComponent } from './winding-outward/add-winding-outward/add-winding-outward.component';

@NgModule({
  declarations: [
    WindingInwardComponent,
    YarnInwardComponent,
    YarnOutwardComponent,
    YarnInwardInvoiceComponent,
    AddYarnInwardInvoiceComponent,
    AddYarnOutwardComponent,
    AddYarnInwardComponent,
    AddWindingInwardComponent,
    WindingOutwardComponent,
    AddWindingOutwardComponent,
  ],
  imports: [InwardsRoutingModule, SharedModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class InwardsModule {}
