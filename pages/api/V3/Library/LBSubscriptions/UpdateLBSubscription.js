import axios from 'axios';
export default function handler(req, res) {
    if (req.method === 'POST') {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${req.body.JwtToken}`,
        };

        axios.post(`${process.env.API_URL}admin/UpdateLBSubscription`, {
            token: process.env.MYKEY,
          
            isActive: req.body.isActive,
            StatusText: req.body.StatusText,
            validityStartDate: req.body.validityStartDate,
            validityEndDate: req.body.validityEndDate,
            SeatData: req.body.SeatData,
            id: req.body.id,

        }, { headers }).then((response) => {
            const senddta = response.data;
            res.status(200).json({ ReqD: senddta })

        });

    } else {
        res.status(200).json({ ReqS: 'invalid entry' });
    }
}