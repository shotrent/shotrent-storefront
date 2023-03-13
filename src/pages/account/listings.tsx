import AccountLayout from "@modules/account/templates/account-layout"
import ListingTemplate from "@modules/account/templates/listing-template"
import OrdersTemplate from "@modules/account/templates/orders-template"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import { NextPageWithLayout } from "types/global"

const Listings: NextPageWithLayout = () => {
  return (
    <>
      <Head title="Listings" description="Here you can find your listings." />
      <ListingTemplate />
    </>
  )
}

Listings.getLayout = (page) => {
  return (
    <Layout>
      <AccountLayout>{page}</AccountLayout>
    </Layout>
  )
}

export default Listings
