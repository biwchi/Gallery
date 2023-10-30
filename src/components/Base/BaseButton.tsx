import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { VariantProps, cva } from "class-variance-authority";
import { HTMLAttributes } from "react";

const button = cva("transition rounded-md flex items-center text-lg", {
  variants: {
    variant: {
      base: "bg-primary hover:bg-secondary active:bg-primary/75",
    },
    size: {
      default: "py-2 px-3",
    },
  },
  compoundVariants: [],
  defaultVariants: {
    variant: "base",
    size: "default",
  },
});

type BaseButtonProps = {
  text: string;
  leftIcon?: string;
  rightIcon?: string;
} & HTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof button>;

export function BaseButton({
  leftIcon,
  rightIcon,
  text,
  variant,
  size,
  ...props
}: BaseButtonProps) {
  return (
    <button {...props} className={button({ variant, size })}>
      {leftIcon && <Icon className="mr-2" icon={leftIcon} />}
      <span className="text-base">{text}</span>
      {rightIcon && <Icon className="ml-2" icon={rightIcon} />}
    </button>
  );
}
