import clsx from "clsx";
import styles from "./Range.module.scss";

import { ChangeEvent } from "react";

type RangeProps = {
  value: string | number;
  maxValue: string | number;
  onPress?: (isPressed: boolean) => void;
  onChange: (newVal: string | number) => void;
  isLoading?: boolean;
};

export function Range({
  value,
  maxValue,
  onChange,
  onPress,
  isLoading,
}: RangeProps) {
  function onChangeInput(e: ChangeEvent<HTMLInputElement>) {
    onChange(Number(e.target.value));
  }

  return (
    <div className={styles.range}>
      <div className={styles.rangeBody}>
        <input
          title=""
          className={clsx(isLoading && styles.hide)}
          type="range"
          onMouseDown={() => onPress && onPress(true)}
          onMouseUp={() => onPress && onPress(false)}
          max={maxValue}
          value={value}
          onChange={onChangeInput}
        />

        {isLoading && <div className={styles.loader} />}

        <div
          style={{ width: `${(Number(value) / Number(maxValue)) * 100}%` }}
          className={styles.progress}
        />
      </div>
    </div>
  );
}
