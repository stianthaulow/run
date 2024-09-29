import { useEditMode } from "@/hooks/useEditMode";
import { useCallback, useMemo, useState } from "react";

export function useInputMode() {
  const [isInputMode, setIsInputMode] = useState(false);
  const { isEditMode } = useEditMode();

  const isEditable = !isInputMode;

  const tryStartInputMode = useCallback(() => {
    if (isEditable && !isEditMode) {
      setIsInputMode(true);
    }
  }, [isEditable, isEditMode]);

  const stopInputMode = useCallback(() => {
    setIsInputMode(false);
  }, []);

  return useMemo(
    () => ({
      isInputMode,
      isEditable,
      tryStartInputMode,
      stopInputMode,
    }),
    [isInputMode, isEditable, tryStartInputMode, stopInputMode],
  );
}
