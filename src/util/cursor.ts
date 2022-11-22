const isCursorInMinuttes = (elem: HTMLInputElement) =>
  elem.value.lastIndexOf(":") !== -1 &&
  (elem.selectionStart || 0) <= elem.value.lastIndexOf(":");

const isCursorInHours = (elem: HTMLInputElement) => {
  if ((elem.value.match(/:/g) || []).length !== 2) {
    return false;
  }
  return (elem.selectionStart || 0) <= elem.value.indexOf(":");
};

export const activeTimeFactorFromCursor = (elem: HTMLInputElement) => {
  if (isCursorInHours(elem)) {
    return 60 * 60;
  }

  if (isCursorInMinuttes(elem)) {
    return 60;
  }

  return 1;
};
