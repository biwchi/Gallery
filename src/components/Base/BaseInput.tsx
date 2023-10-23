import { useState, type InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type BaseInputProps = {} & InputHTMLAttributes<HTMLInputElement>;

export default function BaseInput({ ...props }: BaseInputProps) {
  const [isFocused, setFocused] = useState(false);

  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  return (
    <div className="inline-block">
      <input
        {...props}
        onFocus={onFocus}
        onBlur={onBlur}
        className="bg-transparent p-2 outline-none"
      />

      <div className="h-0.5 w-full bg-secondary">
        <div
          className={twMerge(
            "h-0.5 w-0 transition-all m-auto",
            isFocused && "w-full bg-primary",
          )}
        />
      </div>
    </div>
  );
}
