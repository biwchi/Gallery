import "./BaseRange.css";

import { ChangeEvent } from "react";
import { twMerge } from "tailwind-merge";

type BaseRangeProps = {
  value: string | number;
  maxValue: string | number;
  onPress?: (isPressed: boolean) => void;
  onChange: (newVal: string | number) => void;
  isLoading?: boolean;
};

export function BaseRange({
  value,
  maxValue,
  onChange,
  onPress,
  isLoading,
}: BaseRangeProps) {
  function onChangeInput(e: ChangeEvent<HTMLInputElement>) {
    onChange(Number(e.target.value));
  }

  return (
    <div className="flex h-1.5 w-full items-center">
      <div className="relative h-1 w-full cursor-pointer transition-all hover:h-1.5">
        <input
          className={twMerge("progress", isLoading && "opacity-0")}
          type="range"
          onMouseDown={() => onPress && onPress(true)}
          onMouseUp={() => onPress && onPress(false)}
          max={maxValue}
          value={value}
          onChange={onChangeInput}
        />

        {isLoading && <div className="loader" />}

        <div
          style={{ width: `${(Number(value) / Number(maxValue)) * 100}%` }}
          className={twMerge(
            "pointer-events-none absolute h-full select-none rounded-full bg-white",
          )}
        />
      </div>
    </div>
  );
}
