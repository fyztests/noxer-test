import Field from '@/shared/ui/Field'
import { useContext, useEffect } from 'react'
import { CatalogContext } from '@/entities/catalog/model/CatalogContext'
import IconBase from '@/shared/ui/icons/IconBase'
import Button from '@/shared/ui/Button'
import useSearch from '@/entities/search/useSearch'
import productsAPI from '@/shared/api'
import styles from './SearchProductsForm.module.scss'

const SearchProducts = () => {
  const {
    setIsQuickSearch,
    fastKeys,
    setFastKeys,
    isSearchFocused,
    setIsSearchFocused
  } = useSearch()

  const {
    filteredCatalog,
    searchQuery,
    setSearchQuery,
    searchByFastKeys,
  } = useContext(CatalogContext)!

  const isQueryEmpty = !searchQuery.trim()
  const showOftenSearches = isSearchFocused && isQueryEmpty && fastKeys.length > 0
  const showResults = isSearchFocused && !isQueryEmpty
  const isEmptyFilteredCatalog = filteredCatalog?.length === 0

  const handleSearch = (item: string) => {
    setSearchQuery(item)
    searchByFastKeys(item)
    setIsSearchFocused(true)
  }

  useEffect(() => {
    if (setIsQuickSearch) {
      setIsQuickSearch(isSearchFocused)
    }
  }, [isSearchFocused])

  useEffect(() => {
    productsAPI.getFastSearches().then((keys: string[]) => {
      setFastKeys(keys)
    })
  }, []);

  return (
    <div className={styles.searchWrapper}>
      <form
        className={styles.form}
        onSubmit={(event) => event.preventDefault()}
      >
        <Field
          className={styles.field}
          label='Найти товары'
          id='search-products'
          type='search'
          value={searchQuery}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => {
            setIsSearchFocused(false)
            setSearchQuery('')
          }}
          onChange={(event) => setSearchQuery(event.target.value)}
        >
          <IconBase
            className={styles.iconSearch}
            name='search'
            width={17}
            height={17}
            aria-label='Иконка Поиска'
          />
        </Field>
      </form>

      {isEmptyFilteredCatalog && (
        <div className={styles.errorMessage}>Товар не найден</div>
      )}

      {showOftenSearches && (
        <div className={styles.oftenSearchesWrapper}>
          <h2 className={styles.oftenSearchesTitle}>Часто ищут</h2>
          <ul className={styles.oftenSearchesList}>
            {fastKeys.map((item: string) => (
              <li className={styles.oftenSearchesItem} key={item}>
                <button className={styles.oftenSearchesItemButton}
                  type='button'
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => handleSearch(item)}
                >
                  <IconBase
                    className={styles.oftenSearchesItemButtonIcon}
                    name='search'
                    width={10}
                    height={10}
                    aria-label='Иконка Поиска'
                  />
                  {item}
                </button>
              </li>
            ))}
          </ul>



        </div>
      )}

      {(showResults && !isEmptyFilteredCatalog) && (
        <div className={styles.cards}>
          <Button
            className={styles.searchButton}
            variant='dark'
            onClick={(event) => event.preventDefault()}
          >
            Перейти
          </Button>
          <ul className={styles.products}>
            {filteredCatalog?.map((product) => (
              <li className={styles.product} key={product.id}>
                <a className={styles.productLink} href="#" aria-label='Ссылка на товар'></a>
                <img
                  className={styles.itemImage}
                  src={product.imageUrl || ''}
                  alt={product.imageTitle || product.name || ''}
                  width={52}
                  height={52}
                  loading='lazy'
                />
                <div className={styles.info}>
                  <span className={styles.cardTitle}>{product.name}</span>
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
                </div>
              </li>
            ))}

            {(!filteredCatalog) && (
              <div className={styles.errorMessage}>Товар закончился</div>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

export default SearchProducts