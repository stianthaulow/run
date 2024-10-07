import { InputButton } from "@/components/InputButton";
import { TimeInput } from "@/components/TimeInput";
import type { Distance } from "@/distances";
import { useInputMode } from "@/hooks/useInputMode";
import { usePace } from "@/hooks/usePace";

type TimeControlProps = {
  distance: Omit<Distance, "isDefault" | "isVisible">;
  className?: string;
};

export function TimeControl({ distance, ...rest }: TimeControlProps) {
  const { getTimeForDistance } = usePace();

  const { isInputMode, tryStartInputMode, stopInputMode } = useInputMode();

  const time = getTimeForDistance(distance.length, distance.showMilliseconds);
  return isInputMode ? (
    <TimeInput stopEditing={stopInputMode} distance={distance} {...rest} />
  ) : (
    <InputButton handleInputMode={tryStartInputMode} value={time} {...rest} />
  );
}
