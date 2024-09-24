import { expect, test } from "vitest";

import {
  KPH_FACTOR,
  MPH_FACTOR,
  formatTime,
  fromPaceStringForDistance,
  isValidSpeed,
  isValidTime,
  parseTimeStringToMillieconds,
  parseTimeStringWithoutMillisecondsToSeconds,
  toPaceStringForDistance,
  toSpeedString,
} from "./time";

test("parseTimeStringWithoutMillisecondsToSeconds", () => {
  expect(parseTimeStringWithoutMillisecondsToSeconds("05:30")).toBe(330);
  expect(parseTimeStringWithoutMillisecondsToSeconds("01:00:00")).toBe(3600);
  expect(parseTimeStringWithoutMillisecondsToSeconds("00:00:00")).toBe(0);
  expect(parseTimeStringWithoutMillisecondsToSeconds("00:00")).toBe(0);
  expect(parseTimeStringWithoutMillisecondsToSeconds("00")).toBe(0);
  expect(parseTimeStringWithoutMillisecondsToSeconds("")).toBe(0);
  expect(parseTimeStringWithoutMillisecondsToSeconds("1")).toBe(1);
  expect(parseTimeStringWithoutMillisecondsToSeconds("0:01")).toBe(1);
  expect(parseTimeStringWithoutMillisecondsToSeconds("1:01")).toBe(61);
  expect(parseTimeStringWithoutMillisecondsToSeconds("1:01:01")).toBe(3661);
});

test("parseTimeStringToMillieconds", () => {
  expect(parseTimeStringToMillieconds("05:30")).toBe(330000);
  expect(parseTimeStringToMillieconds("01:00:00")).toBe(3600000);
  expect(parseTimeStringToMillieconds("00:00:00")).toBe(0);
  expect(parseTimeStringToMillieconds("00:00")).toBe(0);
  expect(parseTimeStringToMillieconds("00")).toBe(0);
  expect(parseTimeStringToMillieconds("")).toBe(0);
  expect(parseTimeStringToMillieconds("1")).toBe(1000);
  expect(parseTimeStringToMillieconds("0:01")).toBe(1000);
  expect(parseTimeStringToMillieconds("1:01")).toBe(61000);
  expect(parseTimeStringToMillieconds("1:01:01")).toBe(3661000);

  expect(parseTimeStringToMillieconds("05:30.000")).toBe(330000);
  expect(parseTimeStringToMillieconds("01:00:00.000")).toBe(3600000);
  expect(parseTimeStringToMillieconds("00:00:00.000")).toBe(0);
  expect(parseTimeStringToMillieconds("00:00.000")).toBe(0);
  expect(parseTimeStringToMillieconds("00.000")).toBe(0);
  expect(parseTimeStringToMillieconds(".000")).toBe(0);
  expect(parseTimeStringToMillieconds("1.000")).toBe(1000);
  expect(parseTimeStringToMillieconds("0:01.000")).toBe(1000);
  expect(parseTimeStringToMillieconds("1:01.000")).toBe(61000);
  expect(parseTimeStringToMillieconds("1:01:01.000")).toBe(3661000);

  expect(parseTimeStringToMillieconds("1:01:01.00")).toBe(3661000);
  expect(parseTimeStringToMillieconds("1:01:01.0")).toBe(3661000);
});

test("isValidSpeed", () => {
  expect(isValidSpeed("")).toBe(false);
  expect(isValidSpeed("0")).toBe(true);
  expect(isValidSpeed("1")).toBe(true);
  expect(isValidSpeed("1.")).toBe(false);
  expect(isValidSpeed("1.0")).toBe(true);
  expect(isValidSpeed("1.00")).toBe(true);
  expect(isValidSpeed("1.000")).toBe(false);
  expect(isValidSpeed("1.0000")).toBe(false);
  expect(isValidSpeed("10.1")).toBe(true);
  expect(isValidSpeed("100.1")).toBe(true);
  expect(isValidSpeed("10.01")).toBe(true);
});

test("isValidTime", () => {
  expect(isValidTime("05:30")).toBe(true);
  expect(isValidTime("01:00:00")).toBe(true);
  expect(isValidTime("00:00:00")).toBe(true);
  expect(isValidTime("00:00")).toBe(true);
  expect(isValidTime("1")).toBe(true);
  expect(isValidTime("0:01")).toBe(true);
  expect(isValidTime("1:01")).toBe(true);
  expect(isValidTime("1:01:01")).toBe(true);
  expect(isValidTime("")).toBe(false);
  expect(isValidTime("00")).toBe(false);
  expect(isValidTime("00:00:00.000")).toBe(true);
  expect(isValidTime("00:00.000")).toBe(true);
  expect(isValidTime("00.000")).toBe(true);
  expect(isValidTime(".000")).toBe(false);
  expect(isValidTime("1.")).toBe(false);
});

test("formatTime", () => {
  expect(formatTime(0)).toBe("0");
  expect(formatTime(1)).toBe("0");
  expect(formatTime(499)).toBe("0");
  expect(formatTime(500)).toBe("01");
  expect(formatTime(1000)).toBe("01");
  expect(formatTime(60000)).toBe("01:00");
  expect(formatTime(61000)).toBe("01:01");
  expect(formatTime(360000)).toBe("06:00");

  expect(formatTime(0, true)).toBe("0.000");
  expect(formatTime(1, true)).toBe("0.001");
  expect(formatTime(499, true)).toBe("0.499");
  expect(formatTime(500, true)).toBe("0.500");
  expect(formatTime(1000, true)).toBe("01.000");
  expect(formatTime(1001, true)).toBe("01.001");
  expect(formatTime(60000, true)).toBe("01:00.000");
  expect(formatTime(60002, true)).toBe("01:00.002");
  expect(formatTime(61000, true)).toBe("01:01.000");
  expect(formatTime(360000, true)).toBe("06:00.000");
});

test("toPaceStringForDistance", () => {
  expect(toPaceStringForDistance(1000)(0)).toBe("0");
  expect(toPaceStringForDistance(1000)(1)).toBe("01");
  expect(toPaceStringForDistance(1000)(500)).toBe("08:20");

  expect(toPaceStringForDistance(1000, true)(0)).toBe("0.000");
  expect(toPaceStringForDistance(1000, true)(1)).toBe("01.000");
  expect(toPaceStringForDistance(1000, true)(500)).toBe("08:20.000");
});

test("fromPaceStringForDistance", () => {
  expect(fromPaceStringForDistance(1000)("05:30")).toBe(330);
});

test("round trip conversion", () => {
  const fromPaceString1000 = fromPaceStringForDistance(1000)("05:30");
  const toPaceString1000 = toPaceStringForDistance(1000)(fromPaceString1000);
  expect(toPaceString1000).toBe("05:30");

  const fromPaceString400 = fromPaceStringForDistance(400)("05:00");
  const toPaceString400 = toPaceStringForDistance(400)(fromPaceString400);
  expect(toPaceString400).toBe("05:00");
});

test("toSpeedStringForDistance", () => {
  expect(toSpeedString(KPH_FACTOR)(360)).toBe("10.00");
  expect(toSpeedString(KPH_FACTOR)(330)).toBe("10.91");
});

test("round trip speed conversion", () => {
  const fromPaceString1k = fromPaceStringForDistance(1000)("05:00");
  const toSpeedString1k = toSpeedString(KPH_FACTOR)(fromPaceString1k);
  const toSpeedString1mile = toSpeedString(MPH_FACTOR)(fromPaceString1k);

  expect(toSpeedString1k).toBe("12.00");
  expect(toSpeedString1mile).toBe("7.46");
});
