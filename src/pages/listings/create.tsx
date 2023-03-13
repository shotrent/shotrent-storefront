import AccountLayout from "@modules/account/templates/account-layout"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import CreateListingTemplate from "@modules/listings/templates/create-listing"
import { ReactElement } from "react"
import { NextPageWithLayout } from "types/global"

const CreateListing:NextPageWithLayout = () => {
  return (
    <>
      <Head title="Create Listing" />
      <CreateListingTemplate />
    </>
  )
}

CreateListing.getLayout = (page: ReactElement) => {
  return (
    <Layout>
      <AccountLayout>{page}</AccountLayout>
    </Layout>
  )
}

export default CreateListing
