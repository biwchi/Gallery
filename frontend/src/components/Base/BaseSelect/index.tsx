import { ReactNode } from "react";

type BaseSelectProps<T> = {
  value: T;
  onChange: (newVal: T) => void;
  children: ReactNode;
  placeholder?: string;
};

export default function BaseSelect<
  T extends string | number | boolean | Array<T>,
>({ value, onChange, children, placeholder = "Select" }: BaseSelectProps<T>) {
  return (
    <div>
      <div>{value}</div>

      <div>{children}</div>
    </div>
  );
}
