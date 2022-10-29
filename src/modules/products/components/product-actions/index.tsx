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
import { formatAmount, useCart } from "medusa-react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShield, faBagShopping, faTruckFast } from '@fortawesome/free-solid-svg-icons'
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

  const {cart} = useCart();
  const refundableDepositAmount:number = product.metadata?.refundableDeposit as number || 0;
  const deposit = cart && cart.region && product && product.metadata? formatAmount({
    amount:  refundableDepositAmount * 100,
    region: cart?.region,
    includeTaxes: false
  }).slice(0, -3): '';

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

      <h3 className="text-2xl font-bold">{product.title}</h3>

      <div className="text-base">{product.metadata.inTheBox}</div>

      <div className="mt-4">
          <span className="text-2xl font-bold">Rs.36.90</span> per month for 1 month, afterwards cancel anytime
      </div>

      <div className="mt-4">        
        <div className="my-2"> <FontAwesomeIcon icon={faShield} className="mr-2 w-8" /> FREE <span className="underline">Shotrent Care</span></div>
        <div className="my-2"> <FontAwesomeIcon icon={faBagShopping} className="mr-2 w-8" /> Option to <span className="underline">keep it forever</span></div>
        <div className="my-2"> <FontAwesomeIcon icon={faTruckFast} className="mr-2 w-8" /> Delivery in 1–3 business days</div>
      </div>

      <div className="mt-4">
        <h2>Select your <span className="underline">minimum rental period</span></h2>

        <div className="flex justify-around px-5 mt-4">
          <div className="pricing-circle pricing-circle-selected ml-0">1+
          <div className="relative top-5 text-slate-500 text-sm">Month</div></div>
          <div className="pricing-circle">3+
          <div className="circle-footer">Month</div></div>
          <div className="pricing-circle">6+
          <div className="circle-footer">Month</div></div>
          <div className="pricing-circle">12+
          <div className="circle-footer">Month</div></div>
        </div>

      </div>
      
      {/* {product.variants.length > 1 && (
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
                      {variantPrices[index].calculated_price.slice(0, -3)}
                    </span>
                    {variantPrices[index].price_type === "sale" && (
                      <>
                        <p>
                          <span className="text-gray-500">Original: </span>
                          <span className="line-through">
                            {variantPrices[index].original_price.slice(0, -3)}
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
      )} */}
      
      {/* {refundableDepositAmount > 0 ? (<div className="mb-8 mt-2">
        <div className="mb-2">
          <span className="text-sm bg-amber-100 p-2 inline-block mr-2">Refundable deposit</span>
          <span className="text-base-regular">{deposit}</span>
        </div>
        <p className="text-xs text-gray-700">
        Shotrent charges an upfront security deposit to confirm your booking. This is 100% refundable once the rental duration ends and the product is received by Shotrent.
        </p>
      </div>): <div className="mb-4"></div>} */}

      {/* <Input
        label="Select Dates"
        name="daterange"
        autoComplete="off"
        value={selectedDates}
        onFocus={() => { setIsDateRangePickerVisible(true) }}
        onChange={() => { }}
      /> */}

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


      <Button className="mt-12" onClick={addToCart}>
        {!inStock ? "Out of stock" : "Add to cart"}
      </Button>
    </div>
  )
}

export default ProductActions
