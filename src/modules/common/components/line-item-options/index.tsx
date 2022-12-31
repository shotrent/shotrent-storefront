import useProductPrice from "@lib/hooks/use-product-price"
import { ProductVariant } from "@medusajs/medusa"
import { useMemo } from "react"

type LineItemOptionsProps = { variant: ProductVariant, quantity?:number, className?:string }

const LineItemOptions = ({ variant, quantity, className }: LineItemOptionsProps) => {
  const price = useProductPrice({variantId:variant.id, id: variant.product_id})
  const selectedPrice = useMemo(() => {
    const { variantPrice, cheapestPrice } = price

    return variantPrice || cheapestPrice || null
  }, [price]);
  const rentalPeriod = variant.options[0]? variant.options[0].value : 1;


  return (
    <div className={className||"text-sm text-gray-600 mt-2"}>      
      <p>{selectedPrice?.calculated_price} per month for {rentalPeriod} month{rentalPeriod>1?'s':''}</p>
      <p>Quantity: {quantity}</p>
    </div>
  )
}

export default LineItemOptions
