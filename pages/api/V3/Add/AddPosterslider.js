import axios from 'axios';
export default function handler(req, res) {
    if (req.method === 'POST') {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${req.body.JwtToken}`,
        };

        axios.post(`${process.env.API_URL}admin/AddPosterslider`, { 
            token: process.env.MYKEY,
            BigImg: req.body.BigImg,
            SmallImg: req.body.SmallImg,
            url: req.body.url,
            PType: req.body.PType,
            isActive: req.body.isActive,
            order: req.body.order,
        }, { headers }).then((response) => {
            console.log(response.data.MYTSData)
            res.status(200).json({ ReqData: response.data });
        });

    } else {
        res.status(200).json({ ReqS: ReqStatus });
    }
}