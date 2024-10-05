import { TimeInput } from "@/components/TimeInput";
import type { Distance } from "@/distances";
import { useInputMode } from "@/hooks/useInputMode";
import { usePace } from "@/hooks/usePace";

type TimeControlProps = {
  distance: Omit<Distance, "isDefault" | "isVisible">;
};

export function TimeControl({ distance }: TimeControlProps) {
  const { getTimeForDistance } = usePace();

  const { isInputMode, tryStartInputMode, stopInputMode } = useInputMode();

  const time = getTimeForDistance(distance.length, distance.showMilliseconds);
  return isInputMode ? (
    <TimeInput stopEditing={stopInputMode} distance={distance} />
  ) : (
    <button
      type="button"
      className="rounded text-left text-2xl focus:outline-dotted focus:outline-2 focus:outline-zinc-500 focus:outline-offset-2"
      onClick={tryStartInputMode}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          tryStartInputMode();
        }
      }}
    >
      {time}
    </button>
  );
}
