import { useState } from "react";

export type RevenuePerMonthProps = {
    name: string,
    alias:string,
    revenue: number,
    revenueAfterGst: number,
    gstOnRevenue: number,
    gstPrecentage: number,
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

const RevenuePerMonth = (props: RevenuePerMonthProps) => {
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
        <div className="flex justify-between"><div className="text-xs">Listing price (GST incl.)</div> <div className="text-xs">{props.revenue}</div></div>
        <div className="flex justify-between"><div className="text-xs">GST ({props.gstPrecentage}%)</div> <div className="text-xs">-{props.gstOnRevenue}</div></div>
        <div className="flex justify-between font-bold border-t border-black mt-2 pt-1"><div className="text-xs">Income after GST</div> <div className="text-xs">{props.revenueAfterGst}</div></div>
        
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
  
  export default RevenuePerMonth;