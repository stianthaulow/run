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
    <button
      type="button"
      className="rounded pb-1 text-2xl focus:outline-dotted focus:outline-2 focus:outline-zinc-500 focus:outline-offset-2"
      onClick={tryStartInputMode}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          tryStartInputMode();
        }
      }}
    >
      {unit === "kph" ? kph : mph}
    </button>
  );
}
