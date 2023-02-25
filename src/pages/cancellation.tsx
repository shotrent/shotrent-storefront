import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import Link from "next/link"
import { ReactElement } from "react"
import { NextPageWithLayout } from "types/global"


// We require your registered company address and domestic telephone number in India to be listed on the "Contact Us" or "Support" page on your website.

const Cancellation: NextPageWithLayout = () => {
    return (
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
    )
}


Cancellation.getLayout = (page: ReactElement) => {
    return <Layout>{page}</Layout>
}

export default Cancellation;

const Template = () => {
    return (<div>
        <h1 className="text-xl font-bold mt-8 mb-4">CANCELLATION & RETURN POLICY</h1>
       
        <p className="text-xl font-bold mt-8 mb-4">1. How and till when can I modify my order ?</p>
        <p className="mb-4">
          You can modify your order items up to one day before the scheduled delivery
          date by reaching us on customer helpline, website/app chat, or email. Please
          note, date and time of delivery are subject to change due to modification of
          your order. On changing your order, rent and deposit will be automatically
          adjusted as per current rates at the time of placing your order. After
          successful confirmation, your monthly rental amount will be calculated based
          on the newly chosen items in your order.
        </p>
        <p className="mb-4">
          As a customer and party to the rental contract, your products cannot be
          shifted from the address mentioned in this delivery address to any other
          location without notifying Shotrent. In case of a change of address and
          assistance with relocation, please contact us two weeks prior to the
          relocation or raise a relocation request via the customer dashboard for
          further assistance.
        </p>
        <p className="text-xl font-bold mt-8 mb-4">2. How can I cancel my existing order ?</p>
        <p className="mb-4">
          You can cancel an order up until one day before the agreed date of delivery
          without any extra cost. Once delivered, an existing order cannot be
          cancelled.
        </p>
        <p className="text-xl font-bold mt-8 mb-4">
          3. Can I return a few or all items of the order if I’m not happy with the
          products at the time of delivery ?
        </p>
        <p className="mb-4">
          Yes. While all our products pass a series of stringent quality checks, if
          you're not happy with the product's condition due to a defect or
          non-functionality, you may return the same at the time of delivery. If
          notified at the time of delivery, some exceptions can be considered in a
          valid case or circumstance. Please note, a return option will not be
          available at the time of delivery once our team exits your premises after
          successful confirmation of your order delivery. We also advise checking the
          product's specified dimensions before placing the order, as item rejection
          will not be considered eligible for return.
        </p>
        <p className="text-xl font-bold mt-8 mb-4">4. Can I close my rental subscription prior to the committed tenure ?</p>
        <p className="mb-4">
          Yes, you can. In case of early termination of your order, you can request
          for closure for one or all your items by informing us 7 days before the
          selected preferred date.
          <a href="#EARLY_CLOSURE">Early closure charge</a> will be applicable since
          the products will be returned before the end of your chosen tenure. To raise
          a closure request,
        </p>
        <ul>
          <li>Log in to your Shotrent account. </li>
          <li>Click on 'New Request' and choose 'Close Subscription.'</li>
          <li>Select the products you want to return.</li>
          <li>Choose a return date as per your convenience.</li>
        </ul>
        To avoid early closure charges, you can also consider the following options.
        <ul>
          <li>
            In case you're looking to close your subscription due to relocation, you
            can check our list of operational cities and continue your current
            subscription from the new city.
          </li>
          <li>
            You can also transfer your subscription to someone else, and the early
            closure charges will no longer be applicable.
          </li>
        </ul>
        In case of any doubts or queries, we encourage you to use the chat feature on
        the website/app to know more about ownership transfer of your rented products.
        <p className="mb-4" />
        <p className="text-xl font-bold mt-8 mb-4" id="EARLY_CLOSURE">5. What are the early closure charges ?</p>
        <p className="mb-4">
          Since the products will be returned before the end of your chosen tenure,
          the early closure charge is calculated based on your selected tenure and
          based on the category of products.
        </p>
        <p className="mb-4">
          An Early Closure Charge is payable in case you decide to return the products
          before your current tenure is up. The charge payable is a multiple of your
          Monthly Rent, which is decided by the current tenure of your contract.
        </p>
        <p className="mb-4">
          Please check your customer dashboard or your contract for the exact amount
          payable at any time.
        </p>
        <p className="text-xl font-bold mt-8 mb-4">6. How do I get my refundable deposit ?</p>
        <p className="mb-4">
          On approval of successful quality check of your rented products and
          clearance of any pending dues, a refund will be initiated towards your
          account. The same will be credited within 7-9 working days in the Bank
          account. Bank Account Details shared should be under the name of the
          Customer on whose name the order was placed. If you want to receive the
          refund amount to a different account, please reach our customer support for
          further assistance.
        </p>
        <p className="mb-4">
          In case of any damages to your rented products, Shotrent will inspect the
          products at our warehouse to determine a detailed breakdown of damage costs.
          The damage cost will then be deducted from your refundable amount.
        </p>
      </div>
      )
}