import {useState, useMemo, useEffect} from "react"
import type {ProductCard} from '@/shared/types/product'
import productsAPI from '@/shared/api';
import type {Category} from '@/shared/types/categories'

const useCatalog = () => {
  const [catalog, setCatalog] = useState<ProductCard[]>([])
  const [categories, setCategories] = useState<Category[]>([]);
  // дописать логику зазгрузки и ошибки
  // const [loading, setLoading] = useState<boolean>(true)
  // const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCatalog = useMemo(() => {
    const clearSearchQuery = searchQuery.trim().toLowerCase()

    return clearSearchQuery.length > 0
      ? catalog.filter(({ name }) => name.toLowerCase().includes(clearSearchQuery))
      : null
  }, [searchQuery, catalog]) // тк изменяется

  const searchByFastKeys = (key: string) => {
    setSearchQuery(key)
  }

  useEffect(() => {
    productsAPI.getAllProducts().then((products: ProductCard[]) => {
      setCatalog(products)
    })
    productsAPI.getCategories().then((categories: Category[])=> {
      setCategories(categories)
    })
  }, []) // для первой загрузки единоразовой

  return {
    catalog,
    filteredCatalog,
    searchQuery,
    setSearchQuery,
    searchByFastKeys,
    categories,
    setCategories
  }
}

export default useCatalog;