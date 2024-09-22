import { Layout } from "@/components/Layout";
import { useDistances } from "@/hooks/useDistances";

function App() {
  const { visibleDistances } = useDistances();
  return (
    <Layout>
      <ul>
        {visibleDistances.map((distance) => (
          <li key={distance.length}>{distance.label}</li>
        ))}
      </ul>
    </Layout>
  );
}

export default App;
