import AlarmPage from "components/pages/Dashboard";
import DeviceReport from "components/pages/DeviceReport";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LogTable from "components/tables/LogTable";
import LicenseMessage from "components/pureComponents/licenseMessage";
import i18n from "src/i18n";
export const getNormalRoutes = () => [
  {
    name: i18n.t("alarm.name"),
    to: "/alarmReport",
    icon: "login",
    component: AlarmPage,
    permission: "private"
  },
  {
    name: i18n.t("normalRoutes.device"),
    to: "/deviceReport",
    icon: "login",
    component: DeviceReport,
    permission: "private"
  },
  {
    name: i18n.t("normalRoutes.log"),
    to: "/log",
    icon: "unordered-list",
    component: LogTable,
    permission: "private"
  },
  {
    name: i18n.t("normalRoutes.license"),
    to: "/licenseMessage",
    icon: "unlock",
    component: LicenseMessage,
    permission: "private"
  }
];
