export const parseTime = (timeString: string) => {
  const components = timeString.split(":").map(Number);

  if (components.length === 1) {
    return components[0] || 0;
  }

  if (components.length === 2) {
    const [minuttes = 0, seconds = 0] = components;
    return minuttes * 60 + seconds;
  }

  const [hours = 0, minuttes = 0, seconds = 0] = components;
  return hours * 60 * 60 + minuttes * 60 + seconds;
};

export const validTimePattern =
  "^(?:[0-9]?[0-9]?[0-9]:)?(?:[0-9]?[0-9]:)?(?:[0-9]?[0-9])$";

const validTimeRegExp = new RegExp(validTimePattern);

export const isValidTime = (input: string) => validTimeRegExp.test(input);

const pad0 = (timeComponent: number) =>
  timeComponent.toFixed(0).padStart(2, "0");

export const formatTime = (seconds: number) => {
  if (seconds < 60) {
    return pad0(seconds);
  }

  if (seconds < 60 * 60) {
    const minuttes = Math.floor(seconds / 60);
    const remainingSeconds = seconds - minuttes * 60;
    return pad0(minuttes) + ":" + pad0(remainingSeconds);
  }

  const hours = Math.floor(seconds / (60 * 60));
  let remainingSeconds = seconds - hours * 60 * 60;
  const minuttes = Math.floor(remainingSeconds / 60);
  remainingSeconds = remainingSeconds - minuttes * 60;

  return pad0(hours) + ":" + pad0(minuttes) + ":" + pad0(remainingSeconds);
};

export const convertTimeToPace = (
  timeInSeconds: number,
  distanceInMeters: number
) => distanceInMeters * timeInSeconds;

export const convertPaceToTime = (
  paceInSeconds: number,
  distanceInMeters: number
) => paceInSeconds / distanceInMeters;

export const convertPaceToSpeed = (paceInSeconds: number, factor: number) =>
  (1 / paceInSeconds) * factor;

export const convertSpeedToPace = (speed: number, factor: number) =>
  1 / (speed / factor);
