import type {
  Dispatch,
  SetStateAction,
  KeyboardEvent,
  WheelEvent,
} from "react";
import { useEffect, useState, useRef } from "react";

import useIsomorphicLayoutEffect from "../hooks/useIsomorphicLayoutEffect";
import usePreventScroll from "../hooks/usePreventScroll";
import useDebounce from "../hooks/useDebounce";

type PaceInputProps = {
  id: string;
  label: string;
  paceInSeconds: number;
  pattern: string;
  getDisplayValue: (time: number) => string;
  getPaceValue: (value: string) => number;
  isValid: (value: string) => Boolean;
  step: (direction: "up" | "down", elem: HTMLInputElement) => number;
  dispatchPace: Dispatch<SetStateAction<number>>;
};

export const PaceInput = ({
  id,
  label,
  pattern,
  getDisplayValue,
  getPaceValue,
  step,
  isValid,
  paceInSeconds,
  dispatchPace,
}: PaceInputProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(getDisplayValue(paceInSeconds));
  const debouncedValue = useDebounce(value, 1000);
  const [isSource, setIsSource] = useState(false);
  const [cursorPosition, setCursorPosition] = useState<number | null>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      stepInput(e.currentTarget, e.key === "ArrowDown" ? "down" : "up");
    }
  };

  const handleWheel = (e: WheelEvent<HTMLInputElement>) => {
    stepInput(e.currentTarget, e.deltaY > 0 ? "down" : "up");
  };

  const stepInput = (elem: HTMLInputElement, direction: "up" | "down") => {
    setCursorPosition(elem.selectionStart);
    const newTime = step(direction, elem);
    dispatchPace(newTime);
  };

  // Dispatch pace updates
  useEffect(() => {
    if (!isValid(debouncedValue)) return;
    if (isSource) {
      dispatchPace(getPaceValue(debouncedValue));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue, dispatchPace]);

  // React to pace updates
  useEffect(() => {
    const newDisplayValue = getDisplayValue(paceInSeconds);
    if (newDisplayValue !== value && !isSource) {
      setValue(newDisplayValue);
    }
    setIsSource(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paceInSeconds]);

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
        pattern={pattern}
        onKeyDown={handleKeyDown}
        onWheel={handleWheel}
        onFocus={(e) =>
          e.currentTarget.setSelectionRange(value.length, value.length)
        }
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
