import type { UnformattedProduct} from '@/shared/types/product'
import {toProductCard} from '@/shared/utils/toProductCard'
import type {UnformattedCategory} from '@/shared/types/categories';
import {toCategory} from '@/shared/utils/toCategory'
import {toPromo} from '@/shared/utils/toPromo'
import type {PromoItem, UnformattedAction} from '@/shared/types/promos'
import type {FilterBody, FilteredPage, FilterParams, FilterResponse} from '@/shared/types/filter';

const URL = 'https://noxer-test.ru/webapp/api/products'
const PER_PAGE = 50

type ApiDoc = {
  products: UnformattedProduct[]

  special_project_parameters_json?: {
    fast_search_strings?: {
      parameters_list?: string[]
    }
  }

  categories?: UnformattedCategory[]
  special_project_parameters_actions?: UnformattedAction[]
}

const isPromoItem = (p: unknown): p is PromoItem => Boolean(p)

async function fetchFiltered(
  body: FilterBody,
  { page = 1, per_page = PER_PAGE }: FilterParams = {}
) {
  const qs = new URLSearchParams({
    per_page: String(per_page),
    page: String(page),
  })
  const res = await fetch(`${URL}/filter?${qs}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body ?? {}),
  })
  if (!res.ok) throw new Error(`${res.status}`)

  const data: FilterResponse = await res.json()

  const items = (data.products ?? []).map(toProductCard)
  const p = data.pagination

  return {
    items,
    page: p.current_page,
    perPage: p.per_page,
    totalPages: p.total_pages,
    totalProducts: p.total_products,
    hasNext: p.has_next,
    hasPrev: p.has_prev,
    nextPage: p.has_next ? p.current_page + 1 : undefined,
    prevPage: p.has_prev ? p.current_page - 1 : undefined,
  }
}

const productsAPI = {
  getAllProducts: async () => {
    const response = await fetch(`${URL}/on_main`, {
      method: 'GET',
    })

    if (!response.ok) {
      throw new Error(`${response.status} `)
    }

    const data: ApiDoc = await response.json()
    const unformattedProducts = data.products ?? []

    return unformattedProducts
      .map(product => toProductCard(product))
  },

  getFastSearches: async () => {
    const response = await fetch(`${URL}/on_main`, {
      method: 'GET',
    })

    if (!response.ok) {
      throw new Error(`${response.status} `)
    }

    const data: ApiDoc = await response.json()
    return (
      data.special_project_parameters_json?.fast_search_strings?.parameters_list ??
      []
    )
  },

  getCategories: async () => {
    const response = await fetch(`${URL}/on_main`, {
      method: 'GET',
    })

    if (!response.ok) {
      throw new Error(`${response.status} `)
    }

    const data: ApiDoc = await response.json()
    const unformatted = data.categories ?? []

    return unformatted
      .map((category) => toCategory(category))
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
  },

  getPromos: async (): Promise<PromoItem[]> => {
    const response = await fetch(`${URL}/on_main`, {
      method: 'GET',
    })

    if (!response.ok) {
      throw new Error(`${response.status} `)
    }

    const data: ApiDoc = await response.json()
    const unformatted = data.special_project_parameters_actions ?? []
    return unformatted
      .map((promo) => toPromo(promo))
      .filter(isPromoItem)
      .sort((a, b) => (a?.order ?? 0) - (b?.order ?? 0))
  },

  getFiltered: (body: FilterBody, params?: FilterParams): Promise<FilteredPage> => {
    return fetchFiltered(body, params)
  }
}

export default productsAPI