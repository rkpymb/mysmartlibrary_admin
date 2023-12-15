import axios from 'axios';
export default function handler(req, res) {
    if (req.method === 'POST') {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${req.body.JwtToken}`,
        };

        axios.post(`${process.env.API_URL}admin/UpdateSalesOrder`, { 
            token: process.env.MYKEY,
            amt:req.body.amt,
            TotalDiscount:req.body.TotalDiscount,
            Paymentid:req.body.Paymentid,
            refid:req.body.refid,
           
            OrderStatus: req.body.OrderStatus,
            PayStatus: req.body.PayStatus,
            OrderStatusText: req.body.OrderStatusText,
            PayStatusText: req.body.PayStatusText,
            validity: req.body.validity,
            id: req.body.id,
        }, { headers }).then((response) => {
           
            res.status(200).json({ ReqData: response.data });
        });

    } else {
        res.status(200).json({ ReqS: ReqStatus });
    }
}