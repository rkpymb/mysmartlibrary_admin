import axios from 'axios';
export default function handler(req, res) {
    if (req.method === 'POST') {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${req.body.JwtToken}`,
        };

        axios.post(`${process.env.API_URL}admin/AddLBShift`, {
            token: process.env.MYKEY,
            title: req.body.title,
            Branchcode: req.body.Branchcode,
            uptime: req.body.uptime,
            downtime: req.body.downtime,
            mprice: req.body.mprice,
            sprice: req.body.sprice,
            isActive: req.body.isActive,


        }, { headers }).then((response) => {
            const senddta = response.data;
            res.status(200).json({ ReqD: senddta })

        });

    } else {
        res.status(200).json({ ReqS: 'invalid entry' });
    }
}