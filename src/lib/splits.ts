import { formatTime } from "./time";

function formatSplitTime(time: number) {
  if (time < 60000) {
    return `${formatTime(time, true)}s`;
  }

  return formatTime(time);
}

const specialDistances = [
  [21097.5, "halfMarathon"],
  [42195, "marathon"],
] as const;

export function formatDistance(distance: number) {
  const specialDistance = specialDistances.find(
    ([specialDistance]) => distance === specialDistance,
  );
  if (specialDistance) {
    return specialDistance[1];
  }

  if (distance < 1000) {
    return `${distance}m`;
  }

  return `${distance / 1000} km`;
}

export function calculateSplits(totalDistance: number, pace: number) {
  const splitMap = [
    [100, 10],
    [800, 50],
    [3000, 500],
    [10000, 1000],
    [42195, 5000],
  ] as const;

  const lookupRule = splitMap.find(
    ([maxDistance]) => totalDistance <= maxDistance,
  );
  const [, splitDistance] = lookupRule ?? [0, 10000];

  const splits = [];
  let cumulativeDistance = 0;
  let cumulativeTime = 0;

  while (cumulativeDistance < totalDistance) {
    const remainingDistance = totalDistance - cumulativeDistance;
    const currentSplitDistance = Math.min(splitDistance, remainingDistance);

    const currentSplitTime = currentSplitDistance * pace;

    cumulativeDistance += currentSplitDistance;
    cumulativeTime += currentSplitTime;

    if (specialDistances.some(([distance]) => cumulativeDistance === distance))
      continue;

    splits.push({
      distance: cumulativeDistance,
      time: cumulativeTime,
    });
  }

  for (const [distance, label] of specialDistances) {
    if (totalDistance >= distance) {
      splits.push({
        distance,
        time: distance * pace,
        formatter: () => label,
      });
    }
  }

  return splits
    .toSorted((a, b) => a.distance - b.distance)
    .map((split) => ({
      distance: formatDistance(split.distance),
      time: formatSplitTime(split.time),
    }));
}
