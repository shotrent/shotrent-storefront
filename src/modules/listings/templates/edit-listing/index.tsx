import { medusaClient } from "@lib/config"
import useMedusaClient, { ClientErrorDispaly } from "@lib/hooks/use-medusa-client"
import { Listing } from "@lib/models/listing"
import Button from "@modules/common/components/button"
import ProductDetails from "@modules/listings/components/product-details"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { CreateListing } from "@lib/models/listing"

type EditListingTemplateProps = {
  id:string
  defaultValues: CreateListing
}

const EditListingTemplate = (props:EditListingTemplateProps) => {
  const router = useRouter();
  const methods = useForm<Listing>({
    defaultValues: props.defaultValues
  });
  const {error, isLoading, sendRequest} = useMedusaClient<Listing>({
    onfulfilled: ()=> router.push(`/account/listings/details/${props.id}`)
  })

  const onSubmit = async (value: Listing) => {
    sendRequest("POST", `/store/listings/${props.id}/edit`, value);
  }


  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="w-full">
          <div className="mb-8 flex flex-col gap-y-4">
            <h1 className="text-2xl-semi">Edit Listing</h1>
            <p className="text-base-regular">
              Please enter below details
            </p>
          </div>
          <div>
            <ProductDetails />
            <ClientErrorDispaly error={error}/>
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

export default EditListingTemplate
