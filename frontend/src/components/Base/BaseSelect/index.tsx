import { useClickOutside, useToggle } from "@/hooks";
import { useRef } from "react";
import { twMerge } from "tailwind-merge";

type Option = string | number | Record<string, any>;

type OptionsProps<O> = O extends string | number
  ? {
      options: O[];
      labelKey?: never;
      valueKey?: never;
    }
  : {
      options: O[];
      labelKey: keyof O;
      valueKey: keyof O;
    };

type ValueProps<V extends Option> = V extends string | number
  ? {
      value: V;
      onChange: (newVal: V) => void;
      keyValue?: never;
    }
  : {
      value: V;
      onChange: (newVal: V) => void;
      keyValue: keyof V;
    };

type BaseSelectProps<T extends Option> = {
  label?: string;
  placeholder?: string;
} & OptionsProps<T> &
  ValueProps<T>;

export default function BaseSelect<T extends Option>({
  value,
  onChange,
  options,
  keyValue,
  valueKey,
  labelKey,
  placeholder = "Select",
}: BaseSelectProps<T>) {
  const selectInputRef = useRef<HTMLDivElement>(null);

  const [isOpened, toggleOpened] = useToggle(false);

  const computedValue = getValue(value);

  function getLabel(option: Option): string {
    if (
      typeof option === "object" &&
      labelKey &&
      option.hasOwnProperty(labelKey)
    ) {
      return option[labelKey];
    }

    if (typeof option === "string" || typeof option === "number") {
      return option.toString();
    }

    return "";
  }

  function getValue(value: Option): string {
    if (typeof value === "object" && keyValue) return value[keyValue];

    if (typeof value === "string" || typeof value === "number") {
      return value.toString();
    }

    return "";
  }

  function handleSelect(opt: Option) {
    if (typeof opt === "object" && keyValue && opt.hasOwnProperty(keyValue)) {
      onChange(opt[keyValue]);
      return;
    }

    if (typeof opt === "string") {
      onChange(opt);
      return;
    }

    if (typeof opt === "number") {
      onChange(opt);
      return;
    }
  }

  useClickOutside(selectInputRef, () => toggleOpened(false));
  return (
    <div ref={selectInputRef} className="relative">
      <div
        onClick={() => toggleOpened()}
        className="cursor-pointer rounded-md border  border-secondary px-2 py-2"
      >
        <span
          className={twMerge(
            value ? "text-white" : "select-none text-gray-500",
          )}
        >
          {computedValue || placeholder}
        </span>
      </div>

      <ul
        className={twMerge(
          "absolute mt-2 w-full rounded-md bg-accent py-3",
          isOpened ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        {options.map((option) => {
          return (
            <li
              onClick={() => handleSelect(option)}
              className="cursor-pointer px-4 py-2 hover:bg-secondary"
            >
              {getLabel(option)}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
