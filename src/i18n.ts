import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { z } from "zod";
import { zodI18nMap } from "zod-i18n-map";
import enZodTranslation from "zod-i18n-map/locales/en/zod.json";
import nbZodTranslation from "zod-i18n-map/locales/nb/zod.json";

const noTranslation = {
  pace: "Pace",
  speed: "Hastighet",
  distances: "Distanser",
  kph: "km/t",
  mph: "mph",
  minprkm: "min/km",
  minprmile: "min/mile",
  marathon: "Maraton",
  halfMarathon: "Halvmaraton",
  language: {
    change: "Endre språk",
    english: "Engelsk",
    norwegian: "Norsk",
    norwegianFlag: "Norsk flagg",
    englishFlag: "USA flagg",
  },
  edit: {
    showMs: "Vis ms?",
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
    distanceExists: "Distansen eksisterer allerede",
  },
  settings: {
    title: "Innstillinger",
    description: "Endre innstillinger",
    showSpeedFirst: "Vis hastighet først",
    showMiles: "Vis minutter pr mile og mph",
    showSplits: "Vis splittider",
    save: "Lagre",
    close: "Lukk",
  },
  help: {
    title: "Hjelp",
    howToUse: "Hvordan bruke?",
    instructionsMobile:
      "For å justere pace eller hastighet kan du enten klikke på et av feltene for å redigere, dra fingeren opp og ned langs slideren på høyre side, eller bruke + og - knappene.",
    howToEdit:
      "Klikk på blyanten nede til høyre for å slette eller legge til distanser. Da finner du også et tannhjul du kan klikke på for å endre instillinger",
    splits:
      "Hvis splittider er slått på i instillinger så kan du klikke på stoppeklokkeikonet ved hver distanse for å se splittider for den distansen.",
  },
  splits: {
    title: "Splittider",
    totalDistance: "Total distanse",
    distance: "Distanse",
    time: "Tid",
    avgPace: "Snittpace",
    avgSpeed: "Snitthastighet",
  },
};

const enTranslation: typeof noTranslation = {
  pace: "Pace",
  speed: "Speed",
  distances: "Distances",
  minprkm: "min/km",
  minprmile: "min/mile",
  kph: "kph",
  mph: "mph",
  marathon: "Marathon",
  halfMarathon: "Half Marathon",
  language: {
    change: "Change language",
    english: "English",
    norwegian: "Norwegian",
    norwegianFlag: "Norwegian flag",
    englishFlag: "USA flag",
  },
  edit: {
    showMs: "Show ms?",
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
    distanceExists: "Distance already exists",
  },
  settings: {
    title: "Settings",
    description: "Change settings",
    showSpeedFirst: "Show speed first",
    showMiles: "Show minutes pr mile and mph",
    showSplits: "Show splits",
    save: "Save",
    close: "Close",
  },
  help: {
    title: "Help",
    howToUse: "How to use?",
    instructionsMobile:
      "To adjust the pace or speed, you can either tap one of the fields to edit, touch and drag your finger up or down on the slider to the right, or use the + and - buttons",
    howToEdit:
      "Tap the pencil in the bottom right to add or remove distances. Then you will also find a gear icon that you can tap to change settings.",
    splits:
      "If split times is emabled in settings, you can tap the stopwatch icon next to each distance to view split times for that distance.",
  },
  splits: {
    title: "Split times",
    totalDistance: "Total distance",
    distance: "Distance",
    time: "Time",
    avgPace: "Average pace",
    avgSpeed: "Average speed",
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
