export type Distance = {
  length: number;
  label: string;
  showMilliseconds: boolean;
  isDefault: boolean;
  isVisible: boolean;
};

const defaultDistances = [
  {
    length: 100,
    label: "100m",
    showMilliseconds: true,
    isVisible: true,
  },
  {
    length: 200,
    label: "200m",
    showMilliseconds: false,
    isVisible: false,
  },
  {
    length: 400,
    label: "400m",
    showMilliseconds: false,
    isVisible: true,
  },
  {
    length: 800,
    label: "800m",
    showMilliseconds: false,
    isVisible: false,
  },
  {
    length: 1500,
    label: "1500m",
    showMilliseconds: false,
    isVisible: true,
  },
  {
    length: 3000,
    label: "3000m",
    showMilliseconds: false,
    isVisible: true,
  },
  {
    length: 5000,
    label: "5000m",
    showMilliseconds: false,
    isVisible: true,
  },
  {
    length: 10000,
    label: "10000m",
    showMilliseconds: false,
    isVisible: true,
  },
  {
    length: 21097.5,
    label: "Half Marathon",
    showMilliseconds: false,
    isVisible: true,
  },
  {
    length: 42195,
    label: "Marathon",
    showMilliseconds: false,
    isVisible: true,
  },
];

export const initialDistances: Distance[] = defaultDistances.map(
  (distance) => ({
    ...distance,
    isDefault: true,
  }),
);
