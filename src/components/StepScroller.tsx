import { Dispatch, SetStateAction } from "react";

let y = 0;

type StepScrollerProps = {
  secondsPrMeter: number;
  dispatchPace: Dispatch<SetStateAction<number>>;
};

export const StepScroller = ({
  secondsPrMeter,
  dispatchPace,
}: StepScrollerProps) => {
  return (
    <aside
      onTouchMove={(e) => {
        const currentY = e.touches[0].clientY;
        if (currentY < y) {
          dispatchPace(secondsPrMeter + 0.001);
        } else {
          dispatchPace(secondsPrMeter - 0.001);
        }
        y = currentY;
      }}
    >
      <span onClick={() => dispatchPace(secondsPrMeter + 0.001)}>+</span>
      <span onClick={() => dispatchPace(secondsPrMeter - 0.001)}>-</span>
    </aside>
  );
};
