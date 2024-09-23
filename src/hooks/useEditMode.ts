import { atom, useAtom } from "jotai";

const isEditModeAtom = atom(false);

export function useEditMode() {
  const [isEditMode, setIsEditMode] = useAtom(isEditModeAtom);

  const toggleEditMode = () => setIsEditMode((prev) => !prev);

  return { isEditMode, toggleEditMode };
}
