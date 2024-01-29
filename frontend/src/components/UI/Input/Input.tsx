import clsx from 'clsx'
import { type InputHTMLAttributes, useState } from 'react'

import styles from './Input.module.scss'

type InputProps = InputHTMLAttributes<HTMLInputElement>

export function Input({ ...props }: InputProps) {
  const [isFocused, setFocused] = useState(false)

  const onFocus = () => setFocused(true)
  const onBlur = () => setFocused(false)

  return (
    <div className={clsx(styles.inputBody, isFocused && styles.focused)}>
      <input {...props} onFocus={onFocus} onBlur={onBlur} className={styles.input} />
    </div>
  )
}
