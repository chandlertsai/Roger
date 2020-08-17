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
    name: i18n.t("menu.usersSetting"),
    to: "/usersSetting",
    icon: "user",
    component: UsersTable,
    permission: "permission",
    permissionGroup: PermissionGroup.users,
  },
  {
    name: i18n.t("menu.groupSetting"),
    to: "/groupSetting",
    icon: "block",
    component: GroupsTable,
    permission: "permission",
    permissionGroup: PermissionGroup.group,
  },
  {
    name: i18n.t("menu.permissionSetting"),
    to: "/permissionSetting",
    icon: "lock",
    component: PermissionRoleForm,
    permission: "permission",
    permissionGroup: PermissionGroup.group,
  },
  {
    name: i18n.t("menu.uploadLicence"),
    to: "/uploadLicense",
    icon: "uplaod",
    component: UploadLicense,
    permission: "permission",
    permissionGroup: PermissionGroup.license,
  },
  {
    name: i18n.t("menu.vendorsSetting"),
    to: "/vendorsSetting",
    icon: "uplaod",
    component: VendorTable,
    permission: "permission",
    permissionGroup: PermissionGroup.device.vendor,
  },
  {
    name: i18n.t("menu.devicesSetting"),
    to: "/devicesSetting",
    icon: "cluster",
    component: DevicesTable,
    permission: "permission",
    permissionGroup: PermissionGroup.device.information,
  },
  {
    name: i18n.t("menu.alarmsSetting"),
    to: "/alarmsSetting",
    icon: "warning",
    component: AlarmTable,
    permission: "permission",
    permissionGroup: PermissionGroup.device.alarm,
  },

  {
    name: i18n.t("menu.miscSetting"),
    to: "/miscSetting",
    icon: "SettingOutlined",
    component: SettingsForm,
    permission: "private",
  },
];
