import { faChevronCircleDown, faChevronCircleUp, faCircle, faCircleCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { CheckoutFormValues, useCheckout } from "@lib/context/checkout-context"
import { emailRegex } from "@lib/util/regex"
import CountrySelect from "@modules/checkout/components/country-select"
import Button from "@modules/common/components/button"
import Checkbox from "@modules/common/components/checkbox"
import ConnectForm from "@modules/common/components/connect-form"
import Input from "@modules/common/components/input"
import Textarea from "@modules/common/components/textarea"
import Spinner from "@modules/common/icons/spinner"
import { useMemo, useState } from "react"

export class CreateListingValues {
  title: string = '';
  inTheBox: string = '';
  variants: ListingVariant[] = [];
}

export class ListingVariant {
  name: string = '';
  value: number = 0;
}

export type Plan = {
  name: string,
  variants: RevenuePerMonth[]
}

export type RevenuePerMonth = {
  name: string,
  revenue: number,
  commission: number,
  incomeAfterCommission: number,
  depreciation: number,
  incomeAfterDepreciation: number,
  cogsPerMonth: number,
  interestPercentage: number,
  depreciationPercentage: number,
  commissionPercentage: number,
  paybackTime: string,
  netIncomePercentage: number
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

  const [cogs, setCogs] = useState(0);
 

  const pricingOptions = [
    {
      interestRates: [.48, .24, .22, .20],
      commission: [.24, .18, .16, .12],
      depreciation: .25,
      buyOutPeriod: [9, 16, 21, 26,]
    },
    {
      interestRates: [.56, .32, .30, .28],
      commission: [.28, .18, .16, .12],
      depreciation: .25,
      buyOutPeriod: [9, 16, 21, 26,]
    },
    {
      interestRates: [.64, .48, .4, .32],
      commission: [.32, .24, .2, .16],
      depreciation: .25,
      buyOutPeriod: [9, 16, 21, 26,]
    }
  ];

  const planSuggestions = useMemo(() => {
    return pricingOptions.map((option, planIndex) => {
      return {
        name: `Plan ${planIndex + 1}`,
        variants: option.interestRates.map((interestRate, index) => {
          const revenue = Math.ceil((cogs + (cogs * interestRate)) / option.buyOutPeriod[index]);
          const commission = Math.ceil(revenue * option.commission[index]);
          const incomeAfterCommission = revenue - commission;
          const depreciation = Math.ceil((cogs * option.depreciation) / 12);
          const incomeAfterDepreciation = incomeAfterCommission - depreciation;
          const paybackTime = Math.ceil(cogs / incomeAfterCommission) + ' ' + durationType.name;
          const netIncomePercentage = Math.ceil((incomeAfterDepreciation / incomeAfterCommission) * 100);
          return {
            name: `${durationType.variants[index]}+ ${durationType.name}`,
            revenue,
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
          }
        })
      }
    })
  }, [cogs])

  const [plan, selectPlan] =useState(planSuggestions[0]);

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

                <Textarea
                  label="What's in the box"
                  {...register("inTheBox", {
                    required: "\"What's in the box\" is required",
                  })}
                  autoComplete="title"
                  errors={errors}
                  touched={touchedFields} />


                <h2 className="text-base-semi mt-4">Set your pricing</h2>              
                <Input
                  name="cogs"
                  label="Purchase price"
                  type='text'
                  onChange={e => setCogs(+e.target.value)}
                />
                <p className="text-sm text-gray-600 font-normal mb-4">Kindly provide us with the cost you incurred for the product, and we will propose a pricing structure for varying monthly rental durations.</p>

                <h2 className="text-base-semi mt-4">Choose your rental rates</h2>
                <p className="text-sm text-gray-600 font-normal mb-4">Please choose from the plans below, where each plan displays various monthly rental rates and corresponding earning prices.</p>
                {planSuggestions.map((currentPlan, index) => <PlanTemplate currentPlan={currentPlan} selectedPlan={plan} selectPlan={selectPlan} isRecommended={index==0} />)}

              </div>
            </>
          )}
        </ConnectForm>
  )
}

export default ProductDetails

