import Dashboard from "components/pages/Dashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LogTable from "components/pages/LogTable";
export const normalRoutes = [
  {
    name: "即時監控",
    to: "/dashboard",
    icon: "login",
    component: Dashboard,
    permission: "private"
  },
  {
    name: "Log資料",
    to: "/log",
    icon: "unordered-list",
    component: LogTable,
    permission: "private"
  }
];
