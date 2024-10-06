import {
  type ValidSpeedString,
  type ValidTimeString,
  formatTime,
  parseTime,
} from "@/lib/time";
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

  const setFromSpeedString = useCallback(
    (speedString: ValidSpeedString, unit: "kph" | "mph") => {
      const factor = unit === "mph" ? METERS_IN_KM / METERS_IN_MILE : 1;
      const speed = Number(speedString);
      if (speed < 0) return;
      setPace((1 / Number(speed)) * SECONDS_IN_HOUR * factor);
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

  const stepPaceFromString = useCallback(
    (
      direction: 1 | -1,
      time: ValidTimeString,
      distance: number,
      timeFactor: number,
      showMilliseconds: boolean,
    ) => {
      const newPace = (parseTime(time) + direction * timeFactor) / distance;
      if (newPace <= 0) return time;
      setPace(newPace);
      return formatTime(newPace * distance, showMilliseconds);
    },
    [setPace],
  );

  const stepSpeedFromString = useCallback(
    (
      direction: 1 | -1,
      speed: ValidSpeedString,
      speedFactor: number,
      unit: "kph" | "mph",
    ) => {
      const newSpeed =
        Math.round((Number(speed) + direction * speedFactor) * 100) / 100;
      const conversionFactor =
        unit === "mph" ? METERS_IN_KM / METERS_IN_MILE : 1;
      if (newSpeed <= 0) return speed;
      setPace((1 / Number(newSpeed)) * SECONDS_IN_HOUR * conversionFactor);
      return newSpeed.toFixed(2);
    },
    [setPace],
  );

  const stepPace = useCallback(
    (amount = 1) => setPace((prev) => Math.max(prev - amount, 0)),
    [setPace],
  );

  return {
    getTimeForDistance,
    setFromPaceString,
    setFromSpeedString,
    stepPaceFromString,
    stepSpeedFromString,
    stepPace,
    kph,
    mph,
  };
}
