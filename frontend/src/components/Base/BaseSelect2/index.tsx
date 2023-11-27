import { useToggle } from "@/hooks";
import { twMerge } from "tailwind-merge";

type Option = string | number | Record<string, any>;
type Value = Option;

type BaseSelectV2Props<V, O> = {
  options: O[];
  value: V;
  onChange: (value: any) => void;
  valueLabel?: V extends Record<string, any> ? keyof V : never;
  optionLabel?: O extends Record<string, any> ? keyof O : never;
  optionValue?: O extends Record<string, any> ? keyof O : never;
  placeholder?: string;
  label?: string;
};

export default function BaseSelectV2<V extends Value, O extends Option>({
  options,
  value,
  onChange,
  placeholder,
  optionLabel,
  optionValue,
  valueLabel,
  label,
}: BaseSelectV2Props<V, O>) {
  const [isOpened, toggleOpened] = useToggle(false);

  const computedValue = () => {
    if (typeof value === "object") {
      if (valueLabel && value.hasOwnProperty(valueLabel))
        return value[valueLabel] as string;
      else return value.value as string;
    }

    return value.toString();
  };
  function getLabel(option: Option) {
    if (
      typeof option === "object" &&
      optionLabel &&
      option.hasOwnProperty(optionLabel)
    ) {
      return option[optionLabel] as string;
    }

    if (typeof option !== "object") {
      return option.toString();
    }

    return "";
  }

  function handleSelect(opt: Option) {
    if (typeof opt === "object" && optionValue) {
      onChange(opt[optionValue]);
    } else if (typeof opt !== "object") {
      onChange(opt);
    }
  }

  return (
    <div className="relative">
      <span>{label}</span>
      <div
        onClick={() => toggleOpened()}
        className="min-w-[15rem] cursor-pointer rounded-md  border border-secondary px-2 py-2"
      >
        <span
          className={twMerge(
            value ? "text-white" : "select-none text-gray-500",
          )}
        >
          {computedValue() || placeholder}
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
