import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { VariantProps, cva } from "class-variance-authority";
import { ButtonHTMLAttributes, HTMLAttributes } from "react";

const iconButton = cva("focus:ring-gray-light", {
  variants: {
    variant: {
      transparent:
        "bg-transparent transition hover:bg-gray-500/20 active:bg-gray-500/30 text-gray-300 hover:text-white",
      white:
        "bg-transparent transition hover:bg-gray-500/20 active:bg-gray-500/30 text-white",
    },
    size: {
      small: "p-1.5 text-base",
      default: "p-3 text-xl",
      bigIcon: "p-3 text-2xl",
    },
    shape: {
      square: "rounded-sm",
      circle: "rounded-full",
    },
  },
  compoundVariants: [
    {
      variant: ["transparent", "white"],
      className: 'disabled:text-gray-500'
    },
  ],
  defaultVariants: { variant: "transparent", size: "default", shape: "circle" },
});

type BaseIconButtonProps = {
  icon: string;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof iconButton>;

export default function BaseIconButton({
  variant,
  size,
  shape,
  icon = "ph:placeholder",
  ...props
}: BaseIconButtonProps) {
  return (
    <button className="flex" {...props}>
      <Icon className={iconButton({ shape, variant, size })} icon={icon} />
    </button>
  );
}
