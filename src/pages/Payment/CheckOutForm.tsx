import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import axiosInstance from '../../services/axios.service';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const CheckoutForm = ({ itemId, onSuccess, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async event => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      redirect: 'if_required',
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error?.message || '');
      toast.error(error?.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
      axiosInstance
        .post('/api/invoice/payment/verify-payment', {
          payment_intent_id: paymentIntent?.id,
          invoice_id: itemId,
        })
        .then(result => {
          const { data, statusCode } = result?.data || {};
          if (statusCode === 200 && get(data, 'is_valid') === true) {
            onSuccess();
            toast.success('Payment Success!');
          } else {
            toast.error(get(data, 'message'));
          }
        })
        .catch(error => {
          toast.error(error?.message);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {errorMessage && <div>{errorMessage}</div>}
      <Stack spacing={5} direction="row" justifyContent="center" marginTop={3}>
        <Button onClick={onClose} variant="text">
          Cancel
        </Button>
        <Button type={'submit'} disabled={!stripe} variant="contained">
          Submit
        </Button>
      </Stack>
    </form>
  );
};

export default CheckoutForm;
