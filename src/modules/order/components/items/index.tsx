import useEnrichedLineItems from "@lib/hooks/use-enrich-line-items"
import { LineItem, Region } from "@medusajs/medusa"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import Thumbnail from "@modules/products/components/thumbnail"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"
import Link from "next/link"
import { CalculatedVariant } from "types/medusa"

type ItemsProps = {
  items: LineItem[]
  region: Region
  cartId: string
}

const Items = ({ items, region, cartId }: ItemsProps) => {
  const enrichedItems = useEnrichedLineItems(items, cartId)

  return (
    <div className="p-10 border-b border-gray-200 gap-y-4 flex flex-col">
      {enrichedItems?.length
        ? enrichedItems.map((item) => {
            return (
              <div key={item.id}>
                <div className="grid grid-cols-[80px_1fr] gap-x-4" key={item.id}>
                <div className="w-[80px]">
                  <Thumbnail thumbnail={item.thumbnail} size="full" />
                </div>
                <div className="flex flex-col justify-between flex-1">
                  <div className="flex flex-col flex-1 text-small-regular">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-base font-semibold overflow-ellipsis overflow-hidden mr-4">
                          <Link
                            href={`/products/${item.variant.product.handle}`}
                          >
                            <a>{item.title}</a>
                          </Link>
                        </h3> 
                      </div>
                    </div>
                    <div className="flex">                       
                      <LineItemOptions variant={item.variant} />
                    </div>                    
                  </div>
                </div>
              </div>
              <div>
                  <div className="flex items-end justify-between mt-4">
                    <div className="text-base-regular text-gray-700">
                      Quantity: {item.quantity}
                    </div>
                    <LineItemPrice
                            quantity={item.quantity}
                            region={region}
                            variant={item.variant as CalculatedVariant} />
                  </div>
                </div>
              </div>
            )
          })
        : Array.from(Array(items.length).keys()).map((i) => {
            return <SkeletonLineItem key={i} />
          })}
    </div>
  )
}

export default Items
