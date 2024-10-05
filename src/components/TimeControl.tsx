import { TimeInput } from "@/components/TimeInput";
import type { Distance } from "@/distances";
import { useInputMode } from "@/hooks/useInputMode";
import { usePace } from "@/hooks/usePace";
import { InputButton } from "./InputButton";

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
    <InputButton handleInputMode={tryStartInputMode} value={time} />
  );
}
