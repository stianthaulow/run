import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { z } from "zod";
import { zodI18nMap } from "zod-i18n-map";
import enZodTranslation from "zod-i18n-map/locales/en/zod.json";
import nbZodTranslation from "zod-i18n-map/locales/nb/zod.json";

const noTranslation = {
  pace: "Pace",
  distances: "Distanser",
  kph: "km/t",
  minprkm: "min/km",
  marathon: "Maraton",
  halfMarathon: "Halvmaraton",
  language: {
    change: "Endre språk",
    english: "Engelsk",
    norwegian: "Norsk",
    norwegianFlag: "Norsk flagg",
    englishFlag: "USA flagg",
  },
  addDistance: {
    title: "Legg til distanse",
    descriptionWithDefaults:
      "Velg fra de forhåndsdefinerte distansene eller legg til en egen.",
    descriptionWithoutDefaults: "Legg til en egen distanse.",
    distanceFormLabel: "Distanse (i meter)",
    labelFormLabel: "Tekst",
    showMillisecondsLabel: "Vis millisekunder",
    save: "Lagre",
    close: "Lukk",
  },
};

const enTranslation: typeof noTranslation = {
  pace: "Pace",
  distances: "Distances",
  minprkm: "min/km",
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
  addDistance: {
    title: "Add distance",
    descriptionWithDefaults:
      "Choose from the predefined distances or add a custom one.",
    descriptionWithoutDefaults: "Add a custom distance.",
    distanceFormLabel: "Distance (in meters)",
    labelFormLabel: "Label",
    showMillisecondsLabel: "Show milliseconds",
    save: "Save",
    close: "Close",
  },
};

const resources = {
  en: {
    translation: enTranslation,
    zod: enZodTranslation,
  },
  no: {
    translation: noTranslation,
    zod: nbZodTranslation,
  },
  nb: {
    translation: noTranslation,
    zod: nbZodTranslation,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "no",
    interpolation: {
      escapeValue: false,
    },
  });

z.setErrorMap(zodI18nMap);

export { z };

export default i18n;
