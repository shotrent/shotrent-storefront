import useMedusaClient from "@lib/hooks/use-medusa-client"
import { CreateListing, Listing } from "@lib/models/listing"
import AccountLayout from "@modules/account/templates/account-layout"
import Head from "@modules/common/components/head"
import Spinner from "@modules/common/icons/spinner"
import Layout from "@modules/layout/templates"
import CreateListingTemplate from "@modules/listings/templates/create-listing"
import EditListingTemplate from "@modules/listings/templates/edit-listing"
import { useRouter } from "next/router"
import { ReactElement, useEffect } from "react"
import { NextPageWithLayout } from "types/global"

const EditListingPage: NextPageWithLayout = () => {
    const router = useRouter();
    const id = typeof router.query?.id === "string" ? router.query.id : ""
    const { data, error, isLoading, sendRequest } = useMedusaClient<Listing>()

    useEffect(()=>{
        sendRequest("GET", `store/listings/${id}`)
    },[])

    if (isLoading) {
        return (
          <div className="text-gray-900 w-full flex justify-center pt-12">
            <Spinner size={36} />
          </div>
        )
      }

    return (
        <>
            <Head title="Edit Listing" />
            <EditListingTemplate defaultValues={data as CreateListing} id={id} />
        </>
    )
}

EditListingPage.getLayout = (page: ReactElement) => {
    return (
        <Layout>
            <AccountLayout>{page}</AccountLayout>
        </Layout>
    )
}

export default EditListingPage
