import React, {useContext, useState} from 'react';
import ReactDOM from 'react-dom';
import {loadStripe} from '@stripe/stripe-js';
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import {
  PaymentElement,
  Elements,
} from '@stripe/react-stripe-js';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../provider/AuthProvider';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';

const CheckoutForm = () => {
 
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('')
  const [transactionId, setTransactionId] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useContext(AuthContext);
  const axiosPublic=useAxiosPublic()
const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const location=useLocation()
  const property=location.state.property
  console.log(property);
  // const totalPrice = cart.reduce((total, item) => total + item.price, 0)

  // useEffect(() => {
  //     if (totalPrice > 0) {
  //         axiosSecure.post('/create-payment-intent', { price: totalPrice })
  //             .then(res => {
  //                 console.log(res.data.clientSecret);
  //                 setClientSecret(res.data.clientSecret);
  //             })
  //     }

  // }, [axiosSecure, totalPrice])
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(property.propertyId,property)
    const res = await axiosPublic.patch(`/propertyBought/${property.propertyId}`,{status:"Bought"});
    const res2 = await axiosPublic.patch(`/myWishlist/${property.propertyId}`,{status:"Bought"});
    console.log(res.data);
    if (res.data.modifiedCount > 0) {
          Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Thank you for the Payment",
              showConfirmButton: false,
              timer: 1500
          });
              navigate('/dashboard/propertyBought')
          }
    // if (!stripe || !elements) {
    //     return
    // }

    // const card = elements.getElement(CardElement)

    // if (card === null) {
    //     return
    // }

    // const { error, paymentMethod } = await stripe.createPaymentMethod({
    //     type: 'card',
    //     card
    // })

    // if (error) {
    //     console.log('payment error', error);
    //     setError(error.message);
    // }
    // else {
    //     console.log('payment method', paymentMethod)
    //     setError('');
    // }

    // // confirm payment
    // const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
    //     payment_method: {
    //         card: card,
    //         billing_details: {
    //             email: user?.email || 'anonymous',
    //             name: user?.displayName || 'anonymous'
    //         }
    //     }
    // })

    // if (confirmError) {
    //     console.log('confirm error')
    // }
    // else {
    //     console.log('payment intent', paymentIntent)
    //     if (paymentIntent.status === 'succeeded') {
    //         console.log('transaction id', paymentIntent.id);
    //         setTransactionId(paymentIntent.id);

    //         // now save the payment in the database
    //         // const payment = {
    //         //     email: user.email,
    //         //     price: totalPrice,
    //         //     transactionId: paymentIntent.id,
    //         //     date: new Date(), // utc date convert. use moment js to 
    //         //     cartIds: cart.map(item => item._id),
    //         //     menuItemIds: cart.map(item => item.menuId),
    //         //     status: 'pending'
    //         // }

    //         // const res = await axiosSecure.post('/payments', payment);
    //         // console.log('payment saved', res.data);
    //         // refetch();
    //         // if (res.data?.paymentResult?.insertedId) {
    //         //     Swal.fire({
    //         //         position: "top-end",
    //         //         icon: "success",
    //         //         title: "Thank you for the taka paisa",
    //         //         showConfirmButton: false,
    //         //         timer: 1500
    //         //     });
            

    //     }
    // }

}

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit " className='btn btn-success' disabled={!stripe || !elements}>
        Pay
      </button>
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};
export default CheckoutForm ;