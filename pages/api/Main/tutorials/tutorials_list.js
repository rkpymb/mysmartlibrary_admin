import axios from 'axios';
export default function handler(req, res) {
    if (req.method === 'POST') {

        axios.post(`${process.env.API_URL}SuperAdmin/tutorials_list`, { 
            token: process.env.MYKEY,
            limit: req.body.limit,
            page: req.body.page,
           
        
        },).then((response) => {
            const DataMain = response.data;
            res.status(200).json({ ReqD: DataMain })

        });

    } else {
        res.status(200).json({ ReqS: 'invalid entry' });
    }
}