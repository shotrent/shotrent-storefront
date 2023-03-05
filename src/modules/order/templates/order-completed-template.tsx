import { Order } from "@medusajs/medusa"
import Button from "@modules/common/components/button"
import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OrderDetails from "@modules/order/components/order-details"
import OrderSummary from "@modules/order/components/order-summary"
import PaymentDetails from "@modules/order/components/payment-details"
import ShippingDetails from "@modules/order/components/shipping-details"
import React, { useEffect, useState } from "react"
import { customClient, STRIPE_PUBLISHABLE_KEY } from "@lib/config"
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from "@modules/stripe/checkout-form"
import Link from "next/link"

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

type OrderCompletedTemplateProps = {
  order: Order
}

type DigioInstance = { init: () => void; submit: (arg0: any, arg1: any, arg2: any) => void } | undefined;

type StripSubscriptionResult = {
  subscriptionId?: string;
  clientSecret?: string;
  status?: string;
  stripeSubscription?: any;
}

const OrderCompletedTemplate: React.FC<OrderCompletedTemplateProps> = ({
  order,
}) => {

  const [loading, setLoading] = useState(false);
  const [isKycRequestLoading, setIsKycRequestLoading] = useState(false);
  const [orderMetadata, setorderMetadata] = useState({} as any);
  const [stripeOptions, setStripeOptions] = useState<StripSubscriptionResult>({});

  const getStripSubscription = () => {
    customClient.get(`/store/orders/${order.id}/stripe/subscription`)
      .then(res => {
        setStripeOptions(res.data);
        console.log(res.data);
      });
  }

  const getOrderMetadata = () => {
    customClient.get(`/store/orders/${order.id}/metadata`)
      .then(res => setorderMetadata(res.data));
  }

  useEffect(() => {
    getOrderMetadata();
    getStripSubscription();
  }, [])

  const initDigio = (callback: (arg1: any) => void) => {
    const theWindow = window as any;
    if (theWindow) {
      const options = {
        environment: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox',
        callback,
        logo: `${theWindow.location.origin}/favicon.ico`,
        theme: {
          primaryColor: "#AB3498",
          secondaryColor: "#000000"
        },
        is_iframe: false
      }
      const digio: DigioInstance = new theWindow.Digio(options);
      digio?.init();
      return digio;
    }
  }

  const submitDigio = (digio: DigioInstance, data: { requestId: any; identifier: any; token_id: any }) => {
    if (digio) {
      digio.submit(data.requestId, data.identifier, data.token_id)
    }
  }



  const createSignRequest = () => {
    if (loading) return;
    setLoading(true);
    const digio = initDigio((response: any) => {
      if (response.hasOwnProperty("error_code")) {
        return console.log("error occurred in process");
      }
      customClient.post(`/store/orders/${order.id}/digio/sign/agreement/response`)
        .then(res => {
          getOrderMetadata();
        })
        .catch(err => {
          console.log(err);
        })
    });

    customClient.post(`/store/orders/${order.id}/digio/sign/agreement`)
      .then(res => {
        const result = res.data;
        const params = {
          requestId: result.data.id,
          identifier: result.data.signing_parties[0].identifier,
          token_id: result.data.access_token.id
        };
        submitDigio(digio, params);
      })
      .finally(() => setLoading(false));
  }

  const createKycRequest = () => {
    if (isKycRequestLoading) return;
    setIsKycRequestLoading(true);

    const digio = initDigio((response: any) => {
      if (response.hasOwnProperty("error_code")) {
        return console.log("error occurred in process");
      }
      customClient.post(`/store/orders/${order.id}/digio/kyc/response `)
        .then(res => {
          getOrderMetadata();
        })
        .catch(err => {
          console.log(err);
        })
    });

    customClient.post(`/store/orders/${order.id}/digio/kyc`)
      .then(response => {
        const result = response.data;
        const params = {
          requestId: result.data.id,
          identifier: result.data.customer_identifier,
          token_id: result.data.access_token.id
        };
        submitDigio(digio, params);
      })
      .catch(err => console.log(err))
      .finally(() => setIsKycRequestLoading(false))
  }

  type ShowStatusProps = { isCompleted: boolean };
  const ShowStatus = (props: ShowStatusProps) => {
    return (
      props.isCompleted ? (<span className="rounded-full text-white bg-green-500 py-1 px-2 text-xs">completed</span>)
        : (<span className="rounded-full text-white bg-blue-500 py-1 px-2 text-xs">pending</span>)
    )
  }

  return (
    <div className="bg-gray-50 py-6 min-h-[calc(100vh-64px)]">
      <div className="content-container flex justify-center">
        <div className="max-w-4xl h-full bg-white w-full">
          <OrderDetails order={order} />

          <div className="p-10 border-b border-gray-200">
            <h1 className="text-base-regular mb-0">To confirm your order, please ensure that you complete the following steps</h1>            
            <div className="mt-8">
              <div className="flex justify-between">
                <h2 className="text-base-semi">Step 1: KYC</h2>
                <ShowStatus isCompleted={orderMetadata.isKycCompleted} />
              </div>
              <div className="mt-2">
                <span className="text-small-regular text-gray-700">To complete this step, you will be directed to DigiLocker. Your KYC documents, including <span className="font-bold">Aadhaar and PAN</span>, will be retrieved from DigiLocker.</span>
                {!orderMetadata.isKycCompleted ? (<Button className="w-64 mt-4" onClick={e => createKycRequest()}>{isKycRequestLoading ? 'Loading...' : 'complete kyc'}</Button>)
                  : (<Button disabled className="w-64 mt-4">{'kyc completed'}</Button>)}
              </div>
            </div>
            <div className="mt-12">
              <div className="flex justify-between">
                <h2 className="text-base-semi">Step 2: E-sign agreement</h2>
                <ShowStatus isCompleted={orderMetadata.isRentalAgreementSigned} />
              </div>
              <div className="mt-2">
                <span className="text-small-regular text-gray-700">To complete this step, electronically sign the Shotrent equipment rental agreement with your Aadhaar using Digio's signing portal.</span>
                {!orderMetadata.isRentalAgreementSigned ?
                  (<Button className="w-64 mt-4" onClick={e => createSignRequest()}>{loading ? 'Loading...' : 'e-sign rental agreement'}</Button>)
                  : (<Button disabled className="w-64 mt-4">{'e-sign completed'}</Button>)}
              </div>
            </div>
            <div className="mt-12">
              <div className="flex justify-between">
                <h2 className="text-base-semi">Step 3: Pay on delivery</h2>
                <ShowStatus isCompleted={stripeOptions.status == 'active'} />
              </div>
              <div className="mt-2 mb-4">
                <span className="text-small-regular text-gray-700">To complete this step, use Stripe's card payment method to pay and set up automatic payments for your recurring rent invoice. You have the option to cancel this subscription anytime or reach out to <Link href={'/support'}><span className="underline">customer support</span></Link> for assistance.</span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2">
              {stripeOptions.clientSecret && stripeOptions.status == 'incomplete' ?
                  (<div className="mt-2">                  
                    <Elements stripe={stripePromise} options={stripeOptions}>
                      <CheckoutForm orderId={order.id} />
                    </Elements>
                  </div>) : (<div className="mb-4">
                  <div>
                    <h2 className="text-base-semi">Subscription ID</h2>
                    <div className="my-2">
                      <div className="flex flex-col text-base-regular">
                        <span className="text-small-regular text-gray-700">{stripeOptions.subscriptionId}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-base-semi">Status</h2>
                    <div className="my-2">
                      <div className="flex flex-col text-base-regular">
                        <span className="text-small-regular text-gray-700">{stripeOptions.status}</span>
                      </div>
                    </div>
                  </div>
                </div>)}
                
                
              </div>
            </div>
          </div>
          <Items
            items={order.items}
            region={order.region}
            cartId={order.cart_id}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-10 border-b border-gray-200">
            <PaymentDetails
              payments={order.payments}
              paymentStatus={order.payment_status}
            />
            <ShippingDetails
              shippingMethods={order.shipping_methods}
              address={order.shipping_address}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-10 border-b border-gray-200">
            <Help />
            <OrderSummary order={order} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderCompletedTemplate
