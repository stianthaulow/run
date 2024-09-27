import { useEditMode } from "@/hooks/useEditMode";
import { useCallback, useMemo, useState } from "react";

export function useTimeInputMode() {
  const [isTimeInputMode, setIsTimeInputMode] = useState(false);
  const { isEditMode } = useEditMode();

  const isDistanceEditable = !isTimeInputMode;

  const tryStartTimeInputMode = useCallback(() => {
    if (isDistanceEditable && !isEditMode) {
      setIsTimeInputMode(true);
    }
  }, [isDistanceEditable, isEditMode]);

  const stopTimeInputMode = useCallback(() => {
    setIsTimeInputMode(false);
  }, []);

  return useMemo(
    () => ({
      isTimeInputMode,
      isDistanceEditable,
      tryStartTimeInputMode,
      stopTimeInputMode,
    }),
    [
      isTimeInputMode,
      isDistanceEditable,
      tryStartTimeInputMode,
      stopTimeInputMode,
    ],
  );
}
