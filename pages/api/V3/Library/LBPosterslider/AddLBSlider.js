import axios from 'axios';
export default function handler(req, res) {
    if (req.method === 'POST') {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${req.body.JwtToken}`,
        };

        axios.post(`${process.env.API_URL}admin/AddLBSlider`, {
            token: process.env.MYKEY,
            BranchCode: req.body.BranchCode,
            img: req.body.img,
            url: req.body.url,
            isActive: req.body.isActive,
            order: req.body.order,


        }, { headers }).then((response) => {
            const senddta = response.data;
            res.status(200).json({ ReqD: senddta })

        });

    } else {
        res.status(200).json({ ReqS: 'invalid entry' });
    }
}