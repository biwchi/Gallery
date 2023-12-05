import clsx from "clsx";
import styles from "./Input.module.scss";

import { useState, type InputHTMLAttributes } from "react";

type InputProps = {} & InputHTMLAttributes<HTMLInputElement>;

export function Input({ ...props }: InputProps) {
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
