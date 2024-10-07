import { describe, expect, it } from "vitest";
import { calculateSplits } from "./splits";

describe("calculateSplits", () => {
  it("should handle totalDistance less than first maxDistance (100 meters)", () => {
    const totalDistance = 50;
    const pace = 300;

    const expected = [
      { distance: "10m", time: "3s" },
      { distance: "20m", time: "6s" },
      { distance: "30m", time: "9s" },
      { distance: "40m", time: "12s" },
      { distance: "50m", time: "15s" },
    ];

    const result = calculateSplits(totalDistance, pace);
    expect(result).toEqual(expected);
  });

  it("should handle totalDistance between first and second maxDistance (100 < distance <= 800)", () => {
    const totalDistance = 250;
    const pace = 200;

    const expected = [
      { distance: "50m", time: "10s" },
      { distance: "100m", time: "20s" },
      { distance: "150m", time: "30s" },
      { distance: "200m", time: "40s" },
      { distance: "250m", time: "50s" },
    ];

    const result = calculateSplits(totalDistance, pace);
    expect(result).toEqual(expected);
  });

  it("should handle totalDistance between second and third maxDistance (800 < distance <= 3000)", () => {
    const totalDistance = 1500;
    const pace = 270;

    const expected = [
      { distance: "500m", time: "02:15" },
      { distance: "1000m", time: "04:30" },
      { distance: "1500m", time: "06:45" },
    ];

    const result = calculateSplits(totalDistance, pace);
    expect(result).toEqual(expected);
  });

  it("should handle totalDistance above 3000", () => {
    const totalDistance = 42195;
    const pace = 270;

    const expected = [
      { distance: "1 km", time: "04:30" },
      { distance: "2 km", time: "09:00" },
      { distance: "3 km", time: "13:30" },
      { distance: "4 km", time: "18:00" },
      { distance: "5 km", time: "22:30" },
      { distance: "6 km", time: "27:00" },
      { distance: "7 km", time: "31:30" },
      { distance: "8 km", time: "36:00" },
      { distance: "9 km", time: "40:30" },
      { distance: "10 km", time: "45:00" },
      { distance: "11 km", time: "49:30" },
      { distance: "12 km", time: "54:00" },
      { distance: "13 km", time: "58:30" },
      { distance: "14 km", time: "01:03:00" },
      { distance: "15 km", time: "01:07:30" },
      { distance: "16 km", time: "01:12:00" },
      { distance: "17 km", time: "01:16:30" },
      { distance: "18 km", time: "01:21:00" },
      { distance: "19 km", time: "01:25:30" },
      { distance: "20 km", time: "01:30:00" },
      { distance: "21 km", time: "01:34:30" },
      { distance: "halfMarathon", time: "01:34:56" },
      { distance: "22 km", time: "01:39:00" },
      { distance: "23 km", time: "01:43:30" },
      { distance: "24 km", time: "01:48:00" },
      { distance: "25 km", time: "01:52:30" },
      { distance: "26 km", time: "01:57:00" },
      { distance: "27 km", time: "02:01:30" },
      { distance: "28 km", time: "02:06:00" },
      { distance: "29 km", time: "02:10:30" },
      { distance: "30 km", time: "02:15:00" },
      { distance: "31 km", time: "02:19:30" },
      { distance: "32 km", time: "02:24:00" },
      { distance: "33 km", time: "02:28:30" },
      { distance: "34 km", time: "02:33:00" },
      { distance: "35 km", time: "02:37:30" },
      { distance: "36 km", time: "02:42:00" },
      { distance: "37 km", time: "02:46:30" },
      { distance: "38 km", time: "02:51:00" },
      { distance: "39 km", time: "02:55:30" },
      { distance: "40 km", time: "03:00:00" },
      { distance: "41 km", time: "03:04:30" },
      { distance: "42 km", time: "03:09:00" },
      { distance: "marathon", time: "03:09:53" },
    ];

    const result = calculateSplits(totalDistance, pace);
    expect(result).toEqual(expected);
  });

  it("should handle totalDistance with an uneven total", () => {
    const totalDistance = 1609.34;
    const pace = 270;

    const expected = [
      { distance: "500m", time: "02:15" },
      { distance: "1000m", time: "04:30" },
      { distance: "1500m", time: "06:45" },
      { distance: "1609.34m", time: "07:15" },
    ];

    const result = calculateSplits(totalDistance, pace);
    expect(result).toEqual(expected);
  });
});
