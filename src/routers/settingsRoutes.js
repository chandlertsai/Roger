import UsersTable from "components/pages/UsersTable";
import PermissionRoleForm from "components/forms/PermissionRoleForm";
import { PermissionGroup } from "apis/auth";
export const settingsRoutes = [
  {
    name: "使用者設定",
    to: "/userstable",
    icon: "user",
    component: UsersTable,
    permission: "permission",
    permissionGroup: PermissionGroup.users
  },
  {
    name: "權限設定",
    to: "/permissionsettings",
    icon: "lock",
    component: PermissionRoleForm,
    permission: "permission",
    permissionGroup: PermissionGroup.group
  }
];
