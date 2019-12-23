import UsersTable from "components/pages/UsersTable";
import GroupsTable from "components/pages/GroupsTabe";
import DevicesTable from "components/pages/DeviceTable";
import AlarmTable from "components/pages/AlarmTable";
import PermissionRoleForm from "components/forms/PermissionRoleForm";
import { PermissionGroup } from "apis/auth";
import UploadLicense from "components/forms/UploadLicense";
import VendorTable from "components/pages/VendorTable";

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
    name: "群組設定",
    to: "/groupstable",
    icon: "block",
    component: GroupsTable,
    permission: "permission",
    permissionGroup: PermissionGroup.group
  },
  {
    name: "權限設定",
    to: "/permissionsettings",
    icon: "lock",
    component: PermissionRoleForm,
    permission: "permission",
    permissionGroup: PermissionGroup.group
  },
  {
    name: "上傳 License",
    to: "/uploadlicense",
    icon: "uplaod",
    component: UploadLicense,
    permission: "permission",
    permissionGroup: PermissionGroup.license
  },
  {
    name: "設備設定",
    to: "/devicestable",
    icon: "cluster",
    component: DevicesTable,
    permission: "permission",
    permissionGroup: PermissionGroup.device.information
  },
  {
    name: "報警設定",
    to: "/alarmtable",
    icon: "warning",
    component: AlarmTable,
    permission: "permission",
    permissionGroup: PermissionGroup.device.alarm
  },

  {
    name: "供應商設定",
    to: "/vendortable",
    icon: "account-book",
    component: VendorTable,
    permission: "permission",
    permissionGroup: PermissionGroup.device.vendor
  }
];
