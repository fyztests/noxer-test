export type UnformattedAction = {
  id: number
  action_type: string
  description?: string | null
  image_url?: string | null
  sort_order?: number | null
  url?: string | null
  extra_field_1?: string | null
  extra_field_2?: string | null
}

export type PromoItem = {
  id: number
  image: string
  ariaLabel: string
  order: number
}