import { Icon } from '@iconify-icon/react/dist/iconify.js'
import { cva, VariantProps } from 'class-variance-authority'
import { ButtonHTMLAttributes } from 'react'

import styles from './IconButton.module.scss'

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
      variant: ['transparent'],
      className: styles.disabled,
    },
  ],
  defaultVariants: { variant: 'transparent', size: 'default', shape: 'circle' },
})

type IconButtonProps = {
  icon: string
} & ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof iconButton>

export function IconButton({
  variant,
  size,
  shape,
  icon = 'ph:placeholder',
  ...props
}: IconButtonProps) {
  return (
    <button {...props}>
      <Icon className={iconButton({ shape, variant, size })} icon={icon} />
    </button>
  )
}
