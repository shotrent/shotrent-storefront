import { Listing } from "@lib/models/listing"
import order from "@medusajs/medusa/dist/services/order"
import Button from "@modules/common/components/button"
import Link from "next/link"


type ListingDetailsProps = {
  listing: Listing
  showStatus?: boolean
}

const ListingDetails = ({ listing, showStatus }: ListingDetailsProps) => {
 
  const formatStatus = (str: string) => {
    const formatted = str.split("_").join(" ")

    return formatted.slice(0, 1).toUpperCase() + formatted.slice(1)
  }

  return (
    <div className="p-10 border-b border.gray-200">      
      <h1 className="mt-2 uppercase text-large-semi">{listing.title}</h1>
      <span className="uppercase text-xs">{listing.id.split("listing_")[1]}</span>
      <div className="flex items-center text-gray-700 text-small-regular gap-x-4 mt-4">
        <span>{new Date(listing.created_at).toDateString()}</span>
       
        {showStatus && (
          <>
            <span>{formatStatus(listing.status)}</span>
          </>
        )}
      </div>      
    </div>
  )
}

export default ListingDetails
