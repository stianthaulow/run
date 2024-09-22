import { useDistances } from "@/hooks/useDistances";

function App() {
  const { visibleDistances } = useDistances();
  return (
    <>
      <ul>
        {visibleDistances.map((distance) => (
          <li key={distance.length}>{distance.label}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
