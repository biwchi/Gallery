import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { VariantProps, cva } from "class-variance-authority";
import { HTMLAttributes } from "react";

const iconButton = cva("", {
  variants: {
    variant: {
      transparent:
        "bg-transparent transition hover:bg-gray-500/20 active:bg-gray-500/30 text-gray-300 hover:text-white",
    },
    size: {
      small: "p-1.5 text-base",
      default: "p-3 text-xl",
    },
    shape: {
      square: "rounded-sm",
      circle: "rounded-full",
    },
  },
  compoundVariants: [],
  defaultVariants: { variant: "transparent", size: "default", shape: "circle" },
});

type BaseIconButtonProps = {
  icon: string;
} & HTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof iconButton>;

export default function BaseIconButton({
  variant,
  size,
  shape,
  icon = "ph:placeholder",
  ...props
}: BaseIconButtonProps) {
  return (
    <button className="aspect-auto" {...props}>
      <Icon className={iconButton({ shape, variant, size })} icon={icon} />
    </button>
  );
}
