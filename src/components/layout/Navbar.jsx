// @flow
import React, { useEffect } from "react";
import { Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { auth, authLogin, lang } from "reducers/storeUtils";
import AvatorDropdown from "components/pureComponents/AvatorDropdown";
import LanguageDropdown from "components/pureComponents/LanguageDropdown";
import { logout } from "actions/auth";
import { setLanguage } from "actions/appState";
import type { ThunkAction } from "apis/types";
import { webVersion, useServerVersion } from "src/version";

type Props = {
  showSidebar: boolean,
  toggleSidebar: Function,
};

//  const _hasError = useSelector(errorState);
//  const text = useSelector(errorMessage);
//  const dispatch = useDispatch();
const Navbar = (props: Props) => {
  const { showSidebar, toggleSidebar } = props;
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  const doLogout = () => dispatch(logout());

  const authObj = useSelector(auth);
  const alreadyLogin = useSelector(authLogin);
  const currentLanguage = useSelector(lang);

  // useEffect(() => {
  //   i18n.changeLanguage(currentLanguage);
  // }, []);

  const handleLanguageChange = (lang) => {
    console.log("change language ", lang);
    i18n.changeLanguage(lang);
    //dispatch(setLanguage(lang));
  };
  const serverVersion = useServerVersion();
  return (
    <div className="navbar navbar-dark bg-dark">
      <Typography.Title
        className="navbar-brand"
        level={3}
        onClick={toggleSidebar}
        style={{ color: "white", flex: "1 0 200px", marginLeft: "0.5rem" }}
      >
        Eyesfree
      </Typography.Title>
      <AvatorDropdown
        alreadyLogin={alreadyLogin}
        username={authObj.username}
        doLogout={doLogout}
      />

      <LanguageDropdown lang={i18n.language} onChanged={handleLanguageChange} />

      <div className="navbar-text text-white mx-2">
        Web:{webVersion} | Server:{serverVersion}
      </div>
    </div>
  );
};

export default Navbar;
