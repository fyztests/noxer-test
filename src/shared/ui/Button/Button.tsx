import classNames from 'classnames';
import type { ReactNode, ButtonHTMLAttributes } from 'react'
import styles from './Button.module.scss'

type Variant = 'ghost' | 'light' | 'dark' | 'icon' | 'iconSmall'

export type ButtonProps = {
  children?: ReactNode
  className?: string
  variant?: Variant
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button = (props: ButtonProps) => {
  const {
    className = '',
    type = 'button',
    children,
    variant = 'light',
    ...rest
  } = props

  return (
    <button
      className={classNames(styles.button,
        variant === 'ghost' && styles.buttonGhost,
        variant === 'light' && styles.buttonLight,
        variant === 'dark' && styles.buttonDark,
        variant === 'icon' && styles.buttonIcon,
        variant === 'iconSmall' && styles.buttonIconSmall,
        className
        )}
      type={type}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button