import * as React from 'react'
import styles from './IconBase.module.scss'
import classNames from 'classnames'
import IconClose from '@/shared/assets/icons/icon-close.svg?react'
import IconArrowDown from '@/shared/assets/icons/icon-arrow-down.svg?react'
import IconArrowLeft from '@/shared/assets/icons/icon-arrow-left.svg?react'
import IconMoreDots from '@/shared/assets/icons/icon-more-dots.svg?react'
import IconTgBig from '@/shared/assets/icons/icon-tg-big.svg?react'
import IconTgSmall from '@/shared/assets/icons/icon-tg-small.svg?react'
import IconSearch from '@/shared/assets/icons/icon-search.svg?react'
import IconLike from '@/shared/assets/icons/icon-like.svg?react'
import IconHome from '@/shared/assets/icons/icon-home.svg?react'
import IconCatalog from '@/shared/assets/icons/icon-catalog.svg?react'
import IconCart from '@/shared/assets/icons/icon-cart.svg?react'
import IconAccount from '@/shared/assets/icons/icon-account.svg?react'


export const ICONS = {
  close: IconClose,
  arrowDown: IconArrowDown,
  arrowLeft: IconArrowLeft,
  moreDots: IconMoreDots,
  tgBig: IconTgBig,
  tgSmall: IconTgSmall,
  search: IconSearch,
  like: IconLike,
  home: IconHome,
  catalog: IconCatalog,
  cart: IconCart,
  account: IconAccount,
}
export type IconName = keyof typeof ICONS

type IconProps = {
  name: IconName,
  width?: number | string,
  height?: number | string,
  className?: string,
  hasFill?: boolean,
} & React.SVGProps<SVGSVGElement>

const IconBase = (props: IconProps) => {
  const {
    name,
    className = '',
    hasFill,
    children,
    ...rest
  } = props

  const Component = ICONS[name]

  return Component ?
        <Component
          className={classNames(styles.baseIcon,
            className,
            {[styles.isFill]: hasFill}
            )}
          {...rest}
        >
          {children}
        </Component>
        : null
}

export default IconBase
export type { IconProps }
