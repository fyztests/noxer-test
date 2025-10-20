import {useState, useEffect} from 'react'
import productsAPI from '@/shared/api'
import classNames from 'classnames';
import type {PromoItem} from '@/shared/types/promos'
import styles from './PromoList.module.scss'

const PromoList = () => {
  const [promos, setPromos] = useState<PromoItem[]>([])
  const [current, setCurrent] = useState(0)

  const handleDotClick = (index: number) => {
    setCurrent(index)
  }

  useEffect(() => {
    productsAPI.getPromos().then((data: PromoItem[]) => {
      setPromos(data)
    })
  }, [])

  useEffect(() => {
    if (promos.length && current > promos.length - 1) setCurrent(0)
  }, [promos.length, current])

  if (!promos.length) return null
  const currentPromo = promos[current]

  return (
    <div className={styles.promo}>
      <div className={styles.banner}>
        <img
          className={styles.img}
          src={currentPromo.image}
          alt={currentPromo.ariaLabel}
          loading="lazy"
        />
      </div>

      <div className={styles.pagination}>
        {promos.map((promo, index) => (
          <button
            key={promo.id ?? index}
            onClick={() => handleDotClick(index)}
            className={classNames(styles.dot, {
              [styles.active]:  index === current,
            })}
            type='button'
            aria-label={`Перейти к баннеру ${index + 1}`}
            disabled={index === current}
          />
        ))}
      </div>
    </div>
  )
}

export default PromoList