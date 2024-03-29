import { ProductProvider } from "@lib/context/product-context"
import { useIntersection } from "@lib/hooks/use-in-view"
import { Product } from "@medusajs/medusa"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import React, { useRef } from "react"
import FaqSection from "../components/faq"
import FeatureSection from "../components/features"
import ImageGallery from "../components/image-gallary"
import MobileActions from "../components/mobile-actions"
import ProductDescription from "../components/product-description"

type ProductTemplateProps = {
  product: Product
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({ product }) => {
  const info = useRef<HTMLDivElement>(null)

  const inView = useIntersection(info, "0px")
  const isRentedOut = product.variants.every(v=>!v.allow_backorder);

  return (
    <ProductProvider product={product}>
      <div className="content-container flex flex-col small:flex-row small:items-start py-6 relative">
        <div className="flex flex-col gap-y-8 w-full">
          <ImageGallery images={product.images} isRentedOut={isRentedOut} />
          <FeatureSection className="hidden lg:block" />
          <ProductDescription className="hidden lg:block" product={product} />
          <FaqSection className="hidden lg:block" />          
        </div>
        <div
          className="small:sticky small:top-20 w-full py-4 lg:py-8 small:py-0 small:max-w-[344px] medium:max-w-[400px] flex flex-col gap-y-12"
          ref={info}
        >
          <ProductInfo product={product} />          
        </div>
      </div>
      
      <FeatureSection className="block lg:hidden" />
      <ProductDescription className="block lg:hidden mt-8" product={product} />
      <FaqSection className="block lg:hidden mt-8" />      

      <div className="content-container my-16 px-6 small:px-8 small:my-32">
        <RelatedProducts product={product} />
      </div>
      <MobileActions product={product} show={!inView} />
    </ProductProvider>
  )
}

export default ProductTemplate
