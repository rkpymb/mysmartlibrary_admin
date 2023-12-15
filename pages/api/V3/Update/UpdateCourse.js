import axios from 'axios';
export default function handler(req, res) {
    if (req.method === 'POST') {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${req.body.JwtToken}`,
        };
        axios.post(`${process.env.API_URL}admin/UpdateCourse`, { token: process.env.MYKEY,catid: req.body.catid, Subcatid: req.body.Subcatid, title: req.body.title, details: req.body.details, img: req.body.img, mprice: req.body.mprice, sprice: req.body.sprice, isActive: req.body.isActive, stock: req.body.stock, duration: req.body.duration, tagline: req.body.tagline, taglinetwo: req.body.taglinetwo, isFree: req.body.isFree, Productid: req.body.Productid,
            lang: req.body.lang,
            CourseDuration: req.body.CourseDuration,
            withcertificate: req.body.withcertificate,
            Availability:  req.body.Availability,
            CertiDetails: req.body.CertiDetails,
            CertificationFee: req.body.CertificationFee, }, { headers }).then((response) => {
            const senddta = response.data;
            res.status(200).json({ senddta })

        });

    } else {
        res.status(200).json({ ReqS: 'invalid entry' });
    }
}