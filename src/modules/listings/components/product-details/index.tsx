import ConnectForm from "@modules/common/components/connect-form"
import Input from "@modules/common/components/input"
import { useEffect, useMemo, useState } from "react"
import { useFormContext } from "react-hook-form"
import Plan from "../plan"
import { RevenuePerMonthProps } from "../revenue-per-month"

export class CreateListingValues {
  title: string = '';
  productLink: string = '';
  inventoryQuantity: number = 1;
  variants: ListingVariant[] = [];
}

export class ListingVariant {
  name: string = '';
  value: number = 0;
  commission: number = 0;
}

const ProductDetails = () => {

  const durationTypes = [
    {
      name: 'Months',
      variants: ['1', '3', '6', '12']
    },
    {
      name: 'Daily',
      variants: ['1', '3', '6', '12']
    }
  ];

  const durationType = durationTypes[0];

  const [cogs, setCogs] = useState(35000);
 

  const pricingOptions = [
    {
      interestRates: [.48, .32, .28, .24],
      commission: [.24, .20, .18, .16],
      depreciation: .2,
      gst:.18,
      buyOutPeriod: [9, 16, 21, 26,]
    },
    {
      interestRates: [.56, .32, .30, .28],
      commission: [.27, .20, .19, .18],
      depreciation: .2,
      gst:.18,
      buyOutPeriod: [9, 16, 21, 26,]
    },
    {
      interestRates: [.64, .48, .4, .32],
      commission: [.3, .24, .22, .2],
      depreciation: .2,
      gst:.18,
      buyOutPeriod: [9, 16, 21, 26,]
    }
  ];

  const planSuggestions = useMemo(() => {
    return pricingOptions.map((option, planIndex) => {
      return {
        name: `Plan ${planIndex + 1}`,
        variants: option.interestRates.map((interestRate, index) => {
          const cogsWithGst = Math.ceil((cogs * option.gst) + cogs);
          const revenue = Math.ceil((cogsWithGst + (cogsWithGst * interestRate)) / option.buyOutPeriod[index]);
          const gstOnRevenue = Math.ceil(revenue * option.gst);
          const gstPrecentage = Math.ceil(option.gst * 100);
          const revenueAfterGst = Math.ceil(revenue - gstOnRevenue);
          const commission = Math.ceil(revenueAfterGst * option.commission[index]);
          const incomeAfterCommission = revenueAfterGst - commission;
          const depreciation = Math.ceil((cogs * option.depreciation) / 12);
          const incomeAfterDepreciation = incomeAfterCommission - depreciation;
          const paybackTime = Math.ceil(cogs / incomeAfterCommission) + ' ' + durationType.name;
          const netIncomePercentage = Math.ceil((incomeAfterDepreciation / incomeAfterCommission) * 100);
          return {
            name: `+${durationType.variants[index]} ${durationType.name}`,
            alias: durationType.variants[index],
            revenue,
            revenueAfterGst,
            gstOnRevenue,
            gstPrecentage,
            commission,
            incomeAfterCommission,
            depreciation,
            incomeAfterDepreciation,
            cogsPerMonth: Math.ceil(cogs / option.buyOutPeriod[index]),
            interestPercentage: Math.ceil(interestRate * 100),
            depreciationPercentage: Math.ceil(option.depreciation * 100),
            commissionPercentage: Math.ceil(option.commission[index] * 100),
            paybackTime,
            netIncomePercentage
          } as RevenuePerMonthProps
        })
      }
    })
  }, [cogs])

  const [plan, selectPlan] =useState(planSuggestions[0]);
  const methods = useFormContext<CreateListingValues>();
  useEffect(()=>{
    const variants = plan.variants.map(v=>({name:v.alias, value:v.revenue, commission: v.commission}));
    methods.setValue('variants', variants);
    console.log(variants);
  }, [plan])

  return (
    <ConnectForm<CreateListingValues>>
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
                  label="Amazon link"
                  {...register("productLink", {
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
                  {...register("inventoryQuantity", {
                    required: "Inventory qunatity is required",
                  })}
                  defaultValue={1}
                  autoComplete="iq"
                  errors={errors}
                  touched={touchedFields}
                  type='number'
                />

                <h2 className="text-base-semi mt-4">Estimate your rental rates</h2>              
                <Input
                  name="cogs"
                  label="Purchase price"
                  type='text'
                  defaultValue={35000}
                  onChange={e => setCogs(+e.target.value)}
                />
                <p className="text-sm text-gray-600 font-normal">Kindly provide us with the cost you incurred for the product, and we will propose a pricing structure for varying monthly rental durations in the below plans.</p>

                {planSuggestions.map((currentPlan, index) => <Plan key={index} currentPlan={currentPlan} selectedPlan={plan} selectPlan={selectPlan} isRecommended={index==0} />)}
                <p className="text-sm text-gray-600 font-normal mb-4">Please choose one from the above plans, where each plan displays various monthly rental rates and corresponding earning prices.</p>

              </div>
            </>
          )}
        </ConnectForm>
  )
}

export default ProductDetails



