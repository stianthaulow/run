import { usePace } from "@/hooks/usePace";
import { useTimeInputMode } from "@/hooks/useTimeInputMode";
import { useTranslation } from "react-i18next";
import { SpeedInput } from "./SpeedInput";

type SpeedControlProps = {
  unit: "kph" | "mph";
};

export function SpeedControl({ unit }: SpeedControlProps) {
  const { t } = useTranslation();
  const { kph, mph } = usePace();

  const { isTimeInputMode, tryStartTimeInputMode, stopTimeInputMode } =
    useTimeInputMode();

  return (
    <div className="flex items-baseline gap-1">
      {isTimeInputMode ? (
        <SpeedInput stopEditing={stopTimeInputMode} unit={unit} />
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
          {unit === "kph" ? kph : mph}
        </button>
      )}
      <span className="text-lg text-zinc-300">{t(unit)}</span>
    </div>
  );
}
