import { InputButton } from "@/components/InputButton";
import { SpeedInput } from "@/components/SpeedInput";
import { useInputMode } from "@/hooks/useInputMode";
import { usePace } from "@/hooks/usePace";

type SpeedControlProps = {
  unit: "kph" | "mph";
};

export function SpeedControl({ unit }: SpeedControlProps) {
  const { kph, mph } = usePace();

  const { isInputMode, tryStartInputMode, stopInputMode } = useInputMode();

  return isInputMode ? (
    <SpeedInput stopEditing={stopInputMode} unit={unit} />
  ) : (
    InputButton({
      handleInputMode: tryStartInputMode,
      value: unit === "kph" ? kph : mph,
    })
  );
}
