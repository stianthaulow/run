import { expect, test } from "vitest";

import {
  type ValidTimeString,
  formatTime,
  isValidSpeed,
  isValidTime,
  parseTime,
} from "./time";

test("parseTime", () => {
  expect(parseTime("05:30" as ValidTimeString)).toBe(330000);
  expect(parseTime("01:00:00" as ValidTimeString)).toBe(3600000);
  expect(parseTime("00:00:00" as ValidTimeString)).toBe(0);
  expect(parseTime("00:00" as ValidTimeString)).toBe(0);
  expect(parseTime("00" as ValidTimeString)).toBe(0);
  expect(parseTime("" as ValidTimeString)).toBe(0);
  expect(parseTime("1" as ValidTimeString)).toBe(1000);
  expect(parseTime("0:01" as ValidTimeString)).toBe(1000);
  expect(parseTime("1:01" as ValidTimeString)).toBe(61000);
  expect(parseTime("1:01:01" as ValidTimeString)).toBe(3661000);

  expect(parseTime("05:30.000" as ValidTimeString)).toBe(330000);
  expect(parseTime("01:00:00.000" as ValidTimeString)).toBe(3600000);
  expect(parseTime("00:00:00.000" as ValidTimeString)).toBe(0);
  expect(parseTime("00:00.000" as ValidTimeString)).toBe(0);
  expect(parseTime("00.000" as ValidTimeString)).toBe(0);
  expect(parseTime(".000" as ValidTimeString)).toBe(0);
  expect(parseTime("1.000" as ValidTimeString)).toBe(1000);
  expect(parseTime("0:01.000" as ValidTimeString)).toBe(1000);
  expect(parseTime("1:01.000" as ValidTimeString)).toBe(61000);
  expect(parseTime("1:01:01.000" as ValidTimeString)).toBe(3661000);

  expect(parseTime("1:01:01.00" as ValidTimeString)).toBe(3661000);
  expect(parseTime("1:01:01.0" as ValidTimeString)).toBe(3661000);
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
  expect(isValidTime("00")).toBe(true);
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
  expect(formatTime(500)).toBe("0");
  expect(formatTime(1000)).toBe("1");
  expect(formatTime(60000)).toBe("01:00");
  expect(formatTime(119900)).toBe("02:00");
  expect(formatTime(61000)).toBe("01:01");
  expect(formatTime(360000)).toBe("06:00");

  expect(formatTime(0, true)).toBe("0.000");
  expect(formatTime(1, true)).toBe("0.001");
  expect(formatTime(499, true)).toBe("0.499");
  expect(formatTime(500, true)).toBe("0.500");
  expect(formatTime(1000, true)).toBe("1.000");
  expect(formatTime(1001, true)).toBe("1.001");
  expect(formatTime(60000, true)).toBe("01:00.000");
  expect(formatTime(60002, true)).toBe("01:00.002");
  expect(formatTime(61000, true)).toBe("01:01.000");
  expect(formatTime(360000, true)).toBe("06:00.000");
});
