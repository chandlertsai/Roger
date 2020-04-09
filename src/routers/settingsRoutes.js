import UsersTable from "components/tables/UsersTable";
import GroupsTable from "components/tables/GroupsTabe";
import DevicesTable from "components/tables/DeviceTable";
import AlarmTable from "components/tables/AlarmTable";
import PermissionRoleForm from "components/forms/PermissionRoleForm";
import { PermissionGroup } from "apis/auth";
import UploadLicense from "components/forms/UploadLicense";
import VendorTable from "components/tables/VendorTable";
import SettingsForm from "components/forms/SettingsForm";
import i18n from "src/i18n";

export const getSettingsRoutes = () => [
  {
    name: i18n.t("settingsRoutes.user"),
    to: "/userstable",
    icon: "user",
    component: UsersTable,
    permission: "permission",
    permissionGroup: PermissionGroup.users,
  },
  {
    name: i18n.t("settingsRoutes.group"),
    to: "/groupstable",
    icon: "block",
    component: GroupsTable,
    permission: "permission",
    permissionGroup: PermissionGroup.group,
  },
  {
    name: i18n.t("settingsRoutes.permission"),
    to: "/permissionsettings",
    icon: "lock",
    component: PermissionRoleForm,
    permission: "permission",
    permissionGroup: PermissionGroup.group,
  },
  {
    name: i18n.t("settingsRoutes.uploadLicence"),
    to: "/uploadlicense",
    icon: "uplaod",
    component: UploadLicense,
    permission: "permission",
    permissionGroup: PermissionGroup.license,
  },
  {
    name: i18n.t("settingsRoutes.vendor"),
    to: "/vendortable",
    icon: "uplaod",
    component: VendorTable,
    permission: "permission",
    permissionGroup: PermissionGroup.device.vendor,
  },
  {
    name: i18n.t("settingsRoutes.device"),
    to: "/deviceTable",
    icon: "cluster",
    component: DevicesTable,
    permission: "permission",
    permissionGroup: PermissionGroup.device.information,
  },
  {
    name: i18n.t("settingsRoutes.alarm"),
    to: "/alarmtable",
    icon: "warning",
    component: AlarmTable,
    permission: "permission",
    permissionGroup: PermissionGroup.device.alarm,
  },

  {
    name: i18n.t("settingsRoutes.settings"),
    to: "/miscsettings",
    icon: "SettingOutlined",
    component: SettingsForm,
    permission: "private",
  },
];
