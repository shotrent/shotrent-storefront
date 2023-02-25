import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import Link from "next/link"
import { ReactElement } from "react"
import { NextPageWithLayout } from "types/global"


// We require your registered company address and domestic telephone number in India to be listed on the "Contact Us" or "Support" page on your website.

const TermsOfService: NextPageWithLayout = () => {
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



TermsOfService.getLayout = (page: ReactElement) => {
    return <Layout>{page}</Layout>
}

export default TermsOfService


const Template = () => {
    return (<>
        <h1 className="text-xl font-bold mt-8 mb-4">TERMS &amp; CONDITIONS</h1>

        <ol id="l1">
            <li>
                <h1 className="text-xl font-bold mt-8 mb-4">TERM</h1>
                <p className=" mb-4">
                    This Agreement shall commence on the date the products (more fully set
                    out in the Schedule) (“<b>Product(s)</b>”) are delivered to the Customer
                    and remain in full force and effect until the fixed period [equivalent
                    to the tenure of the contract that is agreed by the Customer while
                    booking the Product(s)] expires and the Products is returned to
                    Shotrent, unless terminated earlier or extended pursuant to the flexi
                    tenure policy.
                </p>

            </li>
            <li>
                <h1 className="text-xl font-bold mt-8 mb-4">FLEXI TENURE POLICY</h1>
                <p className=" mb-4">
                    Shotrent provides its Customers, an option to opt for flexible tenure (“
                    <b>Flexi Tenure</b>”) for early closure and/or extension of the term of
                    the Agreement. In case of early closure, the Customer can request for
                    closing the order by informing Shotrent, any time prior to the date the
                    Customer wishes to close the order. Shotrent provides its Customer with
                    different monthly rental rates depending on the tenure of the Agreement
                    at the time of order placement. In the event of early closure, the
                    Customer shall be liable to pay the early closure charges which shall be
                    calculated (please refer shotrent.in for detailed break up) based on the
                    tenure selected by the Customer. The early closure charges shall be
                    maximum up to the total amount of security deposit paid by the Customer,
                    excluding any rental dues and damage charges..
                </p>

                <p className=" mb-4">
                    For extension of the term beyond the Agreement tenure by the Customer,
                    the monthly rate applicable at the time of extension shall be followed
                    for calculation of rental amount for the extension period. Any extension
                    or early closure shall be done only through the Shotrent website and
                    such extension or early closure shall be deemed to be pursuant to this
                    Agreement. Shotrent reserves the right to revise the rental rates any
                    time at its sole discretion.
                </p>

            </li>
            <li>
                <h1 className="text-xl font-bold mt-8 mb-4">PAYMENT</h1>
                <p className=" mb-4">
                    The invoice shall be raised by Shotrent on the1st day of every month and
                    the due date for payment shall be the 10th day of the month (“
                    <b>Due Date</b>”). Customer shall pay the rental charge as per the
                    invoice raised and mailed to the Customer’s registered e-mail address.
                    Payment made beyond the Due Date shall incur a late fee. Late fees shall
                    be levied on the rental due amount only. The late fee of 10% shall be
                    applied on the 11th day of the month on the pending amount. In case the
                    Products are delivered anytime during the month, the first month shall
                    be calculated on a pro-rata basis from the date of delivery until the
                    last day of the first month. In case of order expiry or termination or
                    early cancellation, the last month rental shall be calculated on a
                    pro-rata basis until the date of pickup of the Product from Customer.
                </p>

                <p className=" mb-4">
                    The Customer shall make all payments to Shotrent only. Shotrent shall
                    not be liable for any payment made to any broker/third party by the
                    Customer. Shotrent reserves the right to share information with credit
                    rating agencies pursuant to Clause 13 of this Agreement. The Customer
                    hereby agrees that non-payment of rental dues, late fees, asset value
                    leased and any other non-payment, may affect the credit rating of the
                    Customer and Shotrent shall not be liable for any claim from the
                    Customer for sharing such information with credit rating agencies. In
                    the event, the Customer does not make payments to Shotrent or does not
                    return the Products and is not traceable, in addition to any other right
                    of Shotrent, the Customer agrees that Shotrent shall have the right to
                    reach out to the Customer’s relatives, friends, employer, offices and
                    shall inform them about the Customer’s default. The Customer hereby
                    agrees that, Shotrent shall not be liable for any inconvenience or loss
                    caused to the Customer for such action by Shotrent.
                </p>

            </li>
            <li>
                <h1 className="text-xl font-bold mt-8 mb-4">SECURITY DEPOSIT</h1>
                <p className=" mb-4">
                    In addition to the monthly rental, the Customer shall pay a refundable
                    security deposit (“<b>Security Deposit</b>”). The Security Deposit shall
                    not carry any interest for the entire tenure. The Security Deposit shall
                    be refunded to the Customer on the termination and after taking delivery
                    of all the Products from the possession of the Customer. Once the final
                    quality check is performed on all the Products, and in case no damage is
                    found, the Security Deposit shall be refunded within 15-21 working days to the Customer.
                    Shotrent shall refund the Security Deposit to the account from which initial the
                    Security Deposit was paid by the Customer, in case the Customer wishes
                    to get the refund to any other account, the Customer shall provide the
                    details of the account to Shotrent via e-mail from the registered email
                    address of the Customer and/or upload the account details on the
                    dashboard available on the Shotrent website, prior to the pickup of the
                    Products. The same account details shall be confirmed at the time of the
                    reverse pick up of the Products.
                </p>

                <p className=" mb-4">
                    In case any damage is found in any Product, Shotrent shall have the
                    right to deduct the charges for the damages or monthly dues from the
                    Security Deposit paid by the Customer and shall refund the remaining
                    amount to the Customer. In case of default in the payment of monthly
                    rentals (including late fee), Shotrent shall have the right to deduct
                    such rental dues from the Security Deposit and may at its sole
                    discretion refund or forfeit the remaining balance of the Security
                    Deposit. The Security Deposit shall not include any monthly rental. The
                    Customer cannot request for the monthly invoice dues to be adjusted from
                    the Security Deposit.
                </p>

            </li>
            <li>
                <h1 className="text-xl font-bold mt-8 mb-4">ORDER CONFIRMATION</h1>
                <p className=" mb-4">
                    On receipt of the order and the Security Deposit, Shotrent shall confirm
                    the order with the Customer by sending a confirmation (subject to
                    successful verification of KYC) to the registered e-mail address of the
                    Customer. In the event, any product selected by the Customer is
                    unavailable, Shotrent shall inform the same to the Customer. Shotrent
                    reserves the right to replace any product selected by the Customer in
                    the event of unavailability.
                </p>

                <p className=" mb-4">
                    The Customer shall be provided with an option to either accept or deny
                    such substitution at the time of confirming the order. Mere payment of
                    the Security Deposit shall not be considered as the valid contract. In
                    the event, the Customer does not accept the substitute Product, Shotrent
                    shall refund the Security Deposit paid by the Customer as per Clause 4
                    of this Agreement.
                </p>

                <p className=" mb-4">
                    The order raised by the Customer shall be processed subject to
                    successful verification of the KYC and serviceability of the Customer
                    location as per Shotrent Policy. In case the KYC verification is not
                    successful, or the location is not serviceable by Shotrent, Shotrent
                    reserves the right to reject the Customer’s order any time prior to
                    delivery, at its sole discretion without assigning any reason even after
                    successful KYC or serviceability of the location. In the event the order
                    is rejected by Shotrent, the Security Deposit paid by the Customer shall
                    be refunded to the Customer as per Clause 4 of this Agreement.
                </p>

                <p className=" mb-4">
                    The Customer authorizes Shotrent to verify all the details provided by
                    him/her and verify his/her credit score by evaluating their credit
                    report with the help of any credit bureau and/or any other third party.
                </p>

            </li>
            <li>
                <h1 className="text-xl font-bold mt-8 mb-4">DELIVERY</h1>
                <p className=" mb-4">
                    On confirmation of the order by the Customer, Shotrent shall deliver the
                    Products to the location specified by the Customer. The cost of the
                    delivery shall be borne by Shotrent. The Customer shall be present at
                    the location at the time of delivery agreed between Shotrent and the
                    Customer. In case the Customer is not present or has not assigned a
                    representative for taking delivery, at the location and a second
                    delivery attempt is required, Shotrent shall charge an extra delivery
                    cost to the Customer.
                </p>

                <p className=" mb-4">
                    Shotrent shall inspect the quality and ensure that the Products are
                    working and in usable condition before the delivery of the Products to
                    the Customer. The Customer shall inspect the Products for any damage and
                    quality during the time of delivery. In case any Product is damaged
                    during transit or unfit for use, Shotrent shall replace the same at its
                    own cost and in case a replacement is not required, such damage shall be
                    noted in the delivery receipt and a photo of the same shall be taken for
                    record. In case any claim of damage is brought against the Product after
                    the acceptance of delivery by the Customer, Shotrent shall not be
                    responsible towards replacing the Product and shall levy a damage to be
                    ascertained as per the damage policy below.
                </p>
            </li>
            <li>
                <h1 className="text-xl font-bold mt-8 mb-4">SERVICE</h1>
                <p className=" mb-4">
                    Shotrent shall provide the service for the Product during the term of
                    this Agreement. In case any service is required for the Product, the
                    Customer shall raise the request for the service, however, Shotrent
                    shall try to resolve the issue over call, in case the same is not
                    resolved, Shotrent shall send its representative within 2-5 days from
                    the date service request raised by the Customer to assess the service
                    requirement of the Product, in case the issue cannot be resolved at the
                    Customer Premises, Shotrent representative shall pick up the Product
                    from the Customer and shall deliver a temporary basic product to the
                    Customer. As Shotrent is not an authorized service provider of the
                    Product manufacturer, Shotrent shall submit the Product with the
                    authorized service center of the manufacturer and shall inform the
                    duration required for service to the Customer. Once the original Product
                    is repaired, Shotrent shall deliver the original Product to the Customer
                    and shall collect the product from the Customer.
                </p>
                <p className=" mb-4">
                    The Customer shall be liable to pay for any quality assessment check
                    (QC) cost incurred by Shotrent or any service charges incurred by
                    Shotrent for the service. In case of manufacturing defect, the Customer
                    shall not be liable to pay the charges for such service. Any service
                    arising out of damage as per clause 8, the Customer shall be liable to
                    pay for such damage.
                </p>

                <p className=" mb-4">
                    In case the service is due to manufacturing defect, the Customer shall
                    be charged the monthly rentals on a pro rata basis for the number of
                    days the Product is used by the Customer. In case the service is due to
                    the damage done by the Customer, then the Customer shall be liable to
                    pay the monthly rentals for the entire duration the Product was in
                    service., however, in case the service period exceeds 30 days, the
                    Customer shall not be liable for the duration the Product was under
                    service.
                </p>

            </li>
            <li>
                <h1 className="text-xl font-bold mt-8 mb-4">DAMAGE /LOST</h1>
                <p className=" mb-4">
                    The Customer shall be liable to pay for any damage (including but not
                    limited to dent, scratches, breakage, chipping, cracked display, jail
                    break of device, exposure to liquid or dampness or moisture or sand,
                    hardware and software tampering including jailbreak, rooting, unlocking
                    boot ROM, bending of Product frame, modifications, unauthorized repairs,
                    tampering of the Product serial number and malware installation or any
                    other cause not arising due to manufacturing defect of the Product) of
                    the Product, up to the existing market value of the Product, at the time
                    of such damage.
                </p>

                <p className=" mb-4">
                    In case the product is lost (including but not limited to robbery,
                    theft, misplacement) by the Customer, the Customer shall intimate
                    Shotrent immediately and the Customer shall either file a first
                    information report (“<b>FIR</b>”) with the jurisdictional police station
                    and share the copy with Shotrent or shall assist Shotrent in filing the
                    FIR. The Customer shall be liable to pay a penalty amounting to the
                    existing market value of the Product, at the time of such incident.
                </p>

            </li>
            <li>
                <h1 className="text-xl font-bold mt-8 mb-4">INSPECTION</h1>
                <p className=" mb-4">
                    Shotrent reserves the right to inspect the Product delivered to the
                    Customer during the final pick up of the Product at the end of the term
                    or earlier termination (as the case may be). The Customer shall
                    co-operate with the Shotrent to carry out the necessary quality checks
                    of the Product at the time of pickup of the Product. Shotrent shall
                    provide a quality check report to the Customer, in case any damage is
                    found to the Product at the time of reverse pickup, the Customer shall
                    be liable to pay for such damage. The Customer hereby agrees that, in
                    addition to doing the QC at the Customer’s premises, Shotrent shall
                    conduct a QC at its warehouse / service center and in case any
                    additional damage is found, the same shall be informed to the Customer
                    and shall be binding on the Customer.
                </p>

            </li>
            <li>
                <h1 className="text-xl font-bold mt-8 mb-4">DATA</h1>
                <p className=" mb-4">
                    The Customer is hereby informed that during service any data stored
                    (including but not limited to contacts, images, videos, files, software
                    and passwords) in the Product will be deleted and reformatted. Shotrent
                    shall not be responsible for any loss of software programs, data or
                    other information contained on the Product. Further the Customer, shall
                    be responsible for deleting and backing up any data stored on the
                    Product before returning the Product to Shotrent. In the event, Customer
                    fails to delete the stored data or take back up of the data, Shotrent
                    shall delete all the data stored on the Product. The Customer hereby
                    agrees that, Shotrent shall not be liable for any loss of data stored on
                    the Product or any economic consequential damages
                    including lost profits. The Customer shall be responsible for removing
                    any sim card, memory card, accessories in the Product before submitting
                    it to Shotrent representative.
                </p>

                <p className=" mb-4">
                    Shotrent reserves the right to install software for tracking the
                    location of the Product. The Customer hereby agrees to such installation
                    of software in the Product. The Customer shall not uninstall or stop
                    service of such software installed on the Product under any
                    circumstances. However, in case the software is deleted due any update
                    of firmware, the Customer shall immediately inform the same to Shotrent.
                </p>

            </li>
            <li>
                <h1 className="text-xl font-bold mt-8 mb-4">TERMINATION</h1>
                <p className=" mb-4">
                    In the event, the Customer does not wish to extend the rental period
                    beyond the Agreement date, the Agreement shall terminate on last day of
                    the rental term.
                </p>

                <p className=" mb-4">
                    Shotrent shall have the right to immediately terminate this Agreement in
                    the following events:
                </p>

                <ol className="list-decimal list-inside">
                    <li className="mb-2">
                        default of payment of rental dues or any other payment dues by the Customer; or
                    </li>
                    <li className="mb-2">
                        breach of any of the terms of this Agreement.
                    </li>
                </ol>


                <h2 className="text-regular font-bold mt-6 mb-2">Consequences of termination:</h2>

                <p className=" mb-4">
                    Shotrent shall have the right to take possession of the Products
                    delivered to the Customer immediately;
                </p>
                <ol className="list-decimal list-inside">
                    <li className="mb-2">
                    Any payment pending from the Customer shall become payable
                            immediately to Shotrent.
                    </li>
                    <li className="mb-2">
                            The Security Deposit paid by the Customer shall be refunded to
                            the Customer post the damage assessment of the Products, as per
                            clause 4 and 8 of this Agreement. In the event, the Security
                            Deposit is not sufficient to cover the damage to the Product,
                            Customer shall be liable to pay additional amount for such
                            damage.
                    </li>
                    <li className="mb-2">
                            In case of termination due to non-payment of rental dues, the
                            Security Deposit refund shall be determined subject to clause 4
                            of this Agreement.
                    </li>
                </ol>
                <p className=" mb-4">
                            Notwithstanding any other terms of this Agreement, Shotrent shall
                            have the right to terminate the Agreement without any cause by providing 30 days’ notice to the Customer.</p>
            </li>
            <li>
                <h1 className="text-xl font-bold mt-8 mb-4">OWNERSHIP OF PRODUCTS</h1>
                <p className=" mb-4">
                    Shotrent shall at all times during the term of this Agreement, retain
                    title to and / or be the beneficial owners of the Products delivered to
                    the Customer, pursuant to the Agreement. Nothing in this Agreement shall
                    be construed as a transfer of ownership of the Products to the Customer.
                    The Customer shall give immediate notice to Shotrent if any of the
                    Product is about to become liable or is threatened with seizure and the
                    Customer shall indemnify Shotrent against all loss and damage caused by
                    such action against its Products.
                </p>

            </li>
            <li>
                <h1 className="text-xl font-bold mt-8 mb-4">ASSIGNMENT</h1>
                <p className=" mb-4">
                    The Customer shall not assign or transfer any interest in this Agreement
                    or the Products without the written consent of Shotrent. Any such
                    transfer or assignment shall be considered as illegal and hence a
                    violation of the terms of this Agreement. Shotrent reserves the right to
                    assign this Agreement, to any third party (including credit rating
                    agencies, factoring agents and NBFC) without prior notice to the
                    Customer.
                </p>

            </li>
            <li>
                <h1 className="text-xl font-bold mt-8 mb-4">INDEMNIFICATION</h1>
                <p className=" mb-4">
                    The Customer shall indemnify, defend and hold Shotrent harmless from and
                    against any claim, demand, cause of action or loss or liability
                    (including, but not limited to, attorneys’ fees and costs) for any
                    Product damage or personal injury arising from the Customer’s use of the
                    Product by any cause, except to the extent such is caused by Shotrent
                    negligence or willful misconduct. The provisions of this clause shall
                    survive the termination of this Agreement with respect to any claim or liability accruing before such termination. In
                    no event shall Shotrent be liable for any direct, indirect, special or consequential loss or damage arising out of
                    Customer’s use of the Products.
                </p>

            </li>
            <li>
                <h1 className="text-xl font-bold mt-8 mb-4">GOVERNING LAW</h1>
                <p className=" mb-4">
                    This Agreement shall be governed by the laws of India and shall be
                    subject to exclusive jurisdiction of courts in Maharashtra.
                </p>

            </li>
            <li>
                <h1 className="text-xl font-bold mt-8 mb-4">ENTIRE AGREEMENT</h1>
                <p className=" mb-4">
                    This Agreement (together with the Annexure) constitutes the entire
                    agreement between Shotrent and the Customer. The acceptance of this
                    Agreement also signifies the acceptance of the Customer, to the terms
                    and conditions on the Shotrent website shotrent.in. In the event of any
                    conflict between the terms and conditions on the Shotrent website
                    (including privacy policy) and this Agreement, the terms and conditions
                    on the Shotrent website shall supersede. The Company reserves the right
                    to amend the terms and condition of this Agreement and on the website
                    from time to time, the customer is requested to check the website for
                    update of terms and conditions.
                </p>
            </li>
            <li>
                <h1 className="text-xl font-bold mt-8 mb-4">LIMITATION OF LIABILITY</h1>
                <p className=" mb-4">
                    In no event shall Shotrent be liable for indirect, special, incidental,
                    or consequential damages, or any loss of revenue, profits, or data of
                    any kind in connection with use of the Products, even if it has been
                    advised of the possibility of such damages. Notwithstanding any other
                    provision of this Agreement Shotrent’s total liability to Customer shall
                    not exceed the total amount of 1 (one) month rental collected from the
                    Customer.
                </p>

            </li>
            <li>
                <h1 className="text-xl font-bold mt-8 mb-4">ADVANCE RENTAL</h1>
            </li>
        </ol>
        <p className=" mb-4">
            Any advance rental amount credited to your Shotrent account as shotrentmoney
            will not be eligible for refund. Although, the same can be used for any
            existing or future subscriptions with Shotrent.
        </p>

        <h2 className="text-regular font-bold mb-2 mt-8">DISCLAIMER</h2>

        <p className=" mb-4">
            Shotrent Technologies Pvt. Ltd. reserves the right to cancel any orders
            completely or partially before delivery without prior information &amp; in
            such scenarios, we&apos;ll initiate the refund process for the security deposit
            amount and the Customer will receive it in their source account within 7-10
            working days.
        </p>

        <p className=" mb-4">
            Any current/future orders placed by the Customer has no connection with any
            of his/her previous orders.
        </p>

        <p className=" mb-4">
            Shotrent shall provide the services under the Agreement, either by itself or
            through any third-party. In case the services are provided through any
            third-party, Shotrent shall share the details (only to the extent required
            to provide the services) of the Customer to enable such third-party to
            provide the service. The Customer hereby authorizes Shotrent to share the
            details of the Customer with such third party.
        </p>
    </>
    )
}