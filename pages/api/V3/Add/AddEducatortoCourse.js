import axios from 'axios';
export default function handler(req, res) {
    if (req.method === 'POST') {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${req.body.JwtToken}`,
        };

        axios.post(`${process.env.API_URL}admin/AddEducatortoCourse`, { 
            token: process.env.MYKEY,
            Coursepid: req.body.Coursepid,
            Courseid: req.body.Courseid,
            Courseimg: req.body.Courseimg,
            Edumobile: req.body.Edumobile,
            EduUsername: req.body.EduUsername,
        
        }, { headers }).then((response) => {
            console.log(response.data.MYTSData)
            res.status(200).json({ ReqData: response.data });
        });

    } else {
        res.status(200).json({ ReqS: ReqStatus });
    }
}