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
    name: i18n.t("normalRoutes.dashboard"),
    to: "/dashboard",
    icon: "login",
    component: TotalDashboard,
    permission: "private",
  },
  {
    name: i18n.t("alarm.name"),
    to: "/alarmReport",
    icon: "login",
    component: AlarmPage,
    permission: "private",
  },
  {
    name: i18n.t("simplelog.name"),
    to: "/messageReport",
    icon: "login",
    component: MessageDashboard,
    permission: "private",
  },
  {
    name: i18n.t("normalRoutes.device"),
    to: "/deviceReport",
    icon: "login",
    component: DeviceReport,
    permission: "private",
  },
  {
    name: i18n.t("normalRoutes.report"),
    to: "/historyReport",
    icon: "login",
    component: HistoryReport,
    permission: "private",
  },
  {
    name: i18n.t("normalRoutes.deviceSummary"),
    to: "/deviceSummary",
    icon: "login",
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
    name: i18n.t("normalRoutes.license"),
    to: "/licenseMessage",
    icon: "unlock",
    component: LicenseMessage,
    permission: "private",
  },
];
