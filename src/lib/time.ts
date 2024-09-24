import { paceTimeFactorFromCursor } from "./cursor";

export function parseTimeStringToMillieconds(timeString: string): number {
  if (timeString.includes(".")) {
    const [rest, msStr] = timeString.split(".");
    const msPart = Number(msStr.trim());
    return parseTimeStringWithoutMillisecondsToSeconds(rest) * 1000 + msPart;
  }

  return parseTimeStringWithoutMillisecondsToSeconds(timeString) * 1000;
}

export function parseTimeStringWithoutMillisecondsToSeconds(
  timeString: string,
): number {
  const components = timeString.split(":").map(Number);

  if (components.length === 1) {
    return components[0] || 0;
  }

  if (components.length === 2) {
    const [minuttes = 0, seconds = 0] = components;
    return minuttes * 60 + seconds;
  }

  const [hours = 0, minuttes = 0, seconds = 0] = components;
  return hours * 60 * 60 + minuttes * 60 + seconds;
}

export const validSpeedPattern = "^(?:[0-9]?[0-9]?[0-9].)?(?:[0-9]?[0-9])$";
export const validTimePattern =
  "^(([0-1]?\\d|2[0-3]):[0-5]\\d(:[0-5]\\d)?(\\.\\d{1,3})?|[0-5]?\\d\\.\\d{1,3}|[0-9])$";

const validSpeedRegExp = new RegExp(validSpeedPattern);
const validTimeRegExp = new RegExp(validTimePattern);

export const isValidSpeed = (input: string) => validSpeedRegExp.test(input);
export const isValidTime = (input: string) => validTimeRegExp.test(input);

const pad0 = (timeComponent: number, length = 2) =>
  timeComponent.toFixed(0).padStart(length, "0");

export function formatTime(milliseconds: number, includeMilliseconds = false) {
  let totalSeconds = Math.floor(milliseconds / 1000);
  let remainingMilliseconds = milliseconds % 1000;

  // Round up if remainingMilliseconds is more than 500 and includeMilliseconds is false
  if (!includeMilliseconds && remainingMilliseconds >= 500) {
    totalSeconds += 1;
    remainingMilliseconds = 0; // Reset to 0 as it has been rounded up
  }

  if (totalSeconds === 0) {
    return includeMilliseconds ? `0.${pad0(remainingMilliseconds, 3)}` : "0";
  }

  if (totalSeconds < 60) {
    return includeMilliseconds
      ? `${pad0(totalSeconds)}.${pad0(remainingMilliseconds, 3)}`
      : pad0(totalSeconds);
  }

  if (totalSeconds < 60 * 60) {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds - minutes * 60;
    return includeMilliseconds
      ? `${pad0(minutes)}:${pad0(remainingSeconds)}.${pad0(remainingMilliseconds, 3)}`
      : `${pad0(minutes)}:${pad0(remainingSeconds)}`;
  }

  const hours = Math.floor(totalSeconds / (60 * 60));
  let remainingSeconds = totalSeconds - hours * 60 * 60;
  const minutes = Math.floor(remainingSeconds / 60);
  remainingSeconds = remainingSeconds - minutes * 60;

  return includeMilliseconds
    ? `${pad0(hours)}:${pad0(minutes)}:${pad0(remainingSeconds)}.${pad0(remainingMilliseconds, 3)}`
    : `${pad0(hours)}:${pad0(minutes)}:${pad0(remainingSeconds)}`;
}

export function toPaceStringForDistance(
  distanceInMeters: number,
  showMilliseconds = false,
) {
  return (timeInMilliseconds: number) => {
    const pace = timeInMilliseconds * distanceInMeters;
    return formatTime(pace, showMilliseconds);
  };
}

export function fromPaceStringForDistance(distanceInMeters: number) {
  return (paceString: string) => {
    const pace = parseTimeStringToMillieconds(paceString);
    return pace / distanceInMeters;
  };
}

export const KPH_FACTOR = 3600;
export const MPH_FACTOR = 3600 / 1.609344;

export function toSpeedString(factor: number) {
  return (millisecondsPrMeter: number) => {
    const speed = factor / millisecondsPrMeter;
    return speed.toFixed(2);
  };
}

const stepPace = (
  direction: "up" | "down",
  elem: HTMLInputElement,
  distance: number,
) => {
  const timeFactor =
    (direction === "up" ? 1 : -1) * paceTimeFactorFromCursor(elem);
  const newPaceValue = parseTimeStringToMillieconds(elem.value) + timeFactor;
  return newPaceValue / distance;
};

export const stepPaceForDistance =
  (distance: number) => (direction: "up" | "down", elem: HTMLInputElement) =>
    stepPace(direction, elem, distance);
