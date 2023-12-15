import axios from 'axios';
export default function handler(req, res) {
    if (req.method === 'POST') {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${req.body.JwtToken}`,
        };
        axios.post(`${process.env.API_URL}admin/AddTSChapter`, { token: process.env.MYKEY, tsid: req.body.tsid, title: req.body.title, details: req.body.details, isActive: req.body.isActive, isFree: req.body.isFree, duration: req.body.duration }, { headers }).then((response) => {
            const senddta = response.data;
            res.status(200).json({ senddta })

        });

    } else {
        res.status(200).json({ ReqS: 'invalid entry' });
    }
}