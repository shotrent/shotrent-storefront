import useDurationTypes from "@lib/hooks/use-duration-types"
import { CreateListing, DurationType, Listing, ListingPirceBreakout, ListingVariant } from "@lib/models/listing"
import ConnectForm from "@modules/common/components/connect-form"
import Input from "@modules/common/components/input"
import { useEffect, useMemo, useState } from "react"
import { useFormContext } from "react-hook-form"
import Plan from "../plan"


const ProductDetails = () => {
 
  const [monthly] = useDurationTypes();
  const methods = useFormContext<Listing>();
  const [cogs, setCogs] = useState(methods.getValues().purchase_price || 35000);

  const planSuggestions = useMemo(() => {
    return monthly.pricingOptions.map((option, planIndex) => {
      return {
        name: `Plan ${planIndex + 1}`,
        type: monthly.type,
        variants: option.interestRates.map((interestRate, index) => {
          return new ListingPirceBreakout({
            name: monthly.variants[index],
            purchase_price: cogs,
            interest_rate: interestRate,
            buyout_period:  option.buyOutPeriod[index],
            tax_rate: option.tax,
            commission_rate: option.commission[index],
            depreciation_rate: option.depreciation,
          });
        })
      } as Plan;
    })
  }, [cogs])

  const [plan, selectPlan] =useState(planSuggestions[0]);
 
  useEffect(()=>{
    const variants = plan.variants.map(v=>(
      {
        name:v.name, 
        price: v.price, 
        listing_price: v.listing_price, 
        earning_price:v.earning_price, 
        tax_rate: v.tax_rate, 
        commission_rate: v.commission_rate 
      }) as ListingVariant);
    methods.setValue('variants', variants);
    methods.setValue('duration_type', monthly.type);
  }, [plan])

  return (
    <ConnectForm<Listing>>
          {({ register, formState: { errors, touchedFields } }) => (
            <>
              <div className="grid grid-cols-1 gap-y-2 gap-x-4">
                <h2 className="text-base-semi">About product</h2>
                <Input
                  label="Title"
                  {...register("title", {
                    required: "Title is required",
                  })}
                  
                  autoComplete="title"
                  errors={errors}
                  touched={touchedFields}
                  type='text'
                />

                <Input
                  label="Product link"
                  {...register("product_link", {
                    required: "Amazon link is required",
                  })}
                  autoComplete="sn"
                  errors={errors}
                  touched={touchedFields}
                  type='text'
                />
                <p className="text-sm text-gray-600 font-normal mb-4">Kindly provide us with the product link. This can be the link of marketplaces like Amazon and Flipkart. For example, https://www.amazon.in/ASUS-Vivobook-i7-1165G7-Intel-Iris-Xe-Graphics-X415EA-EK701WS/dp/B0BLP1N74T.</p>

                <Input
                  label="Inventory qunatity"
                  {...register("inventory_quantity", {
                    required: "Inventory qunatity is required",
                  })}
                  autoComplete="iq"
                  errors={errors}
                  touched={touchedFields}
                  type='number'
                />

                <h2 className="text-base-semi mt-4">Estimate your rental rates</h2>              
                <Input
                  label="Purchase price"
                  {...register("purchase_price")}                  
                  type='number'
                  onChange={e => setCogs(+e.target.value)}
                />
                <p className="text-sm text-gray-600 font-normal">Kindly provide us with the cost you incurred for the product, and we will propose a pricing structure for varying monthly rental durations in the below plans.</p>

                {planSuggestions.map((p, index) => <Plan key={index} plan={p} selected={plan} selectPlan={selectPlan} isRecommended={index==0} />)}
                <p className="text-sm text-gray-600 font-normal mb-4">Please choose one from the above plans, where each plan displays various monthly rental rates and corresponding earning prices.</p>

              </div>
            </>
          )}
        </ConnectForm>
  )
}

export default ProductDetails



