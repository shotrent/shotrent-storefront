import { Listing } from "@lib/models/listing"
import Button from "@modules/common/components/button"
import ListingDetails from "@modules/listings/components/listing-details"
import ListingOrderOverview from "@modules/listings/components/listing-orders"
import Link from "next/link"

import React from "react"

type ListingDetailsTemplateProps = {
  listing: Listing
}

const ListingDetailsTemplate: React.FC<ListingDetailsTemplateProps> = ({
  listing,
}) => {
  return (
    <div className="content-container flex justify-center">
      <div className="max-w-4xl h-full bg-white w-full">
        <div className="flex justify-end">
          <Link href={`/account/listings/edit/${listing.id}`}>
            <a>
              <Button variant="secondary">Edit</Button>
            </a>
          </Link>
        </div>
        <ListingDetails listing={listing} showStatus />
        <div className="p-10">
          <h2 className="text-xl font-bold mb-8">Listing orders</h2>
          <ListingOrderOverview listingId={listing.id} />
        </div>
      </div>
    </div>
  )
}

export default ListingDetailsTemplate
