import type {ProductCard, UnformattedProduct, UnformattedProductImage} from '@/shared/types/product';

const imgUrl = (product: UnformattedProductImage) => {
  return product.Image_URL?.trim() || product.image_url?.trim() || ''
}

const getMainImageUrl = (product: UnformattedProduct)=> {
  const imagesArr = product.images ?? []

  return (
    imagesArr.find((p) => p.MainImage && imgUrl(p)) ||
    imagesArr.find((p) => p.position === 'product'  && imgUrl(p)) ||
    imagesArr.find((p) => imgUrl(p)) ||
    null
  )
}

export const toProductCard = (product: UnformattedProduct) :ProductCard => {
  const mainImage = getMainImageUrl(product)
  const imageUrl = mainImage ?  imgUrl(mainImage) : 'placeholder.jpg'
  const imageTitle = mainImage && imageUrl
    ? mainImage.title?.trim()
    : null

  const price = product.price || null
  const old = product.old_price || null
  const hasDiscount = price !== null && old !== null && old > price
  const discount = hasDiscount ? Math.round ((1 - price/old) * 100) : null

  const marks = (product.marks).map((mark) => ({
    label: mark.Mark_Name,
    color: mark.color_code ?? 'var(--color-black)',
  }))

  return {
    id: product.id,
    name: product.name,
    imageUrl,
    imageTitle,
    marks,
    price,
    oldPrice: hasDiscount ? old : null,
    discount,
  }
}