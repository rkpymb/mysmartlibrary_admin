import axios from 'axios';
export default function handler(req, res) {
    if (req.method === 'POST') {

        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${req.body.JwtToken}`,
        };
        axios.post(`${process.env.API_URL}admin/AddTSCourse`, { token: process.env.MYKEY, pid: req.body.pid, title: req.body.title, details: req.body.details, img: req.body.img, isActive: req.body.isActive,tagline: req.body.tagline, taglinetwo: req.body.taglinetwo ,courseid: req.body.courseid }, { headers }).then((response) => {
            const senddta = response.data;
            res.status(200).json({ senddta })

        });

    } else {
        res.status(200).json({ ReqS: 'invalid entry' });
    }
}