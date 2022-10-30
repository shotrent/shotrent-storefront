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

  const { addToCart, inStock, updateRentalPeriod, rentalPeriod, selectedVariant } =
    useProductActions();

  const {variantPrice} = useProductPrice({ id: product.id, variantId: selectedVariant.id })

  

  const {cart} = useCart();
  const refundableDepositAmount:number = product.metadata?.refundableDeposit as number || 0;
  const deposit = cart && cart.region && product && product.metadata? formatAmount({
    amount:  refundableDepositAmount * 100,
    region: cart?.region,
    includeTaxes: false
  }).slice(0, -3): '';

  console.log(product.variants);



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
          <span className="text-2xl font-bold">
          
          {(variantPrice && (  
      
          <span
            className={clsx("text-lg-semi", {
              "text-rose-600": variantPrice.price_type === "sale",
            })}
          >
            {variantPrice.calculated_price.slice(0, -3)}
          </span>))}

          {(variantPrice && (variantPrice.price_type === "sale" && (
            <>
              <p>
                <span className="text-gray-500">Original: </span>
                <span className="line-through">
                  {variantPrice.original_price.slice(0, -3)}
                </span>
              </p>
              <span className="text-rose-600">
                -{variantPrice.percentage_diff}%
              </span>
            </>
            
          )))}
        
          </span> per month for {rentalPeriod} month{rentalPeriod>1?'s':''}, afterwards cancel anytime
      </div>

      <div className="mt-4">        
        <div className="my-2"> <FontAwesomeIcon icon={faShield} className="mr-2 w-8" /> FREE <span className="underline">Shotrent Care</span></div>
        <div className="my-2"> <FontAwesomeIcon icon={faBagShopping} className="mr-2 w-8" /> Option to <span className="underline">keep it forever</span></div>
        <div className="my-2"> <FontAwesomeIcon icon={faTruckFast} className="mr-2 w-8" /> Delivery in 1–3 business days</div>
      </div>

      <div className="mt-4">
        <h2>Select your <span className="underline">minimum rental period</span></h2>
        <div className="flex justify-around px-5 mt-4">
         {product.variants.length > 1 && (product.variants.map((variant, index) =>(
           <div className={"pricing-circle ml-0 "+ (+variant.options[0].value == rentalPeriod?"pricing-circle-selected":"")}
            onClick={e=>updateRentalPeriod(+variant.options[0].value)}>{variant.options[0].value}+
            <div className="relative top-5 text-slate-500 text-sm">Month</div>
           </div>
         )))}          
        </div>
      </div> 

      <Button className="mt-12" onClick={addToCart}>
        {!inStock ? "Out of stock" : "Add to cart"}
      </Button>
    </div>
  )
}

export default ProductActions
