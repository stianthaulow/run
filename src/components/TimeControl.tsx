import type { Distance } from "@/distances";
import { useCanEditDistance } from "@/hooks/useCanEditDistance";
import { usePace } from "@/hooks/usePace";
import { useCallback, useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { useClickOutside } from "@/hooks/useClickOutside";
import { isValidTime, timeFactorFromIndex } from "@/lib/time";

type TimeControlProps = {
  distance: Omit<Distance, "isDefault" | "isVisible">;
};
export function TimeControl({ distance }: TimeControlProps) {
  const { getTimeForDistance } = usePace();
  const { canEditDistance, toggleCanEditDistance } = useCanEditDistance();
  const [isEditing, setIsEditing] = useState(false);

  const tryStartEditing = useCallback(() => {
    if (canEditDistance) {
      setIsEditing(true);
      toggleCanEditDistance();
    }
  }, [canEditDistance, toggleCanEditDistance]);

  const stopEditing = useCallback(() => {
    setIsEditing(false);
    toggleCanEditDistance();
  }, [toggleCanEditDistance]);

  const time = getTimeForDistance(distance.length, distance.showMilliseconds);
  return (
    <div className="flex items-baseline gap-1">
      {isEditing ? (
        <TimeInput stopEditing={stopEditing} distance={distance} />
      ) : (
        <span
          className="pb-1 text-3xl"
          onClick={tryStartEditing}
          onKeyDown={tryStartEditing}
        >
          {time}
        </span>
      )}
      <span className="text-lg text-zinc-300">{distance.label}</span>
    </div>
  );
}

type TimeInputProps = {
  stopEditing: () => void;
  distance: Pick<Distance, "length" | "showMilliseconds">;
};

function TimeInput({ stopEditing, distance }: TimeInputProps) {
  const ref = useClickOutside<HTMLInputElement>(stopEditing);
  const { getTimeForDistance, stepPace, setPaceFromString } = usePace();
  const time = getTimeForDistance(distance.length, distance.showMilliseconds);
  const [value, setValue] = useState(time);

  const cursorPositionRef = useRef<number | null>(null);

  const handlePaceStep = useCallback(
    (direction: 1 | -1, cursorPosition: number) => {
      if (isValidTime(value)) {
        const timeFactor = timeFactorFromIndex(cursorPosition, value);
        const newTime = stepPace(
          direction,
          value,
          distance.length,
          timeFactor,
          distance.showMilliseconds,
        );
        setValue(newTime);
      }
    },
    [value, distance.length, distance.showMilliseconds, stepPace],
  );

  const handleArroKey = useCallback(
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
          handleArroKey(e, 1);
          break;
        }
        case "ArrowDown": {
          handleArroKey(e, -1);
          break;
        }
        default:
          break;
      }
    },
    [stopEditing, handleArroKey],
  );

  useEffect(() => {
    if (isValidTime(value)) {
      setPaceFromString(value, distance.length);
    }
  }, [value, distance.length, setPaceFromString]);

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
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleKeyDown}
      className="max-w-32 text-2xl"
    />
  );
}
