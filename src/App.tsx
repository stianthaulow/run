import { PaceInput } from "./components/PaceInput";
import { useEffect, useState } from "react";
import {
  isValidSpeed,
  isValidTime,
  parsePace,
  validSpeedPattern,
  validTimePattern,
} from "./util/time";
import "./App.css";
import {
  paceDisplayValueForDistance,
  paceFromDisplayValueForDistance,
  paceFromDisplayValueForSpeed,
  speedDisplayValueForFactor,
  stepPaceForDistance,
  stepSpeedForFactor,
} from "./util/format";
import { StepScroller } from "./components/StepScroller";

const startPace = "05:20";

const distances = [
  {
    id: "100m",
    distanceInMeters: 100,
    label: "100m",
  },
  {
    id: "400m",
    distanceInMeters: 400,
    label: "400m",
  },
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

const initialSecondsPrMeter = parsePace(startPace) / 1000;

function App() {
  const [secondsPrMeter, setSecondsPrMeter] = useState(initialSecondsPrMeter);

  const handleKeyDown = (e: KeyboardEvent) => {
    const elem = e.target as HTMLElement;
    if (e.key === "ArrowUp" && elem.tagName === "BODY")
      setSecondsPrMeter((currentPace) => currentPace + 0.001);

    if (e.key === "ArrowDown" && elem.tagName === "BODY")
      setSecondsPrMeter((currentPace) => currentPace - 0.001);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <h2>Pace:</h2>
      <section>
        {distances.map(({ id, distanceInMeters, label }) => (
          <PaceInput
            key={id}
            id={id}
            label={label}
            pattern={validTimePattern}
            getDisplayValue={paceDisplayValueForDistance(distanceInMeters)}
            getPaceValue={paceFromDisplayValueForDistance(distanceInMeters)}
            step={stepPaceForDistance(distanceInMeters)}
            isValid={isValidTime}
            paceInSeconds={secondsPrMeter}
            dispatchPace={setSecondsPrMeter}
          />
        ))}
      </section>
      <h2>Speed:</h2>
      <section>
        {speeds.map(({ id, factor, label }) => (
          <PaceInput
            key={id}
            id={id}
            label={label}
            pattern={validSpeedPattern}
            getDisplayValue={speedDisplayValueForFactor(factor)}
            getPaceValue={paceFromDisplayValueForSpeed(factor)}
            step={stepSpeedForFactor(factor)}
            isValid={isValidSpeed}
            paceInSeconds={secondsPrMeter}
            dispatchPace={setSecondsPrMeter}
          />
        ))}
      </section>
      <StepScroller
        secondsPrMeter={secondsPrMeter}
        dispatchPace={setSecondsPrMeter}
      />
    </>
  );
}

export default App;
