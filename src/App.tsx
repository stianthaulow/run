import { DistanceList } from "@/components/DistanceList";
import { Layout } from "@/components/Layout";
import { usePace } from "@/hooks/usePace";
import { useTranslation } from "react-i18next";
import { TimeControl } from "./components/TimeControl";

function App() {
  const { t } = useTranslation();
  const { kph, mph } = usePace();
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
        </div>
        <div>
          <h1>{t("speed")}</h1>
          <div>{kph}</div>
          <div>{mph}</div>
        </div>
      </div>
      {t("distances")}
      <DistanceList />
    </Layout>
  );
}

export default App;
