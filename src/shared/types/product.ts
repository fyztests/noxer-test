export type ProductMark = {
  Mark_Name: string
  color_code: string | null
}

export type UnformattedProductImage = {
  Image_URL?: string
  image_url?: string
  MainImage?: boolean
  position?: 'product' | 'parameters' | null
  sort_order?: number | null
  title?: string | null
}

export type UnformattedProduct = {
  id: number
  name: string
  price: number | null
  old_price: number | null
  marks: ProductMark[]
  images: UnformattedProductImage[]
}

export type ProductCard = {
  id: number
  name: string
  imageUrl: string
  imageTitle?: string | null
  marks: {
    label: string
    color: string
  }[]
  price: number | null
  oldPrice: number | null
  discount: number | null
}
