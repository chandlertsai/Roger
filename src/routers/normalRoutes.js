import Dashboard from "components/pages/Dashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LogTable from "components/tables/LogTable";
import LicenseMessage from "components/pureComponents/licenseMessage";
import i18n from "src/i18n";
export const getNormalRoutes = () => [
  {
    name: i18n.t("normalRoutes.dashboard"),
    to: "/dashboard",
    icon: "login",
    component: Dashboard,
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
