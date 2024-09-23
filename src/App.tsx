import { DistanceList } from "@/components/DistanceList";
import { Layout } from "@/components/Layout";
import { Suspense } from "react";

function App() {
  return (
    <Layout>
      <Suspense fallback="loading...">
        <DistanceList />
      </Suspense>
    </Layout>
  );
}

export default App;
