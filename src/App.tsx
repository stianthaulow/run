import { DistanceList } from "@/components/DistanceList";
import { Layout } from "@/components/Layout";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { TimeControl } from "./components/TimeControl";

function App() {
  const { t } = useTranslation();
  return (
    <Layout>
      <h1>{t("pace")}</h1>
      <TimeControl
        distance={{
          length: 1000,
          label: t("minprkm"),
          showMilliseconds: false,
        }}
      />
      <Suspense fallback="loading...">
        {t("Distances")}
        <DistanceList />
      </Suspense>
    </Layout>
  );
}

export default App;
