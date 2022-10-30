import { Tab } from "@headlessui/react"
import { Product } from "@medusajs/medusa"
import Back from "@modules/common/icons/back"
import Cart from "@modules/common/icons/cart"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Plus from "@modules/common/icons/plus"
import Refresh from "@modules/common/icons/refresh"
import clsx from "clsx"
import { useMemo } from "react"

type ProductTabsProps = {
  product: Product,
  className?: string
}

const ProductDescription = ({ product, className }: ProductTabsProps) => {
  console.log(product.description)
  return (
    <div className={className}>
        <div className="container flex flex-col justify-center px-1 py-4 mx-auto md:px-8 2xl:px-16">
         <h2 className="text-lg font-bold leading-none sm:text-xl mb-4">
            <span className='bg-amber-100 p-2'>About Product</span>
        </h2>
        <div className="overflow-y-auto h-96" dangerouslySetInnerHTML={{__html:product.description ?? ''}} ></div>
    </div>
    </div>
  )
}


export default ProductDescription
