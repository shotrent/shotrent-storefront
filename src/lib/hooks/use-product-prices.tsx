import { formatAmount, useCart, useProducts } from "medusa-react"
import { useMemo } from "react"
import { CalculatedVariant } from "types/medusa"

type useProductPricesProps = {
  id: string
}

const useProductPrices = ({ id }: useProductPricesProps) => {
  const { cart } = useCart()

  const { products, isLoading, isError } = useProducts(
    {
      id: id,
      cart_id: cart?.id,
    },
    { enabled: !!cart }
  )

  const product = products?.[0]

  const getPercentageDiff = (original: number, calculated: number) => {
    const diff = original - calculated
    const decrease = (diff / original) * 100

    return decrease.toFixed()
  }

  const cheapestPrice = useMemo(() => {
    if (!product || !cart?.region) {
      return null
    }

    const variants = product.variants as CalculatedVariant[]

    const cheapestVariant = variants.reduce((prev, curr) => {
      return prev.calculated_price < curr.calculated_price ? prev : curr
    })

    return {
      calculated_price: formatAmount({
        amount: cheapestVariant.calculated_price,
        region: cart.region,
        includeTaxes: false,
      }),
      original_price: formatAmount({
        amount: cheapestVariant.original_price,
        region: cart.region,
        includeTaxes: false,
      }),
      price_type: cheapestVariant.calculated_price_type,
      percentage_diff: getPercentageDiff(
        cheapestVariant.original_price,
        cheapestVariant.calculated_price
      ),
    }
  }, [product, cart])

  const variantPrices = useMemo(() => {
    if(!cart || !cart.region|| !product || !product.variants) return [];
    const variants = product.variants as CalculatedVariant[]
    return variants.map(variant=> ({
        calculated_price: formatAmount({
          amount: variant.calculated_price,
          region: cart.region,
          includeTaxes: false,
        }),
        original_price: formatAmount({
          amount: variant.original_price,
          region: cart.region,
          includeTaxes: false,
        }),
        price_type: variant.calculated_price_type,
        percentage_diff: getPercentageDiff(
          variant.original_price,
          variant.calculated_price
        ),
      }));
  }, [product, cart])

  return {
    product,
    cheapestPrice,
    variantPrices,
    isLoading,
    isError,
  }
}

export default useProductPrices
