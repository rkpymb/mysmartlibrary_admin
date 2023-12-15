import axios from 'axios';
export default function handler(req, res) {
    if (req.method === 'POST') {
    
        axios.post(`${process.env.API_URL}adminlogin/LoginAdminuser`, { token: process.env.MYKEY, mobile: req.body.mobile, pass: req.body.pass }).then((response) => {
           console.log(response.data)
            const senddta = response.data;
            res.status(200).json({ ReqD: senddta })
          
        });

    } else {
        res.status(200).json({ ReqS: 'invalid entry' });
    }
}