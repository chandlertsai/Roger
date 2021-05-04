import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { ContentArea, Sidebar, Navbar } from "components/layout";
import { testRoutes } from "routers/testRoutes";
import { getPermissionRoutes } from "routers/permissionRoutes";
import { getPrivateRoutes } from "routers/privateRoutes";
import { useTranslation } from "react-i18next";
import {useSelector} from "react-redux";
import R, { includes, filter } from "ramda";
import axios from 'axios';
import useDeepCompareEffect from "use-deep-compare-effect";

const { Header, Content, Footer, Sider } = Layout;
const mainFrame = ({ showSidebar, toggleSidebar }) => {
  const { t } = useTranslation();
  const [newSubmenus, setNewSubmenus] = useState([]) 

  const auth = useSelector(R.propOr({},"auth"))
  const pKey = auth.pkey
  let ab
  let permission

  const read = (body) => {
    axios
      .get("/apis/v1/read/permission", {
        params: { key: body },
        headers: {Authorization: `Bearer ${auth.token}`}
      })
      .then((res) => {
        permission =  res.data 
	ab =  permission[0].abilities
	currentVisibilities(submenus)
      })
      .catch((err) => {
        console.log(err)
      });
  };
  

  useDeepCompareEffect(()=>{
    read(pKey)
  },[auth,permission,ab,newSubmenus])

  const currentVisibilities = (submenus) => {
    if(ab){
        ab.push("dashboard")
	ab =ab.map((v)=>"sidebar_"+v)
	//create specific menu `x` for current permission
	let x = R.filter((v)=>{
	let key = v.key
	return R.includes(key,ab)
	},submenus)
	setNewSubmenus(x)
	}
}

  const permissionRoutes = getPermissionRoutes();
  const privateRoutes = getPrivateRoutes();

  const dashboardMenuItems = filter((v) => {
    const key = v.to || "";
    return includes(key, ["/summary", "/device", "/message", "/alarm"]);
  }, privateRoutes);

  const reportMenuItems = filter((v) => {
    const key = v.to || "";
    return includes(key, ["/deviceSummary", "/deviceDetail", "/log"]);
  }, privateRoutes);

  const usersSettingMenuItems = filter((v) => {
    const key = v.to || "";
    return includes(key, ["/usersSetting", "/groupSetting"]);
  }, permissionRoutes);

  const devicesSettingMenuItems = filter((v) => {
    const key = v.to || "";
    return includes(key, ["/devicesSetting", "/vendorsSetting"]);
  }, permissionRoutes);

  const alarmsSettingMenuItems = filter((v) => {
    const key = v.to || "";
    return includes(key, ["/alarmsSetting"]);
  }, permissionRoutes);

  const miscSettingMenuItems = filter((v) => {
    const key = v.to || "";
    return includes(key, ["/vendorsSetting", "/miscSetting"]);
  }, permissionRoutes);

  const systemManagementItems = filter((v) => {
    const key = v.to || "";
    return includes(key, [
      "/uploadLicense",
      "/permissionSetting",
      "/miscSetting",
    ]);
  }, permissionRoutes);

  const licenseMenuItems = filter((v) => {
    const key = v.to || "";
    return includes(key, ["/license"]);
  }, privateRoutes);

  const submenus = [
    {
      name: t("menu.dashboard"),
      key: "sidebar_dashboard",
      items: dashboardMenuItems,
    },
    {
      name: t("menu.report"),
      key: "sidebar_report",
      items: reportMenuItems,
    },

    {
      name: t("menu.usersSetting"),
      key: "sidebar_userSetting",
      items: usersSettingMenuItems,
    },
    {
      name: t("menu.devicesSetting"),
      key: "sidebar_deviceSetting",
      items: devicesSettingMenuItems,
    },
    {
      name: t("menu.alarmsSetting"),
      key: "sidebar_alarmsSetting",
      items: alarmsSettingMenuItems,
    },

    {
      name: t("menu.systemManagement"),
      key: "sidebar_systemManagement",
      items: systemManagementItems,
    },
  ];

  return (
    <Layout sytel={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={false}
        styel={{ background: "blue" }}
      >
        <Sidebar submenus={newSubmenus} />
      </Sider>

      <Layout className="bg-light">
        <Navbar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />

        <Content style={{ margin: "0 16px" }}>
          <ContentArea />
        </Content>
      </Layout>
    </Layout>
  );
};

export default mainFrame;
