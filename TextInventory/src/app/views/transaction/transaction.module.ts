import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { SharedModule } from "../../_shared/shared.module";

import { TransactionRoutingModule } from "./transaction-routing.module";
import { DeliveryChalanComponent } from "./delivery-chalan/delivery-chalan.component";
import { AddDeliveryChalanComponent } from "./delivery-chalan/add-delivery-chalan/add-delivery-chalan.component";
import { SalesInvoiceComponent } from "./sales-invoice/sales-invoice.component";
import { PurchaseInvoiceComponent } from "./purchase-invoice/purchase-invoice.component";
import { SalesInvoiceRegisterComponent } from "./sales-invoice-register/sales-invoice-register.component";
import { DeliveryChalanRegisterComponent } from "./delivery-chalan-register/delivery-chalan-register.component";
import { AddPurchaseInvoiceComponent } from "./purchase-invoice/add-purchase-invoice/add-purchase-invoice.component";
import { SalesInvoiceManualComponent } from "./sales-invoice-manual/sales-invoice-manual.component";
import { AddSalesInvoiceManualComponent } from "./sales-invoice-manual/add-sales-invoice-manual/add-sales-invoice-manual.component";
import { EditSalesInvoiceComponent } from "./sales-invoice/edit-sales-invoice/edit-sales-invoice.component";

@NgModule({
  declarations: [
    DeliveryChalanComponent,
    AddDeliveryChalanComponent,
    SalesInvoiceComponent,
    PurchaseInvoiceComponent,
    SalesInvoiceRegisterComponent,
    DeliveryChalanRegisterComponent,
    AddPurchaseInvoiceComponent,
    SalesInvoiceManualComponent,
    AddSalesInvoiceManualComponent,
    EditSalesInvoiceComponent,
  ],
  imports: [SharedModule, TransactionRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TransactionModule {}
