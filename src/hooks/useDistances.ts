import { type Distance, initialDistances } from "@/distances";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useTranslation } from "react-i18next";

const distancesAtom = atomWithStorage("distances", initialDistances);

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
  const { t } = useTranslation();

  const translatedDistances = distances.map((distance) => {
    if (distance.length === 21097.5) {
      return { ...distance, label: t("halfMarathon") };
    }
    if (distance.length === 42195) {
      return { ...distance, label: t("marathon") };
    }
    return distance;
  });

  const visibleDistances = translatedDistances.filter((d) => d.isVisible);

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
    distances: translatedDistances,
    visibleDistances,
    addDistance,
    toggleVisibility,
    toggleMilliseconds,
    deleteDistance,
  };
}
