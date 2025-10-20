export type UnformattedCategory = {
  Category_ID: number
  Category_Name: string
  Category_Image?: string | null
  category_images?: { url?: string }[] | null
  parent_category_id: number | null
  sort_order: number
}

export type Category = {
  id: number
  name: string
  imageUrl: string | null
  parentId: number | null
  sortOrder: number
  children?: Category[]
}

