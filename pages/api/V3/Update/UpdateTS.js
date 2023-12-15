import axios from 'axios';
export default function handler(req, res) {
    if (req.method === 'POST') {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${req.body.JwtToken}`,
        };
        axios.post(`${process.env.API_URL}admin/UpdateTs`, { token: process.env.MYKEY,catid: req.body.catid, title: req.body.title, details: req.body.details, img: req.body.img, mprice: req.body.mprice, sprice: req.body.sprice, isActive: req.body.isActive, stock: req.body.stock, duration: req.body.duration, tagline: req.body.tagline, taglinetwo: req.body.taglinetwo, isFree: req.body.isFree, Productid: req.body.Productid,isActive: req.body.isActive }, { headers }).then((response) => {
            const senddta = response.data;
            res.status(200).json({ D:senddta })

        });

    } else {
        res.status(200).json({ ReqS: 'invalid entry' });
    }
}