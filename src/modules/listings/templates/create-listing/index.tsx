import { medusaClient } from "@lib/config"
import Button from "@modules/common/components/button"
import ProductDetails, { CreateListingValues } from "@modules/listings/components/product-details"
import { useRouter } from "next/router"
import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"

type Error = {
  type: string;
  message: string;
}

const CreateListingTemplate = () => {
  const router = useRouter();
  const methods = useForm<CreateListingValues>();
  const [error, setError] = useState<Error | null>(null);
  const onSubmit = async (data: CreateListingValues) => {
    setError(null);
    medusaClient.client.request("POST", '/store/listings', data)
      .then(result => {
        router.push("/account/listings");
      })
      .catch(err => {
        setError(err.response.data as Error)
      })
  }
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="w-full">
          <div className="mb-8 flex flex-col gap-y-4">
            <h1 className="text-2xl-semi">Create Listing</h1>
            <p className="text-base-regular">
              Please enter below details
            </p>
          </div>
          <div>
            <ProductDetails />
            {error ? (<div className='text-small-regular bg-red-100 text-red-800 border border-red-800 p-2 mt-4'>{error.message}</div>) : ""}
            <Button
              variant="primary"
              className="rounded-rounded mt-4"
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
