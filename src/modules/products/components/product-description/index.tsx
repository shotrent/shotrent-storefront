import { Product } from "@medusajs/medusa"
import Title from "../title"

type ProductTabsProps = {
  product: Product,
  className?: string
}

const ProductDescription = ({ product, className }: ProductTabsProps) => {
  
  return (
    <div className={className}>
        <div className="container flex flex-col justify-center px-1 py-4 mx-auto md:px-8 2xl:px-16">
         <Title>About product</Title>
        <div className="overflow-y-auto h-96" dangerouslySetInnerHTML={{__html:product.description ?? ''}} ></div>
    </div>
    </div>
  )
}


export default ProductDescription
