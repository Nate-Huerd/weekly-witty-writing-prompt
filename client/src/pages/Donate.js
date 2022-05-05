import React from 'react'
import { DONATE } from '../utils/queries';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
const Donate = () => {
    const [donate, { data }] = useLazyQuery(DONATE);
    const handleDonate = () => {
       donate()
    }
    useEffect(() => {
        if (data) {
          stripePromise.then((res) => {
            res.redirectToCheckout({ sessionId: data.Donate.session });
          });
        }
      }, [data]);
    return (
        <div>
            <button onClick={handleDonate}>Donate!</button>
            {/* {loading ? <p> Please wait while we load your donation </p> : ''} */}
        </div>
    )
}
export default Donate