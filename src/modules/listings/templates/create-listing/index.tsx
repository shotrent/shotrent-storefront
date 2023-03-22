import { medusaClient } from "@lib/config"
import useMedusaClient, { ClientErrorDispaly } from "@lib/hooks/use-medusa-client"
import { Listing } from "@lib/models/listing"
import Button from "@modules/common/components/button"
import ProductDetails from "@modules/listings/components/product-details"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { CreateListing } from "@lib/models/listing"
import Link from "next/link"



const CreateListingTemplate = () => {
  const router = useRouter();
  const methods = useForm<Listing>({
    defaultValues: {
      purchase_price: 30000,
      inventory_quantity: 1
    }
  });
  const { data, error, isLoading, sendRequest } = useMedusaClient<Listing>({
    onfulfilled: () => router.push("/account/listings")
  })

  const onSubmit = async (value: Listing) => {
    sendRequest("POST", '/store/listings', value);
  }


  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="w-full">
          <div className="mb-8 flex flex-col gap-y-4">
            <h1 className="text-2xl-semi">Create Listing</h1>
            <p className="text-base-regular">
              All you have to do is provide us details of your product and select the rental plan you like. We will take care of everything else. We have ensured that the whole process is painless and profitable for you.
              If you have any questions or concerns about the policy or the rental process, please do not hesitate to <Link href={'/support'}><a className="underline cursor-pointer">contact us</a></Link>.
            </p>

            <h2 className="text-2xl-semi">How we work?</h2>
            <p className="text-base-regular">
              Our product rental website allows owners to easily list their products for rent, and customers can easily browse and book those products. When customers book a product, we don't require any refundable deposit. Instead, we do a KYC (know your customer) check and collect the rent at the start of the rental period.
            </p>
            <p className="text-base-regular">
              Once the product is delivered to the customer, we pay the owner directly into their bank account. This happens on a monthly basis, as the rental tenure for each product comes to an end.
            </p>
            <p className="text-base-regular">
              By simplifying the rental process and streamlining payments, we aim to make it easy for owners to rent out their products and for customers to rent them, all while ensuring a secure and hassle-free experience for everyone involved.
            </p>

            <p className="text-base-regular">
              We recommend that you review our <Link href={'/privacy-policy-for-owners'}><a className="underline cursor-pointer">privacy policy for owners</a></Link>.
            </p>
          </div>
          <div>
            <ProductDetails />
            <ClientErrorDispaly error={error} />
            <p><span className="text-sm text-gray-600 font-normal mt-6">
          By creating a listing, you agree to Shotrent&apos;s{" "}
          <Link href="/privacy-policy-for-owners">
            <a className="underline">Privacy Policy</a>
          </Link>{" "}
          and{" "}
          <Link href="/terms-of-service">
            <a className="underline">Terms of Use</a>
          </Link>
          .
        </span></p>
            <Button
              variant="primary"
              className="rounded-rounded mt-4"
              disabled={isLoading}
            >
              {"Submit"}
            </Button>
          </div>
        </div>
      </form>

    </FormProvider>
  )
}

export default CreateListingTemplate
