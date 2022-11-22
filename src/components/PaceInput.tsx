import type {
  Dispatch,
  SetStateAction,
  KeyboardEvent,
  WheelEvent,
} from "react";
import { useEffect, useState, useRef } from "react";

import {
  convertPaceToTime,
  convertTimeToPace,
  formatTime,
  isValidTime,
  parseTime,
  validTimePattern,
} from "../util/time";
import { activeTimeFactorFromCursor } from "../util/cursor";
import useIsomorphicLayoutEffect from "../hooks/useIsomorphicLayoutEffect";
import usePreventScroll from "../hooks/usePreventScroll";
import useDebounce from "../hooks/useDebounce";

export type Distance = {
  id: string;
  distanceInMeters: number;
  label: string;
};

type PaceInputProps = Distance & {
  paceInSeconds: number;
  dispatchTime: Dispatch<SetStateAction<number>>;
};
const getDisplayValue = (time: number, distance: number) =>
  formatTime(convertTimeToPace(time, distance));

const getConvertedPace = (input: string, distance: number) =>
  convertPaceToTime(parseTime(input), distance);

export const PaceInput = ({
  id,
  distanceInMeters,
  label,
  paceInSeconds,
  dispatchTime,
}: PaceInputProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const formatedPace = getDisplayValue(paceInSeconds, distanceInMeters);
  const [value, setValue] = useState(formatedPace);
  const debouncedValue = useDebounce(value, 1000);
  const [isSource, setIsSource] = useState(false);
  const [cursorPosition, setCursorPosition] = useState<number | null>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      step(e.currentTarget, e.key === "ArrowDown" ? "down" : "up");
    }
  };

  const handleWheel = (e: WheelEvent<HTMLInputElement>) => {
    step(e.currentTarget, e.deltaY > 0 ? "down" : "up");
  };

  const step = (elem: HTMLInputElement, direction: "up" | "down") => {
    // if (!isValidTime(elem.value)) return;
    let timeFactor = activeTimeFactorFromCursor(elem);
    if (direction === "down") {
      timeFactor = -timeFactor;
    }
    const newTime = parseTime(elem.value) + timeFactor;
    setCursorPosition(elem.selectionStart);
    dispatchTime(getConvertedPace(formatTime(newTime), distanceInMeters));
  };

  // Dispatch pace updates
  useEffect(() => {
    if (!isValidTime(debouncedValue)) return;
    if (isSource) {
      dispatchTime(getConvertedPace(debouncedValue, distanceInMeters));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue, distanceInMeters, dispatchTime]);

  // React to pace updates
  useEffect(() => {
    const newDisplayValue = getDisplayValue(paceInSeconds, distanceInMeters);
    if (newDisplayValue !== value && !isSource) {
      setValue(newDisplayValue);
    }
    setIsSource(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [distanceInMeters, paceInSeconds]);

  // Reset cursor position on stepping
  useIsomorphicLayoutEffect(() => {
    if (cursorPosition && ref.current) {
      ref.current.setSelectionRange(cursorPosition, cursorPosition);
    }
  }, [value]);

  usePreventScroll(ref);

  return (
    <fieldset>
      <input
        ref={ref}
        type="text"
        size={5}
        name={id}
        value={value}
        pattern={validTimePattern}
        onKeyDown={handleKeyDown}
        onWheel={handleWheel}
        onChange={(e) => {
          setCursorPosition(null);
          setIsSource(true);
          setValue(e.target.value);
        }}
      />
      <label htmlFor={id}>{label}</label>
    </fieldset>
  );
};
