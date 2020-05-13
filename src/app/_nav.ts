import { INavData } from "@coreui/angular";

export const navItems: INavData[] = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: "icon-chart",
  },
  {
    name: "Yarn Master",
    url: "/masters/yarn-master",
    icon: "icon-arrow-right",
  },
  {
    name: "Quality Master",
    url: "/masters/quality-master",
    icon: "icon-arrow-right",
  },
  {
    name: "Party Master",
    url: "/masters/party-master",
    icon: "icon-arrow-right",
  },
  {
    name: "Loom Master",
    url: "/masters/loom-master",
    icon: "icon-arrow-right",
  },
  {
    name: "Firm Master",
    url: "/masters/firm-master",
    icon: "icon-arrow-right",
  },
  {
    name: "Employee Master",
    url: "/masters/employee-master",
    icon: "icon-arrow-right",
  },
  {
    name: "Broker Master",
    url: "/masters/broker-master",
    icon: "icon-arrow-right",
  },
  {
    name: "Account Master",
    url: "/masters/account-master",
    icon: "icon-arrow-right",
  },
  {
    name: "Inward-Outward",
    url: "/winding-inward",
    icon: "icon-cursor",
    children: [
      {
        name: "Winding-Inward",
        url: "/inwards/winding-inward",
        icon: "icon-cursor",
      },
      {
        name: "Yarn-Inward",
        url: "/inwards/yarn-inward",
        icon: "icon-cursor",
      },
      {
        name: "Yarn-Inward Invoice",
        url: "/inwards/yarn-inward-invoice",
        icon: "icon-cursor",
      },
      {
        name: "Yarn-Outwards",
        url: "/inwards/yarn-outward",
        icon: "icon-cursor",
      },
    ],
  },
];
