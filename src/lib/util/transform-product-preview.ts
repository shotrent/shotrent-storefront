import { getPercentageDiff } from "@lib/util/get-precentage-diff"
import { Product, Region } from "@medusajs/medusa"
import { formatAmount } from "medusa-react"
import { ProductPreviewType } from "types/global"
import { CalculatedVariant } from "types/medusa"

const transformProductPreview = (
  product: Product,
  region: Region
): ProductPreviewType => {
  const variants = product.variants as CalculatedVariant[]

  const cheapestVariant = variants.reduce((acc, curr) => {
    if (acc.calculated_price < curr.calculated_price) {
      return acc
    }
    return curr
    
  })


  return {
    id: product.id,
    title: product.title,
    handle: product.handle,
    thumbnail: product.thumbnail,
    price: {
      calculated_price: formatAmount({
        amount: cheapestVariant.calculated_price,
        region: region,
        includeTaxes: false,
      }).slice(0, -3),
      original_price: formatAmount({
        amount: cheapestVariant.original_price,
        region: region,
        includeTaxes: false,
      }).slice(0, -3),
      difference: getPercentageDiff(
        cheapestVariant.original_price,
        cheapestVariant.calculated_price
      ).slice(0, -3),
      price_type: cheapestVariant.calculated_price_type,
    },
    isRentedOut: variants.every(v=>!v.allow_backorder)
  }
}

export default transformProductPreview
