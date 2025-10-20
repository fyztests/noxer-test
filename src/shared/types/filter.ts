import type {ProductCard, UnformattedProduct} from '@/shared/types/product';

export type FilterBody = {
  category_ids?: number[]
  search?: string
}
export type FilterParams = {
  per_page?: number
  page?: number
}

export type Pagination = {
  current_page: number
  has_next: boolean
  has_prev: boolean
  per_page: number
  total_pages: number
  total_products: number
}

export type FilterResponse = {
  products: UnformattedProduct[]
  pagination: Pagination
}

export type FilteredPage = {
  items: ProductCard[]
  page: number
  perPage: number
  totalPages: number
  totalProducts: number
  hasNext: boolean
  hasPrev: boolean
  nextPage?: number
  prevPage?: number
}