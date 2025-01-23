import React from 'react'
import CheckoutForm from './CheckoutForm ';
import {loadStripe} from '@stripe/stripe-js';
import {
    PaymentElement,
    Elements,
    useStripe,
    useElements,
  } from '@stripe/react-stripe-js';
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT);

const options = {
  mode: 'payment',
  amount: 1099,
  currency: 'usd',
  // Fully customizable with appearance API.
  appearance: {
    /*...*/
  },
};

const Payment = () => {
  return (
    <Elements stripe={stripePromise} options={options}>
    <CheckoutForm />
  </Elements>
  )
}

export default Payment