const PlanTemplate = ({currentPlan,selectedPlan, selectPlan, isRecommended}:{currentPlan:Plan,selectedPlan:Plan,selectPlan:(arg:Plan)=>void,isRecommended:boolean}) => {
  const [isOpen, togglePlan] = useState(false);
  return (<div className="text-sm text-gray-600">
    <div className="bg-amber-100">
      <div className="flex justify-between p-5 pb-2 ">
        <div className="flex-none w-12 cursor-pointer" onClick={e=>selectPlan(currentPlan)}>
          {currentPlan.name!=selectedPlan.name?(<FontAwesomeIcon icon={faCircle} className="text-slate-400" />)
          :(<FontAwesomeIcon icon={faCircleCheck} className="text-black" />)}
        </div>
        <div className="grow text-base font-bold cursor-pointer" onClick={e=>selectPlan(currentPlan)}>
          {currentPlan.name} 
          {isRecommended?( <span className="text-xs ml-1">(Recommended)</span>):""}
        </div>
        <div className="flex-none cursor-pointer" onClick={e=>togglePlan(!isOpen)}>
          {!isOpen?(<FontAwesomeIcon icon={faChevronCircleDown} />):(<FontAwesomeIcon icon={faChevronCircleUp} />)}
        </div>
      </div>
     
      {isOpen?(<div className="grid grid-cols-1 lg:grid-cols-2 my-2">
      {currentPlan.variants.map((variant, index) => <RevenuePerMonthTemplate key={index} {...variant} />)}
    </div>):( <div className="my-2">
        <div className="grid grid-cols-4 grid-rows-2">
          {currentPlan.variants.map(v=>(<div className="px-4  p-5 py-1 text-xs bg-stone-200 font-bold">{v.name}</div>))}
          {currentPlan.variants.map(v=>(<div className="px-4  p-5 py-1 text-xs bg-stone-300">{v.incomeAfterCommission}</div>))}
        </div>
        
      </div>)}
    </div>
    
  </div>)
}

const RevenuePerMonthTemplate = (props: RevenuePerMonth) => {
  const [isOpen, toggleBreakout] = useState(false);

  return (<div className="bg-stone-200">
    <div className="p-5">
      <div className="text-small-semi">For {props.name}</div>
      <div className="text-xs">Listing price, <span className="text-base-semi">Rs. {props.revenue}</span> per month</div>
      <div className="text-xs">Earning price, <span className="text-base-semi">Rs. {props.incomeAfterCommission}</span> per month</div>
      <div className="text-xs mb-2">Payback time, <span className="text-base-semi">{props.paybackTime}</span></div>
    </div>
    <div className="bg-stone-300 p-5">
      
      {isOpen?(<div className="">
      <div className="text-small-semi mb-1">Breakout of earning per month</div>
      <div className="flex justify-between"><div className="text-xs">COGS + Interest ({props.cogsPerMonth} + {props.interestPercentage}%)</div> <div className="text-xs">{props.revenue}</div></div>
      <div className="flex justify-between"><div className="text-xs">Commission ({props.commissionPercentage}%)</div> <div className="text-xs">-{props.commission}</div></div>
      
      <div className="flex justify-between font-bold border-t border-black mt-2 pt-1"><div className="text-xs">Income after commission</div> <div className="text-xs">{props.incomeAfterCommission}</div></div>
      <div className="flex justify-between"><div className="text-xs">Deperciation ({props.depreciationPercentage}%)</div> <div className="text-xs">-{props.depreciation}</div></div>
     
      <div className="flex justify-between font-bold border-t border-black mt-2 pt-1"><div className="text-xs">Net income ({props.netIncomePercentage}%)</div> <div className="text-xs">{props.incomeAfterDepreciation}</div></div>
      <div className="text-xs cursor-pointer underline mt-2" onClick={e=>toggleBreakout(!isOpen)}>Hide breakouts</div>  
    </div>):<div>
        <div className="flex justify-between font-bold"><div className="text-xs">Net income ({props.netIncomePercentage}%)</div> <div className="text-xs">{props.incomeAfterDepreciation}</div></div>
        <div className="text-xs cursor-pointer underline" onClick={e=>toggleBreakout(!isOpen)}>Show breakouts</div>  
      </div>}
    </div>
    
    
  </div>)
}
