import { INavData } from "@coreui/angular";

export const navItems: INavData[] = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: "icon-chart",
  },
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
      {
        name: "Weaving Load (Mag)",
        url: "/weaving/weaving-mag",
        icon: "icon-cursor",
      },
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
      {
        name: "Mag Production",
        url: "/production/auto-production",
        icon: "icon-cursor",
      },
    ],
  },
];
