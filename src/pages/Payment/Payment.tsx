import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../Payment/CheckOutForm';
import axiosInstance from '../../services/axios.service';
import { get } from 'lodash';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY || '');

const Payment = ({ itemId, onSuccess, onClose }) => {
  const [secretKey, setSecretKey] = useState('');

  useEffect(() => {
    if (itemId) {
      axiosInstance
        .get(`/api/invoice/payment/get-payment-secret-key`, {
          params: {
            invoice_id: itemId,
          },
        })
        .then(result => {
          const { data, statusCode } = result?.data || {};

          if (statusCode === 200) {
            setSecretKey(get(data, 'client_secret'));
          }
        })
        .catch(error => {
          console.log(error?.message);
        });
    }
  }, [itemId]);

  if (!secretKey || !stripePromise) {
    return <>Loading...</>;
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret: secretKey,
      }}
    >
      <CheckoutForm itemId={itemId} onSuccess={onSuccess} onClose={onClose} />
    </Elements>
  );
};

export default Payment;
