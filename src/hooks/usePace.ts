import { formatTime, fromPaceStringForDistance } from "@/lib/time";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const initialPaceString = "04:30";
const initialPace = fromPaceStringForDistance(1000)(initialPaceString);

const paceAtom = atomWithStorage("pace", initialPace);

export function usePace() {
  const [pace, setPace] = useAtom(paceAtom);

  const setPaceFromString = (paceString: string, distance: number) =>
    setPace(fromPaceStringForDistance(distance)(paceString));

  const getTimeForDistance = (distance: number, showMilliseconds = false) => {
    const time = pace * distance;
    return formatTime(time, showMilliseconds);
  };

  return { getTimeForDistance, setPaceFromString };
}
