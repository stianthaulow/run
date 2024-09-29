import { TimeInput } from "@/components/TimeInput";
import type { Distance } from "@/distances";
import { usePace } from "@/hooks/usePace";
import { useTimeInputMode } from "@/hooks/useTimeInputMode";

type TimeControlProps = {
  distance: Omit<Distance, "isDefault" | "isVisible">;
};

export function TimeControl({ distance }: TimeControlProps) {
  const { getTimeForDistance } = usePace();

  const { isTimeInputMode, tryStartTimeInputMode, stopTimeInputMode } =
    useTimeInputMode();

  const time = getTimeForDistance(distance.length, distance.showMilliseconds);
  return (
    <div className="flex items-baseline gap-1">
      {isTimeInputMode ? (
        <TimeInput stopEditing={stopTimeInputMode} distance={distance} />
      ) : (
        <button
          type="button"
          className="rounded pb-1 text-2xl focus:outline-dotted focus:outline-2 focus:outline-zinc-500 focus:outline-offset-2"
          onClick={tryStartTimeInputMode}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              tryStartTimeInputMode();
            }
          }}
        >
          {time}
        </button>
      )}
      <span className="text-lg text-zinc-300">{distance.label}</span>
    </div>
  );
}
