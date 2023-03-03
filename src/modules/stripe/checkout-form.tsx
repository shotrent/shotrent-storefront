import { MEDUSA_STOREFRONT_URL } from '@lib/config';
import Button from '@modules/common/components/button';
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';

type CheckoutFormProps = {
  orderId:string
};

const CheckoutForm = (props:CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: `${MEDUSA_STOREFRONT_URL}/order/confirmed/${props.orderId}`,
      },
    });


    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button className='mt-4' disabled={!stripe}>Subscribe</Button>
    </form>
  )
};

export default CheckoutForm;