import React, { useState } from "react";

import PaceInput from "./PaceInput";

import "./App.css";

const distances = [
  {
    key: "1km",
    factor: 1,
    label: "min/km",
  },
  {
    key: "1.5km",
    factor: 1.5,
    label: "1500m",
  },
  {
    key: "1mile",
    factor: 1.60934,
    label: "min/mile",
  },
  { key: "3km", factor: 3, label: "3k" },
  { key: "5k", factor: 5, label: "5k" },
  { key: "10k", factor: 10, label: "10k" },
  { key: "15k", factor: 15, label: "15k" },
  { key: "20k", factor: 15, label: "20k" },
  { key: "halvmarathon", factor: 21.0975, label: "halvmarathon" },
  { key: "30k", factor: 30, label: "30k" },
  { key: "marathon", factor: 42.195, label: "marathon" },
];

function App() {
  const [pace, setPace] = useState({
    hours: 0,
    minuttes: 4,
    seconds: 59,
  });
  return (
    <main>
      {distances.map((distance) => (
        <PaceInput {...distance} pace={pace} setPace={setPace} />
      ))}
    </main>
  );
}

export default App;
