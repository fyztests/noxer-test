import {memo} from 'react'
import CatalogItem from '@/entities/catalog/ui/CatalogItem';
import styles from './CatalogList.module.scss'
import BaseIcon from '@/shared/ui/icons/BaseIcon.tsx';
import {useInfiniteProducts} from '@/entities/catalog/model/useInfiniteProducts.ts';
import Button from '@/shared/ui/Button';
import type {FilterBody} from '@/shared/types/filter.ts';

type Props = {
  filters: FilterBody
}

const CatalogList = ({ filters }: Props) => {
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteProducts(filters, 50)

  const items = data?.pages.flatMap(p => p.items) ?? []

  return (
    <>
      {(isLoading && !items.length)  && (
        <div>Загрузка…</div>
      )}

      {isError && (
        <div>Ошибка загрузки: {(error as Error)?.message ?? 'unknown'}</div>
      )}

      {(items.length === 0 && !isLoading) && (
        <div>Ничего не найдено</div>
      )}

      <div className={styles.wrapper}>
        <div className={styles.catalogWrapper}>
          <ul className={styles.list}>
            {items.map((product) => (
              <CatalogItem
                key={product.id}
                product={product}
              />
            ))}
          </ul>

          {hasNextPage && (
            <Button
              className={styles.buttonMore}
              type="button"
              variant="ghost"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? 'Загрузка…' : 'Показать ещё'}
            </Button>
          )}
        </div>

        <div className={styles.footer}>
          <span className={styles.text}>Разработано на платформе Noxer</span>
          <a
            className={styles.link}
            href="https://t.me/noxerai_bot"
            target="_blank"
          >
            <BaseIcon
              className={styles.linkIcon}
              name='tgSmall'
              width={11}
              height={10}
              aria-label='Иконка Telegram'
            />
            noxerai_bot
          </a>
        </div>
      </div>
    </>

  )
}

export default memo(CatalogList)