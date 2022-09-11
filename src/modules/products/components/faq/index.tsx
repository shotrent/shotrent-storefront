import React from 'react';

const FaqSection: React.FC = (props) => {
    return (
        <div className="dark:bg-gray-800 dark:text-gray-100">
        <div className="container flex flex-col justify-center px-1 py-4 mx-auto md:px-8 2xl:px-64">
            <p className="p-2 text-sm font-medium tracking-wider text-center text-base-regular text-gray-600 mb-6">How it works</p>
            <h2 className="mb-12 text-xl font-bold leading-none text-center sm:text-xl">
                <span className='bg-amber-100 p-2'>Frequently Asked Questions</span>
            </h2>
            <div className="grid gap-10 md:gap-8 sm:p-3 md:grid-cols-2 lg:px-12 xl:px-32">
                <div>
                    <h3 className="font-semibold">When will the products be delivered/ available for pickup?</h3>
                    <p className="mt-1 text-gray-700 text-sm">
                    We will deliver (or you may pickup) on the evening prior to your rental start date. Our delivery team will contact you on the day, to schedule the same.
                    </p>
                </div>
                <div>
                    <h3 className="font-semibold">What is the Refundable Deposit?</h3>
                    <p className="mt-1 text-gray-700 text-sm">Based on the value of products rented out, Shotrent requests a deposit from the customer. This deposit is 100% refundable and refunded to the same mode of payment once the products are returned back to Shotrent.</p>
                </div>
                <div>
                    <h3 className="font-semibold">What if there are any issues with my product during the rental period?</h3>
                    <p className="mt-1 text-gray-700 text-sm">If you are facing any issues, please reach out to our customer team on info@shotrent.in or (+91)7738-713-191. We will aim to diagnose the problem and help you with the next steps right away.</p>
                </div>
                <div>
                    <h3 className="font-semibold">Am I required to submit any additional documents?</h3>
                    <p className="mt-1 text-gray-700 text-sm">After confirming your booking, you will be required to upload certain documents as part of our KYC. This includes your Aadhaar Card, Address Proof ( Rental Agreement /Wifi Bill /Electricity Bill/ Passport/ H.R Letter) and occupation details. These details are stored securely with Shotrent and utilised only for customer verification.</p>
                </div>
            </div>
        </div>
    </div>
    )
}

export default FaqSection;