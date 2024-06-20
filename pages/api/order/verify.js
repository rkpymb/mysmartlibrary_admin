import crypto from 'crypto';
import axios from 'axios';
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { Orderid,order_id, payment_id, signature } = req.body;
    const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    shasum.update(`${order_id}|${payment_id}`);
    const digest = shasum.digest('hex');

    if (digest === signature) {
      const order = {
        event: 'order.paid',
      
      }
      const OrderRes = {
        id: payment_id,
        order_id: order_id,

      }

      axios.post(`${process.env.API_URL}admin/UpdateCreditOrderMain`, { token: process.env.MYKEY, order: order, Orderid: Orderid,OrderRes:OrderRes }, ).then((response) => {
        const RCData = response.data;
        res.status(200).json({ verified: true, RCData: RCData });

      });


    } else {
      res.status(400).json({ verified: false });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
