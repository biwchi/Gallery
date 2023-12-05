import clsx from "clsx";
import styles from "./index.module.scss";

import { useState, type InputHTMLAttributes } from "react";

type BaseInputProps = {} & InputHTMLAttributes<HTMLInputElement>;

export default function BaseInput({ ...props }: BaseInputProps) {
  const [isFocused, setFocused] = useState(false);

  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  return (
    <div className={clsx(styles.inputBody, isFocused && styles.focused)}>
      <input
        {...props}
        onFocus={onFocus}
        onBlur={onBlur}
        className={styles.input}
      />
    </div>
  );
}
