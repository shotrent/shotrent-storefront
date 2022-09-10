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
import useProductPrices from "@lib/hooks/use-product-prices"

type ProductActionsProps = {
  product: Product
}

const ProductActions: React.FC<ProductActionsProps> = ({ product }) => {

  const { addToCart, inStock, selectionRange, selectedDates, isDateRangeValid, updateDateRange } =
    useProductActions();

  const [isDateRangePickerVisible, setIsDateRangePickerVisible] = useState(false);

  const handleSelect = (ranges: any) => {
    updateDateRange(ranges.selection);
    if (ranges.selection.endDate > ranges.selection.startDate) {
      setIsDateRangePickerVisible(false)
    }      
  }

  const { variantPrices } = useProductPrices({ id: product.id });

  return (
    <div className="flex flex-col gap-y-2">
      {product.collection && (
        <Link href={`/collections/${product.collection.id}`}>
          <a className="text-small-regular text-gray-700">
            <span className="text-sm font-bold bg-amber-100 p-2 uppercase">
              {product.collection.title}
            </span>            
          </a>
        </Link>
      )}
      <h3 className="text-xl-regular">{product.title}</h3>

      <p className="text-base-regular">{product.description}</p>

      
      {product.variants.length > 1 && (
        <div className="mt-8 flex flex-row gap-y-6 gap-x-1 text-center">
          {product.variants.map((variant, index) => {
            if (index === 2) return "";
            return (
              <div key={variant.id} className='flex-grow border border-black'>
                <div className="bg-black text-white">
                  {variant.title}
                </div>
                {variantPrices[index] ? (
                  <div className="flex flex-col text-gray-700 bg-amber-100">
                    <span
                      className={clsx("text-lg-semi", {
                        "text-rose-600": variantPrices[index].price_type === "sale",
                      })}
                    >
                      {variantPrices[index].calculated_price}
                    </span>
                    {variantPrices[index].price_type === "sale" && (
                      <>
                        <p>
                          <span className="text-gray-500">Original: </span>
                          <span className="line-through">
                            {variantPrices[index].original_price}
                          </span>
                        </p>
                        <span className="text-rose-600">
                          -{variantPrices[index].percentage_diff}%
                        </span>
                      </>
                    )}
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            )
          })}
        </div>
      )}
      {variantPrices && variantPrices.length>1 && (<p className="text-base-regular mb-8 text-gray-700">Rent from {variantPrices[0].calculated_price}/Day reduces to {variantPrices[variantPrices.length - 1].calculated_price}/Day (&gt;30 Days)</p>)}
      
      <Input
        label="Select Dates"
        name="daterange"
        autoComplete="off"
        value={selectedDates}
        onFocus={() => { setIsDateRangePickerVisible(true) }}
        onChange={() => { }}
      />

      {isDateRangePickerVisible ? (<div className="relative z-10">
        <div className="absolute border border-black">         
          <DateRange
            ranges={[selectionRange]}
            onChange={handleSelect}
            rangeColors={['black']}
          />

          <Button onClick={() => setIsDateRangePickerVisible(!isDateRangePickerVisible)}>Close</Button>
        </div>
      </div>) : ""}


      <Button onClick={addToCart} disabled={!isDateRangeValid}>
        {!inStock ? "Out of stock" : "Add to cart"}
      </Button>
    </div>
  )
}

export default ProductActions
