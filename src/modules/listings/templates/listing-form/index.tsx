import Addresses from "@modules/checkout/components/addresses"
import Payment from "@modules/checkout/components/payment"
import Shipping from "@modules/checkout/components/shipping"
import ProductDetails from "@modules/listings/components/product-details"
import { useCart } from "medusa-react"

const ListingForm = () => {

  return (
    <div>
      <div className="w-full grid grid-cols-1 gap-y-8">
          <ProductDetails />
      </div>
    </div>
  )
}

export default ListingForm
