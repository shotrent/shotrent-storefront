import { faCircle, faCircleCheck, faChevronCircleDown, faChevronCircleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DurationType, ListingVariant, Plan } from "@lib/models/listing";
import { useState } from "react";
import PlanBreakout from "../plan-breakout";



type PlanProps = {plan:Plan,selected:Plan,selectPlan:(arg:Plan)=>void,isRecommended:boolean}

const Plan = (props:PlanProps) => {
    const [isOpen, togglePlan] = useState(false);
    const variantName = (variant:ListingVariant) => `${variant.name}+ ${props.plan.type==DurationType.MONTHLY?'Months':props.plan.type}`;
    return (<div className="text-sm text-gray-600">
      <div className="bg-amber-100">
        <div className="flex justify-between p-5 pb-2 ">
          <div className="flex-none w-12 cursor-pointer" onClick={e=>props.selectPlan(props.plan)}>
            {props.plan.name!=props.selected.name?(<FontAwesomeIcon icon={faCircle} className="text-slate-400" />)
            :(<FontAwesomeIcon icon={faCircleCheck} className="text-black" />)}
          </div>
          <div className="grow text-base font-bold cursor-pointer" onClick={e=>props.selectPlan(props.plan)}>
            {props.plan.name} 
            {props.isRecommended?( <span className="text-xs ml-1">(Recommended)</span>):""}
          </div>
          <div className="flex-none cursor-pointer" onClick={e=>togglePlan(!isOpen)}>
            {!isOpen?(<FontAwesomeIcon icon={faChevronCircleDown} />):(<FontAwesomeIcon icon={faChevronCircleUp} />)}
          </div>
        </div>
       
        {isOpen?(<div className="grid grid-cols-1 lg:grid-cols-2 my-2">
        {props.plan.variants.map((variant, index) => <PlanBreakout key={index} breakout={variant} type={props.plan.type} name={variantName(variant)} />)}
      </div>):( <div className="my-2">
          <div className="grid grid-cols-4 grid-rows-2">
            {props.plan.variants.map((variant,i)=>(<div key={i} className="px-4  p-5 py-1 text-xs bg-stone-200 font-bold">{variantName(variant)}</div>))}
            {props.plan.variants.map((variant,i)=>(<div key={i} className="px-4  p-5 py-1 text-xs bg-stone-300">{variant.earning_price}</div>))}
          </div>
          
        </div>)}
      </div>
      
    </div>)
  }

  export default Plan;