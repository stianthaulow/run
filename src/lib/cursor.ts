const isCursorBeforeSeparator = (elem: HTMLInputElement, separator: string) =>
  elem.value.lastIndexOf(separator) !== -1 &&
  (elem.selectionStart || 0) <= elem.value.lastIndexOf(separator);

const isCursorInMinuttes = (elem: HTMLInputElement) =>
  isCursorBeforeSeparator(elem, ":");

const isCursorInHours = (elem: HTMLInputElement) => {
  if ((elem.value.match(/:/g) || []).length !== 2) {
    return false;
  }
  return (elem.selectionStart || 0) <= elem.value.indexOf(":");
};

export const paceTimeFactorFromCursor = (elem: HTMLInputElement) => {
  if (isCursorInHours(elem)) {
    return 60 * 60;
  }

  if (isCursorInMinuttes(elem)) {
    return 60;
  }

  return 1;
};

export const speedTimeFactorFromCursor = (elem: HTMLInputElement) => {
  if (isCursorBeforeSeparator(elem, ".")) {
    return 1;
  }

  return 0.01;
};
