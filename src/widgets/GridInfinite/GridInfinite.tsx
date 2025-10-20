import { useEffect, useRef } from 'react'
import { useInfiniteProducts } from '@/entities/catalog/model/useInfiniteProducts'
import type { FilterBody } from '@/shared/types/filter'
import CatalogList from '@/entities/catalog/ui/CatalogList';

type Props = {
  filters: FilterBody
}
const GridInfinite = (props: Props) => {
  const {
    filters
  } = props

  const {
    hasNextPage,
    fetchNextPage,
  } = useInfiniteProducts(filters, 50)

  const sentinelRef = useRef<HTMLLIElement | null>(null)
  const inFlightRef = useRef(false)
  const observerRef = useRef<IntersectionObserver | null>(null)


  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return
    const el = sentinelRef.current
    if (!el) return

    const root = document.getElementById('catalog-root') ?? null

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        if (!hasNextPage) return
        if (inFlightRef.current) return
        inFlightRef.current = true
        io.unobserve(el)

        fetchNextPage()
          .finally(() => {
            inFlightRef.current = false
            if (hasNextPage) io.observe(el)
          })
      },
      { root, rootMargin: '300px', threshold: 0.01 }
    )

    observerRef.current = io
    io.observe(el)

    return () => {
      inFlightRef.current = false
      observerRef.current?.disconnect()
      observerRef.current = null
    }
  }, [])
  useEffect(() => {
    if (!hasNextPage) {
      observerRef.current?.disconnect()
    }
  }, [hasNextPage])

  return (
    <CatalogList filters={filters}></CatalogList>
  )
}

export default GridInfinite