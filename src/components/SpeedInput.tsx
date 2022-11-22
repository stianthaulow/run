import { Dispatch, SetStateAction, useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { convertSpeedToPace, convertPaceToSpeed } from "../util/time";
import useDebounce from "../hooks/useDebounce";
import usePreventScroll from "../hooks/usePreventScroll";

type SpeedInputProps = {
  id: string;
  label: string;
  factor: number;
  paceInSeconds: number;
  dispatchTime: Dispatch<SetStateAction<number>>;
};

export const SpeedInput = ({
  id,
  label,
  factor,
  paceInSeconds,
  dispatchTime,
}: SpeedInputProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const speed = convertPaceToSpeed(paceInSeconds, factor);
  const [value, setValue] = useState(speed);
  const [isSource, setIsSource] = useState(false);
  const debouncedValue = useDebounce(value, 1000);

  // Dispatch pace updates
  useEffect(() => {
    if (isSource) {
      dispatchTime(convertSpeedToPace(debouncedValue, factor));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue, dispatchTime]);

  // React to pace updates
  useEffect(() => {
    const newDisplayValue =
      Math.round(convertPaceToSpeed(paceInSeconds, factor) * 100) / 100;
    if (newDisplayValue !== value && !isSource) {
      setValue(newDisplayValue);
    }
    setIsSource(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paceInSeconds]);

  usePreventScroll(ref);
  return (
    <fieldset>
      <input
        ref={ref}
        type="number"
        name={id}
        value={value}
        onChange={(e) => {
          setIsSource(true);
          setValue(parseFloat(e.target.value));
        }}
      />
      <label htmlFor={id}>{label}</label>
    </fieldset>
  );
};
