import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import Link from "next/link"
import { ReactElement } from "react"
import { NextPageWithLayout } from "types/global"


// We require your registered company address and domestic telephone number in India to be listed on the "Contact Us" or "Support" page on your website.

const Support: NextPageWithLayout = () => {
    return (
        <>
            <>
                <div className="bg-gray-50 py-6 min-h-[calc(100vh-64px)]">
                    <div className="content-container flex justify-center">
                        <div className="max-w-4xl h-full bg-white w-full">
                            <div className="p-10 border-b border-gray-200">
                                <Template />
                            </div>
                        </div>
                    </div>
                </div>
            </>

        </>
    )
}

Support.getLayout = (page: ReactElement) => {
    return <Layout>{page}</Layout>
}

export default Support

const Template = () => {
    return (
        <>
            <h1 className="text-xl font-bold mt-8 mb-4">SUPPORT</h1>
            <div className="">                
                <div className="mt-8">
                    <div className="flex justify-between">
                        <h2 className="text-base-semi">Domestic telephone number</h2>
                    </div>
                    <div className="mt-2">
                        <p className="text-small-regular text-gray-700">Call: (+91) 7738-713-191</p>
                    </div>
                </div>
                <div className="mt-8">
                    <div className="flex justify-between">
                        <h2 className="text-base-semi">Support email</h2>
                    </div>
                    <div className="mt-2">
                        <p className="text-small-regular text-gray-700"><a href="maito:info@shotrent.in">info@shotrent.in</a></p>
                    </div>
                </div>
                <div className="mt-8">
                    <div className="flex justify-between">
                        <h2 className="text-base-semi">Registered company address</h2>
                    </div>
                    <div className="mt-2">
                        <p className="text-small-regular text-gray-700">Shotrent Technologies Private Limited</p>
                        <p className="text-small-regular text-gray-700">JM Tower, Ansari Chowk, Kalyan - 421301</p>
                        <p className="text-small-regular text-gray-700">Maharashtra, India</p>
                    </div>
                </div>
            </div>
        </>)
}

{/* <div className="bg-gray-50 py-6 min-h-[calc(100vh-64px)]">
    <div className="content-container flex justify-center">
        <div className="max-w-4xl h-full bg-white w-full">
            <div className="p-10 border-b border-gray-200">
                <h1 className="text-base-regular mb-0">Support</h1>
                <div className="mt-8">
                    <div className="flex justify-between">
                        <h2 className="text-base-semi">Registered company address</h2>
                    </div>
                    <div className="mt-2">
                        <p className="text-small-regular text-gray-700">Shotrent Technologies Private Limited</p>
                        <p className="text-small-regular text-gray-700">JM Tower, Ansari Chowk, Kalyan - 421301</p>
                        <p className="text-small-regular text-gray-700">Maharashtra, India</p>
                    </div>
                </div>
                <div className="mt-8">
                    <div className="flex justify-between">
                        <h2 className="text-base-semi">Domestic telephone number</h2>
                    </div>
                    <div className="mt-2">
                        <p className="text-small-regular text-gray-700">Call: (+91) 7738-713-191</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div> */}