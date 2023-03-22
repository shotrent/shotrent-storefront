import Button from "@modules/common/components/button"
import Link from "next/link"
import ListingOverview from "../components/listing-overview"
import OrderOverview from "../components/order-overview"

const ListingTemplate = () => {
  return (
    <div className="w-full">
      <div className="mb-8 flex justify-between">
        <div className="flex flex-col gap-y-4">
          <h1 className="text-2xl-semi">Listings</h1>
          <p className="text-base-regular">
            View your listings.
          </p>
        </div>

        <div>
          <Link href="/account/listings/create" passHref>
            <Button>Create a Listing</Button>
          </Link>
        </div>
      </div>
      <div>
        <ListingOverview />
      </div>
    </div>
  )
}

export default ListingTemplate
