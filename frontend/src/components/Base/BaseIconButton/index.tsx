import styles from "./index.module.scss";

import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { VariantProps, cva } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";

const iconButton = cva(styles.button, {
  variants: {
    variant: {
      transparent: styles.transparent,
    },
    size: {
      small: styles.small,
      default: styles.default,
      bigIcon: styles.bigIcon,
    },
    shape: {
      square: styles.square,
      circle: styles.circle,
    },
  },
  compoundVariants: [
    {
      variant: ["transparent"],
      className: styles.disabled,
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
    <button {...props}>
      <Icon className={iconButton({ shape, variant, size })} icon={icon} />
    </button>
  );
}
