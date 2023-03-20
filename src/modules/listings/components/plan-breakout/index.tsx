import { DurationType, ListingPirceBreakout } from "@lib/models/listing";
import { useState } from "react";

export type PlanBreakoutProps = {
    breakout: ListingPirceBreakout,
    name:string
    type:DurationType
  }

const PlanBreakout = (props: PlanBreakoutProps) => {
    const [isOpen, toggleBreakout] = useState(false);
  
    return (<div className="bg-stone-200">
      <div className="p-5">
        <div className="text-small-semi">For {props.name}</div>
        <div className="text-xs">Rental price, <span className="text-base-semi">Rs. {props.breakout.price}</span> per month</div>
        <div className="text-xs">Earning price, <span className="text-base-semi">Rs. {props.breakout.earning_price}</span> per month</div>
        <div className="text-xs mb-2">Payback time, <span className="text-base-semi">{props.breakout.payback_time} {`${props.type==DurationType.MONTHLY?'Months':props.type}`}</span></div>
      </div>
      <div className="bg-stone-300 p-5">
        
        {isOpen?(<div className="">
        <div className="text-small-semi mb-1">Breakout of earning per month</div>
        <div className="flex justify-between"><div className="text-xs">Rental price (GST incl.)</div> <div className="text-xs">{props.breakout.price}</div></div>
        <div className="flex justify-between"><div className="text-xs">GST ({Math.ceil(props.breakout.tax_rate*100)}%)</div> <div className="text-xs">-{props.breakout.tax_amount}</div></div>
        <div className="flex justify-between font-bold border-t border-black mt-2 pt-1"><div className="text-xs">Income after GST</div> <div className="text-xs">{props.breakout.listing_price}</div></div>
        
        <div className="flex justify-between"><div className="text-xs">Commission ({Math.ceil(props.breakout.commission_rate * 100)}%)</div> <div className="text-xs">-{props.breakout.commission_amount}</div></div>        
        <div className="flex justify-between font-bold border-t border-black mt-2 pt-1"><div className="text-xs">Income after commission</div> <div className="text-xs">{props.breakout.earning_price}</div></div>
        <div className="flex justify-between"><div className="text-xs">Deperciation ({Math.ceil(props.breakout.depreciation_rate * 100)}%)</div> <div className="text-xs">-{props.breakout.depreciation_amount}</div></div>
       
        <div className="flex justify-between font-bold border-t border-black mt-2 pt-1"><div className="text-xs">Net income ({Math.ceil(props.breakout.net_income_rate * 100)}%)</div> <div className="text-xs">{props.breakout.income_after_depreciation}</div></div>
        <div className="text-xs cursor-pointer underline mt-2" onClick={e=>toggleBreakout(!isOpen)}>Hide breakouts</div>  
      </div>):<div>
          <div className="flex justify-between font-bold"><div className="text-xs">Net income ({Math.ceil(props.breakout.net_income_rate * 100)}%)</div> <div className="text-xs">{props.breakout.income_after_depreciation}</div></div>
          <div className="text-xs cursor-pointer underline" onClick={e=>toggleBreakout(!isOpen)}>Show breakouts</div>  
        </div>}
      </div>
      
      
    </div>)
  }
  
  export default PlanBreakout;