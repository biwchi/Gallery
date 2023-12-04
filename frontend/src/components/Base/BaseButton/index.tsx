import styles from "./index.module.scss";

import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { VariantProps, cva } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";

const button = cva(styles.button, {
  variants: {
    variant: {
      base: styles.buttonBase,
    },
    size: {
      default: styles.sizeDefault,
    },
    display: {
      block: styles.displayBlock,
    },
  },
  compoundVariants: [
    {
      variant: ["base"],
      class: styles.disabled,
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
  children?: JSX.Element;
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
    <button
      {...props}
      className={button({ variant, size, display }) + " " + className}
    >
      {leftIcon && <Icon className={styles.iconLeft} icon={leftIcon} />}
      <span>{children || text}</span>
      {loading && <Icon className={styles.loader} icon="ph:spinner" />}
      {rightIcon && !loading && (
        <Icon className={styles.iconRight} icon={rightIcon} />
      )}
    </button>
  );
}
