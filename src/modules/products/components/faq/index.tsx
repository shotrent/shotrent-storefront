import { faCircleChevronDown, faCircleChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Title from '../title';

const FaqQuestion: React.FC<any> = ({title, content}) => {
    const [state, setState] = useState(false);
    const icon = state? faCircleChevronUp : faCircleChevronDown;
    return(
        <div className="py-4 h-min border-b">
                <div className="flex py-2 justify-between cursor-pointer hover:text-slate-500" onClick={e=>setState(state=>!state)}>
                    <h3 className="font-semibold mr-2">{title}</h3>
                    <div className="align-right"><FontAwesomeIcon icon={icon} className="" scale={2} /></div>
                </div>
                {state && (<p className="py-2 mt-1 text-regular text-sm">
                        {content}
                </p>)}
        </div>
    )
}

const FaqSection: React.FC<any> = (props) => {

    const questions = [
        {
            title:"What condition are the products in?",
            content:"Shotrent rents new and as good as new products. Before products are rented out again, they go through a detailed quality check and multi-stage processing, so that each device rented from Shotrent arrives in great condition. If your device isn’t as expected, our customer service is happy to help."
        },
        {
            title:"When does the rent begin and end?",
            content:"The first monthly rental payment is charged when ordering, but the rental period does not officially start until you receive your product. The delivery date determines the recurring monthly payment date. If you fall in love and want to keep your product longer than the minimum rental period, you can extend your rental plan in your customer account at any time to reduce the monthly payment. At the end of the minimum rental period, you can keep renting on a monthly basis for the same price or cancel your subscription by returning your device for free.",
        },
        {
            title:"What if my device gets damaged during the rental period?",
            content:"If something happens during your rental, Shotrent Care is there for you. We pay for 90% of the repair costs for damages of all kinds, including display breakage, water damage, and technical defects. Of course there are no charges for device errors from the manufacturer.",
        },
        {
            title:"Can I also buy a product I'm renting?",
            content:"Yes. Just keep renting until you can keep it forever for one Rupee. Or buy the product earlier by paying off all your monthly payments at once. To see how many months you would need to rent until it is paid off, you can put your desired product with your rental plan of choice in the rent bag, hover over \"Purchase option\".",
        }
    ]

    return (
        <div {...props}>
            <div className="dark:bg-gray-800 dark:text-gray-100" >
                <div className="container flex flex-col justify-center px-1 py-4 mx-auto md:px-8 2xl:px-16">
                    <Title>Frequently asked questions</Title>                   
                    <div className="grid sm:p-3">
                        {questions.map((question, index)=>(<FaqQuestion key={index} {...question} />))}                
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FaqSection;