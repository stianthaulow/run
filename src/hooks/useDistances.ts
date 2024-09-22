import { type Distance, initialDistances } from "@/distances";
import { atom, useAtom, useAtomValue } from "jotai";
import { atomWithStorage } from "jotai/utils";

const distancesAtom = atomWithStorage("distances", initialDistances);
const visibleDistancesAtom = atom((get) =>
  get(distancesAtom).filter((d) => d.isVisible),
);

type AddDistanceAction = {
  type: "add";
  distance: Distance;
};

type MutateDistanceAction = {
  type: "toggle";
  length: number;
  attribute: "isVisible" | "showMilliseconds";
};

type DeleteDistanceAction = {
  type: "delete";
  length: number;
};

type DistanceAction =
  | AddDistanceAction
  | MutateDistanceAction
  | DeleteDistanceAction;

function distanceReducer(distances: Distance[], action: DistanceAction) {
  switch (action.type) {
    case "add":
      return [...distances, action.distance];
    case "toggle":
      return distances.map((distance) =>
        distance.length === action.length
          ? { ...distance, [action.attribute]: !distance[action.attribute] }
          : distance,
      );
    case "delete":
      return distances.filter((distance) => distance.length !== action.length);
  }
}

export function useDistances() {
  const [distances, setDistances] = useAtom(distancesAtom);

  const addDistance = (distance: Distance) =>
    setDistances((prev) => distanceReducer(prev, { type: "add", distance }));

  const toggleVisibility = (length: number) =>
    setDistances((prev) =>
      distanceReducer(prev, { type: "toggle", length, attribute: "isVisible" }),
    );

  const toggleMilliseconds = (length: number) =>
    setDistances((prev) =>
      distanceReducer(prev, {
        type: "toggle",
        length,
        attribute: "showMilliseconds",
      }),
    );

  const deleteDistance = (length: number) =>
    setDistances((prev) => distanceReducer(prev, { type: "delete", length }));

  return {
    distances,
    visibleDistances: useAtomValue(visibleDistancesAtom),
    addDistance,
    toggleVisibility,
    toggleMilliseconds,
    deleteDistance,
  };
}
