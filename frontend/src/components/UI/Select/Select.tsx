import { Icon } from '@iconify-icon/react/dist/iconify.js'
import clsx from 'clsx'
import React, { useRef } from 'react'

import { IconButton } from '@/components/UI/IconButton'

import { useClickOutside, useToggle } from '@/hooks'

import styles from './Select.module.scss'
import { Option, SelectProps, Value } from './types'

export function Select<V extends Value, O extends Option>({
  options,
  value,
  onChange,
  optionLabel,
  optionValue,
  valueLabel,
  label,
  clearable,
  placeholder = 'Select',
}: SelectProps<V, O>) {
  const selectRef = useRef<HTMLDivElement>(null)
  const [isOpened, toggleOpened] = useToggle(false)

  const clear = (e: React.MouseEvent) => (e.stopPropagation(), onChange(null))

  const computedValue = ((): string => {
    if (value === null) return ''

    if (typeof value == 'object' && valueLabel) {
      return value[valueLabel] as string
    }

    if (typeof value !== 'object' && optionLabel && optionValue) {
      const optionsHasValue = options.find(
        (option) => typeof option == 'object' && option[optionValue] == value,
      )

      if (optionsHasValue) return optionsHasValue[optionLabel] as string
    }

    return value.toString()
  })()

  function getLabel(option: Option): string {
    if (typeof option == 'object' && optionLabel) return option[optionLabel] as string
    return option.toString()
  }

  function handleSelect(option: Option) {
    const change = (val: unknown) => (onChange(val), toggleOpened(false))

    if (typeof option == 'object') {
      if (optionValue) change(option[optionValue])
      else change(option)

      return
    }

    if (typeof option !== 'object') change(option)
  }

  function isSelected(option: Option) {
    if (typeof option == 'object') {
      if (optionValue) {
        return option[optionValue] == value
      }

      return JSON.stringify(option) === JSON.stringify(value)
    }

    return option == value
  }

  useClickOutside(selectRef, () => toggleOpened(false))

  return (
    <div ref={selectRef} className={styles.select}>
      <span>{label}</span>
      <div
        onClick={() => toggleOpened()}
        className={clsx(
          styles.input,
          isOpened && styles.opened,
          clearable && computedValue && styles.clearable,
        )}
      >
        <span className={clsx(!computedValue && styles.placeholder)}>
          {computedValue || placeholder}
        </span>

        <Icon className={clsx(styles.chevron, isOpened && styles.opened)} icon="ph:caret-down" />

        {clearable && computedValue && (
          <div className={styles.clear}>
            <IconButton onClick={clear} icon="ph-x" size={'small'} />
          </div>
        )}
      </div>

      <ul className={clsx(styles.options, isOpened ? styles.opened : styles.closed)}>
        {options.map((option, idx) => {
          return (
            <li
              key={idx}
              onClick={() => handleSelect(option)}
              className={clsx(styles.option, isSelected(option) && styles.selected)}
            >
              {getLabel(option)}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
