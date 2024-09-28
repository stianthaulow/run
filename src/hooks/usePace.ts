import { type ValidTimeString, formatTime, parseTime } from "@/lib/time";
import { atom, useAtom, useAtomValue } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useCallback } from "react";

const initialPaceString = "04:30" as ValidTimeString;
const METERS_IN_KM = 1000;
const METERS_IN_MILE = 1609.34;
const SECONDS_IN_HOUR = 3600;

const initialPace = parseTime(initialPaceString) / METERS_IN_KM;

const paceAtom = atomWithStorage("pace", initialPace);

const kphAtom = atom((get) => {
  return (SECONDS_IN_HOUR / get(paceAtom)).toFixed(2);
});
const mphAtom = atom((get) => {
  return (
    SECONDS_IN_HOUR /
    ((get(paceAtom) * METERS_IN_MILE) / METERS_IN_KM)
  ).toFixed(2);
});

export function usePace() {
  const [pace, setPace] = useAtom(paceAtom);
  const kph = useAtomValue(kphAtom);
  const mph = useAtomValue(mphAtom);

  const setFromPaceString = useCallback(
    (time: ValidTimeString, distance: number) => {
      setPace(parseTime(time) / distance);
    },
    [setPace],
  );

  const getTimeForDistance = useCallback(
    (distance: number, showMilliseconds = false) => {
      const time = pace * distance;
      return formatTime(time, showMilliseconds);
    },
    [pace],
  );

  const stepPace = useCallback(
    (
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
    },
    [setPace],
  );

  const stepPaceUp = useCallback(() => setPace((prev) => prev + 1), [setPace]);
  const stepPaceDown = useCallback(
    () => setPace((prev) => Math.max(prev - 1, 0)),
    [setPace],
  );

  return {
    getTimeForDistance,
    setFromPaceString,
    stepPace,
    stepPaceUp,
    stepPaceDown,
    kph,
    mph,
  };
}
