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
            <div className="card mb-3">
            <h3  className="card-header">Thanks For Checking out the Donation Page!</h3>
            <div className="card-body ">
                <p>Donations are appreciated but not required!</p>  <button onClick={handleDonate} className="btn-success">Donate!</button>
            {/* {loading ? <p> Please wait while we load your donation </p> : ''} */}
            </div>
            </div>
        </div>
    )
}
export default Donate