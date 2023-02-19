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



type OrderCompletedTemplateProps = {
  order: Order
}

const OrderCompletedTemplate: React.FC<OrderCompletedTemplateProps> = ({
  order,
}) => {

  const [loading, setLoading] = useState(false);
  let digio: { init: () => void; submit: (arg0: any, arg1: any, arg2: any) => void };
  console.log(order)
  const [isDocumentSigned, setIsDocumentSigned] = useState(false);

  const checkRentalAgreementStatus = () => {
    customClient.get(`/store/orders/${order.id}/metadata`)
    .then(res=> setIsDocumentSigned(res.data.isRentalAgreementSigned));
  }

  useEffect(()=>{
    checkRentalAgreementStatus();
  }, [])

  const initDigio = () => {
    const theWindow = window as any;
    if(theWindow) {
      const options = {
        environment : process.env.NODE_ENV === 'production'? 'production': 'sandbox',
        callback : (response:any) => {
          if(response.hasOwnProperty("error_code"))
          {
            return console.log("error occurred in process");
          }          
          console.log(response);
          customClient.post(`/store/orders/${order.id}/digio/sign/agreement/response`)
          .then(res=>{
            console.log(res);
            checkRentalAgreementStatus();
          })
          .catch(err=>{
            console.log(err);
          })
        },
        logo : `${theWindow.location.origin}/favicon.ico`, 
        theme : {
          primaryColor : "#AB3498",
          secondaryColor : "#000000"
          },
        is_iframe: false
      }      
      digio = new theWindow.Digio(options);
      digio.init();
    }
  }

  const submitDigio = (data: { requestId: any; identifier: any; token_id: any }) => {
     if(digio) {
      digio.submit(data.requestId, data.identifier, data.token_id)
     }
  }



  const createSignRequest = () => {
    if(loading) return;    
    setLoading(true);    
    customClient.post(`/store/orders/${order.id}/digio/sign/agreement`)
      .then(res=>{
        if(!digio) {
          initDigio();
        }
        console.log(res.data);
        const result = res.data;
        const params = {requestId: result.data.id, identifier: result.data.signing_parties[0].identifier, token_id: result.data.access_token.id};
        console.log(params);
        submitDigio(params);
      })
      .finally(()=> setLoading(false));
  }



  return (
    <div className="bg-gray-50 py-6 min-h-[calc(100vh-64px)]">
      <div className="content-container flex justify-center">
        <div className="max-w-4xl h-full bg-white w-full">
          <OrderDetails order={order} />
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
          <div className="p-10 border-b border-gray-200">
            <h1 className="text-base-regular">Complete below steps to confirm your order</h1>
            <div className="mt-8">
              <h2 className="text-base-semi">Step 1: Sign rental agreement</h2>
              <span className="text-small-regular text-gray-700">You will be redirected to digio to completed this step. The agreement will be digitally signed by your Aadhaar.</span>
              {!isDocumentSigned?
              (<Button className="w-64 mt-4" onClick={e=>createSignRequest()}>{loading?'Loading...':'e-sign rental agreement'}</Button>)
              :(<Button className="w-64 mt-4">{'e-sign completed'}</Button>)}
              
            </div>
            
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-10 order-b border-gray-200">
            <Help />
            <OrderSummary order={order} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderCompletedTemplate
