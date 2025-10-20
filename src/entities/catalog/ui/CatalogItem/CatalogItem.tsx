import type {ProductCard} from '@/shared/types/product'
import {memo, useState} from 'react'
import styles from './CatalogItem.module.scss'
import Button from '@/shared/ui/Button';
import IconBase from '@/shared/ui/icons/BaseIcon';
import classNames from 'classnames';

type CatalogItemProps = {
  className?: string
  product: ProductCard
}

const CatalogItem = (props: CatalogItemProps) => {
  const {
    product,
  } = props

  const [isActive, setActive] = useState(false)
  const hasMarks = product.marks?.length > 0

  return (
    <li>
      <div className={styles.item}>
        <img
          className={styles.itemImage}
          src={product.imageUrl}
          alt={product.imageTitle || product.name || ''}
          width={169}
          height={169}
          loading='lazy'
        />
        {hasMarks && (
          <ul className={styles.marks}>
            {product.marks?.map(({label, color}) => (
              <li
                key={`${product.id}-${label}`}
                className={styles.mark}
                style={{backgroundColor: color}}
              >
                {label}
              </li>
            ))}
          </ul>
        )}
        <Button
          className={classNames(styles.buttonLike, {
            [styles.isActive]: isActive
          })}
          variant='iconSmall'
          onClick={() => setActive(!isActive)} // ьтут будет логика лайков
        >
          <IconBase
            name='like'
            width={20}
            height={20}
            hasFill={isActive ?? true}
          />
        </Button>
        <div className={styles.info}>
          <div className={styles.priceWrapper}>
            {product.price && (
              <span className={styles.price}>{product.price}</span>
            )}
            {product.oldPrice && (
              <span className={styles.oldPrice}>{product.oldPrice}</span>
            )}
            {product.discount && (
              <span className={styles.discount}>{`-${product.discount}%`}</span>
            )}
          </div>
          <h3 className={styles.cardTitle}>{product.name}</h3>
        </div>
        <Button variant='light'>Выбрать</Button>
      </div>
    </li>
  )
}

export default memo(CatalogItem)