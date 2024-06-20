import { useState } from 'react';

export default function PaymentButton({ amount }) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    const orderResponse = await fetch('/api/order/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount, currency: 'INR', receipt: 'receipt#1' }),
    });

    const order = await orderResponse.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Your Company Name',
      description: 'Test Transaction',
      order_id: order.id,
      handler: async function (response) {
        const verificationResponse = await fetch('/api/order/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            order_id: order.id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          }),
        });

        const verificationResult = await verificationResponse.json();
        if (verificationResult.verified) {
          alert('Payment successful!');
        } else {
          alert('Payment verification failed!');
        }
      },
      prefill: {
        name: 'Your Name',
        email: 'your.email@example.com',
        contact: '9999999999',
      },
      notes: {
        address: 'Your address',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const rzp1 = new Razorpay(options);
    rzp1.open();
    setLoading(false);
  };

  return (
    <button onClick={handlePayment} disabled={loading}>
      {loading ? 'Processing...' : 'Pay Now'}
    </button>
  );
}
