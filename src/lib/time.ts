import type { Branded } from "@/types";
import { V } from "vitest/dist/chunks/environment.C5eAp3K6.js";

export const SECONDS_IN_MINUTE = 60;
export const SECONDS_IN_HOUR = 3600;

export type ValidTimeString = Branded<string, "ValidTimeString">;

export function parseTime(timeString: ValidTimeString) {
  const [mainPart, msPart = "0"] = timeString.split(".");

  const [seconds = 0, minutes = 0, hours = 0] = mainPart
    .split(":")
    .reverse()
    .map(Number);

  const totalSeconds =
    hours * SECONDS_IN_HOUR + minutes * SECONDS_IN_MINUTE + seconds;

  return totalSeconds * 1000 + Number(msPart.padEnd(3, "0"));
}

export function assertValidTimeString(
  input: string,
): asserts input is ValidTimeString {
  if (!isValidTime(input)) {
    throw new Error(`Invalid time string: "${input}"`);
  }
}

export const validTimePattern =
  "^(?:(?:\\d{1,2}:){0,2}\\d{1,2}(?:\\.\\d{1,3})?)$";
export const validSpeedPattern = "^\\d{1,3}(\\.\\d{1,2})?$";

const validTimeRegExp = new RegExp(validTimePattern);
const validSpeedRegExp = new RegExp(validSpeedPattern);

export function isValidTime(input: string): input is ValidTimeString {
  return validTimeRegExp.test(input);
}

export function isValidSpeed(input: string) {
  return validSpeedRegExp.test(input);
}

function padZero(timeComponent: number) {
  return String(timeComponent).padStart(2, "0");
}

export function formatTime(
  milliseconds: number,
  showMilliseconds = false,
): string {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / SECONDS_IN_HOUR);
  const minutes = Math.floor(
    (totalSeconds % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE,
  );
  const seconds = totalSeconds % SECONDS_IN_MINUTE;
  const millis = Math.floor(milliseconds % 1000);

  const timeString =
    hours > 0
      ? `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`
      : minutes > 0
        ? `${padZero(minutes)}:${padZero(seconds)}`
        : `${seconds}`;

  if (showMilliseconds) {
    return `${timeString}.${String(millis).padStart(3, "0")}`;
  }

  return timeString;
}

export function formatSpeedForFactor(pace: number, factor: number) {
  return ((1 / pace) * factor).toFixed(2);
}

const MILLISECONDS_FACTOR = 1;
const SECONDS_FACTOR = 1000;
const MINUTES_FACTOR = SECONDS_IN_MINUTE * SECONDS_FACTOR;
const HOURS_FACTOR = SECONDS_IN_HOUR * SECONDS_FACTOR;

export function timeFactorFromIndex(
  index: number,
  timeString: ValidTimeString,
) {
  const hasPeriod = timeString.includes(".");

  if (hasPeriod) {
    if (index > timeString.indexOf(".")) {
      return MILLISECONDS_FACTOR;
    }
  }

  const colonCount = (timeString.match(/:/g) || []).length;

  switch (colonCount) {
    case 0:
      return SECONDS_FACTOR;

    case 1:
      if (index > timeString.indexOf(":")) {
        return SECONDS_FACTOR;
      }
      return MINUTES_FACTOR;

    case 2:
      if (index > timeString.lastIndexOf(":")) {
        return SECONDS_FACTOR;
      }
      if (index > timeString.indexOf(":")) {
        return MINUTES_FACTOR;
      }
      return HOURS_FACTOR;

    default:
      throw new Error("Invalid time string");
  }
}
