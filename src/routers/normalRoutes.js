import AlarmPage, {
  MessageDashboard,
  TotalDashboard,
} from "components/pages/AlarmDashboard";

import DeviceReport from "components/pages/DeviceReport";
import HistoryReport from "components/pages/HistoryReport";
import AllDevicesSummaryReport from "components/pages/AllDevicesSummaryReport";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LogTable from "components/tables/LogTable";
import LicenseMessage from "components/pureComponents/licenseMessage";
import i18n from "src/i18n";
export const getNormalRoutes = () => [
  {
    name: i18n.t("menu.summary"),
    to: "/summary",
    icon: "login",
    component: TotalDashboard,
    permission: "private",
  },
  {
    name: i18n.t("menu.alarm"),
    to: "/alarm",
    icon: "login",
    component: AlarmPage,
    permission: "private",
  },
  {
    name: i18n.t("menu.message"),
    to: "/message",
    icon: "login",
    component: MessageDashboard,
    permission: "private",
  },
  {
    name: i18n.t("menu.device"),
    to: "/device",
    icon: "login",
    component: DeviceReport,
    permission: "private",
  },
  {
    name: i18n.t("menu.deviceDetail"),
    to: "/deviceDetail",
    icon: "login",
    component: HistoryReport,
    permission: "private",
  },
  {
    name: i18n.t("menu.deviceSummary"),
    to: "/deviceSummary",
    component: AllDevicesSummaryReport,
    permission: "private",
  },
  {
    name: i18n.t("normalRoutes.log"),
    to: "/log",
    icon: "unordered-list",
    component: LogTable,
    permission: "private",
  },
  {
    name: i18n.t("menu.license"),
    to: "/license",
    icon: "unlock",
    component: LicenseMessage,
    permission: "private",
  },
];
