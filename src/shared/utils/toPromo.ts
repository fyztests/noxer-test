import type {PromoItem, UnformattedAction} from '@/shared/types/promos';

const makeAriaLabel = (action: UnformattedAction) => {
  return (action.description ?? 'Акция').trim()
}

export const toPromo = (action: UnformattedAction): PromoItem | null => {
  if (action?.image_url) {
    return {
      id: action.id,
      image: action.image_url,
      ariaLabel: makeAriaLabel(action),
      order: action.sort_order ?? 0,
    }
  }

  return null
}