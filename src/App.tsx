import type { Distance } from "./components/PaceInput";
import { PaceInput } from "./components/PaceInput";
import { useState } from "react";
import { parseTime } from "./util/time";
import { SpeedInput } from "./components/SpeedInput";
import "./App.css";

const distances: Distance[] = [
  {
    id: "1km",
    distanceInMeters: 1000,
    label: "min/km",
  },
  {
    id: "1.5km",
    distanceInMeters: 1500,
    label: "1500m",
  },
  {
    id: "1mile",
    distanceInMeters: 1609.34,
    label: "min/mile",
  },
  {
    id: "3km",
    distanceInMeters: 3000,
    label: "3000m",
  },
  {
    id: "5km",
    distanceInMeters: 5000,
    label: "5000m",
  },
  {
    id: "10km",
    distanceInMeters: 10_000,
    label: "10000m",
  },
  {
    id: "20km",
    distanceInMeters: 20_000,
    label: "20k",
  },
  {
    id: "halvmarathon",
    distanceInMeters: 21_097,
    label: "Halvmarathon",
  },
  {
    id: "30km",
    distanceInMeters: 30_000,
    label: "30k",
  },
  {
    id: "marathon",
    distanceInMeters: 42_195,
    label: "Marathon",
  },
  {
    id: "50km",
    distanceInMeters: 50_000,
    label: "50k",
  },
  {
    id: "100km",
    distanceInMeters: 100_000,
    label: "100k",
  },
];

const speeds = [
  {
    id: "kph",
    factor: 3.6,
    label: "kph",
  },
  {
    id: "mph",
    factor: 2.237,
    label: "mph",
  },
];

const startPace = "05:20";

const initialSecondsPrMeter = parseTime(startPace) / 1000;

function App() {
  const [secondsPrMeter, setSecondsPrMeter] = useState(initialSecondsPrMeter);
  return (
    <div className="App">
      <h2>Pace:</h2>
      {distances.map((distance) => (
        <PaceInput
          key={distance.id}
          {...distance}
          paceInSeconds={secondsPrMeter}
          dispatchTime={setSecondsPrMeter}
        />
      ))}
      <h2>Speed:</h2>
      {speeds.map((speed) => (
        <SpeedInput
          key={speed.id}
          {...speed}
          paceInSeconds={secondsPrMeter}
          dispatchTime={setSecondsPrMeter}
        />
      ))}
    </div>
  );
}

export default App;
