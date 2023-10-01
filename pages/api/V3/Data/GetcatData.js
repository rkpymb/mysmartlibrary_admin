import axios from 'axios';
export default function handler(req, res) {
    if (req.method === 'POST') {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${req.body.JwtToken}`,
        };

        axios.post(`${process.env.API_URL}admin/GetcatData`, { token: process.env.MYKEY, catid:req.body.catid }, { headers }).then((response) => {
            console.log(response.data.MYTSData)
            res.status(200).json({ ReqData: response.data});
        });

    } else {
        res.status(200).json({ ReqS: ReqStatus });
    }
}