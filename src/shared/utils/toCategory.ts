import type {Category, UnformattedCategory} from '@/shared/types/categories';

const getImageUrl = (category: UnformattedCategory) => {
  const imageUrl = category.Category_Image?.trim()
  if (!imageUrl) {
    const firstWithUrl = category.category_images?.find(img => img.url?.trim())

    return firstWithUrl?.url?.trim() ?? null
  }

  return imageUrl
}

export const toCategory = (category: UnformattedCategory): Category => ({
  id: category.Category_ID,
  name: category.Category_Name,
  imageUrl: getImageUrl(category),
  parentId: category.parent_category_id,
  sortOrder: category.sort_order ?? 0,
})