import { useProductActions } from "@lib/context/product-context"
import useProductPrice from "@lib/hooks/use-product-price"
import Button from "@modules/common/components/button"
import OptionSelect from "@modules/products/components/option-select"
import clsx from "clsx"
import Link from "next/link"
import React, { useState } from "react"
import { Product } from "types/medusa"
import Input from "@modules/common/components/input"
import useProductPrices from "@lib/hooks/use-product-prices"
import { formatAmount, useCart } from "medusa-react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShield, faBagShopping, faTruckFast, faInfo, faCircleInfo, faCircleChevronUp, faCircleChevronDown, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { Popover } from 'react-tiny-popover'
import useToggleState from "@lib/hooks/use-toggle-state"
import DeliveryDate from "../delivery-date"

type ProductActionsProps = {
  product: Product
}

const ProductActions: React.FC<ProductActionsProps> = ({ product }) => {

  const { addToCart, inStock, updateRentalPeriod, rentalPeriod, selectedVariant, inCart, goToCart } =
    useProductActions();

  const {variantPrice} = useProductPrice({ id: product.id, variantId: selectedVariant.id })

  

  const {cart} = useCart();
  const originalPrice:number = product.metadata?.originalPrice as number || 0;
  const actualPrice = cart && cart.region && product && product.metadata? formatAmount({
    amount:  originalPrice * 100,
    region: cart?.region,
    includeTaxes: false
  }).slice(0, -3): '';

  

  

  const {state:purchaseOptionPopover, toggle:purchaseOptionPopoverToggle, close:closePurchaseOptionPopover} = useToggleState();
  const {state:careOptionPopover, toggle:careOptionPopoverToggle, close:closeCareOptionPopover} = useToggleState();
  const {state:minimumPeriodPopover, toggle:minimumPeriodPopoverToggle, close:closeMinimumPeriodPopover} = useToggleState();
  const buyOutPeriod:any= {
    "1": 9,
    "3": 16,
    "6": 21,
    "12": 26,
  };
  
  const emi = selectedVariant.prices[0].amount/100;
  const tenure = buyOutPeriod[rentalPeriod];
  const totalPayable = emi * tenure;
  const paidOver = totalPayable - originalPrice;
  const interest = Math.ceil((((paidOver / originalPrice)*100)/tenure)*12);
  const totalPayableFormated = cart && cart.region ?formatAmount({
    amount:  totalPayable * 100,
    region: cart?.region,
    includeTaxes: false
  }).slice(0, -3):'';
  const paidOverFormated = cart && cart.region ?formatAmount({
    amount:  paidOver * 100,
    region: cart?.region,
    includeTaxes: false
  }).slice(0, -3):'';

  const [toggleBuyOut, setToggleBuyOut] = useState(true);
  const buyOutIcon = faInfoCircle;
  

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

      <div>
      <h3 className="text-xl font-bold mt-4 mb-0">{product.title}</h3>
      <DeliveryDate />
      </div>

      <div className="text-sm">{product.metadata.inTheBox}</div>

      <div className="text-sm mt-2">
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
        
          </span> <span className="font-bold">rent per month</span> for {rentalPeriod} month{rentalPeriod>1?'s':''}, afterwards cancel anytime.

          
      </div>
      

      <div className="mt-2 text-sm">        
        <div className=""> <FontAwesomeIcon icon={faShield} className="mr-2 w-8" /> 
        FREE 
        <Popover
          isOpen={careOptionPopover}
          positions={['top', 'bottom', 'left', 'right']}
          onClickOutside={closeCareOptionPopover}
          content={
          <div className="popover-content">
            <p className="text-sm mb-2">
              Rent and enjoy your tech worry-free. We cover 90% of the repair costs in all cases of damage. Normal signs of use and device errors of course are completely covered.
            </p>
          </div>}
        >
          <span className="underline ml-1 cursor-pointer" onClick={careOptionPopoverToggle}>Shotrent Care</span>
        </Popover>
        
        </div>
        <div className="my-2"> <FontAwesomeIcon icon={faBagShopping} className="mr-2 w-8" /> Option to 
        <Popover
          isOpen={purchaseOptionPopover}
          positions={['top', 'bottom', 'left', 'right']}
          onClickOutside={closePurchaseOptionPopover}
          content={
          <div className="popover-content">
            <p className="text-sm mb-2">
              With this rental tenure, 
              to buy this out, keep renting for <span className="font-bold">{buyOutPeriod[rentalPeriod]} months</span> until its paid off. Or, pay for the remaining months anytime and buy it immediately. 
            </p>
          </div>}
        >
          <span className="underline ml-1 cursor-pointer" onClick={purchaseOptionPopoverToggle}>keep it forever</span>
        </Popover>
        </div>
        <div className="my-2"> <FontAwesomeIcon icon={faTruckFast} className="mr-2 w-8" /> Delivery in 1–3 business days</div>
      </div>

      <div className="mt-2">
        <h2 className="font-bold">Select your 
        <Popover
          isOpen={minimumPeriodPopover}
          positions={['top', 'bottom', 'left', 'right']}
          onClickOutside={closeMinimumPeriodPopover}
          content={
          <div className="popover-content">
            <p className="text-sm mb-2">Longer tenures have lower monthly rent.</p>
            <p className="text-sm mb-2">At the end of your minimum rental period, you can keep renting for the same price for as long as you want.</p>
            <p className="text-sm mb-2">In case you return the item before the chosen tenure is over, you will be asked to pay a minimal early closure charges.</p>
          </div>}
        >
          <span className="font-bold underline ml-1 cursor-pointer" onClick={minimumPeriodPopoverToggle}>rental tenure</span>         
        </Popover>
          </h2>          
        <div className="flex justify-around px-5 mt-4">
         {product.variants.length > 1 && (product.variants.map((variant, index) =>(
           <div key={index} className={"pricing-circle ml-0 "+ (+variant.options[0].value == rentalPeriod?"pricing-circle-selected":"")}
            onClick={e=>updateRentalPeriod(+variant.options[0].value)}>{variant.options[0].value}+
            <div className="relative top-5 text-slate-500 text-sm">Month</div>
           </div>
         )))}          
        </div>
      </div> 

      
        <div className="mt-8">
              <div className="text-sm font-bold" onClick={e=>setToggleBuyOut(state=>!state)}>
                <div className="flex justify-between cursor-pointer">
                  <div>Can I also buy the product I'm renting? </div>
                  <div className="align-right"><FontAwesomeIcon icon={buyOutIcon} className="" scale={2} /></div>
                </div>
              </div>
              {toggleBuyOut && (<div className="">
                <div className="text-sm text-gray-600 mt-2">To buy this out, keep renting for <span className="font-bold">{tenure} months</span> until its paid off and it will be yours forever.</div>
                <div className="text-sm text-gray-600 mt-2">Below is the breakout of how much you will pay over the actual price.</div>

                <div className="bg-slate-100 p-5 text-sm text-gray-600 mt-2">
                  <div className="flex justify-between py-1">
                    <div>Price</div>
                    <div className="font-bold">{actualPrice}</div>
                  </div>
                  <div className="flex justify-between py-1">
                    <div>Interest paid<span className="font-bold text-xs"> @ {interest}% pa</span></div>
                    <div className="font-bold">&#43;{paidOverFormated}</div>
                  </div>
                  <div className="flex justify-between border-t border-black border-dashed py-2">
                    <div>Total payable <span className="font-bold text-xs">&#10090;{tenure} mos x {variantPrice?.calculated_price.slice(0, -3)}&#10091;</span>
                    </div>
                    <div className="font-bold">{totalPayableFormated}</div>
                  </div>
                </div>
              </div>)}
        </div>

    

      <Button className="mt-4" onClick={()=>inCart?goToCart():addToCart()}>
        {inCart ? "Go to cart" : "Add to cart"}
      </Button>

      <div className="text-sm text-gray-600 ml-5 mt-4">
        <ul className="list-disc">
          <li className="mb-2">No deposit needed.</li>
          <li className="mb-2">Just pay the first month&apos;s rent and we&apos;ll ship your order.</li>
          <li className="mb-2">The rental period does not start until the product arrives with you.</li>
          <li className="mb-2">You might need to submit a few KYC documents before we initiate your product&apos;s delivery.</li>
        </ul>
      </div>
    </div>
  )
}

export default ProductActions
