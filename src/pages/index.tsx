import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { faBox, faBoxesPacking, faBoxOpen, faHeadset, faHeartCrack, faLaptop, faLaptopCode, faMobileScreen, IconDefinition } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { medusaClient } from "@lib/config"
import { getCollectionIds } from "@lib/util/get-collection-ids"
import { ProductCollection } from "@medusajs/medusa"
import Head from "@modules/common/components/head"
import UnderlineLink from "@modules/common/components/underline-link"
import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import Layout from "@modules/layout/templates"
import Title from "@modules/products/components/title"
import Link from "next/link"
import { ReactElement, useEffect, useState } from "react"
import { NextPageWithLayout } from "types/global"
import Image from "next/image"

const Home: NextPageWithLayout = () => {

  const [collections, setCollections] = useState([] as ProductCollection[]);
  
  useEffect(()=>{
    medusaClient.collections
    .list({ offset: 0, limit:6 })
    .then(({ collections: newCollections }) => {
      setCollections(newCollections);
    })
  },[])

  const getIcon = (name:string):IconDefinition => {
    const icons:Record<string, IconDefinition> = {
      laptop: faLaptop,
      mobile: faMobileScreen,
      headset: faHeadset,
      gamingLaptop: faLaptopCode
    }

    return icons[name] || faBoxOpen;
  }

  const cardSlider = [
    {
      title: "Rent tech",
      description: "Choose your rental tenure of 1, 3, 6, or 12 months. Longer tenures have lower monthly rent.",
      image:(<FontAwesomeIcon icon={faBox} size="4x" />)
    },
    {
      title: "Use it worry-free",
      description: "If you break your device, we cover 90% of the repair costs.",
      image:(<FontAwesomeIcon icon={faHeartCrack} size="4x" />)
    },
    {
      title: "Stay flexible",
      description: "At the end of the rental period, you can keep renting, send it back for free, or buy at any time.",
      image:(<FontAwesomeIcon icon={faBoxesPacking} size="4x" />)
    },
]

  return (
    <>
      <div className="h-16 mb-4"></div>
      <Head
        title="Home"
        description="It's all about renting tech"
      />
      <Hero />
      <div className="content-container py-9 md:py-12">
        <div className="mb-8"><Title>Categories</Title></div>
        <div className="flex flex-wrap justify-center lg:justify-start">      
          {collections.map((collection, index)=> 
          <Link href={`/collections/${collection.id}`}>
              <div className="text-center w-32 h-32 m-2 p-5 shadow-md cursor-pointer bg-amber-50 border border-amber-100">
              <div className="text-amber-800 mb-2"><FontAwesomeIcon icon={getIcon(collection.metadata.icon as string)} size={'2xl'} /></div>
              <div className="text-sm font-bold break-words">{collection.title}</div>
            </div>
            </Link>)}          
        </div>
      </div>
      <div className="py-9 md:py-12">
        <UnderlineLink className="justify-center" href="/store">Explore products</UnderlineLink>
      </div>
      <div className="content-container py-9 md:py-12">
        <div className="mb-8"><Title>How it works?</Title></div>
        <div className="overflow-hidden overflow-x-auto pb-2">
          <div className="flex flex-cols"style={{width:"48rem"}}>
            {cardSlider.map((slide)=>(
            <div className="shadow-md border border-amber-100 w-96 p-8 mx-2 inline-block bg-amber-50">
              <div className="text-center text-amber-800 mb-9">{slide.image}</div>
              <div className="text-xl font-bold mb-8">{slide.title}</div>
              <div className="text-base">{slide.description}</div>
            </div>))}
          </div>
        </div>
      </div>
    </>
  )
}

Home.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default Home
