import useMedusaClient, { PaginateResponse } from "@lib/hooks/use-medusa-client"
import { Listing } from "@lib/models/listing"
import orders from "@medusajs/medusa/dist/api/routes/admin/orders"
import Button from "@modules/common/components/button"
import Spinner from "@modules/common/icons/spinner"
import { useCustomerOrders } from "medusa-react"
import Link from "next/link"
import router from "next/router"
import { useEffect } from "react"
import ListingCard from "../listing-card"

const ListingOverview = () => {
  const {data, error, isLoading, sendRequest} = useMedusaClient<PaginateResponse<Listing>>()

  useEffect(()=>{
     sendRequest("GET", '/store/listings');    
  },[])

  if (isLoading) {
    return (
      <div className="text-gray-900 w-full flex justify-center pt-12">
        <Spinner size={36} />
      </div>
    )
  }

  if (data && data.data.length) {
    return (
      <div className="flex flex-col gap-y-8 w-full">
        {data.data.map((l) => (
          <div
            key={l.id}
            className="border-b border-gray-200 pb-6 last:pb-0 last:border-none"
          >
            <ListingCard listing={l} />
          </div>
        ))}
      </div>
    )
  }

 
  return (
    <div className="w-full flex flex-col items-center gap-y-4">
      <h2 className="text-large-semi">Nothing to see here</h2>
      <p className="text-base-regular">
        You don&apos;t have any listings yet, let us change that {":)"}
      </p>
    </div>
  )
}

export default ListingOverview
