import styles from "./index.module.css";
import clsx from "clsx";

import { useClickOutside, useToggle } from "@/hooks";
import { useRef } from "react";
import { BaseSelectProps, Option, Value } from "./types";
import { Icon } from "@iconify-icon/react/dist/iconify.js";

export default function BaseSelect<V extends Value, O extends Option>({
  options,
  value,
  onChange,
  optionLabel,
  optionValue,
  valueLabel,
  label,
  placeholder = "Select",
}: BaseSelectProps<V, O>) {
  const selectRef = useRef<HTMLDivElement>(null);
  const [isOpened, toggleOpened] = useToggle(false);

  const computedValue = (() => {
    if (typeof value == "object" && valueLabel) {
      return value[valueLabel] as string;
    }

    if (typeof value !== "object" && optionLabel && optionValue) {
      const optionsHasValue = options.find(
        (option) => typeof option == "object" && option[optionValue] == value,
      );
      
      if (optionsHasValue) return optionsHasValue[optionLabel];
    }

    return value.toString();
  })();

  function getLabel(option: Option) {
    if (typeof option == "object" && optionLabel) return option[optionLabel];
    return option.toString();
  }

  function handleSelect(option: Option) {
    const change = (val: any) => (onChange(val), toggleOpened(false));

    if (typeof option == "object") {
      if (optionValue) change(option[optionValue]);
      else change(option);

      return;
    }

    if (typeof option !== "object") change(option);
  }

  function isSelected(option: Option) {
    if (typeof option == "object") {
      if (optionValue) {
        return option[optionValue] == value;
      }

      return JSON.stringify(option) === JSON.stringify(value);
    }

    return option == value;
  }

  useClickOutside(selectRef, () => toggleOpened(false));

  return (
    <div ref={selectRef} className={styles.select}>
      <span>{label}</span>
      <div
        onClick={() => toggleOpened()}
        className={clsx(styles.selectInput, isOpened && styles.opened)}
      >
        <span
          className={
            computedValue
              ? styles.selectInputValue
              : styles.selectInputValuePlaceholder
          }
        >
          {computedValue || placeholder}
        </span>

        <Icon
          className={clsx(styles.selectInputChevron, isOpened && styles.opened)}
          icon="ph:caret-down"
        />
      </div>

      <ul
        className={clsx(
          styles.options,
          isOpened ? styles.opened : styles.closed,
        )}
      >
        {options.map((option, idx) => {
          return (
            <li
              key={idx}
              onClick={() => handleSelect(option)}
              className={clsx(
                styles.option,
                isSelected(option) && styles.selected,
              )}
            >
              {getLabel(option)}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
