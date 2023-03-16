import { faCircle, faCircleCheck, faChevronCircleDown, faChevronCircleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import RevenuePerMonth, { RevenuePerMonthProps } from "../revenue-per-month";

export type Plan = {
    name: string,
    variants: RevenuePerMonthProps[]
}

type PlanProps = {currentPlan:Plan,selectedPlan:Plan,selectPlan:(arg:Plan)=>void,isRecommended:boolean}

const Plan = (props:PlanProps) => {
    const [isOpen, togglePlan] = useState(false);
    return (<div className="text-sm text-gray-600">
      <div className="bg-amber-100">
        <div className="flex justify-between p-5 pb-2 ">
          <div className="flex-none w-12 cursor-pointer" onClick={e=>props.selectPlan(props.currentPlan)}>
            {props.currentPlan.name!=props.selectedPlan.name?(<FontAwesomeIcon icon={faCircle} className="text-slate-400" />)
            :(<FontAwesomeIcon icon={faCircleCheck} className="text-black" />)}
          </div>
          <div className="grow text-base font-bold cursor-pointer" onClick={e=>props.selectPlan(props.currentPlan)}>
            {props.currentPlan.name} 
            {props.isRecommended?( <span className="text-xs ml-1">(Recommended)</span>):""}
          </div>
          <div className="flex-none cursor-pointer" onClick={e=>togglePlan(!isOpen)}>
            {!isOpen?(<FontAwesomeIcon icon={faChevronCircleDown} />):(<FontAwesomeIcon icon={faChevronCircleUp} />)}
          </div>
        </div>
       
        {isOpen?(<div className="grid grid-cols-1 lg:grid-cols-2 my-2">
        {props.currentPlan.variants.map((variant, index) => <RevenuePerMonth key={index} {...variant} />)}
      </div>):( <div className="my-2">
          <div className="grid grid-cols-4 grid-rows-2">
            {props.currentPlan.variants.map((v,i)=>(<div key={i} className="px-4  p-5 py-1 text-xs bg-stone-200 font-bold">{v.name}</div>))}
            {props.currentPlan.variants.map((v,i)=>(<div key={i} className="px-4  p-5 py-1 text-xs bg-stone-300">{v.incomeAfterCommission}</div>))}
          </div>
          
        </div>)}
      </div>
      
    </div>)
  }

  export default Plan;