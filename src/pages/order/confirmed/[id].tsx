import { medusaClient } from "@lib/config"
import { IS_BROWSER } from "@lib/constants"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import OrderCompletedTemplate from "@modules/order/templates/order-completed-template"
import SkeletonOrderConfirmed from "@modules/skeletons/templates/skeleton-order-confirmed"
import { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"
import { ReactElement, useEffect } from "react"
import { dehydrate, QueryClient, useQuery } from "react-query"
import { NextPageWithLayout } from "types/global"

const fetchOrder = async (id: string) => {
  return await medusaClient.orders.retrieve(id).then(({ order }) => order)
}

const Confirmed: NextPageWithLayout = () => {
  const router = useRouter()

  const id = typeof router.query?.id === "string" ? router.query.id : ""

  const { isSuccess, data, isLoading, isError } = useQuery(
    ["get_order_confirmed", id],
    () => fetchOrder(id),
    {
      enabled: id.length > 0,
      staleTime: Infinity,
    }
  )

  useEffect(()=>{
    if(isSuccess) {
      const gtag =  (window as  any).gtag;
      if(gtag) {
        gtag('event', 'conversion', {
          'send_to': 'AW-957359900/z2t_CKCCl4AYEJzOwMgD',
          'value': data.total,
          'currency': data.currency_code,
          'transaction_id': data.id,
        });
        console.log({
          'send_to': 'AW-957359900/z2t_CKCCl4AYEJzOwMgD',
          'value': data.total,
          'currency': data.currency_code,
          'transaction_id': data.id,
        });
      }
    }
  }, [isSuccess, data]);

  if (isLoading) {
    return <SkeletonOrderConfirmed />
  }

  if (isError) {
    if (IS_BROWSER) {
      router.replace("/404")
    }

    return <SkeletonOrderConfirmed />
  }

  if (isSuccess) {

    return (
      <>
        <Head
          title="Order Confirmed"
          description="You purchase was successful"
        />

        <OrderCompletedTemplate order={data} />
      </>
    )
  }

  return <></>
}

Confirmed.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id as string
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(["get_order_confirmed", id], () =>
    fetchOrder(id)
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default Confirmed
