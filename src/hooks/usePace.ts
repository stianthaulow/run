import { type ValidTimeString, formatTime, parseTime } from "@/lib/time";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const initialPaceString = "04:30" as ValidTimeString;
const km = 1000;
const initialPace = parseTime(initialPaceString) / km;

const paceAtom = atomWithStorage("pace", initialPace);

export function usePace() {
  const [pace, setPace] = useAtom(paceAtom);

  const setPaceFromString = (time: ValidTimeString, distance: number) =>
    setPace(parseTime(time) / distance);

  const getTimeForDistance = (distance: number, showMilliseconds = false) => {
    const time = pace * distance;
    return formatTime(time, showMilliseconds);
  };

  const stepPace = (
    direction: 1 | -1,
    time: ValidTimeString,
    distance: number,
    timeFactor: number,
    showMilliseconds: boolean,
  ) => {
    const newPace = (parseTime(time) + direction * timeFactor) / distance;
    if (newPace < 0) return time;
    setPace(newPace);
    return formatTime(newPace * distance, showMilliseconds);
  };

  return { getTimeForDistance, setPaceFromString, stepPace };
}
