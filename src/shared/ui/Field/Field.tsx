import type { ChangeEvent, HTMLInputTypeAttribute, ReactNode } from 'react'
import styles from './Field.module.scss'

type FieldProps = {
  id: string
  label: string
  className?: string
  type: HTMLInputTypeAttribute
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  value?: string
  onFocus: () => void
  onBlur: () => void
  children?: ReactNode
}

const Field = (props: FieldProps) => {
  const {
    className = '',
    id,
    label,
    type = 'text',
    onChange,
    value,
    onFocus,
    onBlur,
    children,
  } = props

  const hasIcon = Boolean(children)

  return (
    <div className={`${styles.field} ${className}`}>
      <input
        className={styles.input}
        id={id}
        placeholder={label}
        aria-label={label}
        autoComplete='off'
        type={type}
        onChange={onChange}
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
      />

      {hasIcon && (
        <div className={styles.icon}>{children}</div>
      )}
    </div>
  )
}

export default Field