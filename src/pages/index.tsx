import { medusaClient } from "@lib/config"
import { ProductCollection } from "@medusajs/medusa"
import Head from "@modules/common/components/head"
import UnderlineLink from "@modules/common/components/underline-link"
import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import Layout from "@modules/layout/templates"
import { ReactElement, useEffect, useState } from "react"
import { NextPageWithLayout } from "types/global"

const Home: NextPageWithLayout = () => {

  const [collections, setCollections] = useState([] as ProductCollection[]);

  useEffect(()=>{
    medusaClient.collections
    .list({ offset: 0, limit:6 })
    .then(({ collections: newCollections }) => {
      setCollections(newCollections);
    })
  },[])

  return (
    <>
      <div className="h-16"></div>
      <Head
        title="Home"
        description="It's all about renting tech"
      />
      <Hero />
      <div className="py-9 md:py-12">
        <UnderlineLink className="justify-center" href="/store">Explore products</UnderlineLink>
      </div>
      {collections.map(collection=> <FeaturedProducts collection_id={[collection.id]} title={collection.title} />)}
    </>
  )
}

Home.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default Home
