import axios from 'axios';
export default function handler(req, res) {
    if (req.method === 'POST') {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${req.body.JwtToken}`,
        };

        axios.post(`${process.env.API_URL}admin/UpdatePosterSlider`, { 
            token: process.env.MYKEY,
            url: req.body.url,
            PType: req.body.PType,
            isActive: req.body.isActive,
            order: req.body.order,
            id:req.body.id
        
        }, { headers }).then((response) => {
           
            res.status(200).json({ ReqData: response.data });
        });

    } else {
        res.status(200).json({ ReqS: ReqStatus });
    }
}