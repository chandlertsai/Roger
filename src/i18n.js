import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "asset/i18n/en.json";
import tw from "asset/i18n/zh-TW.json";
const resources = {
  en: {
    translation: en
  },

  "zh-TW": {
    translation: tw
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    whitelist: ["en", "zh-TW"],
    lng: "en",
    fallbackLng: "en",
    //keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
