import { useDistances } from "@/hooks/useDistances";
import { useTranslation } from "react-i18next";

function App() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const { visibleDistances } = useDistances();
  return (
    <>
      <ul>
        {visibleDistances.map((distance) => (
          <li key={distance.length}>{distance.label}</li>
        ))}
      </ul>
      <button type="button" onClick={() => changeLanguage("en")}>
        English
      </button>
      <button type="button" onClick={() => changeLanguage("no")}>
        Norsk
      </button>
    </>
  );
}

export default App;
