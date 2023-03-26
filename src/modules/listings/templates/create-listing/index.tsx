import { medusaClient } from "@lib/config"
import useMedusaClient, { ClientErrorDispaly } from "@lib/hooks/use-medusa-client"
import { Listing } from "@lib/models/listing"
import Button from "@modules/common/components/button"
import ProductDetails from "@modules/listings/components/product-details"
import { useRouter } from "next/router"
import { SetStateAction, useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { CreateListing } from "@lib/models/listing"
import Link from "next/link"


const CreateListingTemplate = () => {
  const router = useRouter();
  const methods = useForm<Listing>({
    defaultValues: {
      purchase_price: 30000,
      inventory_quantity: 1,
      country_code: 'in'
    }
  });
  const { data, error, isLoading, sendRequest } = useMedusaClient<Listing>({
    onfulfilled: () => router.push("/account/listings")
  })

  const onSubmit = async (value: Listing) => {
    sendRequest("POST", '/store/listings', value);
  }

  const ReadMore: React.FC = ({ children }) => {
    const [isOpen, setOpen] = useState(false);
    return isOpen ? (
      <>
        {children}
        <div className="cursor-pointer underline mt-2" onClick={e => setOpen(false)}>Show less</div>
      </>) : (
      <div className="cursor-pointer underline mt-2" onClick={e => setOpen(true)}>Read more</div>
    )
  }



  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="w-full">
          <div className="mb-8 flex flex-col gap-y-4">
            <h1 className="text-2xl-semi">Create a Listing</h1>
            <div className="text-base-regular">
              <p className="mb-2">All you have to do is provide us details of your product and select the rental plan you like. We have ensured that the whole process is painless and profitable for you.</p>

            </div>

            <h2 className="text-xl-semi">How we work?</h2>
            <div className="text-base-regular">
              <p className="mb-2">
                    We do not require any refundable deposit from customers when they book a product. 
                    Instead, we pre-pay the rental amount to owners' bank accounts every month after the product 
                    has been delivered to the customer.
              </p>
              <ReadMore>
                <p className="mb-2">Our rental process is designed to be hassle-free for both owners and customers.</p>
                <p className="mb-2">
                  There is no requirement for a refundable deposit when customers book a product.
                  Instead, we perform a KYC (know your customer) check and collect the rent at the beginning of the rental period.
                </p>
                <p className="mb-2">
                  Once the product is delivered to the customer, we pay you, the owner,
                  directly into your bank account on a monthly basis.
                  The customer is pre-charged each month for the delivered product, simplifying
                  the rental process and streamlining payments.
                </p>
                <p className="mb-2">
                  We prioritize a secure and smooth experience for all parties involved.
                  For further information, we suggest reviewing our
                  <Link href={'/privacy-policy-for-owners'}>
                    <a className="underline cursor-pointer ml-1">
                      privacy policy for owners
                    </a>
                  </Link>.
                </p>
              </ReadMore>
            </div>
          </div>
          <div>
            <ProductDetails />
            <ClientErrorDispaly error={error} />

            <p className=" mt-6"><span className="text-sm text-gray-600 font-normal">
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

export default CreateListingTemplate;
