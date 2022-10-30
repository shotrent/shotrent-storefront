import { faBagShopping, faBox, faBuildingColumns, faCircleChevronDown, faCircleChevronUp, faClose, faCross, faShield } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const Feature: React.FC<any> = ({title, content, onClose}) => {
    return(
        <div className="bg-amber-100 h-72 md:h-52 py-8 md:py-12 px-8 md:px-12">
                <div className="flex justify-between">
                    <h3 className="text-lg md:text-xl text-amber-800 font-bold mr-2">{title}</h3>
                    <div className='cursor-pointer text-amber-800 hover:text-amber-500' onClick={onClose}><FontAwesomeIcon icon={faClose} size={'lg'} /></div>                    
                </div>
                <p className="mt-4 md:mt-8 text-regular text-sm">
                    {content}
                </p>
        </div>
    )
}

const FeatureBox: React.FC<any> = ({title, icon, onClick}) => {
    return(
        <div className="bg-amber-100 hover:bg-white hover:shadow-md text-center cursor-pointer h-36 md:h-52 flex items-center justify-center" onClick={onClick}>
                <div className="p-4 text-amber-800 max-w-full">
                    <div className='p-2'><FontAwesomeIcon icon={icon} size={"2x"} /></div>
                    <h3 className="text-xs md:text-sm font-bold mx-1 md:mx-4">{title}</h3>                    
                </div>
        </div>
    )
}

const FeatureSection: React.FC = (props) => {

    const questions = [
        {
            icon: faBuildingColumns,
            title:"No deposit, no hidden costs",
            content:"Just pay the first month’s rent and we’ll ship your order. The rental period does not start until the product arrives with you."
        },
        {
            icon: faShield,
            title:"Damage coverage by Shotrent Care",
            content:"If something breaks, we pay 90% of the cost to repair or replace the product and you pay only 10%. Normal signs of use don’t count as damage, so don’t worry about those at all.",
        },
        {
            icon: faBagShopping,
            title:"Flexible rental period with purchase option",
            content:"Your minimum rental period isn’t set in stone. Switch to a longer term anytime to pay less each month, or continue to rent monthly at the same price after your minimum rental period ends. You can also buy the product anytime.",
        },
        {
            icon: faBox,
            title:"Free easy returns",
            content:"When your minimum rental period is over, you can end your rental payments anytime. Just return your product with the free shipping label one day before your next payment.",
        }
    ];

    const [state, setState] = useState(null as any);

    return (
        <div className='mx-4 h-72 md:h-52'>
            <div className='grid grid-cols-2 grid-rows-2 md:grid-cols-4 md:grid-rows-none gap-2'>
                {!state && questions.map(question=>(<FeatureBox {...question} onClick={()=>setState(question)} />))}   
                {state &&  (<div className='col-span-2 row-span-2 md:col-span-4 md:row-auto'>
                    <Feature {...state} onClose={()=> setState(null)} />
                </div>)} 
            </div>           
        </div>
    )
}

export default FeatureSection;