import useDurationTypes from "@lib/hooks/use-duration-types"
import { Listing, ListingPirceBreakout, ListingVariant, Plan } from "@lib/models/listing"
import ConnectForm from "@modules/common/components/connect-form"
import Input from "@modules/common/components/input"
import Textarea from "@modules/common/components/textarea"
import { useEffect, useMemo, useState } from "react"
import { useFormContext } from "react-hook-form"
import LocationPicker, { AddressDetails } from "../location-picker"
import PlanTemplate from "../plan"

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
            buyout_period: option.buyOutPeriod[index],
            tax_rate: option.tax,
            commission_rate: option.commission[index],
            depreciation_rate: option.depreciation,
          });
        })
      } as Plan;
    })
  }, [cogs])

  const [plan, selectPlan] = useState(planSuggestions[0]);

  useEffect(() => {
    const variants = plan.variants.map(v => (
      {
        name: v.name,
        price: v.price,
        listing_price: v.listing_price,
        earning_price: v.earning_price,
        tax_rate: v.tax_rate,
        commission_rate: v.commission_rate
      }) as ListingVariant);
    methods.setValue('variants', variants);
    methods.setValue('duration_type', monthly.type);
  }, [plan])


  const sendAddress = (data:AddressDetails) => {
    methods.setValue('address_2',data.address_line2);
    methods.setValue('city',data.city);
    methods.setValue('province',data.province);
    methods.setValue('country_code',data.country_code);
    methods.setValue('postal_code',data.postal_code);
  }

  return (
    <ConnectForm<Listing>>
      {({ register, formState: { errors, touchedFields } }) => (
        <>
          <div className="grid grid-cols-1 gap-y-2 gap-x-4 mb-8">
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

            <Textarea 
              label="Description"
              {...register("description")}
              autoComplete="description"
              errors={errors}
              touched={touchedFields}              
            />           
           

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
            <p className="text-sm text-gray-600 font-normal">
              Kindly provide us with the cost you incurred for the product,
              and we will propose a pricing structure for varying monthly rental
              durations in the below plans.</p>

            {planSuggestions.map((p, index) =>
              <PlanTemplate key={index} plan={p} selected={plan}
                selectPlan={selectPlan} isRecommended={index == 0} />)}
            <p className="text-sm text-gray-600 font-normal mb-4">
              Please choose one from the above plans, where each plan
              displays various monthly rental rates and corresponding
              earning prices.</p>


            <h2 className="text-base-semi mt-4">Set your pickup location</h2>
            
            <LocationPicker register={register} name="location" sendAddress={sendAddress} />

            <Input
              label="Address Line 1"
              {...register("address_1", {
                required: "Address Line 1 is required",
              })}
              autoComplete="address_1"
              errors={errors}
              touched={touchedFields}
              type='text'
            />

            <Input
              label="Address Line 2"
              {...register("address_2")}
              autoComplete="address_2"
              errors={errors}
              touched={touchedFields}
              type='text'
            />

            <Input
              label="City"
              {...register("city", {
                required: "City is required",
              })}
              autoComplete="city"
              errors={errors}
              touched={touchedFields}
              type='text'
            />

            <Input
              label="Province"
              {...register("province", {
                required: "Province is required",
              })}
              autoComplete="city"
              errors={errors}
              touched={touchedFields}
              type='text'
            />          

            <Input
              label="Postal code"
              {...register("postal_code", {
                required: "Postal code is required",
              })}
              autoComplete="postal_code"
              errors={errors}
              touched={touchedFields}
              type='text'
            />

            <Input
              label="Phone"
              {...register("phone", {
                required: "Phone is required",
              })}
              autoComplete="phone"
              errors={errors}
              touched={touchedFields}
              type='text'
            />
          </div>
        </>
      )}
    </ConnectForm>
  )
}

export default ProductDetails
