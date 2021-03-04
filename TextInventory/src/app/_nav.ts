import { INavData } from "@coreui/angular";

export const navItems: INavData[] = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: "icon-chart",
  },
  {
    name: "Year",
    url: "/year-selection",
    icon: "icon-chart",
  },
  /* {
    name: "Admin Specific",
    url: "/masters/common-master",
    icon: "icon-arrow-right",
    children: [
      {
        name: "Common Master",
        url: "/masters/common-master",
        icon: "icon-cursor",
      },
      {
        name: "Common Master Child",
        url: "/masters/common-master-child",
        icon: "icon-cursor",
      },
    ],
  }, */
  {
    name: "Masters",
    url: "/masters/yarn-master",
    icon: "icon-arrow-right",
    children: [
      {
        name: "Yarn Master",
        url: "/masters/yarn-master",
        icon: "icon-cursor",
      },
      {
        name: "Quality Master",
        url: "/masters/quality-master",
        icon: "icon-cursor",
      },
      {
        name: "Party Master",
        url: "/masters/party-master",
        icon: "icon-cursor",
      },
      {
        name: "Loom Master",
        url: "/masters/loom-master",
        icon: "icon-cursor",
      },
      {
        name: "Firm Master",
        url: "/masters/firm-master",
        icon: "icon-cursor",
      },
      {
        name: "Employee Master",
        url: "/masters/employee-master",
        icon: "icon-cursor",
      },
      {
        name: "Broker Master",
        url: "/masters/broker-master",
        icon: "icon-cursor",
      },
      {
        name: "Account Master",
        url: "/masters/account-master",
        icon: "icon-cursor",
      },
      {
        name: "Contract Master",
        url: "/masters/yarn-contract",
        icon: "icon-arrow-right",
        children: [
          {
            name: "Yarn Contract",
            url: "/masters/yarn-contract",
            icon: "icon-cursor",
          },
          {
            name: "Job Contract",
            url: "/masters/inward-job-contract",
            icon: "icon-cursor",
            children: [
              {
                name: "Inward",
                url: "/masters/inward-job-contract",
                icon: "icon-cursor",
              },
              {
                name: "Outward",
                url: "/masters/outward-job-contract",
                icon: "icon-cursor",
              },
            ],
          },
          {
            name: "Sales Contract",
            url: "/masters/sales-contract",
            icon: "icon-cursor",
          },
        ],
      },
    ],
  },
  {
    name: "Yarn",
    url: "/inwards/yarn-inward",
    icon: "icon-arrow-right",
    children: [
      {
        name: "Yarn-Inward",
        url: "/inwards/yarn-inward",
        icon: "icon-cursor",
        children: [
          {
            name: "Inward Only",
            url: "/inwards/yarn-inward",
            icon: "icon-cursor",
          },
          {
            name: "Inward With Invoice",
            url: "/inwards/yarn-inward-invoice",
            icon: "icon-cursor",
          },
        ],
      },
      {
        name: "Yarn-Outwards",
        url: "/inwards/yarn-outward",
        icon: "icon-cursor",
      },
    ],
  },
  {
    name: "Winding",
    url: "/inwards/winding-inward",
    icon: "icon-arrow-right",
    children: [
      {
        name: "Inward",
        url: "/inwards/winding-inward",
        icon: "icon-cursor",
      },
      {
        name: "Outwards",
        url: "/inwards/winding-outward",
        icon: "icon-cursor",
      },
    ],
  },
  {
    name: "Beam",
    url: "/beam/sizing-inward",
    icon: "icon-arrow-right",
    children: [
      {
        name: "Sizing Inward",
        url: "/beam/sizing-inward",
        icon: "icon-cursor",
      },
      {
        name: "Beam Inward",
        url: "/beam/beam-inward",
        icon: "icon-cursor",
      },
    ],
  },
  {
    name: "Weaving",
    url: "/weaving/weaving-mag",
    icon: "icon-arrow-right",
    children: [
      /* {
        name: "Weaving Load (Mag)",
        url: "/weaving/weaving-mag",
        icon: "icon-cursor",
      }, */
      {
        name: "Weaving Load (Auto)",
        url: "/weaving/weaving-auto",
        icon: "icon-cursor",
      },
    ],
  },
  {
    name: "Production",
    url: "/production/auto-production",
    icon: "icon-arrow-right",
    children: [
      {
        name: "Auto Production",
        url: "/production/auto-production",
        icon: "icon-cursor",
      },
      /* {
        name: "Mag Production",
        url: "/production/auto-production",
        icon: "icon-cursor",
      }, */
    ],
  },
  {
    name: "Transaction",
    url: "/transaction/delivery-chalan",
    icon: "icon-arrow-right",
    children: [
      {
        name: "Delivery Chalan",
        url: "/transaction/delivery-chalan",
        icon: "icon-cursor",
      },
      {
        name: "Purchase Invoice",
        url: "/transaction/purchase-invoice",
        icon: "icon-cursor",
      },
      {
        name: "Sales Invoice Register",
        url: "/transaction/sales-invoice-register",
        icon: "icon-cursor",
      },
      {
        name: "Delivery Chalan Register",
        url: "/transaction/delivery-chalan-register",
        icon: "icon-cursor",
      },
      {
        name: "Sales Invoice Manual",
        url: "/transaction/sales-invoice-manual",
        icon: "icon-cursor",
      },
    ],
  },
  {
    name: "Finance",
    url: "/finance/journal-voucher",
    icon: "icon-arrow-right",
    children: [
      {
        name: "Journal Voucher",
        url: "/finance/journal-voucher",
        icon: "icon-cursor",
      },
      {
        name: "Purchase Payment",
        url: "/finance/purchase-payment",
        icon: "icon-cursor",
      },
      {
        name: "Sales Receipt",
        url: "/finance/sales-receipt",
        icon: "icon-cursor",
      },
      {
        name: "Party Payment Register",
        url: "/finance/party-payment-register",
        icon: "icon-cursor",
      },
      {
        name: "Sales Register",
        url: "/finance/sales-receipt-register",
        icon: "icon-cursor",
      },
      {
        name: "Bank Transaction",
        url: "/finance/bank-transaction",
        icon: "icon-cursor",
      },
      {
        name: "Bank Balance",
        url: "/finance/bank-balance",
        icon: "icon-cursor",
      },
    ],
  },
  {
    name: "Reports",
    url: "/reports/ledger-report",
    icon: "icon-arrow-right",
    children: [
      {
        name: "Ledger Report",
        url: "/reports/ledger-report",
        icon: "icon-cursor",
      },
      {
        name: "GST1 Report",
        url: "/reports/gst1-report",
        icon: "icon-cursor",
      },
      {
        name: "Broker Report",
        url: "/reports/broker-report",
        icon: "icon-cursor",
      },
      /* {
        name: "GST2 Report",
        url: "/reports/gst2-report",
        icon: "icon-cursor",
      },
      {
        name: "Part Hishob Report",
        url: "/reports/party-hishob-report",
        icon: "icon-cursor",
      },
      {
        name: "Beam Performance Report",
        url: "/reports/beam-performance-report",
        icon: "icon-cursor",
      },
      {
        name: "Consumption Report",
        url: "/reports/consumption-report",
        icon: "icon-cursor",
      },
      {
        name: "Stock Yarn Report",
        url: "/reports/stock-yarn-report",
        icon: "icon-cursor",
      },
      {
        name: "Stock Tage Report",
        url: "/reports/stock-tage-report",
        icon: "icon-cursor",
      },
      {
        name: "Stock Beam Report",
        url: "/reports/stock-beam-report",
        icon: "icon-cursor",
      }, */
    ],
  },
];
