import React from 'react';

const FaqSection: React.FC = (props) => {
    return (
        <div className="dark:bg-gray-800 dark:text-gray-100">
        <div className="container flex flex-col justify-center px-1 py-4 mx-auto md:px-8 2xl:px-32">
            <p className="p-2 text-sm font-medium tracking-wider text-center text-base-regular text-gray-600 mb-6">How it works</p>
            <h2 className="mb-12 text-xl font-bold leading-none text-center sm:text-xl">
                <span className='bg-amber-100 p-2'>Frequently Asked Questions</span>
            </h2>
            <div className="grid gap-10 md:gap-8 sm:p-3 md:grid-cols-2 lg:px-12 xl:px-32">
                <div>
                    <h3 className="font-semibold">What condition are the products in?</h3>
                    <p className="mt-1 text-gray-700 text-sm">
                    Shotrent rents new and as good as new products. Before products are rented out again, they go through a detailed quality check and multi-stage processing, so that each device rented from Grover arrives in great condition. If your device isn’t as expected, our customer service is happy to help.
                    </p>
                </div>
                <div>
                    <h3 className="font-semibold">When does the rent begin and end?</h3>
                    <p className="mt-1 text-gray-700 text-sm">The first monthly rental payment is charged when ordering, but the rental period does not officially start until you receive your product. The delivery date determines the recurring monthly payment date. If you fall in love and want to keep your product longer than the minimum rental period, you can extend your rental plan in your customer account at any time to reduce the monthly payment. At the end of the minimum rental period, you can keep renting on a monthly basis for the same price or cancel your subscription by returning your device for free.</p>
                </div>
                <div>
                    <h3 className="font-semibold">What if my device gets damaged during the rental period?</h3>
                    <p className="mt-1 text-gray-700 text-sm">If something happens during your rental, Grover Care is there for you. We pay for 90% of the repair costs for damages of all kinds, including display breakage, water damage, and technical defects. Of course there are no charges for device errors from the manufacturer. </p>
                </div>
                <div>
                    <h3 className="font-semibold">Can I also buy a product I'm renting?</h3>
                    <p className="mt-1 text-gray-700 text-sm">Yes. Just keep renting until you can keep it forever for one Rupees. Or buy the product earlier by paying off all your monthly payments at once. To see how many months you would need to rent until it is paid off, you can put your desired product with your rental plan of choice in the rent bag, hover over "Purchase option".</p>
                </div>
            </div>
        </div>
    </div>
    )
}

export default FaqSection;