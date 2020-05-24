import React, { useState, useLayoutEffect, useRef } from "react";

const parsePace = (paceInput) => {
  if (!paceInput) return "";
  const parts = paceInput.toString().split(":").map(Number);
  if (parts.length === 1) {
    return { hours: 0, minuttes: 0, seconds: parts[0] };
  }

  if (parts.length === 2) {
    return { hours: 0, minuttes: parts[0], seconds: parts[1] };
  }

  if (parts.length === 3) {
    return { hours: parts[0], minuttes: parts[1], seconds: parts[2] };
  }
};

const pad = (number) => number.toFixed().toString().padStart(2, "0");

const format = ({ hours, minuttes, seconds }) => {
  if (hours) {
    return `${pad(hours)}:${pad(minuttes)}:${pad(seconds)}`;
  }
  if (minuttes) {
    return `${minuttes}:${pad(seconds)}`;
  }
  return seconds;
};

const convertPace = (pace, factor) => {
  let { hours, minuttes, seconds } = pace;
  let totalSeconds = (hours * 60 * 60 + minuttes * 60 + seconds) * factor;
  hours = Math.floor(totalSeconds / (60 * 60));
  totalSeconds %= 60 * 60;
  minuttes = Math.floor(totalSeconds / 60);
  seconds = totalSeconds % 60;
  return { hours, minuttes, seconds };
};

const isValidPace = (input) => /^$|^[0-5]?[0-9]?:?(?:[0-5]?[0-9]?:)?[0-5]?[0-9]?$/.test(input);
const isCompletePace = (input) => !/(.*:\d?$)|(^:)/.test(input);

const isCursorInMinuttes = (elem) =>
  elem.value.lastIndexOf(":") === -1 || elem.selectionStart <= elem.value.lastIndexOf(":");

const isCursorInHours = (elem) => {
  if ((elem.value.match(/:/g) || []).length !== 2) {
    return false;
  }
  return elem.selectionStart <= elem.value.indexOf(":");
};

export default function PaceInput({ label, factor, pace, setPace }) {
  const [value, setValue] = useState(format(convertPace(pace, factor)));
  const [cursorPosition, setCursorPosition] = useState(false);
  const input = useRef();

  const update = (paceValue) => {
    if (isValidPace(paceValue)) {
      setValue(paceValue);
      if (isCompletePace(paceValue)) {
        setPace(convertPace(parsePace(paceValue), 1 / factor));
      }
    }
  };

  const incrementHours = () => {
    let { hours, minuttes, seconds } = parsePace(value);
    hours = hours ? hours + 1 : 1;
    update(format({ hours, minuttes, seconds }));
  };

  const decrementHours = () => {
    let { hours, minuttes, seconds } = parsePace(value);
    hours = hours ? hours - 1 : 0;
    if (hours < 0) {
      hours = 0;
    }
    update(format({ hours, minuttes, seconds }));
  };

  const incrementMinuttes = () => {
    let { hours, minuttes, seconds } = parsePace(value);
    if (minuttes === 59) {
      minuttes = 0;
      hours = hours ? hours + 1 : 1;
    } else {
      minuttes = minuttes ? minuttes + 1 : 1;
    }
    update(format({ hours, minuttes, seconds }));
  };

  const decrementMinuttes = () => {
    let { hours, minuttes, seconds } = parsePace(value);
    minuttes = minuttes ? minuttes - 1 : 0;
    if (minuttes < 0) {
      minuttes = 0;
    }
    update(format({ hours, minuttes, seconds }));
  };

  const incrementSeconds = () => {
    let { hours, minuttes, seconds } = parsePace(value);
    if (seconds === 59) {
      seconds = 0;
      minuttes = minuttes ? minuttes + 1 : 1;
    } else {
      seconds = seconds ? seconds + 1 : 1;
    }
    update(format({ hours, minuttes, seconds }));
  };

  const decrementSeconds = () => {
    let { hours, minuttes, seconds } = parsePace(value);
    if (seconds === 0 || !seconds) {
      if (minuttes > 0) {
        seconds = 59;
        minuttes--;
      }
    } else {
      seconds--;
    }
    update(format({ hours, minuttes, seconds }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursorPosition(e.target.selectionStart);
      if (isCursorInHours(e.target)) {
        incrementHours();
      } else if (isCursorInMinuttes(e.target)) {
        incrementMinuttes();
      } else {
        incrementSeconds();
      }
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursorPosition(e.target.selectionStart);
      if (isCursorInHours(e.target)) {
        decrementHours();
      } else if (isCursorInMinuttes(e.target)) {
        decrementMinuttes();
      } else {
        decrementSeconds();
      }
    }
  };

  useLayoutEffect(() => {
    setValue(format(convertPace(pace, factor)));
    if (cursorPosition !== false) {
      input.current.selectionStart = input.current.selectionEnd = cursorPosition;
      setCursorPosition(false);
    }
  }, [pace, factor, cursorPosition]);

  return (
    <div className="1-km">
      <input value={value} ref={input} onChange={(e) => update(e.target.value)} onKeyDown={handleKeyDown} />
      <label>{label}</label>
    </div>
  );
}
