import { Listing } from "@lib/models/listing"
import Button from "@modules/common/components/button"
import Thumbnail from "@modules/products/components/thumbnail"
import { formatAmount } from "medusa-react"
import Link from "next/link"
import { useMemo } from "react"

type ListingCardProps = {
  listing: Omit<Listing, "beforeInsert">
}

const ListingCard = ({ listing }: ListingCardProps) => {
  const formatStatus = (str: string) => {
    const formatted = str.split("_").join(" ")

    return formatted.slice(0, 1).toUpperCase() + formatted.slice(1)
  }

  return (
    <div className="bg-white flex flex-col">
      <div className="uppercase text-base-semi mb-1">{listing.title}</div>
      <div className="uppercase text-xs mb-4">{listing.id}</div>
      <div className="flex items-center divide-x divide-gray-200 text-small-regular text-gray-700">
        <span className="pr-2">
          {new Date(listing.created_at as string).toDateString()}
        </span>
        <span className="px-2">
          {formatStatus(listing.status)}
        </span>
      </div>
      <div className="grid grid-cols-2 small:grid-cols-4 gap-4 my-4">
        
      </div>
      <div className="flex justify-end">
        <Link href={`/account/listings/details/${listing.id}`}>
          <a>
            <Button variant="secondary">See details</Button>
          </a>
        </Link>
      </div>
    </div>
  )
}

export default ListingCard
