import { Order } from "@medusajs/medusa"
import Button from "@modules/common/components/button"
import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OrderDetails from "@modules/order/components/order-details"
import OrderSummary from "@modules/order/components/order-summary"
import PaymentDetails from "@modules/order/components/payment-details"
import ShippingDetails from "@modules/order/components/shipping-details"
import React, { useEffect, useState } from "react"
import { customClient } from "@lib/config"
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from "@modules/stripe/checkout-form"
const stripePromise = loadStripe('pk_test_51MfHnVSFJnfsfQzupt9IWM7Yn4nZXVtZWBqw6toG8X55hFx5lITfWSnn6A67caSqInWK3UxNV1nDVqff1ZY8vVZ600U9khkDYI');

type OrderCompletedTemplateProps = {
  order: Order
}

type DigioInstance = { init: () => void; submit: (arg0: any, arg1: any, arg2: any) => void } | undefined;

const OrderCompletedTemplate: React.FC<OrderCompletedTemplateProps> = ({
  order,
}) => {

  const [loading, setLoading] = useState(false);
  const [isKycRequestLoading, setIsKycRequestLoading] = useState(false);
  const [orderMetadata, setorderMetadata] = useState({} as any);
  const [stripeOptions, setStripeOptions] = useState({
    // passing the client secret obtained from the server
    clientSecret: undefined,
  });

  const getStripSubscription = () => {
    customClient.get(`/store/orders/${order.id}/stripe/subscription`)
    .then(res=> setStripeOptions(res.data));
  }

  const getOrderMetadata = () => {
    customClient.get(`/store/orders/${order.id}/metadata`)
    .then(res=> setorderMetadata(res.data));
  }

  useEffect(()=>{
    getOrderMetadata();
    getStripSubscription();
  }, [])

  const initDigio = (callback:(arg1:any)=>void) => {
    const theWindow = window as any;
    if(theWindow) {
      const options = {
        environment : process.env.NODE_ENV === 'production'? 'production': 'sandbox',
        callback,
        logo : `${theWindow.location.origin}/favicon.ico`, 
        theme : {
          primaryColor : "#AB3498",
          secondaryColor : "#000000"
          },
        is_iframe: false
      }      
      const digio:DigioInstance = new theWindow.Digio(options);
      digio?.init();
      return digio;
    }
  }

  const submitDigio = (digio:DigioInstance,data: { requestId: any; identifier: any; token_id: any }) => {
     if(digio) {
      digio.submit(data.requestId, data.identifier, data.token_id)
     }
  }



  const createSignRequest = () => {
    if(loading) return;    
    setLoading(true);    
    const digio = initDigio((response:any) => {
      if(response.hasOwnProperty("error_code"))
      {
        return console.log("error occurred in process");
      }          
      customClient.post(`/store/orders/${order.id}/digio/sign/agreement/response`)
      .then(res=>{
        getOrderMetadata();
      })
      .catch(err=>{
        console.log(err);
      })
    });

    customClient.post(`/store/orders/${order.id}/digio/sign/agreement`)
      .then(res=>{        
        const result = res.data;
        const params = {
          requestId: result.data.id, 
          identifier: result.data.signing_parties[0].identifier, 
          token_id: result.data.access_token.id
        };
        submitDigio(digio, params);
      })
      .finally(()=> setLoading(false));
  }

  const createKycRequest = () => {
    if(isKycRequestLoading) return; 
    setIsKycRequestLoading(true);

    const digio = initDigio((response:any) => {
      if(response.hasOwnProperty("error_code"))
      {
        return console.log("error occurred in process");
      }          
      customClient.post(`/store/orders/${order.id}/digio/kyc/response `)
      .then(res=>{
        getOrderMetadata();
      })
      .catch(err=>{
        console.log(err);
      })       
    });

    customClient.post(`/store/orders/${order.id}/digio/kyc`)
    .then(response=>{      
      const result = response.data;
      const params = {
        requestId: result.data.id, 
        identifier: result.data.customer_identifier, 
        token_id: result.data.access_token.id
      };
      submitDigio(digio, params);
    })
    .catch(err=> console.log(err))
    .finally(()=> setIsKycRequestLoading(false))
  }

  type ShowStatusProps = {isCompleted:boolean};
  const ShowStatus = (props:ShowStatusProps) => {
    return (
      props.isCompleted?(<span className="rounded-full text-white bg-green-500 py-1 px-2 text-xs">completed</span>)
      :(<span className="rounded-full text-white bg-blue-500 py-1 px-2 text-xs">pending</span>)
    )
  }

  return (
    <div className="bg-gray-50 py-6 min-h-[calc(100vh-64px)]">
      <div className="content-container flex justify-center">
        <div className="max-w-4xl h-full bg-white w-full">
          <OrderDetails order={order} />

          <div className="p-10 border-b border-gray-200">
            <h1 className="text-base-regular mb-0">Please complete below steps to confirm your order</h1>
            <div className="mt-8">
              <div className="flex justify-between">
                <h2 className="text-base-semi">Step 1: E-sign agreement</h2>
                <ShowStatus isCompleted={orderMetadata.isRentalAgreementSigned} />
              </div>
              <div className="mt-2">
                <span className="text-small-regular text-gray-700">You will be redirected to Digio to complete this step. The agreement will be digitally signed by your Aadhaar.</span>
                {!orderMetadata.isRentalAgreementSigned?
                (<Button className="w-64 mt-4" onClick={e=>createSignRequest()}>{loading?'Loading...':'e-sign rental agreement'}</Button>)
                :(<Button disabled className="w-64 mt-4">{'e-sign completed'}</Button>)}
              </div>              
            </div>
            <div className="mt-12">
              <div className="flex justify-between">
                <h2 className="text-base-semi">Step 2: KYC</h2> 
                <ShowStatus isCompleted={orderMetadata.isKycCompleted} />
              </div>
              <div className="mt-2">
                <span className="text-small-regular text-gray-700">You will be redirected to DigiLocker to complete this step. Your KYC documents <span className="font-semibold">Aadhaar and PAN</span> will be fetched from DigiLocker.</span>
                {!orderMetadata.isKycCompleted?(<Button className="w-64 mt-4" onClick={e=>createKycRequest()}>{isKycRequestLoading?'Loading...':'complete kyc'}</Button>)
                :(<Button disabled className="w-64 mt-4">{'kyc completed'}</Button>)}
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

          <div className="grid grid-cols-1 lg:grid-cols-2 p-10 border-b border-gray-200">
            {stripeOptions.clientSecret?(<Elements stripe={stripePromise} options={stripeOptions}>
              <CheckoutForm orderId={order.id} />
            </Elements>):''}
          </div>

        </div>
      </div>
    </div>
  )
}

export default OrderCompletedTemplate
