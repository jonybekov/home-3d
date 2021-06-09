import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import resources from "./resources";

const options = {
  order: ["localStorage", "navigator"],
  caches: ["localStorage"]
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // we init with resources
    resources,
    fallbackLng: "ru",
    debug: true,
    detection: options,

    // have a common namespace used around the full app
    ns: ["general"],
    defaultNS: "general",

    keySeparator: false, // we use content as keys

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
