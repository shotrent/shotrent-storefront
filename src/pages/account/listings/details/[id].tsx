import { medusaClient } from "@lib/config"
import { IS_BROWSER } from "@lib/constants"
import useMedusaClient from "@lib/hooks/use-medusa-client"
import { Listing } from "@lib/models/listing"
import AccountLayout from "@modules/account/templates/account-layout"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import ListingDetailsTemplate from "@modules/listings/templates/listing-details-template"
import SkeletonListingConfirmed from "@modules/skeletons/templates/skeleton-listing-confirmed"
import { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"
import { ReactElement, useEffect } from "react"
import { dehydrate, QueryClient, useQuery } from "react-query"
import { NextPageWithLayout } from "types/global"



const ListingDetails: NextPageWithLayout = () => {
  const router = useRouter()

  const id = typeof router.query?.id === "string" ? router.query.id : ""
  const {data, error, isLoading, sendRequest} = useMedusaClient<Listing>()
  
  useEffect(()=>{
    sendRequest("GET", `store/listings/${id}`)
  },[])

  if (isLoading) {
    return <SkeletonListingConfirmed />
  }

  if (error) {
    if (IS_BROWSER) {
      router.replace("/404")
    }

    return <SkeletonListingConfirmed />
  }

  if (data && data.id) {
    return (
      <>
        <Head
          title={`Listing #${data.id}`}
          description="View your listing"
        />

        <ListingDetailsTemplate listing={data} />
      </>
    )
  }

  return <></>
}

ListingDetails.getLayout = (page: ReactElement) => {
  return <Layout>
  <AccountLayout>{page}</AccountLayout>
</Layout>
}


export default ListingDetails
