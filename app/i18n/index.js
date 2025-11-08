import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import tr from "./tr.json";
import en from "./en.json";

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v3",
    lng: "tr",
    fallbackLng: "en",
    resources: {
      tr: { translation: tr },
      en: { translation: en },
    },
    interpolation: { escapeValue: false },
  });

i18n.on("languageChanged", (lng) => {
  AsyncStorage.setItem("language", lng);
});

(async () => {
  const savedLang = await AsyncStorage.getItem("language");
  if (savedLang && savedLang !== i18n.language) {
    i18n.changeLanguage(savedLang);
  }
})();

export default i18n;