import { useEffect, useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState(null);
  useEffect(() => {
    // In a real app, get user cart and items; here we use sample
    const items = [{ product: '0001', name: 'Sample T-Shirt', qty: 1, price: 299, image: '/images/tee1.jpg' }];
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders/create-payment-intent`, { items, shippingAddress: { city: 'Pune' } }, { withCredentials: true })
      .then(res => setClientSecret(res.data.clientSecret))
      .catch(err => console.error(err));
  }, []);
  return (
    <div>
      <h1>Checkout</h1>
      {clientSecret ? <p>Client secret received (Stripe) — integrate Stripe Elements to collect card and confirm payment.</p> : <p>Preparing payment...</p>}
    </div>
  );
}
