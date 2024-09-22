import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { l } from "node_modules/vite/dist/node/types.d-aGj9QkWt";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      pace: "Pace",
      kph: "kph",
      marathon: "Marathon",
      halfMarathon: "Half Marathon",
      language: {
        change: "Change language",
        english: "English",
        norwegian: "Norwegian",
      },
    },
  },
  no: {
    translation: {
      pace: "Pace",
      kph: "km/t",
      marathon: "Maraton",
      halfMarathon: "Halvmaraton",
      language: {
        change: "Endre språk",
        english: "Engelsk",
        norwegian: "Norsk",
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
