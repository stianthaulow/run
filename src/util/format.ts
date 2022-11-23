import { paceTimeFactorFromCursor, speedTimeFactorFromCursor } from "./cursor";
import {
  convertPaceToSpeed,
  convertValueToPace,
  convertTimeToPace,
  formatTime,
  parsePace,
  convertSpeedToPace,
} from "./time";

export const paceDisplayValueForDistance =
  (distance: number) => (secondsPrMeter: number) =>
    paceDisplayValue(secondsPrMeter, distance);

export const speedDisplayValueForFactor =
  (factor: number) => (secondsPrMeter: number) =>
    speedDisplayValue(secondsPrMeter, factor);

const paceDisplayValue = (secondsPrMeter: number, distance: number) =>
  formatTime(convertTimeToPace(secondsPrMeter, distance));

const speedDisplayValue = (secondsPrMeter: number, factor: number) =>
  convertPaceToSpeed(secondsPrMeter, factor).toFixed(2);

export const paceFromDisplayValueForDistance =
  (distance: number) => (value: string) =>
    convertValueToPace(parsePace(value), distance);

export const paceFromDisplayValueForSpeed =
  (factor: number) => (value: string) =>
    convertSpeedToPace(parseFloat(value), factor);

const stepPace = (
  direction: "up" | "down",
  elem: HTMLInputElement,
  distance: number
) => {
  const timeFactor =
    (direction === "up" ? 1 : -1) * paceTimeFactorFromCursor(elem);
  const newPaceValue = parsePace(elem.value) + timeFactor;
  return convertValueToPace(newPaceValue, distance);
};

const stepSpeed = (
  direction: "up" | "down",
  elem: HTMLInputElement,
  factor: number
) => {
  const timeFactor =
    (direction === "up" ? 1 : -1) * speedTimeFactorFromCursor(elem);

  const newSpeedValue = parseFloat(elem.value) + timeFactor;
  return convertSpeedToPace(newSpeedValue, factor);
};

export const stepPaceForDistance =
  (distance: number) => (direction: "up" | "down", elem: HTMLInputElement) =>
    stepPace(direction, elem, distance);

export const stepSpeedForFactor =
  (factor: number) => (direction: "up" | "down", elem: HTMLInputElement) =>
    stepSpeed(direction, elem, factor);
