import axios from 'axios';
export default function handler(req, res) {
    if (req.method === 'POST') {

        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${req.body.JwtToken}`,
        };
        axios.post(`${process.env.API_URL}admin/SaveTestSeries`, { token: process.env.MYKEY, pid: req.body.pid, catid: req.body.catid, title: req.body.title, details: req.body.details, img: req.body.img, mprice: req.body.mprice, sprice: req.body.sprice, isActive: req.body.isActive, date: req.body.date, time: req.body.time, stock: req.body.stock, duration: req.body.duration, tagline: req.body.tagline, taglinetwo: req.body.taglinetwo, isFree: req.body.isFree }, { headers }).then((response) => {
            const senddta = response.data;
            res.status(200).json({ senddta })

        });

    } else {
        res.status(200).json({ ReqS: 'invalid entry' });
    }
}