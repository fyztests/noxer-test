import {createContext,useContext, useMemo} from 'react'
import type { ReactNode } from 'react'
import useCatalog from '@/entities/catalog/model/useCatalog';

type Ctx = ReturnType<typeof useCatalog>
export const CatalogContext = createContext<Ctx | undefined>(undefined)
CatalogContext.displayName = 'CatalogContext'

type CatalogProviderProps = {
  children: ReactNode
}

export const useCatalogContext = () => {
  const ctx = useContext(CatalogContext)
  if (!ctx) throw new Error('useCatalogContext must be used within CatalogProvider')
  return ctx
}

export const CatalogProvider = (props: CatalogProviderProps) => {
  const { children } = props

  const {
    catalog,
    filteredCatalog,
    searchQuery,
    setSearchQuery,
    searchByFastKeys,
    categories,
    setCategories,
  } = useCatalog()

  const value = useMemo(() => ({
    catalog,
    filteredCatalog,
    searchQuery,
    setSearchQuery,
    searchByFastKeys,
    categories,
    setCategories,
  }), [
    catalog,
    filteredCatalog,
    searchQuery,
    setSearchQuery,
    searchByFastKeys,
    categories,
    setCategories,
  ])

  return (
    <CatalogContext.Provider value={value}>
      {children}
    </CatalogContext.Provider>
  )
}