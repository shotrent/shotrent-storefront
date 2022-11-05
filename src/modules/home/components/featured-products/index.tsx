import { useFeaturedProductsQuery } from "@lib/hooks/use-layout-data"
import UnderlineLink from "@modules/common/components/underline-link"
import ProductPreview from "@modules/products/components/product-preview"
import Title from "@modules/products/components/title"
import SkeletonProductPreview from "@modules/skeletons/components/skeleton-product-preview"

type FeaturedProductsProps = {
  collection_id:string[],
  title:string
}

const FeaturedProducts = (props: FeaturedProductsProps) => {
  const { data } = useFeaturedProductsQuery(props.collection_id)

  return (
    <div className="py-9 md:py-12">      
      <div className="content-container py-12">        
        <Title>{props.title}</Title>
        <ul className="grid grid-cols-2 small:grid-cols-4 gap-x-4 gap-y-8">
          {data
            ? data.map((product) => (
                <li key={product.id}>
                  <ProductPreview {...product} />
                </li>
              ))
            : Array.from(Array(4).keys()).map((i) => (
                <li key={i}>
                  <SkeletonProductPreview />
                </li>
              ))}
        </ul>
      </div>
    </div>
  )
}

export default FeaturedProducts
