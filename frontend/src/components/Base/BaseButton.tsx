import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { VariantProps, cva } from "class-variance-authority";
import { ButtonHTMLAttributes, HTMLAttributes } from "react";

const button = cva("transition rounded-md flex items-center text-lg", {
  variants: {
    variant: {
      base: "bg-primary hover:bg-secondary active:bg-primary/75",
    },
    size: {
      default: "py-2 px-3",
    },
    display: {
      block: "block w-full justify-center",
    },
  },
  compoundVariants: [
    {
      variant: ["base"],
      class: "disabled:bg-gray-500 disabled:text-gray-700 disabled:opacity-90 ",
    },
  ],
  defaultVariants: {
    variant: "base",
    size: "default",
  },
});

type BaseButtonProps = {
  text: string;
  leftIcon?: string;
  rightIcon?: string;
  loading?: boolean;
  children?: JSX.Element
} & ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof button>;

export function BaseButton({
  leftIcon,
  rightIcon,
  loading,
  text,
  children,
  variant,
  size,
  display,
  className,
  ...props
}: BaseButtonProps) {
  return (
    <button {...props} className={button({ variant, size, display }) + className}>
      {leftIcon && <Icon className="mr-2" icon={leftIcon} />}
      <span className="text-base">{children || text}</span>
      {loading && <Icon className="ml-2 animate-spin" icon="ph:spinner" />}
      {rightIcon && !loading && <Icon className="ml-2" icon={rightIcon} />}
    </button>
  );
}
