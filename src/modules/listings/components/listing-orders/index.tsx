import useMedusaClient, { PaginateResponse } from "@lib/hooks/use-medusa-client"
import { Order } from "@medusajs/medusa"
import OrderCard from "@modules/account/components/order-card"
import Button from "@modules/common/components/button"
import Spinner from "@modules/common/icons/spinner"
import { useCustomerOrders } from "medusa-react"
import Link from "next/link"
import { useEffect } from "react"

const ListingOrderOverview = ({listingId}:{listingId:string}) => {
  const { data, isLoading, sendRequest } = useMedusaClient<PaginateResponse<Order>>()

  useEffect(()=> {
    sendRequest('GET',`/store/listing/${listingId}/orders`);
  }, [])

  if (isLoading) {
    return (
      <div className="text-gray-900 w-full flex justify-center pt-12">
        <Spinner size={36} />
      </div>
    )
  }

  if (data?.data.length) {
    return (
      <div className="flex flex-col gap-y-8 w-full">
        {data.data.map((o) => (
          <div
            key={o.id}
            className="border-b border-gray-200 pb-6 last:pb-0 last:border-none"
          >
            <OrderCard order={o} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col items-center gap-y-4">
      <h2 className="text-large-semi">Nothing to see here</h2>
      <p className="text-base-regular">
        You don&apos;t have any orders yet!
      </p>     
    </div>
  )
}

export default ListingOrderOverview
