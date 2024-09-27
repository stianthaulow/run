const SPEED_BEFORE_DECIMAL = 1;
const SPEED_AFTER_DECIMAL = 0.01;

export const speedTimeFactorFromCursor = (elem: HTMLInputElement) => {
  const cursorPosition = elem.selectionStart ?? 0;
  const timeString = elem.value;

  if (cursorPosition <= timeString.indexOf(".")) {
    return SPEED_BEFORE_DECIMAL;
  }

  return SPEED_AFTER_DECIMAL;
};
