import Button from "@modules/common/components/button"
import Spinner from "@modules/common/icons/spinner"
import { useCustomerOrders } from "medusa-react"
import Link from "next/link"
import OrderCard from "../order-card"

const ListingOverview = () => {
 
  return (
    <div className="w-full flex flex-col items-center gap-y-4">
      <h2 className="text-large-semi">Nothing to see here</h2>
      <p className="text-base-regular">
        You don&apos;t have any listings yet, let us change that {":)"}
      </p>
      <div className="mt-4">
        <Link href="/listings/create" passHref>
          <Button>Create Listing</Button>
        </Link>
      </div>
    </div>
  )
}

export default ListingOverview
