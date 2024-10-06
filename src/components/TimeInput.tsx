import { Input } from "@/components/ui/input";
import type { Distance } from "@/distances";
import { useClickOutside } from "@/hooks/useClickOutside";
import { usePace } from "@/hooks/usePace";
import { isValidTime, timeFactorFromIndex, validTimePattern } from "@/lib/time";
import {
  type WheelEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type TimeInputProps = {
  stopEditing: () => void;
  distance: Pick<Distance, "length" | "showMilliseconds">;
};

export function TimeInput({ stopEditing, distance }: TimeInputProps) {
  const ref = useClickOutside<HTMLInputElement>(stopEditing);
  const { getTimeForDistance, stepPaceFromString, setFromPaceString } =
    usePace();
  const time = getTimeForDistance(distance.length, distance.showMilliseconds);
  const [value, setValue] = useState(time);

  const cursorPositionRef = useRef<number | null>(null);

  const handlePaceStep = useCallback(
    (direction: 1 | -1, cursorPosition: number) => {
      if (isValidTime(value)) {
        const timeFactor = timeFactorFromIndex(cursorPosition, value);
        const newTime = stepPaceFromString(
          direction,
          value,
          distance.length,
          timeFactor,
          distance.showMilliseconds,
        );
        setValue(newTime);
      }
    },
    [value, distance.length, distance.showMilliseconds, stepPaceFromString],
  );

  const handleWheel = (e: WheelEvent<HTMLInputElement>) => {
    const direction = e.deltaY > 0 ? -1 : 1;
    const selectionStart = e.currentTarget.selectionStart ?? 0;
    cursorPositionRef.current = selectionStart;
    handlePaceStep(direction, selectionStart);
  };

  const handleArrowKey = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>, direction: -1 | 1) => {
      e.preventDefault();
      const selectionStart = e.currentTarget.selectionStart ?? 0;
      cursorPositionRef.current = selectionStart;
      handlePaceStep(direction, selectionStart);
    },
    [handlePaceStep],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case "Escape":
        case "Enter":
        case "Tab":
          stopEditing();
          break;
        case "ArrowUp": {
          handleArrowKey(e, 1);
          break;
        }
        case "ArrowDown": {
          handleArrowKey(e, -1);
          break;
        }
        default:
          break;
      }
    },
    [stopEditing, handleArrowKey],
  );

  // Update pace when value changes
  useEffect(() => {
    if (isValidTime(value)) {
      setFromPaceString(value, distance.length);
    }
  }, [value, distance.length, setFromPaceString]);

  // Restore cursor position when value changes
  useEffect(() => {
    if (value !== null && cursorPositionRef.current !== null && ref.current) {
      ref.current.setSelectionRange(
        cursorPositionRef.current,
        cursorPositionRef.current,
      );
    }
  }, [value, ref]);

  return (
    <Input
      ref={ref}
      autoFocus
      type="text"
      value={value}
      id={distance.length.toString()}
      pattern={validTimePattern}
      aria-label="Time Input"
      aria-invalid={!isValidTime(value)}
      onChange={(e) => {
        cursorPositionRef.current = null;
        setValue(e.target.value);
      }}
      onKeyDown={handleKeyDown}
      onWheel={handleWheel}
      className="w-auto min-w-10 max-w-32 p-0 px-1 text-2xl invalid:bg-red-800"
      style={{ width: `${value.length + 1}ch` }}
    />
  );
}
