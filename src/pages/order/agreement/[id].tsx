import { medusaClient } from "@lib/config"
import { IS_BROWSER } from "@lib/constants"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import OrderCompletedTemplate from "@modules/order/templates/order-completed-template"
import SkeletonOrderConfirmed from "@modules/skeletons/templates/skeleton-order-confirmed"
import add from "date-fns/add"
import format from "date-fns/format"
import { formatAmount } from "medusa-react"
import { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"
import { ReactElement, useEffect } from "react"
import { dehydrate, QueryClient, useQuery } from "react-query"
import { ToWords } from "to-words"
import { NextPageWithLayout } from "types/global"

const fetchOrder = async (id: string) => {
  return await medusaClient.orders.retrieve(id).then(({ order }) => order)
}

const Agreement: NextPageWithLayout = () => {
  const router = useRouter()

  const toWords = new ToWords({
    localeCode: 'en-IN',
    converterOptions: {
      currency: true,
      ignoreDecimal: false,
      ignoreZeroCurrency: false,
      doNotAddOnly: false,
      currencyOptions: { // can be used to override defaults for the selected locale
        name: 'Rupee',
        plural: 'Rupees',
        symbol: '₹',
        fractionalUnit: {
          name: 'Paisa',
          plural: 'Paise',
          symbol: '',
        },
      }
    }
  });

  

  const id = typeof router.query?.id === "string" ? router.query.id : ""

  const { isSuccess, data, isLoading, isError } = useQuery(
    ["get_order_confirmed", id],
    () => fetchOrder(id),
    {
      enabled: id.length > 0,
      staleTime: Infinity,
    }
  )

  if (isLoading) {
    return <SkeletonOrderConfirmed />
  }

  if (isError) {
    if (IS_BROWSER) {
      router.replace("/404")
    }

    return <SkeletonOrderConfirmed />
  }

  if (isSuccess) {

    const maxRentalMonth = data.items.reduce((prev,curr)=> Math.max(prev, (curr.metadata.rentalPeriod as number)), 0);
    const perDayRent = Math.ceil((data.total/100)/30)*100;
    const insuranceAmount = 2000000;
    const agreementData = {
      lesseeName: `${data.shipping_address.first_name} ${data.shipping_address.last_name}`,
      lessorName: `Shadman Kudchikar`,
      lessorDesignation:`Managing Director, Shotrent Technologies PVT. LTD.`,
      enteredDate:format(new Date(data.created_at),'do LLL, yyyy'),
      state: data.shipping_address.province,
      rentalRate: `${toWords.convert(data.total/100)} (${formatAmount({amount:data.total, region: data.region})})`,
      returnDate: `${format(add(new Date(data.shipping_address.created_at),{days:3, months:maxRentalMonth}),'do LLL, yyyy')}`,
      additionalCharges: `${toWords.convert(perDayRent/100)} (${formatAmount({amount:perDayRent, region: data.region})})`,
      securityDeposit: `${toWords.convert(0)} (${formatAmount({amount:0, region: data.region})})`,
      customerAddress:`${data.shipping_address.address_1} ${data.shipping_address.address_2}, ${data.shipping_address.city}, ${data.shipping_address.province}, India`,
      insuranceAmount: `${toWords.convert(insuranceAmount/100)} (${formatAmount({amount:insuranceAmount, region: data.region})})`,
      violationTimeFrameInDays: 15,
    }

    

    return (
      <>
        <Head
          title="Equipment Rental Agreement"
          description="Shotrent Technologies equipment rental agreement"
        />

        <div className="bg-gray-50 py-6 min-h-[calc(100vh-64px)]">
          <div className="content-container flex justify-center">
            <div className="h-full bg-white p-4">
                <h1 className="text-2xl font-bold mt-32">Shotrent Technologies Private Limited</h1>
                <h2 className="text-4xl font-bold mt-4">Equipment Rental Agreement</h2>
                <div className="mt-80">
                  <div className="font-bold">Prepared for:</div>
                  <div>{agreementData.lesseeName}</div>
                </div>
                <div className="mt-16">
                  <div className="font-bold">Created by:</div>
                  <div>{agreementData.lessorName}</div>
                  <div>{agreementData.lessorDesignation}</div>
                </div>

                <div className="mt-32">
                  <p>This Equipment Rental Agreement (the “Agreement”) is made and entered on {agreementData.enteredDate} (the “Effective Date”) by and between Shadman Kudchikar (the “Lessor”) legally conducting business within the State of {agreementData.state}; and {agreementData.lesseeName} (the “Lessee”); collectively referred to herein as the “Parties.”</p>
                  <p className="mt-4">1. <span className="font-bold">EQUIPMENT SUBJECT TO LEASE.</span>  The Lessor shall rent the equipment listed herein to the Lessee whom must adhere to the terms and conditions within this Agreement.</p>
                  {data.items.map(item=> <p className="mt-1" key={item.id}>{item.title} for {item.metadata.rentalPeriod} month(s)</p>)}
                  <p className="mt-4">2. <span className="font-bold">PAYMENT TERMS.</span> The rental fee is based on a rate of {agreementData.rentalRate} per month, plus any additional fees incurred.  Additional charges shall be added in the event the equipment is damaged, missing any parts, or returned later than {agreementData.returnDate}.  All charges shall commence from the Effective Date of this Agreement.  Lessee shall pay to the Lessor an additional service charge of {agreementData.additionalCharges} per day for each day the equipment has not been returned, in addition to the daily rental fee.  Lessor shall invoice the client on a TIME PERIOD basis and all invoices are due upon receipt.</p>
                  <p className="mt-4">3. <span className="font-bold">RETURNED CHECKS.</span> The Lessee shall be charged {agreementData.additionalCharges} for each check that is returned to the Lessor for insufficient funds.</p>
                  <p className="mt-4">4. <span className="font-bold">SECURITY DEPOSIT.</span> In addition to the rental fee, the Lessee shall pay a security deposit of {agreementData.securityDeposit} prior to receiving any equipment and at the time this Agreement is signed.  This deposit shall be returned to the Lessee upon termination of this Agreement, subject to the option of the Lessor to apply it against any charges or damages incurred.  Any amounts refundable to the Lessee shall be paid at the time this Equipment Rental Agreement is terminated.  The security deposit shall bear interest at an annual rate of 0% from the date paid to the Lessor until the date refunded, based on the total amount of the security deposit.</p>
                  <p className="mt-4">5. <span className="font-bold">LEASE TERM.</span> This Equipment Rental Agreement shall begin on the above Effective Date and shall terminate on {agreementData.returnDate}, unless otherwise terminated in a manner consistent within these terms.  At the end of the Lease term, the Lessee shall be obligated to return the equipment to the Lessor at the Lessee&apos;s expense.</p>
                  <p className="mt-4">6. <span className="font-bold">LOCATION.</span> The equipment shall be located at {agreementData.customerAddress} during the term of this Agreement, and shall not be removed from that location without the Lessor’s prior written consent. </p>
                  <p className="mt-4">7.<span className="font-bold"> CARE AND OPERATION.</span> The equipment may only be used and operated in a careful and proper manner.  Its use must comply with all laws, ordinances, and regulations relating to the possession, use, or maintenance of the equipment, including registration and/or licensing requirements, if any.</p>
                  <p className="mt-4">8. <span className="font-bold">INSURANCE.</span>  The Lessee shall insure the equipment in an amount of at least {agreementData.insuranceAmount}.</p>
                  <p className="mt-4">9. <span className="font-bold">TAXES & FEES.</span>  During the term of this Equipment Rental Agreement,  the Lessee shall pay all applicable taxes, assessments, and license and registration fees on the equipment.</p>
                  <p className="mt-4">10. <span className="font-bold">ALTERATIONS.</span>  Lessee shall make no alterations to the equipment without prior written consent of the Lessor.  All alterations shall be property of the Lessor and subject to the term within.  Lessor shall have the right to inspect the equipment during Lessee’s normal business hours upon request.</p>
                  <p className="mt-4">11. <span className="font-bold">MAINTENANCE AND REPAIR.</span>  The Lessee shall maintain at the Lessee’s cost, the equipment in good repair and operating condition, allowing for reasonable wear and tear.  Such costs shall include labor, material, parts, and similar items.</p>
                  <p className="mt-4">12.<span className="font-bold">OPTION TO RENEW.</span>  If the Lessee is not in default upon the expiration of this lease, the Lessee shall the option to renew this Lease for a similar term on such terms as the Parties agree upon.</p>
                  <p className="mt-4">13. <span className="font-bold">DEFAULT.</span>  The occurrence of any of the following shall constitute a default under this Agreement:</p>
                  <p className="mt-4">a. The failure to make a required payment under this Agreement when due.</p>
                  <p className="mt-4">b. The violation of any other provision or requirement that is not corrected within {agreementData.violationTimeFrameInDays} day(s) after written notice of the violation is given.</p>
                  <p className="mt-4">c. The insolvency or bankruptcy of the Lessee. </p>
                  <p className="mt-4">14. <span className="font-bold">LIMITATION OF LIABILITY.</span>  TO THE MAXIMUM EXTENT PERMITTED UNDER APPLICABLE LAW, LESSOR SHALL NOT BE LIABLE TO LESSEE, AND LESSEE COVENANTS THAT IT SHALL NOT ASSERT A CLAIM AGAINST LESSOR, UNDER ANY LEGAL THEORY, WHETHER IN AN ACTION BASED ON A CONTRACT, NEGLIGENCE, TORT, STRICT LIABILITY, OR OTHERWISE PROVIDED BY STATUTE OR LAW, (i) FOR ANY INCIDENTAL, SPECIAL, EXEMPLARY, CONSEQUENTIAL, OR STATUTORY DAMAGES, OR ANY DAMAGES RESULTING FROM LOST PROFITS, INTERRUPTION OF BUSINESS, OR LOSS OF GOODWILL, EVEN IF LESSOR HAD BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES, OR (ii) FOR DAMAGES RELATED TO OR ARISING OUT OF THIS AGREEMENT IN AN AMOUNT THAT EXCEEDS THE FEES ACTUALLY PAID BY LESSOR UNDER THIS AGREEMENT.  LESSEE HEREBY WAIVES ANY CLAIM THAT THESE EXCLUSIONS DEPRIVE IT OF AN ADEQUATE REMEDY OR CAUSE THIS AGREEMENT TO FAIL OF ITS ESSENTIAL PURPOSE.  PARTIES, HEREBY ACKNOWLEDGE AND AGREE THAT ANY WARRANTY DISCLAIMERS AND LIMITATION OF LIABILITY PROVISIONS SET FORTH ABOVE HAVE BEEN NEGOTIATED AND ARE FUNDAMENTAL ELEMENTS OF BASIS OF THIS AGREEMENT.</p>
                  <p className="mt-4">15. <span className="font-bold">DISPUTE RESOLUTION.</span> This Agreement and any dispute relating to this Agreement shall be governed by and interpreted in accordance within the law and Parties irrevocably agree that the courts within the State of STATE shall have exclusive jurisdiction to settle any dispute which may arise out of, under, or in connection with the Agreement, regardless of individual party location.  Parties irrevocably submit to the exclusive jurisdiction of the federal and state courts located within the State of {agreementData.state}.</p>
                  <p className="mt-4">16.<span className="font-bold">INDEMNITY.</span>Lessee agrees to indemnify and hold Lessor, its subsidiaries, affiliates, and respective officers, agents, partners and employees, harmless from any loss, liability, demand, claim or legal proceedings brought or threatened, including expenses suffered or incurred arising out of Lessee use of the equipment, the functionality of the equipment, or any violation of this Agreement.</p>
                  <p className="mt-4">17. <span className="font-bold">SEVERABILITY.</span> In the event, that any portion of this Agreement is held to be unenforceable, the unenforceable portion shall be amended to reflect, to the greatest extent permitted under applicable law, the original intent of the Parties, and the remainder of the provisions shall remain in full force and effect. </p>
                  <p className="mt-4">18. <span className="font-bold">WAIVER.</span> Either party&apos;s failure to insist upon strict performance of any provision of this Agreement shall not be construed as a waiver of that or any other of its rights hereunder at any later date or time.</p>
                  <p className="mt-4">19. <span className="font-bold">FORCE MAJEURE.</span> With the exception of any payment obligations, neither Party shall be liable for failing to perform its obligations hereunder (other than payment obligations) were delayed or hindered by war, riots, embargoes, strikes or acts of its vendors or suppliers, accidents, acts of God, or any other event beyond its reasonable control.</p>
                  <p className="mt-4">20. <span className="font-bold">SURVIVAL.</span> All terms and provisions of this Agreement that should by their nature survive the termination shall so survive.</p>
                  <p className="mt-4">21. <span className="font-bold">ENTIRE AGREEMENT.</span>  This Agreement, including any exhibits attached hereto and made part hereof, constitutes the entire agreement between Lessor and Lessee with respect of the subject matter hereof.  This Agreement supersedes any prior agreements, representations, or dealings between the Parties.</p>
                  <p className="mt-4">IN WITNESS WHEREOF, the Parties hereto have executed this Equipment Rental Agreement by a duly authorized representative effective as of the date set forth at the top of this Agreement.</p>
                </div>
                <div className="flex justify-between mt-36">
                  <div>
                    <div>{agreementData.lessorName}</div>
                    <div>{agreementData.lessorDesignation}</div>
                  </div>
                  <div>{agreementData.lesseeName}</div>
                </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return <></>
}

Agreement.getLayout = (page: ReactElement) => {
  return <div>{page}</div>
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id as string
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(["get_order_confirmed", id], () =>
    fetchOrder(id)
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default Agreement
