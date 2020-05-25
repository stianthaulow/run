export const incrementHours = ({ hours, minuttes, seconds }) => {
  hours = hours ? hours + 1 : 1;
  return { hours, minuttes, seconds };
};

export const decrementHours = ({ hours, minuttes, seconds }) => {
  hours = hours ? hours - 1 : 0;
  if (hours < 0) {
    hours = 0;
  }
  return { hours, minuttes, seconds };
};

export const incrementMinuttes = ({ hours, minuttes, seconds }) => {
  if (minuttes === 59) {
    minuttes = 0;
    hours = hours ? hours + 1 : 1;
  } else {
    minuttes = minuttes ? minuttes + 1 : 1;
  }
  return { hours, minuttes, seconds };
};

export const decrementMinuttes = ({ hours, minuttes, seconds }) => {
  minuttes = minuttes ? minuttes - 1 : 0;
  if (minuttes < 0) {
    minuttes = 0;
  }
  return { hours, minuttes, seconds };
};

export const incrementSeconds = ({ hours, minuttes, seconds }) => {
  if (seconds === 59) {
    if (minuttes < 59) {
      seconds = 0;
      minuttes = minuttes ? minuttes + 1 : 1;
    } else {
      seconds = 0;
      minuttes = 0;
      hours = hours ? hours + 1 : 1;
    }
  } else {
    seconds = seconds ? seconds + 1 : 1;
  }
  return { hours, minuttes, seconds };
};

export const decrementSeconds = ({ hours, minuttes, seconds }) => {
  if (seconds === 0 || !seconds) {
    if (minuttes > 0) {
      seconds = 59;
      minuttes--;
    } else if (hours > 0) {
      seconds = 59;
      minuttes = 59;
      hours--;
    }
  } else {
    seconds--;
  }
  return { hours, minuttes, seconds };
};
