import { DistanceList } from "@/components/DistanceList";
import { Layout } from "@/components/Layout";
import { useTranslation } from "react-i18next";
import { SpeedControl } from "./components/SpeedControl";
import { TimeControl } from "./components/TimeControl";

function App() {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="flex gap-4">
        <div>
          <h1>{t("pace")}</h1>
          <TimeControl
            distance={{
              length: 1000,
              label: t("minprkm"),
              showMilliseconds: false,
            }}
          />
          <TimeControl
            distance={{
              length: 1609.34,
              label: t("minprmile"),
              showMilliseconds: false,
            }}
          />
        </div>
        <div>
          <h1>{t("speed")}</h1>
          <SpeedControl unit="kph" />
          <SpeedControl unit="mph" />
        </div>
      </div>
      {t("distances")}
      <DistanceList />
    </Layout>
  );
}

export default App;
