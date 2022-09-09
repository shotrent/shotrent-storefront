import useProductPrice from "@lib/hooks/use-product-price"
import { ProductVariant } from "@medusajs/medusa"
import { useMemo } from "react"

type LineItemOptionsProps = { variant: ProductVariant, quantity:number }

const LineItemOptions = ({ variant, quantity }: LineItemOptionsProps) => {
  const price = useProductPrice({variantId:variant.id, id: variant.product_id})
  const selectedPrice = useMemo(() => {
    const { variantPrice, cheapestPrice } = price

    return variantPrice || cheapestPrice || null
  }, [price])
  return (
    <div className="text-gray-600 mt-4">
      <div>Rate: {selectedPrice?.calculated_price} / Day</div>
      <div>Number of days: {quantity}</div>
    </div>
    
  )
}

export default LineItemOptions
