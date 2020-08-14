import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

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

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Finance",
    },
    children: [
      {
        path: "",
        redirectTo: "journal-voucher",
        pathMatch: "full",
      },
      {
        path: "journal-voucher",
        component: JournalVoucherComponent,
        data: {
          title: "Journal Voucher",
        },
      },
      {
        path: "add-journal-voucher",
        component: AddJournalVoucherComponent,
        data: {
          title: "Add Journal Voucher",
        },
      },
      {
        path: "add-journal-voucher/:id",
        component: AddJournalVoucherComponent,
        data: {
          title: "Edit Journal Voucher",
        },
      },

      {
        path: "",
        redirectTo: "purchase-payment",
        pathMatch: "full",
      },
      {
        path: "purchase-payment",
        component: PurchasePaymentComponent,
        data: {
          title: "Purchase Payment",
        },
      },
      {
        path: "add-purchase-payment/:id",
        component: AddPurchasePaymentComponent,
        data: {
          title: "Add Purchase Payment",
        },
      },
      {
        path: "add-purchase-payment/:id/:id2",
        component: AddPurchasePaymentComponent,
        data: {
          title: "Edit Purchase Payment",
        },
      },

      {
        path: "",
        redirectTo: "sales-receipt",
        pathMatch: "full",
      },
      {
        path: "sales-receipt",
        component: SalesReceiptComponent,
        data: {
          title: "Sales Receipt",
        },
      },
      {
        path: "add-sales-receipt/:id/:id2",
        component: AddSalesReceiptComponent,
        data: {
          title: "Add Sales Receipt",
        },
      },
      {
        path: "add-sales-receipt/:id",
        component: AddSalesReceiptComponent,
        data: {
          title: "Edit Sales Receipt",
        },
      },

      {
        path: "",
        redirectTo: "party-payment-register",
        pathMatch: "full",
      },
      {
        path: "party-payment-register",
        component: PartyPaymentRegisterComponent,
        data: {
          title: "Party Payment Register",
        },
      },
      {
        path: "add-party-payment-register",
        component: AddPartyPaymentRegisterComponent,
        data: {
          title: "Add Party Payment Register",
        },
      },
      {
        path: "add-party-payment-register/:id",
        component: AddPartyPaymentRegisterComponent,
        data: {
          title: "Edit Party Payment Register",
        },
      },

      {
        path: "",
        redirectTo: "sales-receipt-register",
        pathMatch: "full",
      },
      {
        path: "sales-receipt-register",
        component: SalesReceiptRegisterComponent,
        data: {
          title: "Sales Receipt Register",
        },
      },
      {
        path: "add-sales-receipt-register",
        component: AddSalesReceiptRegisterComponent,
        data: {
          title: "Add Sales Receipt Register",
        },
      },
      {
        path: "add-sales-receipt-register/:id",
        component: AddSalesReceiptRegisterComponent,
        data: {
          title: "Edit Sales Receipt Register",
        },
      },

      {
        path: "",
        redirectTo: "bank-transaction",
        pathMatch: "full",
      },
      {
        path: "bank-transaction",
        component: BankTransactionComponent,
        data: {
          title: "Bank Transaction",
        },
      },

      {
        path: "",
        redirectTo: "bank-balance",
        pathMatch: "full",
      },
      {
        path: "bank-balance",
        component: BankBalanceComponent,
        data: {
          title: "Bank Balance",
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinanceRoutingModule {}
