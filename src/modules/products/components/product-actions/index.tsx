import { useProductActions } from "@lib/context/product-context"
import useProductPrice from "@lib/hooks/use-product-price"
import Button from "@modules/common/components/button"
import OptionSelect from "@modules/products/components/option-select"
import clsx from "clsx"
import Link from "next/link"
import React, { useMemo, useState } from "react"
import { Product } from "types/medusa"
import { DateRange, DateRangePicker } from 'react-date-range';
import Input from "@modules/common/components/input"

type ProductActionsProps = {
  product: Product
}

const ProductActions: React.FC<ProductActionsProps> = ({ product }) => {
 
  const { updateOptions, addToCart, options, inStock, variant, selectionRange, selectedDates, isDateRangeValid, updateDateRange } =
    useProductActions();

  const handleSelect = (ranges:any) => {
    updateDateRange(ranges.selection);   
    if(ranges.selection.endDate > ranges.selection.startDate)
    setIsDateRangePickerVisible(false)
  }
  const [isDateRangePickerVisible, setIsDateRangePickerVisible] = useState(false);

  const price = useProductPrice({ id: product.id, variantId: variant?.id })

  const selectedPrice = useMemo(() => {
    const { variantPrice, cheapestPrice } = price

    return variantPrice || cheapestPrice || null
  }, [price])

  return (
    <div className="flex flex-col gap-y-2">
      {product.collection && (
        <Link href={`/collections/${product.collection.id}`}>
          <a className="text-small-regular text-gray-700">
            {product.collection.title}
          </a>
        </Link>
      )}
      <h3 className="text-xl-regular">{product.title}</h3>

      <p className="text-base-regular">{product.description}</p>

      {product.variants.length > 1 && (
        <div className="my-8 flex flex-col gap-y-6">
          {product.options.map((option) => {
            return (
              <div key={option.id}>
                <OptionSelect
                  option={option}
                  current={options[option.id]}
                  updateOption={updateOptions}
                  title={option.title}
                />
              </div>
            )
          })}
        </div>
      )}

      <div className="mb-4">
        {selectedPrice ? (
          <div className="flex flex-col text-gray-700">
            <span
              className={clsx("text-xl-semi", {
                "text-rose-600": selectedPrice.price_type === "sale",
              })}
            >
              {selectedPrice.calculated_price}
            </span>
            {selectedPrice.price_type === "sale" && (
              <>
                <p>
                  <span className="text-gray-500">Original: </span>
                  <span className="line-through">
                    {selectedPrice.original_price}
                  </span>
                </p>
                <span className="text-rose-600">
                  -{selectedPrice.percentage_diff}%
                </span>
              </>
            )}
          </div>
        ) : (
          <div></div>
        )}
      </div>

      <Input
              label="Select Dates"
              name="daterange"
              autoComplete="off"
              defaultValue={selectedDates}
              onClick={()=> { setIsDateRangePickerVisible(!isDateRangePickerVisible)}}
            />

      {isDateRangePickerVisible? (<div className="popup-container">
        <div className="popup-inner-container">
          {/* <div className="close" onClick={()=> setIsDateRangePickerVisible(!isDateRangePickerVisible)}>X</div> */}
          <DateRange
            ranges={[selectionRange]}
            onChange={handleSelect}
            rangeColors={['black']}
          />

          <Button onClick={()=> setIsDateRangePickerVisible(!isDateRangePickerVisible)}>Close</Button>
        </div>
      </div>):""}
      

      <Button onClick={addToCart} disabled={!isDateRangeValid}>
        {!inStock ? "Out of stock" : "Add to cart"}
      </Button>
    </div>
  )
}

export default ProductActions
