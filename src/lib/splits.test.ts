import { describe, expect, it } from "vitest";
import { calculateSplits } from "./splits";

describe("calculateSplits", () => {
  it("should handle totalDistance less than first maxDistance (100 meters)", () => {
    const totalDistance = 50;
    const pace = 300;

    const expected = [
      { distance: "10m", time: "3.000s" },
      { distance: "20m", time: "6.000s" },
      { distance: "30m", time: "9.000s" },
      { distance: "40m", time: "12.000s" },
      { distance: "50m", time: "15.000s" },
    ];

    const result = calculateSplits(totalDistance, pace);
    expect(result).toEqual(expected);
  });

  it("should handle totalDistance between first and second maxDistance (100 < distance <= 800)", () => {
    const totalDistance = 250;
    const pace = 200;

    const expected = [
      { distance: "50m", time: "10.000s" },
      { distance: "100m", time: "20.000s" },
      { distance: "150m", time: "30.000s" },
      { distance: "200m", time: "40.000s" },
      { distance: "250m", time: "50.000s" },
    ];

    const result = calculateSplits(totalDistance, pace);
    expect(result).toEqual(expected);
  });

  it("should handle totalDistance between second and third maxDistance (800 < distance <= 3000)", () => {
    const totalDistance = 1500;
    const pace = 270;

    const expected = [
      { distance: "500m", time: "02:15" },
      { distance: "1 km", time: "04:30" },
      { distance: "1.5 km", time: "06:45" },
    ];

    const result = calculateSplits(totalDistance, pace);
    expect(result).toEqual(expected);
  });

  it("should handle totalDistance above 3000", () => {
    const totalDistance = 42195;
    const pace = 270;

    const expected = [
      { distance: "5 km", time: "22:30" },
      { distance: "10 km", time: "45:00" },
      { distance: "15 km", time: "01:07:30" },
      { distance: "20 km", time: "01:30:00" },
      { distance: "halfMarathon", time: "01:34:56" },
      { distance: "25 km", time: "01:52:30" },
      { distance: "30 km", time: "02:15:00" },
      { distance: "35 km", time: "02:37:30" },
      { distance: "40 km", time: "03:00:00" },
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
      { distance: "1 km", time: "04:30" },
      { distance: "1.5 km", time: "06:45" },
      { distance: "1.60934 km", time: "07:15" },
    ];

    const result = calculateSplits(totalDistance, pace);
    expect(result).toEqual(expected);
  });
});
