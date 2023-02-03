import { useStore } from "@lib/context/store-context"
import { LineItem, Region } from "@medusajs/medusa"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import NativeSelect from "@modules/common/components/native-select"
import Trash from "@modules/common/icons/trash"
import DeliveryDate from "@modules/products/components/delivery-date"
import Thumbnail from "@modules/products/components/thumbnail"
import format from "date-fns/format"
import isValid from "date-fns/isValid"
import { useMemo } from "react"
import { CalculatedVariant } from "types/medusa"

type ItemProps = {
  item: Omit<LineItem, "beforeInsert">
  region: Region
}

const Item = ({ item, region }: ItemProps) => {
  const { updateItem, deleteItem } = useStore()
 
  return (
    <div>
      <div className="grid grid-cols-[80px_1fr] gap-x-4">
        <div className="w-[80px]">
          <Thumbnail thumbnail={item.thumbnail} size="full" />
        </div>
        <div className="text-base-regular flex flex-col gap-y-8">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-base font-semibold">{item.title}</span>
              <DeliveryDate />
                        
            </div>          
          </div>
        </div>      
      </div>
      <div className="text-base-regular"><LineItemOptions variant={item.variant} /></div>
      <div className="flex items-end justify-between text-small-regular mt-4">
              
        <div className="flex">
          <div className="mt-3 mr-1">Quantity:</div>
          <NativeSelect
            value={item.quantity}
            onChange={(value) =>
              updateItem({
                lineId: item.id,
                quantity: parseInt(value.target.value),
              })
            }
            className="max-h-[32px] w-[75px] text-small-regular"
          >
            {Array.from([...Array(Math.max(item.quantity,10))].keys())
              .map((i) => {
                const value = i + 1
                return (
                  <option value={value} key={i}>
                    {value}
                  </option>
                )
              })}
          </NativeSelect>
        </div>
        <div>
          <LineItemPrice
            variant={item.variant as CalculatedVariant}
            quantity={item.quantity}
            region={region}
          />
        </div>
      </div>
      <div className="flex justify-end text-small-regular mt-2">
        <div>
              <button
                className="flex items-center gap-x-1 text-gray-500"
                onClick={() => deleteItem(item.id)}
              >
                <Trash size={14} />
                <span>Remove</span>
              </button>
            </div>
      </div>
    </div>
  )
}

export default Item
