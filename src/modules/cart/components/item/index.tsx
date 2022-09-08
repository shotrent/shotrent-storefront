import { useStore } from "@lib/context/store-context"
import { LineItem, Region } from "@medusajs/medusa"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import NativeSelect from "@modules/common/components/native-select"
import Trash from "@modules/common/icons/trash"
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
  const selectedDates = useMemo(()=>{
    const startDate:Date = new Date(Date.parse(item.metadata.startDate as any));
    const endDate:Date =  new Date(Date.parse(item.metadata.endDate as any));
    return `${format(startDate, 'MMM dd, yyyy')} - ${format(endDate, 'MMM dd, yyyy')}`;
  },[item]);
  return (
    <div className="grid grid-cols-[122px_1fr] gap-x-4">
      <div className="w-[122px]">
        <Thumbnail thumbnail={item.thumbnail} size="full" />
      </div>
      <div className="text-base-regular flex flex-col gap-y-8">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span className="text-xl">{item.title}</span>
            <LineItemOptions variant={item.variant} quantity={item.quantity} />
            <span className="text-gray-700">{selectedDates}</span>
          </div>
        </div>
        <div className="flex items-end justify-between text-small-regular flex-1">
          <div>
            <button
              className="flex items-center gap-x-1 text-gray-500"
              onClick={() => deleteItem(item.id)}
            >
              <Trash size={14} />
              <span>Remove</span>
            </button>
          </div>
          <div>
            <LineItemPrice
              variant={item.variant as CalculatedVariant}
              quantity={item.quantity}
              region={region}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Item
