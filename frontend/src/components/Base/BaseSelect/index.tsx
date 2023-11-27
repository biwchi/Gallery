import { useClickOutside, useToggle } from "@/hooks";
import { useRef } from "react";
import { twMerge } from "tailwind-merge";

type Option = string | number | object;

type OptionsProps<O, V> = O extends string | number
  ? {
      options: O[];
      label?: never;
      valueOpt?: never;
    }
  : V extends string | number
  ? {
      options: O[];
      label: keyof O;
      valueOpt: keyof O;
    }
  : {
      options: O[];
      label: keyof O;
      valueOpt?: never;
    };

type ValueProps<V, O> = V extends string | number
  ? {
      value: V;
      onChange: (
        newVal: O extends string | number ? O : string | number,
      ) => void;
      keyValue?: never;
    }
  : O extends string | number
  ? {
      value: V;
      onChange: (newVal: O) => void;
      keyValue: keyof V;
    }
  : {
      value: V;
      onChange: (newVal: O) => void;
      keyValue: keyof V;
    };

type BaseSelectProps<O, V> = {
  label?: string;
  placeholder?: string;
} & OptionsProps<O, V> &
  ValueProps<V, O>;

export default function BaseSelect<O extends Option, V extends Option>({
  value,
  onChange,
  options,
  keyValue,
  valueOpt,
  label,
  placeholder = "Select",
}: BaseSelectProps<O, V>) {
  const selectInputRef = useRef<HTMLDivElement>(null);
  const [isOpened, toggleOpened] = useToggle(false);
  const computedValue = getValue(value);

  function handleOnChange(newVal: any) {
    //@ts-ignore
    onChange(newVal);
    toggleOpened(false);
  }

  function getLabel(option: Option): string {
    if (typeof option === "object" && label && option.hasOwnProperty(label)) {
      return option[label];
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
    if (typeof value !== "object" && typeof opt !== "object") {
      handleOnChange(opt);
    }

    if (typeof value === "object" && typeof opt !== "object") {
      handleOnChange(opt);
    }

    if (typeof value !== "object" && typeof opt === "object" && valueOpt) {
      handleOnChange(opt[valueOpt]);
    }

    if (typeof value === "object" && typeof opt === "object") {
      handleOnChange(opt);
    }
  }

  useClickOutside(selectInputRef, () => toggleOpened(false));
  return (
    <div ref={selectInputRef} className="relative">
      <div
        onClick={() => toggleOpened()}
        className="min-w-[15rem] cursor-pointer rounded-md  border border-secondary px-2 py-2"
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
          "absolute z-50 mt-2 w-full rounded-md bg-accent py-3",
          isOpened ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        {options.map((option, idx) => {
          return (
            <li
              key={idx}
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
