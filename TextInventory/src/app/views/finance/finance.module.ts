import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { SharedModule } from "../../_shared/shared.module";

import { FinanceRoutingModule } from "./finance-routing.module";
import { JournalVoucherComponent } from "./journal-voucher/journal-voucher.component";
import { AddJournalVoucherComponent } from "./journal-voucher/add-journal-voucher/add-journal-voucher.component";
import { PurchasePaymentComponent } from "./purchase-payment/purchase-payment.component";
import { AddPurchasePaymentComponent } from "./purchase-payment/add-purchase-payment/add-purchase-payment.component";
import { SalesReceiptComponent } from "./sales-receipt/sales-receipt.component";
import { AddSalesReceiptComponent } from "./sales-receipt/add-sales-receipt/add-sales-receipt.component";
import { PartyPaymentRegisterComponent } from "./party-payment-register/party-payment-register.component";
import { AddPartyPaymentRegisterComponent } from "./party-payment-register/add-party-payment-register/add-party-payment-register.component";
import { SalesReceiptRegisterComponent } from "./sales-receipt-register/sales-receipt-register.component";
import { AddSalesReceiptRegisterComponent } from "./sales-receipt-register/add-sales-receipt-register/add-sales-receipt-register.component";
import { BankTransactionComponent } from "./bank-transaction/bank-transaction.component";
import { BankBalanceComponent } from "./bank-balance/bank-balance.component";

@NgModule({
  declarations: [
    JournalVoucherComponent,
    AddJournalVoucherComponent,
    PurchasePaymentComponent,
    AddPurchasePaymentComponent,
    SalesReceiptComponent,
    AddSalesReceiptComponent,
    PartyPaymentRegisterComponent,
    AddPartyPaymentRegisterComponent,
    SalesReceiptRegisterComponent,
    AddSalesReceiptRegisterComponent,
    BankTransactionComponent,
    BankBalanceComponent,
  ],
  imports: [SharedModule, FinanceRoutingModule],
})
export class FinanceModule {}
