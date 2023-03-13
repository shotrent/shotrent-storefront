import { CheckoutProvider } from "@lib/context/checkout-context"
import Button from "@modules/common/components/button"
import ChevronDown from "@modules/common/icons/chevron-down"
import MedusaCTA from "@modules/layout/components/medusa-cta"
import ProductDetails from "@modules/listings/components/product-details"
import Link from "next/link"


const CreateListingTemplate = () => {
  return (
    <CheckoutProvider>
       <div className="w-full">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">Create Listing</h1>
        <p className="text-base-regular">
          Please enter below details
        </p>
      </div>
      <div>
        <ProductDetails/>
        <Button
            variant="primary"
            className="rounded-rounded mt-4"
          >
            {"Submit"}
          </Button>
      </div>
    </div>
      
    </CheckoutProvider>
  )
}

export default CreateListingTemplate
