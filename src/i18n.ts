import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
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
        norwegianFlag: "Norwegian flag",
        englishFlag: "USA flag",
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
        norwegianFlag: "Norsk flagg",
        englishFlag: "USA flagg",
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
