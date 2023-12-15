import axios from 'axios';
export default function handler(req, res) {
    if (req.method === 'POST') {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${req.body.JwtToken}`,
        };

        axios.post(`${process.env.API_URL}admin/EditSubCat`, { token: process.env.MYKEY, catid: req.body.catid, name: req.body.name, image: req.body.imageUrl, order: req.body.CatOrder, isActive: req.body.isActive }, { headers }).then((response) => {
           
            res.status(200).json({ ReqData: response.data });
        });

    } else {
        res.status(200).json({ ReqS: ReqStatus });
    }
}