import axios from 'axios';
export default function handler(req, res) {
    if (req.method === 'POST') {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${req.body.JwtToken}`,
        };

        axios.post(`${process.env.API_URL}admin/UserTslist`, { token: process.env.MYKEY,mobile:req.body.mobile}, { headers }).then((response) => {
            
            res.status(200).json({ ReqD:response.data })

        });

    } else {
        res.status(200).json({ ReqS: 'invalid entry' });
    }
}