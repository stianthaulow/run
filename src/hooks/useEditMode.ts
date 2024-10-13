import { atom, useAtom } from "jotai";

const isEditModeAtom = atom(false);

export const editModeTransition = { duration: 0.3, ease: "easeInOut" };

export function useEditMode() {
  const [isEditMode, setIsEditMode] = useAtom(isEditModeAtom);

  const toggleEditMode = () => setIsEditMode((prev) => !prev);

  const exitEditMode = () => setIsEditMode(false);

  return { isEditMode, toggleEditMode, exitEditMode };
}
