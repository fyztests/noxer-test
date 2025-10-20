import {CatalogProvider} from '@/entities/catalog/model/CatalogContext'
import SearchProductsForm from '@/features/search-products/SearchProductsForm'
import {SearchProvider} from '@/entities/search/SearchContext'
import useSearch from '@/entities/search/useSearch'
import Categories from '@/widgets/Categories'
import PromoList from '@/widgets/PromoList/PromoList'
import TopBar from '@/widgets/TopBar'
import {useEffect, useMemo} from 'react'
import type {FilterBody} from '@/shared/types/filter'
import useCatalog from '@/entities/catalog/model/useCatalog'
import GridInfinite from '@/widgets/GridInfinite/GridInfinite'

const PageContent = () => {
  const { isQuickSearch } = useSearch()
  const { searchQuery } = useCatalog()

  const filters: FilterBody = useMemo(() => ({
    search: searchQuery || undefined,
  }), [searchQuery])

  useEffect(() => {
    const root = document.getElementById('catalog-root')
    if (root) root.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    else window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [filters])

  return (
    <>
      <TopBar />
      <h1 className="visually-hidden">Каталог товаров</h1>
      <SearchProductsForm />
      <section
        id='catalog-root'
        aria-hidden={isQuickSearch ? 'true' : undefined}
        hidden={isQuickSearch}
        style={{ overflow: 'auto', maxHeight: '100dvh' }}
      >
        <PromoList />
        <Categories />
        <GridInfinite filters={filters} />
      </section>
    </>
  )
}

const CatalogPage = () => {
  return (
    <SearchProvider>
      <CatalogProvider>
        <PageContent />
      </CatalogProvider>
    </SearchProvider>
  )
}

export default CatalogPage
