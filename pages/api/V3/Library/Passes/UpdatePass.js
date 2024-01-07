import axios from 'axios';
export default function handler(req, res) {
    if (req.method === 'POST') {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${req.body.JwtToken}`,
        };

        axios.post(`${process.env.API_URL}admin/UpdatePass`, {
            token: process.env.MYKEY,
            title: req.body.title,
            img: req.body.img,
            details: req.body.details,
            Validity: req.body.Validity,
            isActive: req.body.isActive,
            id: req.body.id,

        }, { headers }).then((response) => {
            const senddta = response.data;
            res.status(200).json({ ReqD: senddta })

        });

    } else {
        res.status(200).json({ ReqS: 'invalid entry' });
    }
}