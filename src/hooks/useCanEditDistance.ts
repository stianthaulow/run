import { atom, useAtom } from "jotai";

const canEditDistanceAtom = atom(true);

export function useCanEditDistance() {
  const [canEditDistance, setCanEditDistance] = useAtom(canEditDistanceAtom);
  const toggleCanEditDistance = () => setCanEditDistance((prev) => !prev);
  return { canEditDistance, toggleCanEditDistance };
}
