import PWABadge from "@/PWABadge.tsx";
import { DistanceList } from "@/components/DistanceList";
import { Layout } from "@/components/Layout";
import { SpeedControl } from "@/components/SpeedControl";
import { TimeControl } from "@/components/TimeControl";
import { Label } from "@/components/ui/label";
import { useSettings } from "@/hooks/useSettings";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();
  const { settings } = useSettings();

  return (
    <>
      <Layout>
        <div className="flex gap-4 pb-4">
          <div
            className={cn(
              "flex-1",
              settings.showSpeedFirst ? "order-2" : "order-1",
            )}
          >
            <h1>{t("pace")}</h1>
            <div className="flex items-baseline">
              <TimeControl
                distance={{
                  length: 1000,
                  label: t("minprkm"),
                  showMilliseconds: false,
                }}
              />
              <Label className="pl-1 text-lg text-zinc-300">
                {t("minprkm")}
              </Label>
            </div>
            {settings.showMiles && (
              <div className="flex items-baseline">
                <TimeControl
                  distance={{
                    length: 1609.34,
                    label: t("minprmile"),
                    showMilliseconds: false,
                  }}
                />
                <Label className="pl-1 text-lg text-zinc-300">
                  {t("minprmile")}
                </Label>
              </div>
            )}
          </div>
          <div
            className={cn(
              "flex-1",
              settings.showSpeedFirst ? "order-1" : "order-2",
            )}
          >
            <h1>{t("speed")}</h1>
            <div className="flex items-baseline">
              <SpeedControl unit="kph" />
              <Label className="pl-1 text-lg text-zinc-300">{t("kph")}</Label>
            </div>
            {settings.showMiles && (
              <div className="flex items-baseline">
                <SpeedControl unit="mph" />
                <Label className="pl-1 text-lg text-zinc-300">{t("mph")}</Label>
              </div>
            )}
          </div>
        </div>
        {t("distances")}
        <DistanceList />
      </Layout>
      <PWABadge />
    </>
  );
}

export default App;
