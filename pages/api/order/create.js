import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { amount, currency, receipt } = req.body;
    const options = {
      amount: parseFloat(amount) * 100, 
      currency:currency,
      receipt:receipt,
    };
    try {
      const order = await razorpay.orders.create(options);
      console.log(order)
      res.status(200).json(order);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
