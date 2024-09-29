import { Input } from "@/components/ui/input";
import { useClickOutside } from "@/hooks/useClickOutside";
import { usePace } from "@/hooks/usePace";
import {
  isValidSpeed,
  speedFactorFromIndex,
  validSpeedPattern,
} from "@/lib/time";
import {
  type WheelEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type SpeedInputProps = {
  stopEditing: () => void;
  unit: "kph" | "mph";
};

export function SpeedInput({ stopEditing, unit }: SpeedInputProps) {
  const ref = useClickOutside<HTMLInputElement>(stopEditing);
  const { kph, mph, stepSpeed, setFromSpeedString } = usePace();

  const [value, setValue] = useState(unit === "kph" ? kph : mph);

  const cursorPositionRef = useRef<number | null>(null);

  const handleSpeedStep = useCallback(
    (direction: 1 | -1, cursorPosition: number) => {
      if (isValidSpeed(value)) {
        const speedFactor = speedFactorFromIndex(cursorPosition, value);
        const newSpeed = stepSpeed(direction, value, speedFactor, unit);
        setValue(newSpeed);
      }
    },
    [value, unit, stepSpeed],
  );

  const handleWheel = (e: WheelEvent<HTMLInputElement>) => {
    const direction = e.deltaY > 0 ? -1 : 1;
    const selectionStart = e.currentTarget.selectionStart ?? 0;
    cursorPositionRef.current = selectionStart;
    handleSpeedStep(direction, selectionStart);
  };

  const handleArrowKey = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>, direction: -1 | 1) => {
      e.preventDefault();
      const selectionStart = e.currentTarget.selectionStart ?? 0;
      cursorPositionRef.current = selectionStart;
      handleSpeedStep(direction, selectionStart);
    },
    [handleSpeedStep],
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
    if (isValidSpeed(value)) {
      setFromSpeedString(value, unit);
    }
  }, [value, unit, setFromSpeedString]);

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
      id={`${unit}-input`}
      pattern={validSpeedPattern}
      aria-label="Speed Input"
      aria-invalid={!isValidSpeed(value)}
      onChange={(e) => {
        cursorPositionRef.current = null;
        setValue(e.target.value);
      }}
      onKeyDown={handleKeyDown}
      onWheel={handleWheel}
      className="max-w-32 text-2xl invalid:bg-red-800 "
    />
  );
}
