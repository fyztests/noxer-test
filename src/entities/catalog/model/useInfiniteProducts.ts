import { useInfiniteQuery } from '@tanstack/react-query'
import productsAPI from '@/shared/api'
import type {FilterBody} from '@/shared/types/filter'

export const useInfiniteProducts = (filters: FilterBody, perPage = 50) =>
  useInfiniteQuery({
    queryKey: ['products', 'filter', filters, perPage],
    queryFn: ({ pageParam = 1 }) =>
      productsAPI.getFiltered(filters, { page: pageParam, per_page: perPage }),
    initialPageParam: 1,
    getNextPageParam: (last) => last.nextPage,
  })