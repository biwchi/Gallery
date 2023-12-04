import clsx from "clsx";
import styles from "./index.module.scss";

import { useState, type InputHTMLAttributes } from "react";

type BaseInputProps = {} & InputHTMLAttributes<HTMLInputElement>;

export default function BaseInput({ ...props }: BaseInputProps) {
  const [isFocused, setFocused] = useState(false);

  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  return (
    <div className={styles.inputBody}>
      <input
        {...props}
        onFocus={onFocus}
        onBlur={onBlur}
        className={styles.input}
      />

      <div className={styles.inputLine}>
        <div className={clsx(styles.line, isFocused && styles.focused)} />
      </div>
    </div>
  );
}
