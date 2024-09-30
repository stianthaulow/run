import { DistanceList } from "@/components/DistanceList";
import { Layout } from "@/components/Layout";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { SpeedControl } from "./components/SpeedControl";
import { TimeControl } from "./components/TimeControl";
import { useSettings } from "./hooks/useSettings";

function App() {
  const { t } = useTranslation();
  const { settings } = useSettings();

  return (
    <Layout>
      <div className="flex gap-4 pb-4">
        <div
          className={cn(
            "flex-1",
            settings.showSpeedFirst ? "order-2" : "order-1",
          )}
        >
          <h1>{t("pace")}</h1>
          <TimeControl
            distance={{
              length: 1000,
              label: t("minprkm"),
              showMilliseconds: false,
            }}
          />
          {settings.showMiles && (
            <TimeControl
              distance={{
                length: 1609.34,
                label: t("minprmile"),
                showMilliseconds: false,
              }}
            />
          )}
        </div>
        <div
          className={cn(
            "flex-1",
            settings.showSpeedFirst ? "order-1" : "order-2",
          )}
        >
          <h1>{t("speed")}</h1>
          <SpeedControl unit="kph" />
          {settings.showMiles && <SpeedControl unit="mph" />}
        </div>
      </div>
      {t("distances")}
      <DistanceList />
    </Layout>
  );
}

export default App;
