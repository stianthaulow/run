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
      add: {
        distance: "Add distance",
        description:
          "Choose from the predefined distances or add a custom one.",
        distanceLabel: "Distance (in meters)",
        labelLabel: "Label",
        save: "Save",
        close: "Close",
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
      add: {
        distance: "Legg til distanse",
        description:
          "Velg fra de forhåndsdefinerte distansene eller legg til en egen.",
        distanceLabel: "Distanse (i meter)",
        labelLabel: "Tekst",
        save: "Lagre",
        close: "Lukk",
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
