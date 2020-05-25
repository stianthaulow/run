import React from "react";
import { useGesture } from "react-use-gesture";

import chevron from "../chevron.svg";

import { incrementSeconds, decrementSeconds } from "../paceStep";

export default function Slider({ pace, setPace }) {
  const bind = useGesture(
    {
      onDrag: ({ direction }) => {
        const [, y] = direction;
        setPace(y === -1 ? incrementSeconds(pace) : decrementSeconds(pace));
      },
    },
    {
      drag: {
        axis: "y",
      },
    }
  );
  return (
    <div className="slider" {...bind()}>
      <div className="scroll-icon">
        <img src={chevron} alt="Increase" className="chevron increase" />
        <img src={chevron} alt="Decrease" className="chevron decrease" />
      </div>
    </div>
  );
}
